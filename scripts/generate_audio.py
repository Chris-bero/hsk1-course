#!/usr/bin/env python3
"""
generate_audio.py — batch-generate natural Mandarin audio for course clips
using edge-tts (Microsoft neural voices, free).

Reads:   audio-manifest.json   (produced by `npm run audio:manifest`)
Writes:  src/assets/audio/<clipId>.mp3

Idempotent & resumable: existing files are skipped unless --force.
After generating, re-run `npm run audio:manifest` to update the runtime
manifest (audioManifest.generated.ts).

Voices (see docs/AUDIO_PIPELINE.md):
  female -> zh-CN-XiaoxiaoNeural   (warm, clear — default narration)
  male   -> zh-CN-YunxiNeural      (conversational male voice)

Usage:
  python3 scripts/generate_audio.py                 # generate all missing
  python3 scripts/generate_audio.py --only hsk1-l03 # one lesson (id prefix)
  python3 scripts/generate_audio.py --force         # regenerate everything
  python3 scripts/generate_audio.py --rate "-10%"   # slightly slower source
"""
import argparse
import asyncio
import json
import sys
from pathlib import Path

try:
    import edge_tts
except ImportError:
    sys.exit("edge-tts is not installed. Run: pip3 install edge-tts")

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_MANIFEST = PROJECT_ROOT / "audio-manifest.json"
DEFAULT_OUT = PROJECT_ROOT / "src" / "assets" / "audio"

# NOTE: child/extra voices (Xiaoshuang, Youxia, Yunye, Yunfeng, Xiaohan) return
# NoAudioReceived on the current edge-tts service — verified 2026-10. Only the
# five voices below produce audio; characters are kept distinct by never
# sharing a dialogue between same-voice speakers.
VOICES = {
    "female": "zh-CN-XiaoxiaoNeural",   # warm adult female (Wang Yifei, Annie, Liu Xiaoxue)
    "female2": "zh-CN-XiaoyiNeural",    # brighter young female (Xiaoyu, Bai Jiayue, Wang Yixue)
    "male": "zh-CN-YunxiNeural",        # young male (Chen Tianzhong, Yang Tongle, students)
    "male2": "zh-CN-YunjianNeural",     # brighter young male (Li Wen, Liu Ming)
    "male3": "zh-CN-YunxiaNeural",      # boyish young male (Dr. "Xiao" Hu)
    "female3": "zh-CN-XiaoxuanNeural",  # third female (Wang Yixue; needed for 3-female scenes)
    "girl": "zh-CN-XiaoxiaoNeural",     # (fallback: child voices unavailable)
    "boy": "zh-CN-YunxiaNeural",        # child male (Liu Xiaoming)
}

CONCURRENCY = 4  # be polite to the service; raise only if you own the infra


async def generate_one(clip: dict, out_dir: Path, rate: str, force: bool, sem: asyncio.Semaphore) -> str:
    dest = out_dir / f"{clip['id']}.mp3"
    if dest.exists() and not force:
        return "skip"
    voice = VOICES.get(clip.get("voice", "female"), VOICES["female"])
    async with sem:
        for attempt in (1, 2):  # one retry for transient network errors
            try:
                tts = edge_tts.Communicate(clip["text"], voice=voice, rate=rate)
                await tts.save(str(dest))
                # Guard: some voices fail silently, leaving 0-byte files.
                if not dest.exists() or dest.stat().st_size == 0:
                    dest.unlink(missing_ok=True)
                    raise RuntimeError("empty audio file")
                return "ok"
            except Exception as err:  # noqa: BLE001
                if attempt == 2:
                    print(f"  FAIL {clip['id']}: {err}", file=sys.stderr)
                    return "fail"
                await asyncio.sleep(1.5)
    return "fail"


async def run(manifest_path: Path, out_dir: Path, rate: str, force: bool, only: str | None) -> int:
    data = json.loads(manifest_path.read_text(encoding="utf-8"))
    clips = data["clips"]
    if only:
        clips = [c for c in clips if c["id"].startswith(only)]
    out_dir.mkdir(parents=True, exist_ok=True)

    sem = asyncio.Semaphore(CONCURRENCY)
    results = await asyncio.gather(*(generate_one(c, out_dir, rate, force, sem) for c in clips))

    ok = results.count("ok")
    skip = results.count("skip")
    fail = results.count("fail")
    print(f"Done: {ok} generated, {skip} skipped (already exist), {fail} failed, of {len(clips)} clips.")
    if ok:
        print("Next: npm run audio:manifest   (updates the runtime manifest)")
    return 1 if fail else 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST)
    ap.add_argument("--out", type=Path, default=DEFAULT_OUT)
    ap.add_argument("--rate", default="+0%", help='edge-tts rate, e.g. "-10%%" (default: +0%%)')
    ap.add_argument("--force", action="store_true", help="regenerate even if the mp3 exists")
    ap.add_argument("--only", default=None, help="only clips whose id starts with this prefix")
    args = ap.parse_args()

    if not args.manifest.exists():
        sys.exit(f"Manifest not found: {args.manifest}\nRun first: npm run audio:manifest")
    return asyncio.run(run(args.manifest, args.out, args.rate, args.force, args.only))


if __name__ == "__main__":
    sys.exit(main())

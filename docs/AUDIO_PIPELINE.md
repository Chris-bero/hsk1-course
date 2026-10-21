# Audio Pipeline — Natural Mandarin TTS

## Approach

Audio is **pre-generated** (not synthesized in the browser), so every learner hears the same
natural Mandarin neural voice regardless of device. Playback speed (0.5× / 0.75× / 1× / 1.25×)
is applied via `HTMLAudioElement.playbackRate` — no re-synthesis, works offline.

Engine: [`edge-tts`](https://pypi.org/project/edge-tts/) — Microsoft Edge neural TTS voices,
free, batch-friendly. For large-scale/production guarantees you can swap in a licensed Azure
Speech key later; only `scripts/generate_audio.py` changes (manifest format stays).

## Voices

| Hint (in lesson content) | Voice | Used for |
|---|---|---|
| `female` (default) | `zh-CN-XiaoxiaoNeural` | vocabulary, sentences, grammar examples, female speakers |
| `male` | `zh-CN-YunxiNeural` | male conversation speakers |

Conversation speakers declare `voice` in the lesson data (`ConversationSpeaker.voice`).

## Clip identity

Clip ID == stable content item ID (see ARCHITECTURE.md §IDs). One clip per unique item — a
sentence reused as a grammar example is generated **once**. Files:
`src/assets/audio/<clipId>.mp3`.

## Commands

```bash
# 1. Scan course content → what audio is needed
npm run audio:manifest
#    writes:  audio-manifest.json                  (for the Python generator)
#             src/services/audioManifest.generated.ts (runtime clipId→URL map,
#             only for mp3s that already exist — builds never break on missing audio)

# 2. Generate missing clips (idempotent, resumable, retries once per clip)
pip3 install edge-tts            # once
python3 scripts/generate_audio.py                     # everything missing
python3 scripts/generate_audio.py --only hsk1-l07     # one lesson
python3 scripts/generate_audio.py --force             # regenerate all
python3 scripts/generate_audio.py --rate "-10%"       # slower base recording

# 3. Re-export the runtime manifest so the app sees the new files
npm run audio:manifest
```

## Missing audio behavior

The app never breaks on absent clips: the play button shows a toast
("Audio not available yet · 音频尚未生成") and — importantly — **no play event is logged**
when nothing actually played (honest telemetry; see `AudioService.play()` return value and
`bootstrap.ts → onPlayed`).

## Build handling

- **Production build** (`npm run build`): clips are emitted as separate hashed files under
  `dist/assets/` (cache-friendly, lazy network cost).
- **Preview build** (`npm run build:preview`): everything, including audio, is inlined as data
  URIs into one `preview-dist/index.html` for server-less previews.

## Regeneration rules

- Text change (hanzi/punctuation) → `--force` regenerate that clip (delete the mp3 and re-run
  without `--force` also works; generation skips existing files).
- New lesson → run the 3 commands above with `--only hsk1-lNN`.
- Voice change → edit `VOICES` in `generate_audio.py`, regenerate affected clips.
- Pinyin is NOT spoken — clip text is always the hanzi string (with punctuation for prosody).

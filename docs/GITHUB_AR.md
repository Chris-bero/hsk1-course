# دليل الرفع على GitHub والنشر للطلاب

> الحزمة `hsk1-site-backup-2026-10-20.zip` تحتوي المشروع كاملاً جاهزاً للرفع.
> بعد الرفع وتفعيل Pages يصبح الموقع حياً للطلاب على رابط عام **مجاناً**.

---

## ماذا يوجد داخل الحزمة؟

| المسار | المحتوى | يُرفع على GitHub؟ |
|---|---|---|
| `src/` | كود الموقع + **1276 مقطعاً صوتياً** + 15 درساً | ✅ نعم |
| `apps-script/` | خلفية المرحلة الثانية (Code.gs + Dashboard.html + LessonsData.gs) | ✅ نعم (للتوثيق — تشغيلها الفعلي على Google) |
| `scripts/` | أدوات توليد الصوت والمانيڤست والمحاكاة الاختبارية | ✅ نعم |
| `test/` | الاختبارات (161 smoke + 95 remote) | ✅ نعم |
| `docs/` | كل الوثائق (بما فيها دليل النشر العربي DEPLOY_PHASE2_AR.md) | ✅ نعم |
| `.github/workflows/deploy-pages.yml` | **النشر التلقائي على GitHub Pages** | ✅ نعم |
| `preview-dist/index.html` | الموقع كاملاً في ملف واحد (23.7MB) — يفتح بالنقر المزدوج | ⛔ لا (يستثنيه .gitignore — يبقى عندك على الجهاز كنسخة توزيع دون استضافة) |
| `package-lock.json` | تثبيت إصدارات المكتبات (مهم لـ npm ci) | ✅ نعم |
| `node_modules/` و`dist/` | — غير موجودة أصلاً في الحزمة (تُعاد بـ npm install / npm run build) | ⛔ |

## الطريقة 1 — GitHub Desktop (الأسهل، بلا أوامر)

1. ثبّت [GitHub Desktop](https://desktop.github.com/) وسجّل دخولك بحسابك.
2. فك ضغط الحزمة في مجلد، مثلاً `C:\hsk1-site`.
3. في GitHub Desktop: **File ← Add Local Repository** ← اختر المجلد ←
   سيلاحظ أنه ليس مستودعاً ← اضغط **create a repository** ← **Create Repository**.
4. اكتب رسالة مثل `Initial commit — HSK1 course site (Phase 1+2)` ← **Commit to main**.
5. اضغط **Publish repository** ← اختر اسماً (مثلاً `hsk1-course`) ←
   أزل علامة ☑ Keep this code private إذا أردت موقعاً عاماً ← **Publish**.

## الطريقة 2 — أوامر git (لأي نظام)

```bash
cd hsk1-site
git init -b main
git add .
git commit -m "Initial commit — HSK1 course site (Phase 1+2)"
# أنشئ مستودعاً فارغاً جديداً على github.com (بدون README) ثم:
git remote add origin https://github.com/<username>/hsk1-course.git
git push -u origin main
```

## تفعيل النشر التلقائي (GitHub Pages)

1. في صفحة المستودع: **Settings ← Pages**.
2. قسم **Build and deployment** ← Source: اختر **GitHub Actions**.
3. هذا كل شيء — أي push قادم (أو أول push إذا فعّلتها بعده مباشرة) يشغّل
  _workflow_ يبني الموقع وينشره. لمتابعته: تبويب **Actions** في المستودع.
4. بعد نجاح أول تشغيل يظهر رابط الموقع في Settings ← Pages، شكله:
   `https://<username>.github.io/hsk1-course/`
   — **هذا هو رابط الطلاب** (يعمل من أي جهاز، والصوت يبث تدريجياً).
5. لتشغيل النشر فوراً دون push جديد: تبويب Actions ←
   "Deploy site to GitHub Pages" ← **Run workflow**.

> الرابط الحي يتصل تلقائياً بخلفية Apps Script المضبوطة في `src/config.ts`
> (نفس الرابط المنشور لديك) — لا إعداد إضافي.

## ملاحظات مهمة

- **الحدود**: مستودعك ~20MB (أغلبه الصوتيات) — بعيد جداً عن حدود GitHub
  (1GB مجاناً). ملف `preview-dist` الكبير مستثنى من الرفع تلقائياً.
- **لا أسرار في المستودع**: رابط `/exec` المنشور في `src/config.ts` ليس سراً —
  الأمان في رموز دخول الطلاب المخزّنة في جدولك، وكل عملية تتحقق منها في الخادم.
  أما **رابط لوحة المعلم فينتهي بـ `?k=…` ولا يوجد في أي ملف هنا**: هو في
  Script Properties عندك، وتصله من سجل تنفيذ `setupSheets` (أو `rotateDashKey`).
  من يفتح الرابط المجرّد يرى صفحة فارغة، لذا رفع المستودع علنياً آمن.
- **الصفحات العامة**: GitHub Pages يتطلب مستودعاً عاماً على الخطة المجانية —
  وهذا آمن هنا تحديداً لأن رابط اللوحة الخاص ليس في الكود.
- **بعد أي تعديل على الكود**: `git add . && git commit -m "…" && git push`
  ← الموقع يتحدث تلقائياً خلال دقيقة تقريباً.
- **بعد أي تعديل على محتوى الدروس**: شغّل `npm run audio:manifest` ثم
  `python3 scripts/generate_audio.py` ثم `npm run lessons:export`
  وحدّث ملفات `apps-script/` في مشروع Google (انظر DEPLOY_PHASE2_AR.md).
- **نسخة احتياطية دورية**: من صفحة المستودع ← **Code ← Download ZIP**،
  أو أعد إنشاء الحزمة من جهازك. جدولك على Google Sheets يبقى مستقلاً
  تماماً (صدّره من Sheets ← File ← Download ← xlsx بين الحين والآخر).

# MedLearn Counter

Medical store ke counter par 15–20 minute ke sessions mein apni dawaiyan seekhne ka app:
salt, class, rack/shelf, dispensing alerts, quiz, flashcards, spaced repetition, XP aur streak.

> **For learning and training only. Not medical advice.** Dosage aur treatment hamesha doctor ke
> prescription aur standard references (CIMS/MIMS/Drugs.com) ke hisaab se.

---

## Sirf ek HTML file (sabse aasaan)

`medlearn-counter.html` — poori app ek hi file mein (code, design, aapki inventory, sample template).
- **Computer par:** file par double-click karo, Chrome/Edge mein khul jayegi. Install ya internet ki zarurat nahi
  (font ke liye internet ho to behtar dikhta hai, warna normal font aata hai).
- **Website par:** yeh file kisi bhi hosting par upload karo (Netlify Drop, GitHub Pages, apni site), naam `index.html` rakh sakte ho.
- **Phone par:** file ko website par daalo aur link kholo. (Phone mein file seedha kholne se kuch phones par data save nahi hota.)
- Progress usi browser mein save hota hai jahan file kholi. File ka naam ya jagah badloge to browser use nayi app samjhega —
  pehle **Settings → Backup** le lo.
- Code badalne ke baad nayi file banane ke liye: `npm run build:single`

## Install kaise karein (beginner ke liye, step by step)

### Step 1 — Node.js install karo (sirf ek baar)
1. https://nodejs.org kholo aur **LTS** version download karke install karo (Next, Next, Finish).
2. Check karne ke liye Terminal kholo (Windows: Start → "Command Prompt"; Mac: "Terminal") aur likho:
   ```bash
   node -v
   ```
   Agar `v20...` ya `v22...` jaisa number dikhe, to Node ready hai.

### Step 2 — Project folder mein jao
Terminal mein `medlearn-counter` folder tak jao. Example:
```bash
cd Downloads/GroxDigital/medlearn-counter
```

### Step 3 — Packages install karo (sirf pehli baar, 1–2 minute)
```bash
npm install
```

### Step 4 — App chalao
```bash
npm run dev
```
Browser apne aap khulega (`http://localhost:5173`). Na khule to yeh address khud browser mein likho.
Band karna ho to Terminal mein `Ctrl + C` dabao.

**Mobile par chalana hai?** Phone aur computer ek hi Wi-Fi par ho, phir `npm run dev -- --host` chalao
aur Terminal mein dikh rahe `Network:` wale address ko phone ke browser mein kholo.

### Step 5 — Apni medicine list daalo
App pehli baar khulega to **Welcome** screen aayegi:
- **Load my store inventory** — aapki 3,400 rows wali CSV (`public/data/store-inventory.csv`) ek click mein.
- **Import CSV / Excel / JSON** — apni koi bhi file chuno.
- **Download sample CSV template** — khali format chahiye to.

Baad mein Settings (Home par ⚙️) se dobara import kar sakte ho. Re-import par progress aur aapki likhi details safe rehti hain.

### Online chalana (bina Play Store / App Store ke)

App ek website hai. Ek baar online daal do, phir kisi bhi phone ya computer par link kholo aur use karo.
Phone par **Add to Home Screen** karne se apna icon aata hai, full screen khulta hai, aur pehli baar ke baad
bina internet bhi chalta hai (PWA).

**Sabse aasaan — Vercel (free):**
1. https://vercel.com par GitHub account se login karo.
2. **Add New → Project** → apni `GroxDigital` repo chuno → **Import**.
3. **Root Directory** mein `medlearn-counter` chuno (Edit dabake). Baaki sab apne aap aa jayega.
4. **Deploy** dabao. 1 minute mein `https://kuch-naam.vercel.app` jaisa link milega.
5. Aage jab bhi GitHub par code update hoga, site apne aap update ho jayegi.

**Ya Netlify (free):** https://app.netlify.com → **Add new site → Import an existing project** → repo chuno →
Base directory `medlearn-counter` → Deploy. (Settings `netlify.toml` mein pehle se hain.)

**Phone par install:**
- Android (Chrome): link kholo → menu ⋮ → **Install app** / **Add to Home screen**. (Settings mein "Install app" button bhi dikhega.)
- iPhone (Safari): link kholo → Share button → **Add to Home Screen**.

**Dhyan rakho:** data us phone/browser mein hi save hota hai. Doosre device par wahi progress chahiye to
**Settings → Backup** download karke wahan **Restore** karo. (Har device par sync chahiye to baad mein
Supabase/Firebase login jod sakte hain — neeche dekho.)

---

## Data ke columns

| Zaroori | Brand (ya “Medicine / Brand Name”) |
|---|---|
| Recommended | Salt, Strength, Class, Category, Rack, Shelf (ya “Sec”), MRP |
| Optional | Form, Company, Rx/OTC, Uses, How it works (Hinglish / English), Analogy, Precautions, When not to give, Interactions, Side effects, Alternative brands, Memory trick, Counter questions |

- Column names loosely match hote hain (`brand_name`, “Medicine / Brand Name”, “Brand” sab chalega).
- List wale columns mein items ko `;` se alag karo.
- Agar file mein “Category” aur “Colour Class” dono hain (jaise aapki inventory mein), to Category = drug **class** aur Colour Class = **category**.
- Same brand + same salt alag racks mein ho to ek hi medicine banti hai, saari locations ke saath.
- Jo field file mein nahi hai, Medicine Card par **Add details** dikhega — wahin likh do, save automatic hai.

---

## Learning rules (kaise kaam karta hai)

- **Status:** Not Started → Learning (card khola) → Practicing (ek baar sahi) → Mastered (14-din wale review par sahi).
- **Spaced repetition:** sahi jawab → agla review 1, 3, 7, phir 14 din baad. Galat → review kal, status ek step neeche.
  Review order wrong count, last practice date aur accuracy se decide hota hai.
- **Today's 5:** pehle jo review due hain, phir current week ki category. Daily goal 3 / 5 / 10 (Settings).
- **Weekly plan:** Week 1 Acidity → Week 2 Fever/Pain → Week 3 Antibiotics → Week 4 Cold/Cough/Allergy, phir baaki categories.
  15 sawaal ka Weekly Revision Test, 70% par agla week unlock.
- **Quiz:** brand ↔ salt, class, category, rack, rack·shelf, shelf → brand, company, use, same-salt brand, precaution.
  Galat options aapke hi data se aate hain (same class / same category / same rack pehle), random nahi.
- **XP:** +10 har sahi jawab; 3 in a row +15, 5 par +25, 10 par +50. Flashcard "I Know This" +5.
  Levels: Beginner (0) → Counter Learner (300) → Salt Spotter (900) → Dispensing Pro (2000) → Pharma Ace (4000) → Medical Store Master (7500).
- **Daily streak:** jis din daily goal poora hua, woh din streak mein gina jata hai.

Saare numbers `src/config/constants.js` mein hain — wahin badlo.

---

## Folder structure

```
medlearn-counter/
├── index.html                  # Figtree font, theme flash fix
├── public/
│   ├── sample-template.csv     # Import ka khali format
│   └── data/store-inventory.csv# Aapki store inventory (bundled)
├── src/
│   ├── main.jsx, App.jsx       # Routes (HashRouter)
│   ├── index.css               # Design tokens: light + dark colours
│   ├── config/constants.js     # Intervals, XP, levels, weekly plan, safety text
│   ├── services/
│   │   ├── repository.js       # Data load/save (UI sirf isse baat karta hai)
│   │   └── storage/            # Storage adapter: abhi localStorage
│   ├── lib/                    # Pure logic (koi UI nahi, tests se covered)
│   │   ├── importer.js         # CSV / Excel / JSON → medicines, column matching, duplicates merge
│   │   ├── indexes.js          # Fast lookups + search (5,000+ medicines)
│   │   ├── quiz.js             # Question generator + realistic distractors
│   │   ├── srs.js              # Spaced repetition + status rules
│   │   ├── plan.js             # Weekly plan, Today's 5, flashcard deck, weak list
│   │   ├── gamification.js     # XP bonus, levels, streak
│   │   └── dates.js, text.js, i18n.js
│   ├── state/AppContext.jsx    # Global state + actions, auto-save
│   ├── components/             # UI kit, charts, tab bar / sidebar, import panel
│   └── pages/                  # 14 screens (Home, Today's 5, Medicine Card, Category Chains,
│                               #  Practice, Quiz + Result + Weekly test, Flashcards, Weak,
│                               #  Search, Progress, Settings, Welcome)
└── tests/core.test.js          # `npm test`
```

## Firebase / Supabase baad mein jodna ho

UI kabhi storage ko direct touch nahi karta. Bas `src/services/storage/` mein ek naya adapter banao
(`get`, `set`, `remove`, `keys` — sab async) aur `storage/index.js` mein `setStorage(newAdapter)` karo.
Data keys: `medicines`, `edits`, `progress`, `settings`, `stats`.

## Notes

- Data sirf isi browser mein save hota hai. Phone/computer badalna ho to **Settings → Backup** download karke **Restore** karo.
- Excel import ke liye `xlsx` (SheetJS 0.18.5, npm wala) use hota hai; `npm audit` iske baare mein warning dikhata hai.
  Yeh sirf aapki apni files padhta hai, isliye risk kam hai — phir bhi anjaan logon ki Excel files import mat karo.
- Inventory mein "Verify name" / "Salt missing" jaise remarks Medicine Card par **Data note** ki tarah dikhte hain.

# Izaugt Mīlestībā 2.0

Moderna tīmekļa vietne vecākiem ar AI chatbot atbalstu, e-komerciju un satura pārvaldības sistēmu.

## 🚀 Projekta Apraksts

"Izaugt Mīlestībā" ir visaptveroša platforma vecākiem, kas piedāvā:
- 📚 Rakstus un resursus par bērnu audzināšanu
- 🎧 Podkāstus ar ekspertu viedokļiem
- 🤖 AI chatbot (Digitālā PEP mamma) 24/7 atbalstam
- 🛒 E-veikals ar grāmatām un konsultācijām
- 👨‍💼 Admin panelis satura pārvaldībai

## 🛠️ Tehnoloģiju Steks

- **Frontend:** Next.js 14 (React) ar App Router
- **Styling:** Tailwind CSS
- **Valoda:** TypeScript
- **Stāvokļa pārvaldība:** React Context API
- **AI Simulācija:** Custom RAG implementation
- **Datu glabāšana:** LocalStorage (demo), gatavs migrācijai uz PostgreSQL/MongoDB

## 📦 Instalācija

### Priekšnosacījumi

Pārliecinies, ka tavā sistēmā ir instalēts:
- Node.js (v18 vai jaunāka versija)
- npm vai yarn

### Soļi

1. **Klonē repozitoriju vai atver projekta mapi:**
```bash
cd "c:\Users\GatisRomanovskis\SIA Anima\ANIMAS - Documents\Projekti\izaugt-milestiba"
```

2. **Instalē atkarības:**
```bash
npm install
```

3. **Palaid development serveri:**
```bash
npm run dev
```

4. **Atver pārlūkprogrammā:**
```
http://localhost:3000
```

## 📁 Projekta Struktūra

```
izaugt-milestiba/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── chatbot/             # AI chatbot endpoint
│   ├── lasi/                    # Rakstu sadaļa
│   ├── runa/                    # AI chatbot lapa
│   ├── pakalpojumi/             # Pakalpojumu lapas
│   ├── veikals/                 # E-komercija
│   └── labot/                   # Admin panelis (nākotnē)
├── components/                   # React komponenti
│   ├── layout/                  # Header, Footer
│   ├── home/                    # Sākumlapas sekcijas
│   ├── chatbot/                 # Chatbot UI
│   └── ui/                      # Atkārtoti izmantojami UI elementi
├── lib/                         # Utility funkcijas
│   ├── chatbot/                 # AI loģika
│   └── cart/                    # Grozu pārvaldība
└── public/                      # Statiskie faili
    └── images/                  # Attēli
```

## 🎨 Galvenās Funkcijas

### 1. AI Chatbot (Digitālā PEP Mamma)
- 24/7 pieejams atbalsts vecākiem
- Balstīts uz PEP mammas metodoloģiju
- RAG (Retrieval-Augmented Generation) simulācija
- Empātisks un atbalstošs tonis

### 2. Rakstu Sistēma
- Dinamiska filtrēšana pa kategorijām
- Pilns rakstu skats ar saistīto saturu
- Produktu ieteikumi

### 3. E-komercija
- Grozu funkcionalitāte
- DPD pakomātu izvēle (simulācija)
- Stripe maksājumi (simulācija)
- Multi-step checkout process

### 4. Responsive Dizains
- Mobile-first pieeja
- Optimizēts visām ierīcēm
- Smooth animācijas un pārejas

## 🎯 Galvenās Lapas

- `/` - Sākumlapa
- `/lasi` - Rakstu saraksts
- `/lasi/[id]` - Atsevišķs raksts
- `/runa` - AI Chatbot
- `/pakalpojumi/konsultacijas` - Konsultācijas
- `/pakalpojumi/gramata` - Grāmata
- `/veikals/grozs` - Iepirkumu grozs
- `/veikals/checkout` - Checkout
- `/iepazisimies` - Par mums

## 🔐 Admin Panelis

**URL:** `/labot`

**Sākotnējie pieejas dati:**
- Login: `Madara`
- Password: `Teodors24`

⚠️ **Svarīgi:** Mainīt paroli pēc pirmās pieslēgšanās!

### Admin Funkcionalitāte

#### 📊 Dashboard
- Statistikas pārskats (raksti, pasūtījumi, lietotāji, ieņēmumi)
- Ātrās darbības (jauns raksts, bulk upload)
- Pēdējās aktivitātes
- Navigācija uz visām pārvaldības sadaļām

#### 📝 Rakstu Pārvaldība (`/labot/raksti`)
- ✅ Visu rakstu saraksts ar filtrēšanu pēc kategorijas
- ✅ Meklēšana pēc nosaukuma
- ✅ Individuāla raksta rediģēšana (Markdown editors)
- ✅ Raksta dzēšana
- ✅ Publicēšanas statusa maiņa

#### 📤 Bulk Upload (`/labot/raksti/bulk`)
- ✅ JSON failu augšupielāde
- ✅ Vai JSON datu ielīmēšana
- ✅ Vairāku rakstu vienlaicīga pievienošana
- ✅ Python script MD → JSON konversijai (`convert_md_to_json.py`)

#### 🛍️ Produktu Pārvaldība (`/labot/produkti`)
- ✅ Produktu saraksts ar filtrēšanu
- ✅ Noliktavas statusa pārvaldība
- ✅ Featured produktu atzīmēšana
- ✅ Produktu rediģēšana un dzēšana

#### 📦 Pasūtījumu Pārvaldība (Plānots)
- ⏳ Pasūtījumu skatīšana
- ⏳ Statusa maiņa
- ⏳ Eksports uz CSV/Excel

#### 👥 Lietotāju Pārvaldība (Plānots)
- ⏳ Lietotāju saraksts
- ⏳ Lomu pārvaldība

## 🚀 Build un Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deploy uz Vercel
```bash
# Instalē Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📝 Bulk Upload Rakstiem

Admin panelī būs iespēja augšupielādēt vairākus rakstus vienlaicīgi izmantojot JSON formātu:

```json
[
  {
    "title": "Raksta nosaukums",
    "content": "Raksta saturs...",
    "category": "sarunas",
    "excerpt": "Īss apraksts",
    "readTime": "5 min"
  }
]
```

## 🎨 Dizaina Sistēma

### Krāsas
- **Primary:** Pink tones (#eb5188)
- **Secondary:** Blue tones (#0ea5e9)
- **Warm:** Yellow tones (#eab308)

### Fonti
- **Display:** Playfair Display
- **Body:** Inter

## 📱 Browser Atbalsts

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Atbalsts

Ja rodas jautājumi vai problēmas:
1. Pārbaudi šo README
2. Apskati kodu komentārus
3. Sazinies ar izstrādātāju

## 📄 Licen ce

© 2026 Izaugt Mīlestībā. Visas tiesības aizsargātas.

---

**Veidots ar ❤️ izmantojot Next.js un Tailwind CSS**

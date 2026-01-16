# Vietnes Tekstu Pārvaldība

Šī funkcionalitāte ļauj administratoriem rediģēt visus tekstus vietnē no viena centralizēta paneļa.

## Piekļuve

1. Piesakies admin panelī: `/labot`
2. Dodies uz "Vietnes teksti" sadaļu no dashboard vai tiešā saite: `/labot/teksti`

## Kā izmantot

### Admin panelī

#### Tekstu skatīšana un rediģēšana
- **Meklēšana**: Izmanto meklēšanas lauku, lai atrastu konkrētu tekstu pēc atslēgas, vērtības vai apraksta
- **Filtrēšana**: Izvēlies sadaļu, lai redzētu tikai konkrētās sadaļas tekstus
- **Rediģēšana**: Noklikšķini uz zīmuļa ikonas, lai rediģētu tekstu
- **Dzēšana**: Noklikšķini uz atkritnes ikonas, lai dzēstu tekstu

#### Jauna teksta pievienošana
1. Noklikšķini uz "Pievienot Tekstu" pogas
2. Aizpildi laukus:
   - **Atslēga (Key)**: Unikāls identifikators (piemēram, `home.hero.title`)
   - **Sadaļa**: Izvēlies atbilstošo sadaļu (home, about, services, utt.)
   - **Vērtība**: Pats teksts, kas tiks rādīts lietotājiem
   - **Apraksts**: Piezīme, kur šis teksts tiek izmantots
3. Noklikšķini "Pievienot"

### Koda izmantošana

#### Variants 1: Izmantojot SiteText komponentu (ieteicams)

```tsx
import SiteText from '@/components/SiteText'

export default function MyPage() {
    return (
        <div>
            {/* Vienkāršs teksts */}
            <SiteText 
                textKey="home.hero.title" 
                fallback="Noklusējuma virsraksts" 
            />

            {/* Kā virsraksts */}
            <SiteText 
                textKey="home.hero.title" 
                fallback="Noklusējuma virsraksts"
                as="h1"
                className="text-4xl font-bold"
            />

            {/* Kā paragrāfs */}
            <SiteText 
                textKey="home.hero.subtitle" 
                fallback="Noklusējuma apakšvirsraksts"
                as="p"
                className="text-lg text-gray-600"
            />
        </div>
    )
}
```

#### Variants 2: Izmantojot API tieši

```tsx
'use client'

import { useEffect, useState } from 'react'

export default function MyPage() {
    const [title, setTitle] = useState('')

    useEffect(() => {
        fetch('/api/site-texts?key=home.hero.title')
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setTitle(data[0].value)
                }
            })
    }, [])

    return <h1>{title || 'Noklusējuma virsraksts'}</h1>
}
```

#### Variants 3: Iegūt visus sadaļas tekstus

```tsx
'use client'

import { useEffect, useState } from 'react'

export default function HomePage() {
    const [texts, setTexts] = useState<Record<string, string>>({})

    useEffect(() => {
        fetch('/api/site-texts?section=home')
            .then(res => res.json())
            .then(data => {
                const textsMap: Record<string, string> = {}
                data.forEach((text: any) => {
                    textsMap[text.key] = text.value
                })
                setTexts(textsMap)
            })
    }, [])

    return (
        <div>
            <h1>{texts['home.hero.title'] || 'Noklusējums'}</h1>
            <p>{texts['home.hero.subtitle'] || 'Noklusējums'}</p>
        </div>
    )
}
```

## Atslēgu nosaukumu konvencija

Izmanto punktus, lai strukturētu atslēgas:

- `[sadaļa].[apakšsadaļa].[elements]`
- Piemēri:
  - `home.hero.title` - Sākumlapas hero sekcijas virsraksts
  - `home.hero.subtitle` - Sākumlapas hero sekcijas apakšvirsraksts
  - `nav.home` - Navigācijas saite uz sākumlapu
  - `footer.copyright` - Kājenes autortiesību teksts
  - `contact.form.submit` - Kontaktu formas pogas teksts

## Sadaļas

Pieejamās sadaļas:
- `home` - Sākumlapa
- `about` - Par mani
- `services` - Pakalpojumi
- `shop` - Veikals
- `articles` - Raksti
- `contact` - Kontakti
- `other` - Citi (navigācija, kājene, utt.)

## API Endpoints

### GET `/api/site-texts`
Iegūst visus tekstus vai filtrē pēc sadaļas/atslēgas

Parametri:
- `section` (optional) - Filtrē pēc sadaļas
- `key` (optional) - Filtrē pēc atslēgas

### GET `/api/site-texts/[id]`
Iegūst konkrētu tekstu pēc ID

### POST `/api/site-texts`
Izveido jaunu tekstu

Body:
```json
{
    "key": "home.hero.title",
    "value": "Izaugt Mīlestībā",
    "description": "Sākumlapas galvenais virsraksts",
    "section": "home"
}
```

### PUT `/api/site-texts/[id]`
Atjaunina tekstu

Body:
```json
{
    "value": "Jaunā vērtība",
    "description": "Atjaunots apraksts"
}
```

### DELETE `/api/site-texts/[id]`
Dzēš tekstu

## Datu glabāšana

Teksti tiek glabāti `data/site-texts.json` failā. Kad būs konfigurēta datubāze, sistēma automātiski pārslēgsies uz Prisma.

## Labākās prakses

1. **Vienmēr izmanto fallback vērtības** - Ja teksts nav atrasts, tiks parādīts fallback
2. **Izmanto aprakstošas atslēgas** - Lai būtu skaidrs, kur teksts tiek izmantots
3. **Pievieno aprakstus** - Palīdz citiem saprast, kur teksts tiek izmantots
4. **Grupē pēc sadaļām** - Atvieglo tekstu atrašanu un pārvaldību
5. **Neizmanto HTML** - Teksti ir paredzēti vienkāršam tekstam, ne HTML kodam

## Piemēri

### Navigācijas izvēlne

```tsx
import SiteText from '@/components/SiteText'

export default function Navigation() {
    return (
        <nav>
            <a href="/"><SiteText textKey="nav.home" fallback="Sākums" /></a>
            <a href="/iepazisimies"><SiteText textKey="nav.about" fallback="Par mani" /></a>
            <a href="/pakalpojumi"><SiteText textKey="nav.services" fallback="Pakalpojumi" /></a>
        </nav>
    )
}
```

### Kājene

```tsx
import SiteText from '@/components/SiteText'

export default function Footer() {
    return (
        <footer>
            <SiteText 
                textKey="footer.tagline" 
                fallback="Atbalsts vecākiem audzināšanas ceļā"
                as="p"
                className="text-sm text-gray-600"
            />
            <SiteText 
                textKey="footer.copyright" 
                fallback="© 2026 Izaugt Mīlestībā"
                as="p"
                className="text-xs text-gray-500"
            />
        </footer>
    )
}
```

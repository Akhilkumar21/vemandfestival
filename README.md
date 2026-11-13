# వేమండ జపమాల మహోత్సవాలు - వార్షిక మహోత్సవాలు
## Vemanda Japamala Matha Shrine - Annual Feast Web Portal

A modern, responsive, high-performance web application built with **React**, **TypeScript**, **React Router**, and **Tailwind CSS** celebrating the **Annual Feast of Japamala Matha Shrine** in **Vemanda Village, Ventrapragada Parish** (వేమండ గ్రామము, వెంట్రప్రగడ విచారణ).

---

## 🌟 Key Features & Routes

1. **Full-Featured React Router Navigation**:
   - `/` : **Home Page** - Master feast celebration portal with majestic hero banner, quick links, stats counters, all embedded sections, and FAQ accordion.
   - `/flags` : **4 Sacred Flags Page** - Dedicated view for the 4 sacred flag hoistings, timetable, and morning RCM church procession details.
   - `/schedule` : **Daily Schedule Page** - Complete day-by-day timetable (Oct 27, 28, 29, 30) with mass and prayer timings.
   - `/videos` : **Devotional Video Center** - Dedicated page showcasing 5 live HD video highlights with theater modal player.
   - `/gallery` : **Photo Gallery Page** - Dedicated page with 13 high-resolution photos, category filters, and modal lightbox.
   - `/notices` : **Notices & Devotee Guidelines Page** - Essential announcements, discipline rules, parish jurisdiction, and devotional FAQs.

2. **White Screen & Light Aesthetic**:
   - Clean, bright, and elegant **white theme** with high-contrast slate typography, golden amber accents, and royal blue touches.
   - The user's uploaded illuminated flag mast photo is seamlessly set in the background with a luminous frosted glass overlay.

3. **Strict Constraints Compliance**:
   - 🚫 **No Year Mentioned**: All dates displayed cleanly as `October 27, 28, 29, 30` (అక్టోబర్ 27, 28, 29, 30).
   - 🚫 **No Weekday Names**: Clean date badges without weekday strings.
   - 🚫 **No Priest / Father Names ("గురుశ్రీ")**: Entire focus is preserved on the sacred traditions, Mother Mary, 4 flags, masses, prayers, choir, and processions.

4. **The Four Sacred Flags Showcase (చతుర్విధ పతాక ఆవిష్కరణలు)**:
   - **Flag 1 (మొదటి పతాకము)**: Oct 27 at 6:00 PM - Stupa Dedication & 1st Flag Hoisting Ceremony.
   - **Flag 2 (రెండవ పతాకము)**: Oct 28 at 9:00 AM - 2nd Flag Hoisting & Eucharistic Adoration.
   - **Flag 3 (మూడవ పతాకము)**: Oct 29 at 9:00 AM - 3rd Flag Hoisting & Holy Mass.
   - **Flag 4 (నాల్గవ పతాకము)**: Oct 30 at 9:00 AM - 4th Grand Flag Hoisting & Concelebrated High Mass.

5. **Daily Flag Tradition**:
   - Every morning at 8:00 AM, Mother Mary's flag departs with musical instruments (*Melathalalu*) from the historic R.C.M. Church to the Japamala Matha Shrine.

6. **Grand Chariot Street Procession (తేరు ప్రదక్షిణ - రథోత్సవం)**:
   - Grand finale on October 30 at 4:00 PM: Procession carrying the sacred statues of Mother Mary, St. Michael the Archangel, and Saints across the streets of Vemanda.

7. **Interactive Media Suite**:
   - **5 HD Videos**: Clean HTML5 video playback with duration badges, full descriptions, and a cinema modal.
   - **13 High-Resolution Photos**: Fully filterable gallery (Statues, Flags, Procession, Brochures) with modal lightbox navigation.
   - **Deduplicated & Semantically Renamed**: All raw files deduplicated and renamed with clear semantic filenames based on content.

8. **Bilingual Support (తెలుగు / English)**:
   - One-click instant switch between Telugu and English text throughout all pages.

---

## 📁 Clean & Professional Folder Structure

```
vemanda/
├── dist/                             # Compiled production build
├── node_modules/                     # Dependencies (React, TS, Tailwind, Vite, Lucide, React Router)
├── originals/                        # Safe backup of untouched raw WhatsApp files
│   ├── images/
│   └── videos/
├── public/
│   ├── images/                       # 13 Deduplicated, semantically renamed photos
│   │   ├── community-erecting-dwajasthambam-flag-pole-daytime.jpeg
│   │   ├── decorated-palm-chariot-theru-japamala-matha.jpeg
│   │   ├── expectant-mother-mary-statue-garlands.jpeg
│   │   ├── grand-chariot-theru-night-procession.jpeg
│   │   ├── hero-shrine-background.jpeg
│   │   ├── illuminated-dwajasthambam-flag-pole-night.jpeg
│   │   ├── invitation-pamphlet-page-1-oct27.jpeg
│   │   ├── invitation-pamphlet-page-2-oct28-30.jpeg
│   │   ├── night-prayer-assembly-illuminated-shrine.jpeg
│   │   ├── our-lady-of-expectation-grand-floral-arch.jpeg
│   │   ├── our-lady-of-rosary-japamala-matha-statue.jpeg
│   │   ├── satya-tv-news-vemanda-rathotsavam-coverage.jpeg
│   │   ├── st-michael-archangel-statue-garlands.jpeg
│   │   └── village-procession-st-michael-st-anthony-palanquins.jpeg
│   └── videos/                       # 5 Deduplicated, semantically renamed videos
│       ├── video-01-flag-hoisting-and-dwajasthambam-lighting.mp4
│       ├── video-02-grand-annual-feast-full-highlights.mp4
│       ├── video-03-sacred-statue-and-devotional-hymns.mp4
│       ├── video-04-village-saints-palanquin-procession.mp4
│       └── video-05-night-chariot-theru-celebrations.mp4
├── src/
│   ├── components/
│   │   ├── FlagsShowcase.tsx         # The 4 Sacred Flags showcase
│   │   ├── GalleryLightbox.tsx       # Photo gallery with modal lightbox
│   │   ├── PortalFooter.tsx          # Devotional notices & shrine info
│   │   ├── PortalHeader.tsx          # Sticky navbar with router links & instant search
│   │   ├── ScheduleTimeline.tsx      # Day-by-day interactive timetable
│   │   ├── ScrollToTop.tsx           # Auto scroll restoration on route navigation
│   │   └── VideoExperience.tsx       # Video player & cinema theater modal
│   ├── pages/
│   │   ├── HomePage.tsx              # Master feast portal overview
│   │   ├── FlagsPage.tsx             # Dedicated 4 sacred flags page
│   │   ├── SchedulePage.tsx          # Dedicated schedule timetable page
│   │   ├── VideosPage.tsx            # Dedicated video center page
│   │   ├── GalleryPage.tsx           # Dedicated photo gallery page
│   │   ├── NoticesPage.tsx           # Dedicated notices & FAQ page
│   │   └── NotFoundPage.tsx          # 404 fallback page
│   ├── data/
│   │   └── festivalData.ts           # Centralized festival data store
│   ├── types/
│   │   └── festival.ts               # Strict TypeScript definitions
│   ├── App.tsx                       # Master application component with BrowserRouter
│   ├── index.css                     # Tailwind CSS & custom styling
│   ├── main.tsx                      # React root entry point
│   └── vite-env.d.ts                 # Vite environment definitions
├── data/
│   └── vemanda-festival.json         # Sanitized JSON schema export
├── index.html                        # HTML entry template
├── package.json                      # Project configuration & scripts
├── postcss.config.js                 # PostCSS configuration
├── tailwind.config.js                # Tailwind CSS design system
├── tsconfig.json                     # TypeScript compiler configuration
├── tsconfig.node.json                # Vite TypeScript configuration
├── vite.config.ts                    # Vite build configuration
└── README.md                         # Project documentation
```

---

## 🚀 Getting Started

### Development Mode
```bash
npm run dev
```
Starts the local development server at `http://localhost:3000` with hot module replacement (HMR).

### Production Build
```bash
npm run build
```
Compiles TypeScript and bundles production assets into `dist/`.

### Preview Production Build
```bash
npm run preview
```
Previews the built application locally.

# Amulet Scan 🏯 

Thai Amulet Identifier – AI-powered identification using Google Gemini

## Features

✨ **Core Functionality**
- 📷 Real-time camera capture (mobile-optimized)
- 📁 Image upload support
- 🤖 Gemini AI identification with confidence scores
- 🎨 Light/dark theme with Buddhist design elements
- 📝 Editable results (amendment workflow)
- 📊 Image quality assessment
- ✅ Accuracy percentage display

📋 **Result Fields**
- Temple
- Amulet Type
- Spiritual Effect
- Material Composition
- Name (English + Thai)
- Master/Creator
- Estimated Price
- Remarks

💬 **User Feedback**
- Anonymous feedback storage (Firebase Firestore)
- Helpfulness ratings
- Comments for improvements

🔄 **Session Management**
- Single amulet per session
- Easy new session workflow
- Non-destructive amendments

## Tech Stack

- **Frontend:** Next.js 15 + TypeScript + Tailwind CSS
- **AI:** Google Gemini 1.5 Flash
- **Database:** Firebase Firestore (feedback)
- **Hosting:** Vercel
- **Mobile:** Capacitor-ready for Play Store phase 2

## Live Demo

🌐 **https://amuletscan.vercel.app**

## Setup

### Prerequisites
- Node.js 18+
- Google Gemini API key
- Firebase project (Firestore)

### Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=amuletscan
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

### Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main application
│   └── globals.css      # Global styles
├── components/
│   ├── CameraCapture.tsx    # Camera input
│   ├── ImageUpload.tsx      # File upload
│   └── ResultDisplay.tsx    # Results & editing
├── lib/
│   ├── firebase.ts      # Firebase config
│   └── gemini.ts        # Gemini AI service
└── types/
    └── index.ts         # TypeScript types
```

## Design System

**Colors:**
- Gold: `#D4AF37` (primary)
- Saffron: `#F4A460` (accent)
- Maroon: `#7D0000` (secondary)

**Buddhist-inspired UI:**
- Border styling with gold accents
- Saffron hover states
- Sacred geometry spacing
- Dark mode support (dark theme)

## Roadmap – Phase 2

- ✅ Web MVP (v20260330v01)
- 🔄 Capacitor integration (mobile)
- 📲 Play Store submission
- 🔐 User accounts & history
- 🗺️ Temple location database
- 📚 Amulet knowledge base

## API Limits

- Gemini: Rate limited by quota
- Firebase: Free tier suitable for MVP
- Vercel: Serverless deployment included

## Testing

**Manual Test Checklist:**
- [ ] Camera capture works (mobile tested)
- [ ] Image upload functions
- [ ] Gemini identification returns valid JSON
- [ ] Firebase feedback stores correctly
- [ ] Light/dark theme toggles
- [ ] Amendments persist in session
- [ ] New session clears results
- [ ] Mobile responsive

## License

MIT

## Support

For issues or feedback, create a GitHub issue:
https://github.com/kyoleow/amuletscan/issues

---

**Version:** v20260330v01  
**Built:** 2026-03-30  
**Status:** MVP Ready for Vercel Deployment ✅
# Firebase configured

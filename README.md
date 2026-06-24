<div align="center">

# ★ WebPrompt ★

### The Ultimate AI Website Prompt Marketplace

*Production-ready prompts that generate stunning websites in minutes*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

[![Live Demo](https://img.shields.io/badge/LIVE-DEMO-ff6b6b?style=for-the-badge&logo=vercel)](https://degrees-mineral-heard-sam.trycloudflare.com)

</div>

---

## 🎯 What is WebPrompt?

WebPrompt is a curated marketplace of **214 production-ready AI prompts** specifically designed for **website generation**. Each prompt has been crafted to produce complete, professional websites when used with AI tools like **Cursor**, **Bolt**, **v0**, **Lovable**, or **ChatGPT**.

Unlike generic prompt libraries, every prompt in WebPrompt is:
- ✅ **Website-focused** — Full pages, not just components
- ✅ **Production-ready** — Detailed specs for layout, colors, typography, sections
- ✅ **Uniquely previewed** — Each prompt has its own preview image
- ✅ **Categorized** — 30 industry-specific categories
- ✅ **Difficulty-rated** — Beginner, Intermediate, Advanced

---

## 📦 214 Prompts Across 30 Categories

| Category | Count | Category | Count |
|----------|-------|----------|-------|
| SaaS | 50 | E-Commerce | 19 |
| Dashboard | 13 | Portfolio | 11 |
| Landing Page | 24 | AI/Tech | 9 |
| Finance | 7 | Crypto/Web3 | 8 |
| Agency | 6 | Education | 5 |
| Fitness | 5 | Restaurant | 5 |
| Music | 5 | Healthcare | 4 |
| Food Delivery | 4 | Photography | 4 |
| Blog | 4 | Event | 4 |
| Beauty/Fashion | 4 | Real Estate | 3 |
| Podcast | 3 | Newsletter | 3 |
| Job Board | 3 | Construction | 3 |
| Non-Profit | 3 | Social Media | 2 |
| Legal | 2 | Automotive | 2 |
| Travel | 1 | Gaming | 1 |

### ✨ Premium 3D Website Templates (14)

Our most advanced prompts featuring **Three.js**, **WebGL**, and **3D interactions**:

| Template | Description |
|----------|-------------|
| 🚀 3D SaaS Landing | Floating product mockups with parallax scrolling |
| 🎨 3D Interactive Portfolio | Cube navigation with WebGL effects |
| 🎧 3D Product Launch | Cinematic model viewer (Apple-style) |
| ₿ 3D Crypto Exchange | Floating coins with particle effects |
| 🍽️ 3D Immersive Restaurant | Virtual tour with ambient atmosphere |
| 🎮 3D Gaming Studio | Character showcase with particle systems |
| 🏠 3D Real Estate Tour | Virtual walkthrough with floor plans |
| 🎵 3D Music Artist | Audio-reactive visuals and 3D album covers |
| 💪 3D Fitness Energy | Body visualization with dynamic effects |
| 🚀 3D Space Travel | Sci-fi booking with 3D planet models |
| 🏎️ 3D Automotive Showcase | Car configurator with color picker |
| 🤖 3D AI Conference | Holographic speaker cards |
| 👗 3D Fashion Runway | Virtual try-on with 3D avatars |
| 🖼️ 3D NFT Gallery | Virtual gallery room with floating frames |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Payment** | [Midtrans](https://midtrans.com/) (Snap API) |
| **Auth** | Custom context + modal system |
| **State** | React Context API |
| **Fonts** | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts) |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/B4ckR3d/webprompt.git
cd webprompt

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
webprompt/
├── public/
│   └── preview-images/        # Static preview screenshots
├── src/
│   ├── app/
│   │   ├── page.tsx           # Homepage
│   │   ├── catalog/page.tsx   # Browse all prompts
│   │   ├── pricing/page.tsx   # Subscription plans
│   │   ├── prompt/[id]/       # Individual prompt pages
│   │   ├── admin/             # CMS admin dashboard
│   │   │   ├── page.tsx       # Dashboard overview
│   │   │   ├── prompts/       # Prompt management
│   │   │   ├── users/         # User management
│   │   │   ├── payments/      # Payment tracking
│   │   │   ├── orders/        # Order management
│   │   │   ├── analytics/     # Usage analytics
│   │   │   └── settings/      # Platform settings
│   │   └── api/payment/       # Midtrans payment API
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PromptCard.tsx
│   │   ├── AuthModal.tsx      # Login/Signup combined
│   │   └── SubscribeModal.tsx # Midtrans subscription
│   ├── context/
│   │   └── AuthContext.tsx    # Auth state management
│   ├── data/
│   │   └── prompts.ts        # 214 prompts database
│   └── lib/
│       └── midtrans.ts       # Midtrans integration
├── README.md
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🎨 Features

### For Users
- **Browse & Search** — Filter by category, price, difficulty
- **Copy Prompts** — One-click copy after login
- **Free & Pro** — Free prompts for everyone, premium for subscribers
- **Detailed Previews** — Each prompt shows what it generates
- **Responsive** — Works on desktop, tablet, and mobile

### For Admins (CMS Dashboard)
- **Prompt Management** — Create, edit, delete prompts
- **User Management** — View and manage users
- **Payment Tracking** — Monitor Midtrans transactions
- **Analytics** — Usage statistics and trends
- **Settings** — Configure platform options

### Payment (Midtrans)
| Plan | Price | Type |
|------|-------|------|
| **Pro Monthly** | Rp 149.000/bulan | Subscription |
| **Pro Yearly** | Rp 1.499.000/tahun | Subscription (save 16%) |
| **Lifetime** | Rp 749.000 | One-time payment |

---

## 🌐 API Reference

### Create Payment

```
POST /api/payment
```

**Request:**
```json
{
  "planType": "pro_monthly",
  "email": "user@example.com",
  "name": "User Name"
}
```

**Response:**
```json
{
  "token": "snap-token...",
  "redirect_url": "https://app.midtrans.com/snap/..."
}
```

### Payment Callback

```
POST /api/payment/callback
```

Midtrans notification callback (server-to-server). Handles payment status updates automatically.

---

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/B4ckR3d/webprompt)

### Environment Variables

```env
# Midtrans Payment Gateway
MIDTRANS_SERVER_KEY=your_server_key
MIDTRANS_CLIENT_KEY=your_client_key
MIDTRANS_IS_PRODUCTION=false
```

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding New Prompts

To add a new prompt, edit `src/data/prompts.ts`:

```typescript
{
  id: "your-prompt-id",
  title: "Your Prompt Title",
  description: "What this prompt generates",
  category: "Landing Page",
  tags: ["tag1", "tag2", "tag3"],
  prompt: "Your detailed AI prompt text here...",
  isPremium: false,
  rating: 4.5,
  downloads: 100,
  author: "YourName",
  previewColor: "from-blue-500 to-purple-600",
  previewImage: "https://images.unsplash.com/...",
  createdAt: "2024-01-15",
}
```

---

## 📖 How to Use Prompts

1. **Browse** the catalog and find a prompt you like
2. **Sign in** to your account (free)
3. **Copy** the prompt text
4. **Paste** into your AI tool of choice:
   - [Cursor](https://cursor.sh/) — AI code editor
   - [Bolt](https://bolt.new/) — Full-stack web builder
   - [v0](https://v0.dev/) — UI generator by Vercel
   - [Lovable](https://lovable.dev/) — AI web app builder
   - [ChatGPT](https://chat.openai.com/) — General purpose AI

---

## 🏆 Acknowledgments

- **Prompt inspiration:** [SceneAI](https://sceneai.art), [21st.dev](https://21st.dev), [YouMind](https://youmind.com), [PromptBase](https://promptbase.com)
- **UI inspiration:** [Linear](https://linear.app), [Stripe](https://stripe.com), [Vercel](https://vercel.com)
- **Preview images:** [Unsplash](https://unsplash.com)

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by [B4ckR3d](https://github.com/B4ckR3d)**

[![GitHub](https://img.shields.io/badge/GitHub-B4ckR3d-181717?style=for-the-badge&logo=github)](https://github.com/B4ckR3d)

</div>

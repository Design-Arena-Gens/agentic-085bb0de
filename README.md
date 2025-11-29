# Dynamic Ticket Pricing Simulator

Next.js application that demonstrates a continuous airline fare model blending
inventory pressure, market intelligence, and simulated customer context.

## ✨ Core Capabilities

- Continuous pricing output with non-integer fares
- Base cost modeling (operating cost + minimum profit corridor)
- Real-time adjustments for seat scarcity, lead time, booking velocity, competitor fares, and demand index
- Customer context modifiers (point of sale, loyalty tier)
- Scenario sandbox for stress testing the pricing algorithm

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <project-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port specified in the console)

## 📁 Project Structure

```
├── app/                     # Next.js App Router
│   ├── components/          # UI components
│   ├── lib/                 # Pricing model logic
│   ├── globals.css          # Global styling
│   └── page.tsx             # Application entry
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Available Scripts

- `npm run dev` — Run locally with hot reload
- `npm run build` — Build for production
- `npm start` — Start the production server
- `npm run lint` — Lint the codebase

## 🎨 Features

- Responsive dashboard layout
- Pricing driver breakdowns with qualitative commentary
- Scenario explorer for quick sensitivity analysis

## 🔧 Customization

Feel free to modify and extend this generated code to meet your specific needs:

1. Update pricing heuristics in `app/lib/pricing.ts`
2. Add new demand drivers and adjustments
3. Integrate with analytics or forecast APIs
4. Style the UI to match your brand

## 📚 Technologies Used

- Next.js 14 App Router
- React 18 + TypeScript
- Modern CSS with custom design tokens

## 🤝 Contributing

Contributions are welcome! Please feel free to open issues and pull requests.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

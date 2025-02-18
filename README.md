# Review Analysis Tool 🔍

Automatically analyze App Store and Play Store reviews using AI to generate actionable tasks.

## Features 🚀
- 📱 Support for both iOS and Android app reviews
- 🤖 AI-powered review analysis
- 🎯 Automatic task prioritization
- 🏷️ Smart categorization (Bug/Feature/UX)
- 🔍 Advanced filtering and sorting

## Quick Start ⚡

### 1. Clone the repository
```bash
git clone https://github.com/Filip-Lasyk/app-sentimet-analitics.git
cd review-analysis-tool
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file in the root directory:
```bash
VITE_SERP_API_KEY=your_serp_api_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

### 4. Start the development server
```bash
npm run dev
```

## API Keys Setup 🔑

### 1. **SERP API Key** (for app store reviews)
- Sign up at [SerpApi](https://serpapi.com/)
- Copy your API key from the dashboard

### 2. **OpenAI API Key** (for review analysis)
- Sign up at [OpenAI](https://platform.openai.com/)
- Create an API key in your account settings

## Usage 🛠️

1. Copy an app URL from either:
   - **App Store:** `https://apps.apple.com/us/app/[app-name]/id[app-id]`
   - **Play Store:** `https://play.google.com/store/apps/details?id=[package-name]`

2. Paste the URL into the tool and click **"Analyze Reviews"**

3. View generated tasks with priorities and categories

## Development 🏗️

- Built with **React + TypeScript + Vite**
- Uses **Tailwind CSS** for styling
- State management with **Zustand**

## License 📜

This project is licensed under the **MIT License**.
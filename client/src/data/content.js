export const landingContent = {
  hero: {
    badge: 'AI-Powered Code Reviewer',
    title: 'Elevate your code quality with instant AI reviews',
    subtitle:
      'Paste your code, select your language, and let Google Gemini AI detect bugs, estimate time & space complexity, and write production-ready optimized code.',
    stats: [
      { label: 'Languages Supported', value: '7 Core' },
      { label: 'Review Speed', value: '< 3s' },
      { label: 'API Tier', value: '100% Free' },
    ],
  },
  features: [
    {
      icon: 'Zap',
      title: 'Real-Time AI Analysis',
      description: 'Instant structural analysis powered by Google Gemini 2.0 Flash AI.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Bug & Vulnerability Detection',
      description: 'Find security risks, memory leaks, buffer overflows, and null pointers before deployment.',
    },
    {
      icon: 'Cpu',
      title: 'Time & Space Complexity',
      description: 'Automatic algorithmic complexity estimation with Big-O notation cards.',
    },
    {
      icon: 'Code2',
      title: 'One-Click Refactoring',
      description: 'Instantly apply optimized, production-ready code directly into your Monaco editor.',
    },
  ],
  workflow: [
    {
      step: '01',
      title: 'Select Language',
      description: 'Choose from C++, C, Java, Python, JavaScript, HTML, or CSS.',
    },
    {
      step: '02',
      title: 'Paste Code',
      description: 'Type or paste code into the syntax-highlighted Monaco editor.',
    },
    {
      step: '03',
      title: 'Run AI Review',
      description: 'Get deep AI analysis, quality score, complexity cards, and refactored code.',
    },
  ],
  faq: [
    {
      question: 'Is this AI Code Reviewer free to use?',
      answer: 'Yes! It utilizes the free tier of the Google Gemini API (or Groq / OpenRouter free models).',
    },
    {
      question: 'Where are API keys stored?',
      answer: 'API keys are stored securely on the Node.js Express server inside a .env file and are never exposed to the browser.',
    },
    {
      question: 'Which languages are supported?',
      answer: 'It supports 7 major languages: C++, C, Java, Python, JavaScript, HTML, and CSS.',
    },
  ],
};

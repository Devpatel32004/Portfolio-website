export const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "vault", label: "Vault" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const profile = {
  name: "Dev Patel",
  title: "Full Stack & Frontend Developer",
  location: "Ahmedabad, India",
  email: "devp222004@gmail.com",
  phone: "+91 7016038990",
  objective:
    "Creative Full Stack & Frontend Developer skilled in Next.js, React, JavaScript, Tailwind CSS, Bootstrap, and MERN technologies. Experienced in building high-performance solar simulations and AI platforms using Three.js and MongoDB during internship.",
  resumeVaultUrl:
    "https://drive.google.com/drive/folders/1H_2zyrR0JwESg8ZJ-LQXFhnoRob4wADd?usp=sharing",
  links: {
    github: "https://github.com/Devpatel32004",
    leetcode: "https://leetcode.com/u/devpatel22/",
    linkedin: "https://www.linkedin.com/in/devpatelma",
  },
};

export const skillGroups = [
  {
    title: "Frontend",
    items: ["JavaScript", "React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend & Database",
    items: ["Node.js", "Express.js", "MongoDB", "MERN"],
  },
  {
    title: "Core Engineering",
    items: ["Git", "GitHub", "C++", "Data Structures", "Algorithms"],
  },
  {
    title: "CS Core Subjects",
    items: ["DBMS", "Operating Systems (OS)", "Computer Networks (CN)", "Computer Organization and Architecture (COA)", "OOP", "SQL"],
  },
];

export const skills = [
  "JavaScript",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "Git",
  "GitHub",
  "MERN",
  "C++",
  "Data Structures",
  "Algorithms",
];

export const experience = [
  {
    company: "Solyug Energy",
    role: "Software Engineering Intern (Full Stack Developer)",
    location: "Virtual",
    duration: "Feb 2026 - Present",
    points: [
      "Engineered a web-based 2D/3D solar layout platform (HelioScope-like) using Next.js and React.",
      "Integrated Mapbox GL JS and Mapbox Draw for precise roof mapping, obstacle handling, and panel zoning.",
      "Developed geospatial algorithms with Turf.js to optimize layouts with setbacks and keep-out zones.",
      "Built an interactive 3D visualizer using Three.js with flat and pitched roof generation.",
      "Implemented drag-drop workflows, measurements, and real-time UI controls with sun shadow simulation.",
    ],
    impact: [
      { label: "Reduced manual layout effort", value: "60%" },
      { label: "Improved mapping precision", value: "3x" },
      { label: "Built interactive 3D visualization", value: "Realtime" },
    ],
    responsibilities: [
      "Developed full-stack solar layout platform from scratch using Next.js 14+",
      "Architected geospatial data pipeline with Mapbox and Turf.js",
      "Implemented 3D visualization layer with Three.js for roof modeling",
      "Built responsive UI with real-time sun shadow simulation",
      "Optimized performance for handling large geospatial datasets",
    ],
    stack: ["Next.js", "React", "Mapbox GL JS", "Mapbox Draw", "Turf.js", "Three.js"],
  },
];

export const projects = [
  {
    title: "Loomi AI",
    category: "AI",
    description:
      "Built a full-stack SaaS platform that helps businesses deploy custom AI customer support chatbots with domain-specific knowledge.",
    longDescription: [
      "Built a full-stack SaaS platform using Next.js and MongoDB that enables businesses to configure and embed custom AI customer support chatbots.",
      "Integrated Google Gemini AI to generate professional, context-aware responses constrained strictly to user-defined company knowledge bases.",
      "Engineered a lightweight, framework-agnostic vanilla JavaScript chat widget (chatBot.js) dynamically served to client websites with automated CORS handling.",
      "Implemented secure authentication using Scalekit SSO and designed a highly responsive, dark-theme dashboard utilizing Tailwind CSS and Shadcn UI.",
    ],
    stack: ["Next.js", "React", "MongoDB", "Gemini AI", "Tailwind CSS", "Scalekit"],
    github: "https://github.com/Devpatel32004/loomi_ai",
    demo: "https://loomi-ai-a7zm.vercel.app/",
    image: "/project-thumbs/loomi-ai.png",
    caseStudy:
      "Designed a framework-agnostic embeddable chat widget and constrained response generation to user-defined company knowledge bases.",
  },
  {
    title: "Career-Craft",
    category: "Full Stack",
    description:
      "Developed a responsive career dashboard that improved user interaction by 40% using AI quizzes, analytics, and secure onboarding.",
    longDescription: [
      "Developed a responsive full-stack career dashboard that improved user interaction by 40%, integrating secure onboarding and account management with Clerk.",
      "Integrated Gemini AI to generate 10-question personalized quizzes with real-time scoring and feedback, enhancing user engagement and preparation accuracy.",
      "Implemented Recharts to visualize detailed analytics including quiz history, top scores, skill trends, and personalized improvement insights.",
      "Automated weekly data updates using Inngest cron jobs, maintaining 100% data freshness for market outlooks, skill demand, and salary benchmarks.",
    ],
    stack: ["Next.js", "Clerk", "Gemini AI", "Recharts", "Inngest"],
    github: "https://github.com/Devpatel32004/Career-craft",
    demo: "https://careercraft-five.vercel.app/",
    image: "/project-thumbs/career-craft.png",
    caseStudy:
      "Automated weekly job-market updates and visualized skill trends, salary insights, and personalized quiz performance.",
  },
  {
    title: "ChatHive",
    category: "Full Stack",
    description:
      "Built a real-time messaging platform with secure authentication, media sharing, profile customization, and dynamic themes.",
    longDescription: [
      "Built a full-featured real-time messaging platform with dynamic theme support, achieving a 25% increase in active sessions across devices.",
      "Implemented secure JWT-based authentication and encrypted password storage using Bcrypt, ensuring 100% user data confidentiality.",
      "Integrated Socket.IO and Zustand to manage real-time communication and frontend state efficiently, reducing latency to under 200ms.",
      "Enabled media sharing and profile customization via Cloudinary, improving session duration and visual interactivity by 30%.",
    ],
    stack: ["React", "Node.js", "MongoDB", "Socket.IO", "Zustand", "Cloudinary"],
    github: "https://github.com/Devpatel32004/ChatHive",
    demo: "https://chathive-y4ne.onrender.com/",
    image: "/project-thumbs/chathive.png",
    caseStudy:
      "Reduced message latency to under 200ms and improved engagement through realtime sync and polished multi-device UX.",
  },
  {
    title: "AI Thief Detector",
    category: "AI",
    description:
      "Implemented a real-time detection interface using TensorFlow.js and webcam streams to identify potential threats with high confidence.",
    longDescription: [
      "Implemented real-time object detection every 10ms using TensorFlow.js and React Webcam, maintaining 80%+ confidence to ensure accurate threat identification.",
      "Developed a clean and responsive UI with Next.js and Tailwind CSS, utilizing Canvas to render bounding boxes for detected objects in live video.",
      "Integrated a basic throttling mechanism to manage detection flow, improving performance and reducing unnecessary computation.",
      "Engineered a fully client-side solution for instant deployment, enhanced data privacy, and seamless integration into existing systems.",
    ],
    stack: ["Next.js", "TensorFlow.js", "React Webcam", "Tailwind CSS", "Canvas"],
    github: "https://github.com/Devpatel32004/AI-Thief-Detector",
    demo: "https://ai-thief-detector.vercel.app/",
    image: "/project-thumbs/ai-thief-detector.png",
    caseStudy:
      "Added a throttled client-side detection flow to reduce compute overhead while preserving accuracy and privacy.",
  },
];

export const education = [
  {
    degree: "B.Tech, Electrical Engineering",
    institute: "Sardar Vallabhbhai National Institute of Technology",
    duration: "2022 - 2026",
  },
  {
    degree: "Senior Secondary (XII), Science - 87.38%",
    institute: "Shree Ved International School (GSEB)",
    duration: "2021",
  },
];

export const achievements = [
  { title: "Flipkart Grid 6.0", subtitle: "Shortlisted among 4.8L+ participants", icon: "trophy" },
  { title: "Software Engineering Intern", subtitle: "Full Stack Developer @ Solyug Energy", icon: "briefcase" },
];

export const tools = [
  { name: "VS Code" },
  { name: "Git" },
  { name: "Postman" },
  { name: "Figma" },
  { name: "Vercel" },
];

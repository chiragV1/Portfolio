// Real CV data for Chirag Verma — seeded into MongoDB

export const seedData = {
  profile: {
    name: "Chirag Verma",
    tagline: "Full Stack Developer & Automation Engineer",
    bio: "Dynamic Full-Stack Web Developer with a proven track record of building scalable, responsive, and user-focused applications. Experienced in developing end-to-end solutions using JavaScript, React.js, Node.js, MongoDB, and TypeScript, along with strong fundamentals in HTML, CSS, and modern UI frameworks like Tailwind CSS. Proficient in API development, database design, and third-party integrations. Previously worked with Java, Spring Boot, and SQL, bringing a versatile tech background. Passionate about crafting clean, maintainable code and delivering impactful digital experiences.",
    location: "Agra, U.P., India",
    email: "chiragverma525@gmail.com",
    phone: "+91 73517 40611",
    github: "https://github.com/chiragV1",
    linkedin: "https://www.linkedin.com/in/chiragverma1703/",
    twitter: "https://twitter.com/chiragverma",
    stats: {
      yearsExperience: "2+",
      projectsCompleted: "15+",
      happyClients: "5+",
      toolsBuilt: "3+",
    },
  },

  experience: [
    {
      period: "Aug 2025 – Present",
      role: "Freelance Automation Developer",
      company: "Aptli AI",
      location: "Remote",
      description:
        "Building an intelligent hotel reconciliation system using Python automation. Developed automated pipelines that fetch live booking, billing, and inventory data from hotel management systems. Engineered workflow automation that performs end-to-end reconciliation actions — flagging discrepancies, generating audit reports, and triggering corrective workflows automatically — eliminating hours of manual back-office work for hotel operators.",
      tags: ["Python", "Playwright", "Automation", "REST APIs", "Data Pipelines", "Hotel Tech"],
      current: true,
    },
    {
      period: "Sep 2024 – Present",
      role: "Freelance Software Developer",
      company: "Remote / Independent",
      location: "Remote",
      description:
        "Building modern, responsive web applications using the MERN stack for clients across various domains. Designed clean, user-friendly interfaces with React.js, TypeScript, and Tailwind CSS. Developed secure backend APIs with Node.js and Express — implementing auth, role-based access, and data handling. Handled end-to-end project development from planning to deployment on Vercel, Render, and Netlify.",
      tags: ["MERN", "React.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Vercel"],
      current: true,
    },
    {
      period: "Jun 2023 – Aug 2024",
      role: "Associate Application Developer",
      company: "Oracle Financial Services Software",
      location: "Bangalore",
      description:
        "Designed and developed scalable RESTful APIs using Spring Boot and Java. Implemented data validation, error handling, rate limiting, and caching. Leveraged Spring Security for authentication and authorization. Built responsive front-end components using React/Angular integrated via AJAX. Designed relational database schemas using SQL with Spring Data JPA. Contributed actively to code reviews and cross-functional team delivery.",
      tags: ["Java", "Spring Boot", "REST APIs", "Spring Security", "SQL", "React", "JavaScript"],
      current: false,
    },
  ],

  education: [
    {
      period: "Jul 2019 – Jun 2023",
      degree: "B.E. — Instrumentation & Control Engineering",
      institution: "National Institute of Technology Trichy",
      score: "7.24 CGPA",
      description:
        "Studied software engineering, data structures, algorithms, control systems, and embedded systems at one of India's premier NITs. Graduated with a strong foundation in both hardware and software domains.",
    },
    {
      period: "Apr 2015 – Mar 2017",
      degree: "Higher Secondary School",
      institution: "Delhi Public School, Agra",
      score: "87.2%",
      description:
        "Science stream with Mathematics, Physics, and Chemistry. Developed strong analytical foundations that underpin current software engineering work.",
    },
  ],

  skills: [
    {
      category: "Frontend",
      icon: "🎨",
      skills: [
        { name: "React / Next.js", level: 90, color: "#61DAFB" },
        { name: "TypeScript", level: 85, color: "#3178C6" },
        { name: "Tailwind CSS", level: 92, color: "#06B6D4" },
        { name: "HTML / CSS", level: 95, color: "#E34F26" },
      ],
    },
    {
      category: "Backend",
      icon: "⚙️",
      skills: [
        { name: "Node.js / Express", level: 88, color: "#339933" },
        { name: "Java / Spring Boot", level: 80, color: "#F89820" },
        { name: "REST API Design", level: 90, color: "#8B5CF6" },
        { name: "Python", level: 82, color: "#3776AB" },
      ],
    },
    {
      category: "Automation",
      icon: "🤖",
      skills: [
        { name: "Python Automation", level: 88, color: "#3776AB" },
        { name: "Playwright", level: 85, color: "#2EAD33" },
        { name: "Data Pipelines", level: 82, color: "#A78BFA" },
        { name: "Workflow Automation", level: 84, color: "#F59E0B" },
      ],
    },
    {
      category: "Databases & Cloud",
      icon: "🗄️",
      skills: [
        { name: "MongoDB", level: 87, color: "#47A248" },
        { name: "MySQL / SQL", level: 80, color: "#336791" },
        { name: "Vercel / Render", level: 85, color: "#06B6D4" },
        { name: "Firebase", level: 72, color: "#FFCA28" },
      ],
    },
  ],
};

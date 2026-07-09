export const projectData = [
  // REAL PROJECTS
  {
    domain: "Full Stack",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    title: "GymOS | Multi-Tenant Gym Management SaaS",
    shortDesc: "Production-ready SaaS platform for managing memberships, billing, attendance, CRM, and multi-branch gym operations.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Razorpay", "TailwindCSS", "Docker"],
    link: "https://www.gym360.vercel.app",
    github: "https://github.com/heyapoorv/your_gym_buddy",
    details: {
      overview: "GymOS is a full-stack multi-tenant gym management platform built for commercial gym operations. The system enables gym owners to manage members, subscriptions, trainers, attendance, payments, and business analytics through a secure role-based architecture. It was designed to support multiple gyms and branches while maintaining complete tenant isolation and scalable backend APIs.",
      features: [
        "Multi-tenant architecture with branch-level data isolation",
        "Role-based access control for Super Admin, Gym Owner, Branch Manager, Receptionist, and Trainer",
        "Membership, attendance, CRM, billing, and notification modules",
        "Razorpay payment integration with invoice generation",
        "Subscription lifecycle management with feature-based access control",
        "Analytics dashboards for revenue, memberships, attendance, and business performance"
      ],
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Razorpay", "TailwindCSS", "Docker"],
      architecture: "React frontend communicates with Express REST APIs.\nJWT authentication validates users and tenant access.\nMongoDB stores tenant-specific business data.\nRazorpay handles payment processing and subscription events.\nAnalytics services aggregate attendance and revenue metrics.",
      challenges: "Implementing secure tenant isolation across multiple gyms.\nManaging role-based permissions across organizational hierarchies.\nHandling subscription upgrades, renewals, and access control.\nDesigning dashboards that remain responsive with growing data.",
      learned: "Building GymOS taught me how to design production-grade SaaS architecture, manage authentication and authorization, structure scalable REST APIs, and implement business workflows such as subscriptions, billing, and analytics."
    }
  },
  {
    domain: "AI / Machine Learning",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    title: "DocIntel AI | Enterprise Document Intelligence Platform",
    shortDesc: "Enterprise AI platform for document understanding, semantic search, and multi-document reasoning using Retrieval-Augmented Generation (RAG).",
    tags: ["React.js", "FastAPI", "MongoDB", "Redis", "Pinecone", "Google Gemini", "Docker"],
    link: "",
    github: "",
    details: {
      overview: "DocIntel AI enables users to upload and analyze large collections of business documents through a secure workspace model. The platform combines semantic embeddings, hybrid retrieval, and conversational AI to deliver grounded answers with citations, follow-up conversations, and multi-document reasoning capabilities.",
      features: [
        "Secure multi-user workspaces with JWT authentication and RBAC",
        "Retrieval-Augmented Generation (RAG) pipeline for document Q&A",
        "Hybrid retrieval combining semantic search and keyword search",
        "Multi-document reasoning and conversational follow-ups",
        "Page-level citations and evidence-grounded responses",
        "Asynchronous document ingestion and scalable background processing"
      ],
      techStack: ["React.js", "FastAPI", "MongoDB", "Redis", "Pinecone", "Google Gemini", "Docker"],
      architecture: "Documents are uploaded and processed asynchronously.\nText is chunked and converted into semantic embeddings.\nPinecone stores vectors for fast retrieval.\nHybrid retrieval selects the most relevant evidence.\nGemini generates grounded answers with citations and follow-up support.",
      challenges: "Handling large document collections efficiently.\nImproving retrieval quality with hybrid search.\nReducing hallucinations through evidence grounding.\nSupporting conversational context across multiple documents.",
      learned: "DocIntel AI gave me hands-on experience with RAG architecture, vector databases, retrieval optimization, asynchronous processing, and building scalable AI systems for enterprise document workflows."
    }
  },
  {
    domain: "AI / Machine Learning",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
    title: "TalentAI | AI Recruitment Platform",
    shortDesc: "AI-powered recruitment platform that performs resume parsing, semantic candidate matching, and recruiter workflow automation.",
    tags: ["React.js", "FastAPI", "MongoDB", "ChromaDB", "Google Gemini", "Docker"],
    link: "",
    github: "https://github.com/heyapoorv/TalentAI",
    details: {
      overview: "TalentAI replaces traditional keyword-based applicant tracking with semantic AI matching. The platform helps recruiters identify relevant candidates, generate interview scorecards, and manage hiring workflows while providing candidates with AI-assisted resume insights and job recommendations.",
      features: [
        "AI-based resume parsing for PDF and DOCX files",
        "Semantic candidate-job matching using vector embeddings",
        "AI-assisted candidate ranking with explanation summaries",
        "Interview scorecard generation and recruiter recommendations",
        "JWT-based authentication and role management",
        "Dockerized deployment for scalable backend services"
      ],
      techStack: ["React.js", "FastAPI", "MongoDB", "ChromaDB", "Google Gemini", "Docker"],
      architecture: "Resumes are uploaded and parsed into structured candidate profiles.\nEmbeddings are generated for resumes and job descriptions.\nSemantic similarity identifies the best candidate matches.\nGemini generates explanations, scorecards, and recruiter insights.\nRecruiters interact through a dashboard and AI copilot interface.",
      challenges: "Extracting reliable structured data from varied resume formats.\nReducing dependence on exact keyword matching.\nProviding transparent AI-generated ranking explanations.\nMaintaining low-latency semantic search across candidate data.",
      learned: "TalentAI helped me understand vector search, semantic matching, AI-assisted decision support, and how LLMs can be integrated into real recruitment workflows."
    }
  },

  // RETAINED ORIGINAL PLACEHOLDER PROJECTS
  {
    domain: "AI / Machine Learning",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    title: "Insurance RAG QA System",
    shortDesc: "Retrieval-Augmented Generation system for querying insurance policies.",
    tags: ["LangChain", "LlamaIndex", "OpenAI"],
    link: "#",
    github: "#",
    details: {
      overview: "Agents spend too much time navigating dense insurance policy documents to answer client queries.",
      features: ["Vector Search", "Context-Aware QA", "Source Citation", "Admin Dashboard"],
      techStack: ["LangChain", "LlamaIndex", "Pinecone", "React"],
      architecture: "Document ingestion -> Embedding -> Vector Store -> LLM Generation",
      challenges: "Ensuring zero hallucination when dealing with sensitive insurance payouts.",
      learned: "Learned the intricacies of prompt engineering to force strict citation formats."
    }
  },
  {
    domain: "AI / Machine Learning",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800",
    title: "Movie Recommendation System",
    shortDesc: "Personalized movie recommendations using collaborative filtering.",
    tags: ["Scikit-learn", "Pandas", "Python"],
    link: "",
    github: "https://github.com/heyapoorv/Movie-Rec-Sys",
    details: {
      overview: "Users face choice paralysis when presented with large catalogs of movies.",
      features: ["Collaborative Filtering", "Content-Based Filtering", "Hybrid Recommender", "Cold Start Handling"],
      techStack: ["Python", "Scikit-learn", "Pandas", "Flask"],
      architecture: "User Matrix -> SVD -> Recommendations Engine -> Flask API",
      challenges: "Sparsity of the user-item matrix required dimensionality reduction techniques (SVD).",
      learned: "Deep learning based recommendations using Neural Collaborative Filtering."
    }
  },
  {
    domain: "AI / Machine Learning",
    image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=800",
    title: "Celebrity Image Classification",
    shortDesc: "Computer vision model to accurately identify celebrities.",
    tags: ["TensorFlow", "OpenCV", "CNN"],
    link: "",
    github: "https://github.com/heyapoorv/CelebrityClassification",
    details: {
      overview: "Automated tagging of celebrities in media archives.",
      features: ["Face Detection", "Feature Extraction", "Real-time Inference", "REST Endpoint"],
      techStack: ["TensorFlow", "Keras", "OpenCV", "Python"],
      architecture: "OpenCV Haar Cascades -> CNN Feature Extractor -> Softmax Classifier",
      challenges: "Dealing with varying lighting conditions and facial occlusions.",
      learned: "Expanding the dataset to include less prominent public figures."
    }
  },
  {
    domain: "Full Stack",
    image: "https://images.unsplash.com/photo-1579762715111-a6f1bb95a836?auto=format&fit=crop&q=80&w=800",
    title: "Resin Art E-commerce Website",
    shortDesc: "Custom storefront for selling handcrafted resin art.",
    tags: ["React", "Tailwind", "MongoDB"],
    link: "",
    github: "https://github.com/heyapoorv/ResinArt",
    details: {
      overview: "Artist needed a custom, highly visual platform to sell unique, 1-of-1 pieces without high marketplace fees.",
      features: ["Dynamic Inventory", "Cart Management", "Secure Checkout", "Admin Panel"],
      techStack: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
      architecture: "React SPA -> Express API -> MongoDB",
      challenges: "Handling concurrent checkout requests for single-stock items.",
      learned: "Integrating secure payment gateways and managing transaction states."
    }
  },
  {
    domain: "Full Stack",
    image: "https://images.unsplash.com/photo-1507238692062-5a042e971924?auto=format&fit=crop&q=80&w=800",
    title: "Portfolio Website",
    shortDesc: "Personal developer portfolio with dynamic cinematic themes.",
    tags: ["React", "Tailwind", "GSAP"],
    link: "#",
    github: "#",
    details: {
      overview: "Needed a highly interactive and professional way to showcase skills and projects to recruiters.",
      features: ["Custom Animations", "Project Filtering", "Responsive Design", "Dark Theme"],
      techStack: ["React", "Tailwind CSS", "GSAP", "Framer Motion"],
      architecture: "React Components -> GSAP ScrollTriggers -> Tailwind Styling",
      challenges: "Optimizing canvas-based animations for mobile performance.",
      learned: "Advanced framer-motion concepts and performance profiling."
    }
  }
];

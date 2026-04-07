/**
 * Consolidated professional information for Jean Forero
 */

export interface CVContent {
  personal: {
    name: string;
    title: string;
    subtitle: string;
    location: string;
    about: string;
    image: string;
  };
  technicalExperience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
    achievements: string[];
    stack: string[];
  }>;
  adminExperience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
    achievements: string[];
    skills?: string[];
  }>;
  skills: {
    frontend: string[];
    backend: string[];
    cloud: string[];
    admin: string[];
  };
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    focus: string[];
  }>;
}

export const cvData: Record<string, CVContent> = {
  en: {
    personal: {
      name: "Jean Breiner Forero",
      title: "Software Technical Lead",
      subtitle: "Administrative & Architectural Construction Engineer",
      location: "Mexico / Colombia",
      about: "A hybrid leader who bridges the gap between complex engineering (Construction/Admin) and modern software architecture. Decided to pivot to Full Stack development within a year, leveraging strong deductive logic and problem-solving skills to reach Technical Lead status. Expert at translating business/financial needs into scalable technical solutions.",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHW9btMGs2XJQ/profile-displayphoto-scale_200_200/B4EZt_tnepIgAY-/0/1767374226891?e=1776902400&v=beta&t=pC_isA_BqsUala5T0NqJ-dPALyUL74-SmRGAgEEcJ0k",
    },
    technicalExperience: [
      {
        title: "Software Technical Lead",
        company: "Aspis Consulting SAS",
        period: "Aug 2021 - Present",
        description: "Leading technical delivery for complex enterprise solutions.",
        achievements: [
          "API implementation and support for complex customer requirements.",
          "Database schema design and efficient query optimization (MySQL/SQL).",
          "AWS Pipeline management and CI/CD pull request execution.",
          "Technical leadership and stakeholder alignment for weekly project milestones.",
          "Code optimization and Java repository maintenance."
        ],
        stack: ["Java", "NestJS", "React", "AWS", "MySQL"]
      },
      {
        title: "Senior Java Developer / Web Service Specialist",
        company: "Allianz Colombia",
        period: "Past Role",
        description: "Focused on web services, Quality Assurance (QA), and Internet of Things (IoT) integrations.",
        achievements: [
          "Developed robust JVM-based backend services for the insurance sector.",
          "Implemented IoT integrations for real-time monitoring.",
          "Optimized web services for high performance and scalability."
        ],
        stack: ["Java", "IoT", "Web Services", "QA"]
      }
    ],
    adminExperience: [
      {
        title: "Project & Budget Coordinator",
        company: "SOMAPCO SAS / Nodos Gerencia / Construcorp",
        period: "2012 - 2022",
        description: "9+ years in Construction & Management.",
        achievements: [
          "Budget & Cost Control using SINCO ERP.",
          "Financial Feasibility & Credit Management for large-scale projects.",
          "Contract Negotiation & Stakeholder Management.",
          "Critical Path Planning using professional methodologies."
        ],
        skills: ["Budgeting", "ERP", "Financial Planning", "Negotiation"]
      },
      {
        title: "Options Trader & Financial Strategist",
        company: "Independent / Interactive Brokers",
        period: "Continuous",
        description: "Income generation and risk hedging via financial derivatives.",
        achievements: [
          "Implementation of 'The Wheel' strategy for consistent income.",
          "Risk management and portfolio hedging.",
          "Technical analysis and financial modeling."
        ]
      }
    ],
    skills: {
      frontend: ["React", "Angular", "Next.js", "Flutter", "TypeScript", "Vanilla CSS"],
      backend: ["Java (JVM)", "NestJS", ".NET", "Python", "Node.js", "C++"],
      cloud: ["AWS", "Red Hat OpenShift", "GitHub Actions", "CI/CD"],
      admin: ["Budgeting", "Cost Control", "Resource Planning", "Project Management", "Financial Strategy"]
    },
    education: [
      {
        degree: "Master in Software Development Methodologies",
        institution: "Universidad Industrial de Santander (UIS)",
        year: "2022",
        focus: ["Scrum", "Kanban", "Agile", "Architecture", "QA", "UX/UI"]
      },
      {
        degree: "BS in Administration and Architectural Construction",
        institution: "Universidad Industrial de Santander (UIS)",
        year: "Completed",
        focus: ["Construction Management", "Budgets", "Structural Basics", "Admin"]
      },
      {
        degree: "MBA & Master in Finance",
        institution: "Postgraduate Level",
        year: "Completed",
        focus: ["Business Strategy", "Financial Modeling", "Corporate Finance"]
      }
    ]
  },
  es: {
    personal: {
      name: "Jean Breiner Forero",
      title: "Líder Técnico de Software",
      subtitle: "Ingeniero Administrador y Constructor Arquitectónico",
      location: "México / Colombia",
      about: "Un líder híbrido que tiende puentes entre la ingeniería compleja (Construcción/Admin) y la arquitectura de software moderna. Decidió pivotar al desarrollo Full Stack en un año, aprovechando una fuerte lógica deductiva y habilidades de resolución de problemas para alcanzar el estatus de Technical Lead. Experto en traducir necesidades comerciales/financieras en soluciones técnicas escalables.",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHW9btMGs2XJQ/profile-displayphoto-scale_200_200/B4EZt_tnepIgAY-/0/1767374226891?e=1776902400&v=beta&t=pC_isA_BqsUala5T0NqJ-dPALyUL74-SmRGAgEEcJ0k",
    },
    technicalExperience: [
      {
        title: "Líder Técnico de Software",
        company: "Aspis Consulting SAS",
        period: "Ago 2021 - Presente",
        description: "Liderando la entrega técnica de soluciones empresariales complejas.",
        achievements: [
          "Implementación de API y soporte para requerimientos complejos de clientes.",
          "Diseño de esquemas de bases de datos y optimización eficiente de consultas (MySQL/SQL).",
          "Gestión de pipelines de AWS y ejecución de pull requests CI/CD.",
          "Liderazgo técnico y alineación de stakeholders para hitos semanales del proyecto.",
          "Optimización de código y mantenimiento de repositorios Java."
        ],
        stack: ["Java", "NestJS", "React", "AWS", "MySQL"]
      },
      {
        title: "Desarrollador Java Senior / Especialista en Servicios Web",
        company: "Allianz Colombia",
        period: "Rol Anterior",
        description: "Enfocado en servicios web, Control de Calidad (QA) e integraciones de Internet de las Cosas (IoT).",
        achievements: [
          "Desarrollo de servicios backend robustos basados en JVM para el sector de seguros.",
          "Implementación de integraciones IoT para monitoreo en tiempo real.",
          "Optimización de servicios web para alto rendimiento y escalabilidad."
        ],
        stack: ["Java", "IoT", "Web Services", "QA"]
      }
    ],
    adminExperience: [
      {
        title: "Coordinador de Proyectos y Presupuestos",
        company: "SOMAPCO SAS / Nodos Gerencia / Construcorp",
        period: "2012 - 2022",
        description: "Más de 9 años en Construcción y Gestión.",
        achievements: [
          "Control de presupuestos y costos utilizando SINCO ERP.",
          "Factibilidad financiera y gestión de crédito para proyectos a gran escala.",
          "Negociación de contratos y gestión de stakeholders.",
          "Planificación de ruta crítica utilizando metodologías profesionales."
        ],
        skills: ["Presupuestos", "ERP", "Planificación Financiera", "Negociación"]
      },
      {
        title: "Trader de Opciones y Estratega Financiero",
        company: "Independiente / Interactive Brokers",
        period: "Continuo",
        description: "Generación de ingresos y cobertura de riesgos mediante derivados financieros.",
        achievements: [
          "Implementación de la estrategia 'The Wheel' para ingresos constantes.",
          "Gestión de riesgos y cobertura de portafolio.",
          "Análisis técnico y modelado financiero."
        ]
      }
    ],
    skills: {
      frontend: ["React", "Angular", "Next.js", "Flutter", "TypeScript", "Vanilla CSS"],
      backend: ["Java (JVM)", "NestJS", ".NET", "Python", "Node.js", "C++"],
      cloud: ["AWS", "Red Hat OpenShift", "GitHub Actions", "CI/CD"],
      admin: ["Presupuestos", "Control de Costos", "Planificación de Recursos", "Gestión de Proyectos", "Estrategia Financiera"]
    },
    education: [
      {
        degree: "Maestría en Metodologías de Desarrollo de Software",
        institution: "Universidad Industrial de Santander (UIS)",
        year: "2022",
        focus: ["Scrum", "Kanban", "Agile", "Arquitectura", "QA", "UX/UI"]
      },
      {
        degree: "Profesional en Administración y Construcción Arquitectónica",
        institution: "Universidad Industrial de Santander (UIS)",
        year: "Completado",
        focus: ["Gestión de Construcción", "Presupuestos", "Básicos Estructurales", "Administración"]
      },
      {
        degree: "MBA y Maestría en Finanzas",
        institution: "Nivel Postgrado",
        year: "Completado",
        focus: ["Estrategia de Negocios", "Modelado Financiero", "Finanzas Corporativas"]
      }
    ]
  }
};


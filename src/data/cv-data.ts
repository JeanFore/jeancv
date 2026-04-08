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
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
    achievements: string[];
    stack?: string[];
    type: 'tech' | 'admin' | 'mixed';
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
  contact: {
    address: string;
    email: string;
    phones: Array<{ label: string; number: string; countryCode: string }>;
    social: {
      linkedin: string;
      github: string;
    }
  };
}

export const cvData: Record<string, CVContent> = {
  en: {
    personal: {
      name: "Jean Breiner Forero",
      title: "Software Technical Lead",
      subtitle: "Administrative & Architectural Construction Engineer / Full Stack Developer",
      location: "Mexico / Colombia",
      about: "A hybrid leader who bridges the gap between complex engineering (Construction/Admin) and modern software architecture. Decided to pivot to Full Stack development within a year, leveraging strong deductive logic and problem-solving skills to reach Technical Lead status. Expert at translating business/financial needs into scalable technical solutions.",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHW9btMGs2XJQ/profile-displayphoto-scale_200_200/B4EZt_tnepIgAY-/0/1767374226891?e=1776902400&v=beta&t=pC_isA_BqsUala5T0NqJ-dPALyUL74-SmRGAgEEcJ0k",
    },
    experience: [
      {
        title: "Options Trader",
        company: "Independent Professional",
        period: "Oct 2022 - Present",
        description: "Active management of personal portfolio specialized in financial derivatives (options on stocks and ETFs) through Interactive Brokers (TWS).",
        achievements: [
          "Implementation of income generation and risk hedging strategies."
        ],
        type: "admin",
        stack: ["Options Trading", "Risk Management", "Financial Markets"]
      },
      {
        title: "Technical Lead",
        company: "Aspis Consulting SAS",
        period: "Aug 2021 - Present",
        description: "Leading technical delivery for complex enterprise solutions.",
        achievements: [
          "API implementation in collaboration with internal team to handle customer requirements.",
          "Providing quality performance when creating database schemas and writing efficient retrieval queries.",
          "AWS Pipeline management and CI/CD pull request execution.",
          "Code optimization and Java repository maintenance."
        ],
        type: "tech",
        stack: ["Java", "NestJS", "React", "AWS", "MySQL", "GitHub"]
      },
      {
        title: "Budget Coordinator",
        company: "Nodos Gerencia y Construcción",
        period: "Jan 2022 - Aug 2022",
        description: "Coordinated budgeting and financial control for large-scale construction scopes.",
        achievements: [
          "Ensured financial viability for assigned projects.",
          "Streamlined budget tracking workflows."
        ],
        type: "admin",
        stack: ["Budgeting", "Cost Control"]
      },
      {
        title: "Budgeting, Planning and Control Engineer",
        company: "La Mansión Inversiones y Construcciones",
        period: "Jun 2019 - Jan 2022",
        description: "Led budgeting processes and critical path planning.",
        achievements: [
          "Executed precise cost control mechanisms.",
          "Analyzed variations in resource allocation."
        ],
        type: "admin",
        stack: ["Planning", "Financial Control"]
      },
      {
        title: "Construction Project Coordinator",
        company: "Construcorp Constructores Asociados",
        period: "Jul 2013 - Oct 2018",
        description: "Coordinated project logistics, technical teams, and budget implementations.",
        achievements: [
          "Implement ERP and diagnostic tests developed in SQL test routines and XML validation.",
          "Use of C++ and VBA languages to configure the platform and develop macros."
        ],
        type: "mixed",
        stack: ["SQL", "C++", "VBA", "ERP Management"]
      },
      {
        title: "Web Designer",
        company: "PSAH SAS",
        period: "Apr 2016 - Aug 2016",
        description: "Freelance web design and deployment.",
        achievements: [
          "Edit template in HTML and CSS.",
          "Upload and publish the project with the domain registered by the company."
        ],
        type: "tech",
        stack: ["HTML", "CSS", "Adobe Photoshop"]
      },
      {
        title: "Project Coordinator",
        company: "SOMAPCO SAS",
        period: "Nov 2012 - Jan 2022",
        description: "Manage all administrative processes of the company, integrating accounting, projects, taxes.",
        achievements: [
          "Create the budget and control process, generate reports.",
          "Seek new business models and negotiate with suppliers.",
          "Lead extensive cross-functional projects."
        ],
        type: "admin"
      },
      {
        title: "Administrative Resident",
        company: "genmco ltda",
        period: "Aug 2012 - Jul 2013",
        description: "Performed administrative processes during sulfonation plant construction.",
        achievements: [
          "Developed logistics operations and contract realization.",
          "Program tracking with S-Curve control."
        ],
        type: "admin"
      },
      {
        title: "Budget Coordinator",
        company: "grupo 7",
        period: "Jan 2011 - Jul 2012",
        description: "Carried out budgeting and cost control.",
        achievements: [
          "Verified cuts and material purchases for projects."
        ],
        type: "admin"
      },
      {
        title: "Project Coordinator",
        company: "Ingepreco ltda",
        period: "Oct 2008 - Jan 2011",
        description: "Developed budgets, site control, made purchases, and executed cuts.",
        achievements: [
          "Liquidated multiple projects effectively."
        ],
        type: "admin"
      },
      {
        title: "Editor",
        company: "LEGIS",
        period: "Jan 2008 - Jul 2008",
        description: "Edited 'Construdata' magazine cost tables.",
        achievements: [
          "Coordinated traffic handling of magazine advertising prior to publication."
        ],
        type: "admin"
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
        degree: "Master Software Development Methodologies, Computer Software and Media Applications",
        institution: "Universidad Industrial de Santander",
        year: "Feb 2022 - Dec 2022",
        focus: ["Clean Architecture", "Algorithmic Analysis", "Object-Oriented Programming (OOP)", "Agile & QA"]
      },
      {
        degree: "Master in Finance Specialized in Corporate Finance, Finance, General",
        institution: "EUDE Business School",
        year: "2018 - 2019",
        focus: ["Advanced Financial Modeling", "Risk Hedging", "Corporate Valuation", "Quantitative Analysis"]
      },
      {
        degree: "Master of Business Administration - MBA, Business Administration and Management, General",
        institution: "EUDE Business School",
        year: "2015 - 2016",
        focus: ["Strategic Leadership", "Corporate Operations", "Business Development", "Executive Negotiation"]
      },
      {
        degree: "Autodidactic Engineering & Infrastructure Automation",
        institution: "Continuous Independent Study",
        year: "Current",
        focus: ["Terraform (IaC)", "Clean Code Architecture", "Advanced Unit Testing (TDD)", "Cloud Deployments"]
      },
      {
        degree: "Administrator and Architectural Constructor, Project Management",
        institution: "Universidad Colegio Mayor de Cundinamarca",
        year: "2004 - 2008",
        focus: ["Resource Planning", "Cost Engineering", "Deductive Structural Logic", "Project Management"]
      }
    ],
    contact: {
      address: 'Calle guerrero 395 CP 06900 CDMX',
      email: 'jebrfoal@gmail.com',
      phones: [
        { label: 'Phone (Col)', number: '(+57) 313 255 6327', countryCode: 'CO' },
        { label: 'Phone (Mx)', number: '(+52) 564 743 7768', countryCode: 'MX' }
      ],
      social: {
        linkedin: 'https://www.linkedin.com/in/jeanbforero/',
        github: 'https://github.com/JeanFore'
      }
    }
  },
  es: {
    personal: {
      name: "Jean Breiner Forero",
      title: "Líder Técnico de Software",
      subtitle: "Administrador y Constructor Arquitectónico / Desarrollador Full Stack",
      location: "México / Colombia",
      about: "Un líder híbrido que tiende puentes entre la ingeniería compleja (Construcción/Admin) y la arquitectura de software moderna. Decidió pivotar al desarrollo Full Stack en un año, aprovechando una fuerte lógica deductiva y habilidades de resolución de problemas para alcanzar el estatus de Technical Lead. Experto en traducir necesidades comerciales/financieras en soluciones técnicas escalables.",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQHW9btMGs2XJQ/profile-displayphoto-scale_200_200/B4EZt_tnepIgAY-/0/1767374226891?e=1776902400&v=beta&t=pC_isA_BqsUala5T0NqJ-dPALyUL74-SmRGAgEEcJ0k",
    },
    experience: [
      {
        title: "Operador bursátil de opciones",
        company: "Profesional independiente",
        period: "Oct. 2022 - Actualidad",
        description: "Gestión activa de portafolio propio especializado en derivados financieros (opciones sobre acciones y ETFs) a través de la plataforma Interactive Brokers.",
        achievements: [
          "Aplicación de estrategias de generación de ingresos y cobertura de riesgo."
        ],
        type: "admin",
        stack: ["Opciones financieras", "Gestión de Riesgos", "Mercados Financieros"]
      },
      {
        title: "Technical Lead",
        company: "Aspis Consulting SAS",
        period: "Ago. 2021 - Actualidad",
        description: "Liderando la entrega técnica de soluciones empresariales complejas.",
        achievements: [
          "Implementación de API en colaboración con el equipo de soporte interno para manejar requerimientos del cliente.",
          "Provisión de alto rendimiento en la creación de esquemas de bases de datos y consultas de recuperación eficientes.",
          "Gestión de pipelines de AWS y ejecución de pull requests CI/CD.",
          "Optimización de código y mantenimiento de repositorios Java."
        ],
        type: "tech",
        stack: ["Java", "NestJS", "React", "AWS", "MySQL", "GitHub"]
      },
      {
        title: "Coordinador de presupuestos",
        company: "Nodos Gerencia y Construcción",
        period: "Ene. 2022 - Ago. 2022",
        description: "Coordinación de presupuestos y control financiero para construcciones a gran escala.",
        achievements: [
          "Garantizar la viabilidad financiera para los proyectos asignados.",
          "Optimización de flujos de trabajo de seguimiento de presupuestos."
        ],
        type: "admin",
        stack: ["Presupuestos", "Control de Costos"]
      },
      {
        title: "Ingeniero de Presupuestos, Programación y Control",
        company: "La Mansión Inversiones y Construcciones",
        period: "Jun. 2019 - Ene. 2022",
        description: "Liderazgo en procesos presupuestales y planificación de ruta crítica.",
        achievements: [
          "Ejecución de mecanismos precisos de control de costos.",
          "Análisis de variaciones en la asignación de recursos."
        ],
        type: "admin",
        stack: ["Planificación", "Control Financiero"]
      },
      {
        title: "Construction Project Coordinator",
        company: "Construcorp Constructores Asociados",
        period: "Jul. 2013 - Oct. 2018",
        description: "Coordinación de logística de proyectos, equipos técnicos y ejecución presupuestal.",
        achievements: [
          "Implementación de ERP y pruebas diagnósticas desarrolladas en rutinas SQL y validación XML.",
          "Uso de lenguajes C++ y VBA para configurar la plataforma y desarrollar macros."
        ],
        type: "mixed",
        stack: ["SQL", "C++", "VBA", "Gestión ERP"]
      },
      {
        title: "Web Designer",
        company: "PSAH SAS",
        period: "Abr. 2016 - Ago. 2016",
        description: "Diseño y despliegue web independiente.",
        achievements: [
          "Edición de plantillas en HTML y CSS.",
          "Carga y publicación del proyecto con un dominio corporativo registrado."
        ],
        type: "tech",
        stack: ["HTML", "CSS", "Adobe Photoshop"]
      },
      {
        title: "Coordinador de proyectos",
        company: "SOMAPCO SAS",
        period: "Nov. 2012 - Ene. 2022",
        description: "Gestión de todos los procesos administrativos de la empresa, integración contable, de proyectos y tributos.",
        achievements: [
          "Realización de informes, creación y control de presupuestos.",
          "Búsqueda de nuevos modelos de negocio, negociación con proveedores.",
          "Liderazgo de proyectos extensivos interfuncionales."
        ],
        type: "admin"
      },
      {
        title: "Residente administrativo",
        company: "genmco ltda",
        period: "Ago. 2012 - Jul. 2013",
        description: "Procesos administrativos durante la construcción de la planta de sulfonación.",
        achievements: [
          "Desarrollo logístico en compras y realización de contratos.",
          "Control y programación con curva S."
        ],
        type: "admin"
      },
      {
        title: "Coordinador de presupuestos",
        company: "grupo 7",
        period: "Ene. 2011 - Jul. 2012",
        description: "Elaboración y control analítico de presupuestos.",
        achievements: [
          "Verificación de compras y elaboración de cortes de proyectos."
        ],
        type: "admin"
      },
      {
        title: "Coordinador de proyectos",
        company: "Ingepreco ltda",
        period: "Oct. 2008 - Ene. 2011",
        description: "Desarrollo de presupuestos, visita y control de obra, procesos de compra.",
        achievements: [
          "Cortes y liquidación efectiva de proyectos."
        ],
        type: "admin"
      },
      {
        title: "Editor",
        company: "LEGIS",
        period: "Ene. 2008 - Jul. 2008",
        description: "Edición de costos de la revista Construdata.",
        achievements: [
          "Coordinación del manejo de tráfico publicitario de la revista previo a publicación."
        ],
        type: "admin"
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
        degree: "Master Software Development Methodologies, Computer Software and Media Applications",
        institution: "Universidad Industrial de Santander",
        year: "Feb. 2022 - Dic. 2022",
        focus: ["Arquitectura Limpia", "Análisis Algorítmico", "POO", "Agile y QA"]
      },
      {
        degree: "Master en finanzas especializado en Corporate Finance, Finance, General",
        institution: "EUDE Business School",
        year: "2018 - 2019",
        focus: ["Modelado Financiero Avanzado", "Cobertura de Riesgos", "Valoración Corporativa", "Análisis Cuantitativo"]
      },
      {
        degree: "Master of Business Administration - MBA, Business Administration and Management, General",
        institution: "EUDE Business School",
        year: "2015 - 2016",
        focus: ["Liderazgo Estratégico", "Operaciones Corporativas", "Desarrollo de Negocios", "Negociación Ejecutiva"]
      },
      {
        degree: "Ingeniería Autodidacta y Automatización de Infraestructura",
        institution: "Estudio Independiente Continuo",
        year: "Actual",
        focus: ["Terraform (IaC)", "Arquitectura de Código Limpio", "Pruebas Unitarias (TDD)", "Despliegues Cloud"]
      },
      {
        degree: "Administrador y Constructor Arquitectónico, Project Management",
        institution: "Universidad Colegio Mayor de Cundinamarca",
        year: "2004 - 2008",
        focus: ["Planificación de Recursos", "Ingeniería de Costos", "Lógica Estructural Deductiva", "Gestión de Proyectos"]
      }
    ],
    contact: {
      address: 'Calle guerrero 395 CP 06900 CDMX',
      email: 'jebrfoal@gmail.com',
      phones: [
        { label: 'Cel (Col)', number: '(+57) 313 255 6327', countryCode: 'CO' },
        { label: 'Cel (Mx)', number: '(+52) 564 743 7768', countryCode: 'MX' }
      ],
      social: {
        linkedin: 'https://www.linkedin.com/in/jeanbforero/',
        github: 'https://github.com/JeanFore'
      }
    }
  }
};

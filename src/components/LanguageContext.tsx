import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { cvData, type CVContent } from '../data/cv-data';


type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  data: CVContent;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    navAbout: "About",
    navExperience: "Experience",
    navSkills: "Skills",
    navEducation: "Education",
    navContact: "Contact",
    exploreProfile: "Explore Profile",
    technicalExperience: "Technical Leadership",
    adminExperience: "Administrative & Financial Expertise",
    keyAchievements: "Key Achievements",
    coreSkills: "Core Skills",
    education: "Academic Foundation",
    focusAreas: "Focus Areas",
    professionalNarrative: "Professional Narrative",
    theDeveloper: "Software Architect & Tech Lead",
    theAdministrator: "Financial Strategist & Manager",
    devDescription: "Engineers highly resilient, cloud-native backend systems. Specializes in translating dense business rules into elegant, scalable microservices using Java and NestJS, driving high-performance APIs that power enterprise solutions.",
    adminDescription: "Leverages a decade of executive experience in budget control, risk management, and architectural planning. Fuses advanced deductive logic with strategic financial modeling to guarantee bulletproof project execution.",
    completed: "Completed",
    location: "Location",
    status: "Status",
    statusValue: "Available for strategic technical roles",
    skillsSubtitle: "A hybrid skill set blending modern software engineering with strategic administrative leadership.",
    skillsHint: "Hover over the side buttons to navigate.",
    educationSubtitle: "Academic development and educational milestones",
    aptitudes: "Key Aptitudes",
    contact: "Contact",
    contactSubtitle: "Let's build something exceptional together."
  },
  es: {
    navAbout: "Sobre mí",
    navExperience: "Experiencia",
    navSkills: "Habilidades",
    navEducation: "Educación",
    navContact: "Contacto",
    exploreProfile: "Explorar Perfil",
    technicalExperience: "Liderazgo Técnico",
    adminExperience: "Experiencia Administrativa y Financiera",
    keyAchievements: "Logros Clave",
    coreSkills: "Habilidades Principales",
    education: "Fundación Académica",
    focusAreas: "Áreas de Enfoque",
    professionalNarrative: "Narrativa Profesional",
    theDeveloper: "Arquitecto de Software & Tech Lead",
    theAdministrator: "Estratega Financiero & Gestor",
    devDescription: "Diseña e implementa sistemas backend resilientes y nativos de la nube. Especialista en traducir arquitecturas de negocio complejas en microservicios elegantes y altamente escalables con Java y NestJS, garantizando rendimiento a nivel empresarial.",
    adminDescription: "Aprovecha más de una década de experiencia ejecutiva en control de presupuestos, gestión de riesgos y planeación de alto nivel. Fusiona un fuerte rigor analítico con modelado financiero avanzado para blindar la rentabilidad técnica de cada proyecto.",
    completed: "Completado",
    location: "Ubicación",
    status: "Estado",
    statusValue: "Disponible para roles técnicos estratégicos",
    skillsSubtitle: "Un conjunto híbrido con bases técnicas modernas y liderazgo estratégico.",
    skillsHint: "Pasa el cursor sobre los botones laterales para navegar.",
    educationSubtitle: "Desarrollo académico e hitos de formación",
    aptitudes: "Aptitudes",
    contact: "Contacto",
    contactSubtitle: "Construyamos algo excepcional juntos."
  }
};



const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    data: cvData[language],
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

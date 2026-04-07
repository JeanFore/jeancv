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
    theDeveloper: "The Developer",
    theAdministrator: "The Administrator",
    devDescription: "Focused on clean architecture and scalable systems. Expert in Java, NestJS, and cloud-native deployments. Transformed complex business logic into efficient APIs and high-performance backend services.",
    adminDescription: "9+ years managing budgets, resources, and architectural projects. Brings a disciplined financial perspective and strategic planning mindset to every software project.",
    completed: "Completed",
    location: "Location",
    status: "Status",
    statusValue: "Available for strategic technical roles"
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
    theDeveloper: "El Desarrollador",
    theAdministrator: "El Administrador",
    devDescription: "Enfocado en arquitectura limpia y sistemas escalables. Experto en Java, NestJS y despliegues nativos de la nube. Transformó lógica de negocios compleja en APIs eficientes y servicios backend de alto rendimiento.",
    adminDescription: "Más de 9 años gestionando presupuestos, recursos y proyectos arquitectónicos. Aporta una perspectiva financiera disciplinada y una mentalidad de planificación estratégica a cada proyecto de software.",
    completed: "Completado",
    location: "Ubicación",
    status: "Estado",
    statusValue: "Disponible para roles técnicos estratégicos"
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

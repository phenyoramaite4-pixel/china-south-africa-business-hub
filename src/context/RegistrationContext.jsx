import { createContext, useContext, useMemo, useState } from "react";

const RegistrationContext = createContext(null);

const DEMO_SUBMISSIONS = [
  {
    id: "demo-guangzhou-logistics",
    status: "pending",
    submittedAt: "Today",
    accountType: "chinese",
    name: "Guangzhou Logistics Solutions",
    businessName: "Guangzhou Logistics Solutions",
    email: "contact@guangzhoulogistics.example",
    phone: "+86 20 5555 0188",
    province: "Guangdong",
    services: [
      "International logistics",
      "Freight forwarding",
      "Warehousing",
    ],
    documents: [
      {
        id: "demo-doc-1",
        name: "Business Registration",
        fileName: "business-registration.pdf",
        type: "application/pdf",
      },
      {
        id: "demo-doc-2",
        name: "Company Profile",
        fileName: "company-profile.pdf",
        type: "application/pdf",
      },
      {
        id: "demo-doc-3",
        name: "Director / Representative ID",
        fileName: "director-id.pdf",
        type: "application/pdf",
      },
    ],
    projects: [
      {
        title: "South Africa Freight Partnership",
        details:
          "Managed cross-border freight coordination between Guangzhou and Johannesburg.",
      },
    ],
    partners: ["Johannesburg Distribution Network"],
    references: [
      {
        name: "David Chen",
        company: "Asia Logistics Group",
        contact: "david.chen@example.com",
      },
    ],
    gallery: [],
  },
  {
    id: "demo-thabo-mokoena",
    status: "pending",
    submittedAt: "Yesterday",
    accountType: "professional",
    name: "Thabo Mokoena",
    businessName: "",
    email: "thabo.mokoena@example.com",
    phone: "+27 71 555 0182",
    province: "Gauteng",
    services: [
      "Business consulting",
      "Project management",
      "Market research",
    ],
    documents: [
      {
        id: "demo-doc-4",
        name: "Identity Document",
        fileName: "identity-document.pdf",
        type: "application/pdf",
      },
      {
        id: "demo-doc-5",
        name: "Professional Profile / CV",
        fileName: "professional-cv.pdf",
        type: "application/pdf",
      },
      {
        id: "demo-doc-6",
        name: "Reference Information",
        fileName: "reference-information.pdf",
        type: "application/pdf",
      },
    ],
    projects: [
      {
        title: "SME Market Expansion Project",
        details:
          "Supported a South African SME with market-entry research and partner identification.",
      },
    ],
    partners: ["Mokoena Business Advisory"],
    references: [
      {
        name: "Lerato Molefe",
        company: "Growth Partners SA",
        contact: "+27 82 555 0144",
      },
    ],
    gallery: [],
  },
  {
    id: "demo-shenzhen-trade",
    status: "pending",
    submittedAt: "2 days ago",
    accountType: "chinese",
    name: "Shenzhen Trade Connect",
    businessName: "Shenzhen Trade Connect",
    email: "hello@shenzhentrade.example",
    phone: "+86 755 555 0136",
    province: "Guangdong",
    services: [
      "Import and export",
      "Supplier sourcing",
      "Trade facilitation",
    ],
    documents: [
      {
        id: "demo-doc-7",
        name: "Business Registration",
        fileName: "business-registration.pdf",
        type: "application/pdf",
      },
      {
        id: "demo-doc-8",
        name: "Company Profile",
        fileName: "company-profile.pdf",
        type: "application/pdf",
      },
      {
        id: "demo-doc-9",
        name: "Director / Representative ID",
        fileName: "representative-id.pdf",
        type: "application/pdf",
      },
    ],
    projects: [
      {
        title: "China–Africa Supplier Network",
        details:
          "Connected African buyers with verified manufacturing and supply partners in China.",
      },
    ],
    partners: ["Pearl River Manufacturing Group"],
    references: [
      {
        name: "Wei Zhang",
        company: "Shenzhen Export Association",
        contact: "wei.zhang@example.com",
      },
    ],
    gallery: [],
  },
];

export function RegistrationProvider({ children }) {
  const [registrations, setRegistrations] = useState(DEMO_SUBMISSIONS);

  const addRegistration = (registration) => {
    const newRegistration = {
      ...registration,
      id: `registration-${Date.now()}`,
      status: "pending",
      submittedAt: "Just now",
    };

    setRegistrations((current) => [
      newRegistration,
      ...current,
    ]);

    return newRegistration;
  };

  const updateRegistrationStatus = (id, status) => {
    setRegistrations((current) =>
      current.map((registration) =>
        registration.id === id
          ? {
              ...registration,
              status,
            }
          : registration
      )
    );
  };

  const getRegistration = (id) => {
    return registrations.find(
      (registration) => registration.id === id
    );
  };

  const value = useMemo(
    () => ({
      registrations,
      addRegistration,
      updateRegistrationStatus,
      getRegistration,
    }),
    [registrations]
  );

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);

  if (!context) {
    throw new Error(
      "useRegistration must be used inside RegistrationProvider"
    );
  }

  return context;
}
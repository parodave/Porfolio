export interface Education {
  school: string;
  location: string;
  degree: string;
  dates: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  dates: string;
  tasks?: string[];
}

export interface EntrepreneurialProject {
  name: string;
  role: string;
  location: string;
  dates: string;
  details: string[];
}

export interface ResumeData {
  summary: string;
  education: Education[];
  languages: string[];
  certifications: string[];
  technicalSkills: {
    development: string[];
    tools: string[];
    ai_web3: string[];
    softSkills: string[];
  };
  experience: ExperienceItem[];
  entrepreneurialProjects: EntrepreneurialProject[];
}

export const resumeData: ResumeData = {
  summary:
    "Web application developer with a strong background in business management, electrotechnical maintenance, and team leadership. Skilled in modern web technologies and AI integration. Fast learner, autonomous, and comfortable working both independently and collaboratively.",
  education: [
    {
      school: "Duke Language School",
      location: "Bangkok, Thailand",
      degree: "English Language Student",
      dates: "May 2025 – Sep 2025"
    },
    {
      school: "Patong Language School",
      location: "Phuket, Thailand",
      degree: "English Language Student",
      dates: "Jun 2024 – Sep 2024"
    },
    {
      school: "Le Wagon",
      location: "Paris, France",
      degree: "Web Development Bootcamp",
      dates: "Jan 2023 – Jul 2023"
    },
    {
      school: "Lycée Parc de Vilgénis",
      location: "Massy, France",
      degree: "BTS – Business and Sales Technician",
      dates: "2014 – 2016"
    },
    {
      school: "Lycée Léonard de Vinci",
      location: "Saint-Michel-sur-Orge, France",
      degree: "High School Diploma – Electrical & Electronic Maintenance",
      dates: "2011 – 2014"
    }
  ],
  languages: ["French (native)", "English (advanced)", "Arabic (Darija – advanced)"],
  certifications: ["Driver’s License"],
  technicalSkills: {
    development: ["HTML", "CSS", "JavaScript", "Ruby on Rails"],
    tools: ["GitHub", "Figma", "Microsoft Office"],
    ai_web3: ["ChatGPT Prompting", "AI Agents", "Web 3"],
    softSkills: [
      "Attention to detail",
      "Multitasking",
      "Autonomy",
      "Teamwork",
      "Motivation",
      "Stress Management",
      "Physical Endurance"
    ]
  },
  experience: [
    {
      title: "Recycling Maintenance Technician",
      company: "Rino Recycling",
      location: "Brisbane, Australia",
      dates: "Oct 2024 – Apr 2025",
      tasks: [
        "Operated and monitored industrial recycling equipment",
        "Performed regular maintenance and troubleshooting",
        "Sorted and processed recyclable materials according to quality standards",
        "Ensured workplace safety and compliance with health regulations",
        "Collaborated with team members and reported technical issues",
        "Assisted with logistics and material flow within the facility",
        "Delivered basic customer service during on-site visits"
      ]
    },
    {
      title: "Library Assistant & Delivery Coordinator",
      company: "Cœur d’Essonne Agglomération",
      location: "France",
      dates: "Sep 2019 – Apr 2024",
      tasks: [
        "Managed library systems and interlibrary book delivery",
        "Supervised delivery staff and vehicle maintenance",
        "Assisted users with book location and classification"
      ]
    },
    {
      title: "Operations Manager",
      company: "TLFH",
      location: "Paris, France",
      dates: "Apr 2021 – Mar 2024",
      tasks: [
        "Oversaw route planning and driver coordination",
        "Handled B2B client relations and negotiation",
        "Ensured delivery quality and legal compliance"
      ]
    },
    {
      title: "Founder",
      company: "Turfu Driving",
      location: "Paris, France",
      dates: "Apr 2020 – Mar 2023",
      tasks: [
        "Launched digital vehicle rental business",
        "Implemented CRM and marketing strategies",
        "Managed fleet logistics and customer service"
      ]
    },
    {
      title: "Co-founder",
      company: "Wash Center",
      location: "Saint-Michel-sur-Orge, France",
      dates: "Jan 2022 – Sep 2023",
      tasks: [
        "Led service development, operations, and marketing",
        "Negotiated with suppliers and optimized profitability"
      ]
    },
    {
      title: "Dishwasher / Waiter",
      company: "Sofitel",
      location: "Ajaccio, Corsica",
      dates: "Apr 2019 – Aug 2019",
      tasks: ["Supported food prep and service in a luxury hotel"]
    },
    {
      title: "Maintenance Technician",
      company: "Aximum",
      location: "Nanterre, France",
      dates: "Mar 2018 – Mar 2019",
      tasks: ["Installed and maintained smart city traffic signals"]
    },
    {
      title: "Environmental Technician",
      company: "Cœur d’Essonne Agglomération",
      location: "France",
      dates: "Mar 2017 – Feb 2018",
      tasks: ["Monitored sanitation networks and water quality"]
    },
    {
      title: "Sales Agent",
      company: "SNCF Réseau",
      location: "Brétigny-sur-Orge, France",
      dates: "Oct 2016 – Feb 2017",
      tasks: ["Managed ticket sales and customer support"]
    },
    {
      title: "Sales Representative",
      company: "Frankel",
      location: "Morangis, France",
      dates: "Jun 2016 – Sep 2016",
      tasks: ["B2B sales, technical quoting, and client prospecting"]
    },
    {
      title: "Electrical Maintenance Intern",
      company: "Eiffage",
      location: "Saint-Michel-sur-Orge",
      dates: "Oct 2013 – Dec 2013"
    },
    {
      title: "Electrical Maintenance Intern",
      company: "EDF",
      location: "Les Ulis",
      dates: "Oct 2012 – Dec 2012"
    },
    {
      title: "Multi-skilled Agent / Delivery Driver",
      company: "Various municipalities & companies",
      location: "France",
      dates: "Various periods",
      tasks: ["Parcel delivery, logistics, technical support for municipalities"]
    }
  ],
  entrepreneurialProjects: [
    {
      name: "KR Global Solutions LTD",
      role: "Founder & Director",
      location: "Global",
      dates: "Jun 2025 – Present",
      details: [
        "SaaS platform development, AI integration, digital strategy",
        "Hosting, automation, e-commerce, and product launches"
      ]
    },
    {
      name: "FelizBella",
      role: "Co-founder",
      location: "Paris, France",
      dates: "2025",
      details: ["Cosmetics brand, e-commerce, Meta Ads, SEO, logistics"]
    },
    {
      name: "KHH Global Projects",
      role: "Co-founder",
      location: "Morocco",
      dates: "2023",
      details: ["Automated short-term Airbnb rentals, profitability optimization"]
    },
    {
      name: "Domaine Harrach",
      role: "Co-founder",
      location: "Meknès, Morocco",
      dates: "2019",
      details: ["3-hectare organic fruit farm, crop planning, sustainable agriculture"]
    },
    {
      name: "0'240 – Fast-Food Business",
      role: "Founder",
      location: "Saint-Michel-sur-Orge",
      dates: "2020 – 2022",
      details: ["Launched and managed fast-food business, hiring, budgeting, operations"]
    }
  ]
};

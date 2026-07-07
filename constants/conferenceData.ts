export const conferenceDates = [
  { label: 'Call for Papers Opens', date: '15 July 2026' },
  { label: 'Full Paper Submission Deadline', date: '31 October 2026' },
  { label: 'Notification of Acceptance', date: '30 November 2026' },
  { label: 'Camera Ready Submission', date: '15 January 2027' },
  { label: 'Conference Dates', date: '5–6 March 2027' },
];

export const keyFeatures = [
  { title: 'Distinguished International Keynote Speakers', icon: 'Globe' },
  { title: 'Industry Panels & Expert Roundtables', icon: 'Users' },
  { title: 'Research Paper Presentations', icon: 'FileText' },
  { title: 'Startup and Innovation Showcase', icon: 'Lightbulb' },
  { title: 'Networking & Collaboration Opportunities', icon: 'Network' },
  { title: 'Best Paper Awards', icon: 'Award' },
];

export const conferenceTracks = [
  {
    id: 'track-1',
    title: 'Sustainable AI, Intelligent Systems and Responsible Digital Transformation',
    topics: [
      'Green and energy-efficient AI',
      'Sustainable computing infrastructures and smart digital ecosystems',
      'Ethical, explainable, secure, and trustworthy AI',
      'AI for climate resilience and environmental sustainability',
      'Responsible innovation and digital transformation strategies',
    ]
  },
  {
    id: 'track-2',
    title: 'Data Science, Generative AI and Knowledge Engineering',
    topics: [
      'Data science and big data analytics',
      'Generative AI and foundation models',
      'Knowledge engineering and cognitive computing',
      'Predictive modelling, forecasting, and decision intelligence',
      'Intelligent information retrieval and recommendation systems',
      'AI-driven business intelligence and analytics',
    ]
  },
  {
    id: 'track-3',
    title: 'High Performance Computing, Intelligent Networks and Emerging Technologies',
    topics: [
      'High-performance computing and supercomputing',
      'Parallel, distributed, cloud, and edge computing',
      'Quantum computing and next-generation AI architectures',
      'Internet of Things, AIoT, and smart connected systems',
      'Blockchain, decentralized intelligence, and secure computing',
      'Intelligent communication and future network technologies',
    ]
  },
  {
    id: 'track-4',
    title: 'Smart Healthcare, Bioinformatics and Human-Centric AI',
    topics: [
      'AI-enabled healthcare and diagnostics',
      'Precision medicine and bioinformatics',
      'Wearable and connected health technologies',
      'Predictive healthcare analytics',
      'Human-centred AI for well-being and quality of life',
      'AI applications in biomedical engineering and healthcare systems',
    ]
  },
  {
    id: 'track-5',
    title: 'AI in Education, K–12 Learning and Future Workforce Development',
    topics: [
      'AI-driven personalized learning',
      'Intelligent tutoring and assessment systems',
      'AI applications in K–12 and higher education',
      'Educational data mining and academic intelligence systems',
      'Immersive learning environments, XR, and metaverse in education',
      'Future skills, digital pedagogy, and immersive learning environments',
    ]
  },
  {
    id: 'track-6',
    title: 'Smart Society, Governance and Sustainable Innovation',
    topics: [
      'Smart cities and intelligent infrastructure',
      'AI for agriculture, rural development, and public services',
      'E-governance and digital policy frameworks',
      'Disaster prediction, resilience, and sustainability systems',
      'Social innovation and technology for inclusive growth',
    ]
  },
  {
    id: 'track-7',
    title: 'VLSI, Semiconductor Technologies, Embedded Systems and Intelligent Engineering',
    topics: [
      'VLSI design and verification',
      'System-on-Chip and FPGA-based system design',
      'Semiconductor devices, nanoelectronics, and chip technologies',
      'Embedded systems and real-time applications',
      'Hardware acceleration and low-power IC design',
      'Intelligent automation and Industry 5.0',
      'Robotics, autonomous systems, and cyber-physical systems',
      'Control systems, optimization, and signal processing applications',
    ]
  }
];

export const submissionSteps = [
  {
    step: 1,
    title: 'Paper / Article Mail',
    description: 'Submit your article via email to the designated conference email ID. Ensure your document meets the submission guidelines before sending.',
  },
  {
    step: 2,
    title: 'Acceptance & Acknowledgement',
    description: 'Once your paper is reviewed, you will receive an acceptance email from the NEXUS Team. Upon acceptance, you will be assigned a unique ID regarding your paper.',
  },
  {
    step: 3,
    title: 'Registration Form & Payment Link',
    description: 'In the acceptance email, the registration form and payment link will be provided. Authors must complete the registration form and payment process.',
  },
  {
    step: 4,
    title: 'Final Acknowledgement',
    description: 'After submitting the form and completing the payment, you will receive a final acknowledgement confirming your successful conference registration.',
  }
];

export const committeeMembers = {
  chiefPatron: { role: 'Chief Patron', name: 'Chancellor' },
  chiefCoPatron: { role: 'Chief Co-Patron', name: 'Pro Chancellor' },
  patron: { role: 'Patron', name: 'Prof. Vijay Shekhar Chellaboina', title: 'VC, JKLU' },
  chairs: [
    { role: 'Conference Chair', name: 'Prof. Tapas Kumar', title: 'Dean IET, JKLU' },
    { role: 'Conference Convener', name: 'Prof. Sonali Vyas', title: 'Head – Centre for Global Learning, JKLU' },
  ],
  programChairs: 'Professors of IET',
};

export const registrationFees = [
  { category: 'UG/PG Student and Research Scholar', national: '₹7500', international: 'USD 110' },
  { category: 'Academicians', national: '₹9500', international: 'USD 250' },
  { category: 'Industry Participant', national: '₹12500', international: 'USD 350' },
  { category: 'Delegates Offline', national: '₹6500', international: 'USD 150' },
  { category: 'Delegates Online', national: '₹3500', international: 'USD 100' },
];

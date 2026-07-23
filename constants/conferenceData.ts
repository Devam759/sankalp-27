export const conferenceDates = [
  { label: 'Call for Papers Opens', date: '1 August 2026' },
  { label: 'Full Paper Submission Deadline', date: '31 October 2026' },
  { label: 'Notification of Acceptance', date: '30 November 2026' },
  { label: 'Camera Ready Submission', date: '15 January 2027' },
  { label: 'Conference Dates', date: '5–6 March 2027' },
];

export const keyFeatures = [
  { title: 'Distinguished International Keynote Speakers', icon: 'Globe' },
  { title: 'Industry Panels & Expert Roundtables', icon: 'Users' },
  { title: 'Research Paper Presentations', icon: 'FileText' },
  { title: 'Startup and Innovation Showcase [ATAL INCUBATION]', icon: 'Lightbulb' },
  { title: 'Networking & Collaboration Opportunities [CGLP]', icon: 'Network' },
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
    title: 'Online Registration & Payment',
    description: 'Complete the online registration form on our portal and pay the registration fee securely via the integrated Cashfree payment gateway.',
  },
  {
    step: 4,
    title: 'Final Acknowledgement',
    description: 'After submitting the form and completing the payment, you will receive a final acknowledgement confirming your successful conference registration.',
  }
];

export const committeeMembers = {
  chiefPatron: { role: 'Chief Patron', name: 'Mr. Bharat Hari Singhania', title: 'Chancellor, JKLU', image: '/Images/committee/chancellor_real.png' },
  chiefCoPatrons: [
    { role: 'Chief Co-Patron', name: 'Dr. Raghupati Singhania', title: 'Pro Chancellor, JKLU', image: '/Images/committee_prochancellor.png' },
    { role: 'Chief Co-Patron', name: 'Mr. Harsh Pati Singhania', title: 'Pro Chancellor, JKLU', image: '/Images/committee/harsh_pati_singhania_real.png' }
  ],
  patron: { role: 'Patron', name: 'Prof. Vijaysekhar Chellaboina', title: 'VC, JKLU', image: '/Images/committee/vc_real.png' },
  chairs: [
    { role: 'Conference Chair', name: 'Prof. Tapas Kumar', title: 'Dean IET, JKLU', image: '/Images/committee/tapas_kumar_real.png' },
    { role: 'Conference Convener', name: 'Prof. Sonali Vyas', title: 'Head – Centre for Global Learning, JKLU', image: '/Images/committee/sonali_vyas_real.png' },
  ],
  programChairs: 'Professors of IET (Prof. Amit / Prof. Devika / Prof. Taruna, and Prof. Umesh)',
};

export const registrationFees = [
  { category: 'UG/PG Student and Research Scholar', national: '₹7500 + 18% GST', international: 'USD 110 + 18% GST' },
  { category: 'Academicians', national: '₹9500 + 18% GST', international: 'USD 250 + 18% GST' },
  { category: 'Industry Participant', national: '₹12500 + 18% GST', international: 'USD 350 + 18% GST' },
  { category: 'Delegates (Offline)', national: '₹6500 + 18% GST', international: 'USD 150 + 18% GST' },
  { category: 'Delegates (Online)', national: '₹3500 + 18% GST', international: 'USD 100 + 18% GST' },
];

export const speakers = {
  plenary: [
    {
      name: 'Prof. Ravi Vatrapu',
      role: 'Professor',
      university: 'Toronto Metropolitan University',
      location: 'Toronto, Canada',
      image: '/Images/speakers/ravi_vatrapu.jpg',
      linkedin: 'https://www.linkedin.com/in/ravi-vatrapu-a86a0b5/'
    }
  ],
  keynote: [
    {
      name: 'Prof. Arun Patil',
      role: 'Director (L&T)',
      university: 'Curtin University',
      location: 'Singapore',
      image: '/Images/speakers/arun_patil.jpg',
      linkedin: 'https://www.linkedin.com/in/professor-dr-arun-patil-83660a/'
    },
    {
      name: 'Prof. Brij Gupta',
      role: 'Director, Centre for AI and Cyber Security',
      university: 'Asia University',
      location: 'Taiwan',
      image: '/Images/footer_image.webp',
      linkedin: 'https://www.linkedin.com/in/bbgupta/'
    },
    {
      name: 'Dr. Naveen Sivadasan',
      role: 'Principal Scientist',
      university: 'TCS Research',
      location: 'IIT Hyderabad',
      image: '/Images/speakers/naveen_sivadasan.jpg',
      linkedin: 'https://www.linkedin.com/in/naveen-sivadasan-b71027b2'
    }
  ]
};

export const advisoryBoard = {
  international: [
    { name: 'Abid Hussain', title: 'Department of Digitalization, Copenhagen Business School, Denmark' },
    { name: 'Babu Turumella', title: 'Sr. Director, NVIDIA, San Francisco' },
    { name: 'Dr. Akshi Kumar', title: 'Director-PG Research, Goldsmiths, University of London, UK' },
    { name: 'Dr. Ridoan Karim', title: 'Director, CLARS– Monash University, Malaysia' },
    { name: 'Mithun Kumar', title: 'Engineering Manager, Google, London, UK' },
    { name: 'Prof. Arun Patil', title: 'Director (L&T), Curtin University, Singapore' },
    { name: 'Prof. Celestine Iwendi', title: 'Professor, University of Greater Manchester, United Kingdom' },
    { name: 'Prof. Fernando Ortiz-Rodríguez', title: 'Professor, Universidad Autónoma de Tamaulipas, México, North America' },
    { name: 'Prof. Priyadarsan Patra', title: 'Director, UMMA Board, University of Massachusetts, US' },
    { name: 'Prof. Ravi Vatrapu', title: 'Toronto Metropolitan University, Ontario, Canada' },
    { name: 'Prof. Valentina Emilia Balas', title: 'Professor, University of Arad, Romania' },
    { name: 'Prof. Vinod Kumar Shukla', title: 'Associate Dean, Amity University Dubai, UAE' },
    { name: 'Prof. Wassim Haddad', title: 'Professor, Georgia Institute of Technology, US' },
    { name: 'Sergey Nersesov', title: 'Associate Professor, Villanova University, Pennsylvania, United States' },
    { name: 'Vassilis Gerogiannis', title: 'Professor, Department of Digital Systems, University of Thessaly, Greece' }
  ],
  national: [
    { name: 'Dr. Brijesh Kohli', title: 'Vice President & Head of Education | Business Growth, Strategic Partnerships, Xebia India – Gurgaon' },
    { name: 'Dr. Easwar Subramanian', title: 'Senior Scientist, TCS Research, Hyderabad' },
    { name: 'Dr. Manav Bhatnagar', title: 'Professor, Department of Electrical Engineering, IIT Delhi' },
    { name: 'Dr. Vinnie Jauhari', title: 'Director, Education Industry, Microsoft Corporation India Pvt. Ltd., Gurgaon' },
    { name: 'Mr. Himanshu Gupta', title: 'Senior Research Scientist, IBM India Research Lab, New Delhi' },
    { name: 'Mr. S. Balamurugan', title: 'Intelligent Research Consultancy, India Services (iRCS), Coimbatore, Tamil Nadu' },
    { name: 'Prof. Deepshikha Bhargava', title: 'Dean, Engineering & Technology, Amity University, Greater Noida' },
    { name: 'Prof. Gadadhar Sahoo', title: 'Department of Computer Science and Engineering, IIT (ISM) Dhanbad, Jharkhand' },
    { name: 'Prof. K. K. Biswas', title: 'Prof. Emeritus, IIT Delhi, India' },
    { name: 'Prof. K. V. Arya', title: 'Department of Computer Science and Engineering, IIITM, Gwalior' },
    { name: 'Prof. Kusum Deep', title: 'Emeritus Professor, Maths. Dept, Indian Institute of Technology, Roorkee' },
    { name: 'Prof. Madhu Muthyam', title: 'Professor & Head, Department of Computer Science and Engineering, IIT Madras' },
    { name: 'Prof. Naveen Sivadasan', title: 'Principal Scientist, TCS Research, Hyderabad' },
    { name: 'Prof. Nishtha Keshwani', title: 'Professor, Central University of Rajasthan, India' },
    { name: 'Prof. Rajesh Kumar', title: 'Professor, Biomedical Engineering, IIT Ropar' },
    { name: 'Prof. Shiv Shanker Singh Patel', title: 'Head of Inter-Disciplinary Decision Sciences & Analytics Lab, IIM Visakhapatnam' },
    { name: 'Prof. Sunil Kumar Khatri', title: 'Pro Vice Chancellor and Dean (Academics), Amity University, Uttar Pradesh' },
    { name: 'Prof. Vikram Goyal', title: 'Department of Computer Science and Engineering, IIIT Delhi' },
    { name: 'Prof. Viraj Kumar', title: 'Visiting Professor, Divecha Centre for Climate Change, IISc, Bengaluru' },
    { name: 'Prof. V.S. Rathore', title: 'Professor-CSE & Dean-International, Apex University, Jaipur' }
  ]
};

export const technicalProgramCommittee = [
  { name: 'Prof. Ankit Garg', institution: 'Indian Institute of Technology Delhi', country: 'India', area: 'Machine Learning' },
  { name: 'Dr. Sarah Mitchell', institution: 'University of Cambridge', country: 'United Kingdom', area: 'Sustainable AI' },
  { name: 'Dr. Hiroshi Tanaka', institution: 'University of Tokyo', country: 'Japan', area: 'Generative AI' },
  { name: 'Prof. Elena Rodriguez', institution: 'Technical University of Madrid', country: 'Spain', area: 'Smart Health' },
  { name: 'Dr. James Chen', institution: 'National University of Singapore', country: 'Singapore', area: 'Data Science' },
  { name: 'Prof. Rajesh Kumar', institution: 'IIT Ropar', country: 'India', area: 'Biomedical Engineering' },
];

export const trackChairs = [
  { track: 'Sustainable AI', chair: 'Dr. Amit Kumar Sinhal', coChair: 'Dr. Sneha Sharma' },
  { track: 'Data Science & Generative AI', chair: 'Prof. Taruna Sunil', coChair: 'Dr. Vikram Singh' },
  { track: 'High Performance Computing', chair: 'Dr. Umesh Gupta', coChair: 'Dr. Anjali Mehta' },
  { track: 'Smart Healthcare', chair: 'Prof. Devika Kataria', coChair: 'Dr. Suresh Reddy' },
  { track: 'AI in Education', chair: 'Dr. Ramesh Chandra', coChair: 'Dr. Kavita Jain' },
  { track: 'Smart Society', chair: 'Prof. Anil Sharma', coChair: 'Dr. Meera Patel' },
  { track: 'VLSI & Intelligent Engineering', chair: 'Dr. Rajesh Verma', coChair: 'Dr. Prakash Iyer' },
];

export const organizingSubCommittees = [
  {
    name: 'Publication Committee',
    members: ['Dr. Ankur Verma (Chair)', 'Dr. Neha Gupta', 'Mr. Ravi Shankar']
  },
  {
    name: 'Registration Committee',
    members: ['Dr. Priti Sharma (Chair)', 'Ms. Ananya Das', 'Mr. Vikas Singh']
  },
  {
    name: 'Sponsorship Committee',
    members: ['Mr. Sanjay Kedia (Chair)', 'Dr. Rakesh Meena', 'Ms. Snehal Patel']
  },
  {
    name: 'Hospitality Committee',
    members: ['Dr. Mamta Bhatia (Chair)', 'Mr. Rajesh Kumar', 'Ms. Jyoti Rao']
  },
  {
    name: 'Web & Design Committee',
    members: ['Mr. Devam (Chair)', 'Mr. Kartik', 'Mr. Yash']
  },
  {
    name: 'Media & Communications Committee',
    members: ['Ms. Shilpa Sharma (Chair)', 'Mr. Vivek Joshi', 'Ms. Aditi Singh']
  }
];



export const PAPER_SUBMISSION_LINK = 'https://cmt3.research.microsoft.com/';

export const conferenceDates = [
  { label: 'Call for Papers Opens', date: '15 August 2026' },
  { label: 'Full Paper Submission Deadline', date: '30 November 2026' },
  { label: 'Notification of Acceptance', date: '20 December 2026' },
  { label: 'Camera Ready Submission', date: '31 January 2027' },
  { label: 'Conference Dates', date: '5-6 March 2027' },
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
    title: 'AI in Education, K-12 Learning and Future Workforce Development',
    topics: [
      'AI-driven personalized learning',
      'Intelligent tutoring and assessment systems',
      'AI applications in K-12 and higher education',
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

export const MEMBER_LINKEDIN_MAP: Record<string, string> = {
  'Dr. Raghupati Singhania': 'https://www.linkedin.com/in/raghavpat-singhania/',
  'Prof. Vijaysekhar Chellaboina': 'https://www.linkedin.com/in/vchellaboina/',
  'Prof. Tapas Kumar': 'https://www.linkedin.com/in/dr-tapas-kumar-37a36b307/',
  'Prof. Sonali Vyas': 'https://www.linkedin.com/in/sonali-vyas-ph-d-49414649/',
  'Prof. Amit Kumar Sinhal': 'https://www.linkedin.com/in/dramitsinhal/',
  'Dr. Amit Kumar Sinhal': 'https://www.linkedin.com/in/dramitsinhal/',
  'Prof. Devika Kataria': 'https://www.linkedin.com/in/devikakataria/',
  'Dr. Devika Kataria': 'https://www.linkedin.com/in/devikakataria/',
  'Prof. S. Taruna': 'https://www.linkedin.com/in/staruna/',
  'Dr. S. Taruna': 'https://www.linkedin.com/in/staruna/',
  'Prof. Umesh Gupta': 'https://www.linkedin.com/in/umesh-gupta-70886895/',
  'Dr. Umesh Gupta': 'https://www.linkedin.com/in/umesh-gupta-70886895/',
};

export const committeeMembers = {
  chiefPatron: { role: 'Chief Patron', name: 'Mr. Bharat Hari Singhania', title: '', image: '/Images/committee/Bharat_Hari_Singhania.webp' },
  chiefCoPatrons: [
    { role: 'Chief Co-Patron', name: 'Dr. Raghupati Singhania', title: '', image: '/Images/committee/Raghupati_Singhania.webp', linkedin: 'https://www.linkedin.com/in/raghavpat-singhania/' },
    { role: 'Chief Co-Patron', name: 'Mr. Harsh Pati Singhania', title: '', image: '/Images/committee/Harsh_Pati_Singhania.webp' }
  ],
  patron: { role: 'Patron', name: 'Prof. Vijaysekhar Chellaboina', title: '', image: '/Images/committee/vc.webp', linkedin: 'https://www.linkedin.com/in/vchellaboina/' },
  chairs: [
    { role: 'Conference Chair', name: 'Prof. Tapas Kumar', title: 'Dean IET, JKLU', image: '/Images/committee/tapas_kumar.webp', linkedin: 'https://www.linkedin.com/in/dr-tapas-kumar-37a36b307/' },
    { role: 'Conference Convener', name: 'Prof. Sonali Vyas', title: 'Head - Centre for Global Learning, JKLU', image: '/Images/committee/sonali_vyas.webp', linkedin: 'https://www.linkedin.com/in/sonali-vyas-ph-d-49414649/' },
  ],
  programChairs: [
    { name: 'Dr. Amit Kumar Sinhal', title: 'Program Chair', alt: 'Dr. Amit Kumar Sinhal - Program Chair SANKALP 2027 JKLU', image: '/Images/committee/amit_sinhal.webp', linkedin: 'https://www.linkedin.com/in/dramitsinhal/' },
    { name: 'Dr. Devika Kataria', title: 'Program Chair', alt: 'Dr. Devika Kataria - Program Chair SANKALP 2027 JKLU', image: '/Images/committee/devika_kataria.webp', linkedin: 'https://www.linkedin.com/in/devikakataria/' },
    { name: 'Dr. S. Taruna', title: 'Program Chair', alt: 'Dr. S. Taruna - Program Chair SANKALP 2027 JKLU', image: '/Images/committee/taruna_sunil.webp', linkedin: 'https://www.linkedin.com/in/staruna/' },
    { name: 'Dr. Umesh Gupta', title: 'Program Chair', alt: 'Dr. Umesh Gupta - Program Chair SANKALP 2027 JKLU', image: '/Images/committee/umesh_gupta.webp', linkedin: 'https://www.linkedin.com/in/umesh-gupta-70886895/' },
  ],
};

export const registrationFees = [
  { category: 'Speaker: Academic', national: '₹9,500.00 + 18% GST', international: 'USD 250 + 18% GST' },
  { category: 'Speaker: Student', national: '₹7,500.00 + 18% GST', international: 'USD 110 + 18% GST' },
  { category: 'Speaker: Industry', national: '₹12,500.00 + 18% GST', international: 'USD 350 + 18% GST' },
  { category: 'Delegate (Offline)', national: '₹6,500.00 + 18% GST', international: 'USD 150 + 18% GST' },
  { category: 'Delegate (Online)', national: '₹3,500.00 + 18% GST', international: 'USD 100 + 18% GST' },
];

export const speakers = {
  plenary: [
    {
      name: 'Prof. Ravi Vatrapu',
      role: 'Professor',
      university: 'Toronto Metropolitan University',
      location: 'Toronto, Canada',
      image: '/Images/speakers/ravi_vatrapu.webp',
      linkedin: 'https://www.linkedin.com/in/ravi-vatrapu-a86a0b5/'
    }
  ],
  keynote: [
    {
      name: 'Prof. Arun Patil',
      role: 'Director (L&T)',
      university: 'Curtin University',
      location: 'Singapore',
      image: '/Images/speakers/arun_patil.webp',
      linkedin: 'https://www.linkedin.com/in/professor-dr-arun-patil-83660a/'
    },
    {
      name: 'Prof. Brij Gupta',
      role: 'Director, Centre for AI and Cyber Security',
      university: 'Asia University',
      location: 'Taiwan',
      image: '/Images/speakers/brij_gupta.webp',
      linkedin: 'https://www.linkedin.com/in/bbgupta/'
    },
    {
      name: 'Prof. Naveen Sivadasan',
      role: 'Principal Scientist',
      university: 'TCS Research',
      location: 'IIT Hyderabad',
      image: '/Images/speakers/naveen_sivadasan.webp',
      linkedin: 'https://www.linkedin.com/in/naveen-sivadasan-b71027b2'
    }
  ]
};

export const advisoryBoard = {
  international: [
    { name: 'Prof. Wassim Haddad', title: 'Professor, Georgia Institute of Technology, US' },
    { name: 'Prof. Ravi Vatrapu', title: 'Toronto Metropolitan University, Ontario, Canada', linkedin: 'https://www.linkedin.com/in/ravi-vatrapu-a86a0b5/' },
    { name: 'Prof. Arun Patil', title: 'Director (L&T), Curtin University, Singapore', linkedin: 'https://www.linkedin.com/in/professor-dr-arun-patil-83660a/' },
    { name: 'Prof. Priyadarsan Patra', title: 'Director, UMMA Board, University of Massachusetts, US', linkedin: 'https://www.linkedin.com/in/darshanpatra/' },
    { name: 'Prof. Abid Hussain', title: 'Department of Digitalization, Copenhagen Business School, Denmark' },
    { name: 'Prof. Vinod Kumar Shukla', title: 'Associate Dean, Amity University Dubai, UAE', linkedin: 'https://www.linkedin.com/in/vinodshukla/' },
    { name: 'Prof. Valentina Emilia Balas', title: 'Professor, University of Arad, Romania', linkedin: 'https://www.linkedin.com/in/vabalas/' },
    { name: 'Prof. Celestine Iwendi', title: 'Professor, University of Greater Manchester, United Kingdom', linkedin: 'https://www.linkedin.com/in/celestine-iwendi/' },
    { name: 'Prof. Fernando Ortiz-Rodríguez', title: 'Professor, Universidad Autónoma de Tamaulipas, México, North America', linkedin: 'https://www.linkedin.com/in/fernando-ortiz-rodriguez/' },
    { name: 'Dr. Akshi Kumar', title: 'Director-PG Research, Goldsmiths, University of London, UK', linkedin: 'https://www.linkedin.com/in/akshi-kumar-4688b37/' },
    { name: 'Mr. Babu Turumella', title: 'Sr. Director, NVIDIA, San Francisco', linkedin: 'https://www.linkedin.com/in/bturumella/' },
    { name: 'Dr. Ridoan Karim', title: 'Director, CLARS – Monash University, Malaysia', linkedin: 'https://www.linkedin.com/in/ridoan-karim-55997999/' },
    { name: 'Mr. Mithun Kumar', title: 'Engineering Manager, Google, London, UK', linkedin: 'https://www.linkedin.com/in/mithun-kumar1308/' },
    { name: 'Prof. Sergey Nersesov', title: 'Associate Professor, Villanova University, Pennsylvania, United States', linkedin: 'https://www.linkedin.com/in/sergey-nersesov-428a7194/' },
    { name: 'Prof. Vassilis Gerogiannis', title: 'Professor, Department of Digital Systems, University of Thessaly, Greece', linkedin: 'https://www.linkedin.com/in/vassilis-gerogiannis-194159156/' }
  ],
  national: [
    { name: 'Prof. Madhu Muthyam', title: 'Professor & Head, Department of Computer Science and Engineering, IIT Madras' },
    { name: 'Prof. Shiv Shanker Singh Patel', title: 'Head of Inter-Disciplinary Decision Sciences & Analytics Lab, IIM Visakhapatnam' },
    { name: 'Prof. Naveen Sivadasan', title: 'Principal Scientist, TCS Research, Hyderabad' },
    { name: 'Dr. Easwar Subramanian', title: 'Senior Scientist, TCS Research, Hyderabad' },
    { name: 'Prof. Viraj Kumar', title: 'Visiting Professor, Divecha Centre for Climate Change, IISc, Bengaluru' },
    { name: 'Prof. K. K. Biswas', title: 'Prof. Emeritus, IIT Delhi, India' },
    { name: 'Prof. Vikram Goyal', title: 'Department of Computer Science and Engineering, IIIT Delhi' },
    { name: 'Prof. Kusum Deep', title: 'Emeritus Professor, Maths. Dept, Indian Institute of Technology, Roorkee' },
    { name: 'Dr. Manav Bhatnagar', title: 'Professor, Department of Electrical Engineering, IIT Delhi' },
    { name: 'Prof. Gadadhar Sahoo', title: 'Department of Computer Science and Engineering, IIT (ISM) Dhanbad, Jharkhand' },
    { name: 'Prof. K. V. Arya', title: 'Department of Computer Science and Engineering, IIITM, Gwalior' },
    { name: 'Mr. S. Balamurugan', title: 'Intelligent Research Consultancy, India Services (iRCS), Coimbatore, Tamil Nadu' },
    { name: 'Prof. Nishtha Keshwani', title: 'Professor, Central University of Rajasthan, India' },
    { name: 'Prof. Sunil Kumar Khatri', title: 'Pro Vice Chancellor and Dean (Academics), Amity University, Uttar Pradesh' },
    { name: 'Prof. Rajesh Kumar', title: 'Professor, Biomedical Engineering, IIT Ropar' },
    { name: 'Prof. Deepshikha Bhargava', title: 'Dean, Engineering & Technology, Amity University, Greater Noida' },
    { name: 'Prof. V.S. Rathore', title: 'Professor-CSE & Dean-International, Apex University, Jaipur' },
    { name: 'Dr. Vinnie Jauhari', title: 'Director, Education Industry, Microsoft Corporation India Pvt. Ltd., Gurgaon' },
    { name: 'Dr. Brijesh Kohli', title: 'Vice President & Head of Education | Business Growth, Strategic Partnerships, Xebia India - Gurgaon' },
    { name: 'Mr. Himanshu Gupta', title: 'Senior Research Scientist, IBM India Research Lab, New Delhi' }
  ]
};

export const technicalProgramCommittee = [
  { name: 'Prof. Ankit Garg', institution: 'Indian Institute of Technology Delhi', country: 'India', area: 'Machine Learning' },
  { name: 'Prof. Sarah Mitchell', institution: 'University of Cambridge', country: 'United Kingdom', area: 'Sustainable AI' },
  { name: 'Prof. Hiroshi Tanaka', institution: 'University of Tokyo', country: 'Japan', area: 'Generative AI' },
  { name: 'Prof. Elena Rodriguez', institution: 'Technical University of Madrid', country: 'Spain', area: 'Smart Health' },
  { name: 'Prof. James Chen', institution: 'National University of Singapore', country: 'Singapore', area: 'Data Science' },
  { name: 'Prof. Rajesh Kumar', institution: 'IIT Ropar', country: 'India', area: 'Biomedical Engineering' },
];

export const trackChairs = [
  { track: 'Sustainable AI', chair: 'Prof. Amit Kumar Sinhal', coChair: 'Prof. Sneha Sharma' },
  { track: 'Data Science & Generative AI', chair: 'Prof. S. Taruna', coChair: 'Prof. Vikram Singh' },
  { track: 'High Performance Computing', chair: 'Prof. Umesh Gupta', coChair: 'Prof. Anjali Mehta' },
  { track: 'Smart Healthcare', chair: 'Prof. Devika Kataria', coChair: 'Prof. Suresh Reddy' },
  { track: 'AI in Education', chair: 'Prof. Ramesh Chandra', coChair: 'Prof. Kavita Jain' },
  { track: 'Smart Society', chair: 'Prof. Anil Sharma', coChair: 'Prof. Meera Patel' },
  { track: 'VLSI & Intelligent Engineering', chair: 'Prof. Rajesh Verma', coChair: 'Prof. Prakash Iyer' },
];

export interface InternalCommitteeMember {
  role: 'Chair' | 'Lead' | 'Member';
  name: string;
  designation: string;
  affiliation: string;
}

export interface InternalCommittee {
  name: string;
  members: InternalCommitteeMember[];
}

export const organizingSubCommittees: InternalCommittee[] = [
  {
    name: 'Finance / Treasurer / Purchase Committee',
    members: [
      { role: 'Chair', name: 'Prof. Umesh Gupta', designation: 'Professor', affiliation: 'Applied Science' },
      { role: 'Lead', name: 'Dr. Hanuman Prasad Agrawal', designation: 'Associate Professor', affiliation: 'Electronics and Communication Engg' },
      { role: 'Member', name: 'Dr. Satveer Singh', designation: 'Assistant Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Member', name: 'Mr. Divanshu Jain', designation: 'Assistant Professor', affiliation: 'Electronics and Communication Engg' },
      { role: 'Member', name: 'Mr. Devendra Bhavsar', designation: 'Assistant Professor', affiliation: 'Computer Science & Engineering' }
    ]
  },
  {
    name: 'Digital Content Creation / Publicity / Sponsorship Committee',
    members: [
      { role: 'Chair', name: 'Prof. Amit Kumar Sinhal', designation: 'Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Lead', name: 'Dr. Akshat Agarwal', designation: 'Associate Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Member', name: 'Dr. Santosh Kumar', designation: 'Assistant Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Member', name: 'Dr. Surbhi Chhabra', designation: 'Assistant Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Member', name: 'Dr. Abhinav Kumar Khorwal', designation: 'Assistant Professor', affiliation: 'Applied Science' },
      { role: 'Member', name: 'Dr. Renu Bhagwat', designation: 'Assistant Professor', affiliation: 'IET' }
    ]
  },
  {
    name: 'Publication Committee',
    members: [
      { role: 'Chair', name: 'Prof. Tapas Kumar', designation: 'Professor', affiliation: 'IET' },
      { role: 'Lead', name: 'Prof. Sonali Vyas', designation: 'Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Member', name: 'Dr. Akshat Agarwal', designation: 'Associate Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Member', name: 'Dr. Rashmi Kushwaha', designation: 'Assistant Professor', affiliation: 'Electronics and Communication Engg' },
      { role: 'Member', name: 'Dr. Sushant Pokhriyal', designation: 'Assistant Professor', affiliation: 'Applied Science' }
    ]
  },
  {
    name: 'Technical Program Committee',
    members: [
      { role: 'Chair', name: 'Prof. Umesh Gupta', designation: 'Professor', affiliation: 'Applied Science' },
      { role: 'Lead', name: 'Mr. Gaurav Raj', designation: 'Assistant Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Member', name: 'Dr. Rabia Kamra', designation: 'Assistant Professor', affiliation: 'Applied Science' },
      { role: 'Member', name: 'Dr. Megha Sahu', designation: 'Assistant Professor', affiliation: 'Electronics and Communication Engg' },
      { role: 'Member', name: 'Dr. Mayank Kumar Kundalwal', designation: 'Assistant Professor', affiliation: 'Computer Science & Engineering' }
    ]
  },
  {
    name: 'Session Management Committee',
    members: [
      { role: 'Chair', name: 'Prof. Amit Kumar Sinhal', designation: 'Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Lead', name: 'Dr. Pranab Roy', designation: 'Associate Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Member', 'name': 'Dr. Ashish Jain', designation: 'Associate Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Member', name: 'Dr. Manushi Gupta', designation: 'Assistant Professor', affiliation: 'Applied Science' },
      { role: 'Member', name: 'Dr. Rajnish Kumar', designation: 'Assistant Professor', affiliation: 'Electronics and Communication Engg' }
    ]
  },
  {
    name: 'Registration Committee',
    members: [
      { role: 'Chair', name: 'Prof. S. Taruna', designation: 'Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Lead', name: 'Dr. Jaya Gupta', designation: 'Associate Professor', affiliation: 'Applied Science' },
      { role: 'Member', name: 'Dr. Gaurav Mani Khanal', designation: 'Assistant Professor', affiliation: 'Electronics and Communication Engg' },
      { role: 'Member', name: 'Dr. Anamika Satrawala', designation: 'Assistant Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Member', name: 'Ms. Supriya Mishra', designation: 'Assistant Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Member', name: 'Dr. Anshu Yadav', designation: 'Assistant Professor', affiliation: 'Applied Science' }
    ]
  },
  {
    name: 'Hospitality / Internal Resource Committee',
    members: [
      { role: 'Chair', name: 'Prof. Devika Kataria', designation: 'Professor', affiliation: 'Electronics and Communication Engg' },
      { role: 'Lead', name: 'Dr. Richa Sharma', designation: 'Associate Professor', affiliation: 'Applied Science' },
      { role: 'Member', name: 'Dr. Shahnawaz Khan', designation: 'Assistant Professor', affiliation: 'Applied Science' },
      { role: 'Member', name: 'Dr. Krishna Chaitanya Solasa', designation: 'Assistant Professor', affiliation: 'Applied Science' }
    ]
  },
  {
    name: 'Stage Management Committee',
    members: [
      { role: 'Chair', name: 'Prof. S. Taruna', designation: 'Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Lead', name: 'Dr. Deepika Prakash', designation: 'Associate Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Member', name: 'Dr. Ankush Soni', designation: 'Assistant Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Member', name: 'Dr. Devisha Tiwari', designation: 'Assistant Professor', affiliation: 'Computer Science & Engineering' },
      { role: 'Member', name: 'Dr. Anant Pratap Singh', designation: 'Assistant Professor', affiliation: 'Applied Science' }
    ]
  }
];



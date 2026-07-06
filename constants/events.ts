export interface ScheduleItem {
  time: string;
  title: string;
  location?: string;
  batches: number[];
  speaker?: string;
}

export interface DaySchedule {
  day: string;
  date: string;
  theme?: string;
  events: ScheduleItem[];
}

export const SCHEDULE_DATA: DaySchedule[] = [
  {
    day: 'Day 01',
    date: 'July 14',
    theme: 'Intelligence & Core Systems',
    events: [
      { time: '09:30 AM - 11:00 AM', title: 'Inaugural & Welcome Ceremony', location: 'Main Seminar Hall', batches: [1] },
      { time: '11:15 AM - 01:00 PM', title: 'Keynote Address: The Future of Ethical AI', speaker: 'Dr. Sarah Jenkins (MIT, USA)', location: 'Main Seminar Hall', batches: [1] },
      { time: '01:00 PM - 02:00 PM', title: 'Lunch & Networking Break', location: 'University Cafeteria', batches: [1] },
      { time: '02:00 PM - 05:30 PM', title: 'Paper Presentations: Track 1 (AI & ML)', location: 'Seminar Hall A', batches: [1] },
      { time: '02:00 PM - 05:30 PM', title: 'Paper Presentations: Track 2 (IoT & Embedded)', location: 'Seminar Hall B', batches: [1] }
    ]
  },
  {
    day: 'Day 02',
    date: 'July 15',
    theme: 'Networks & Communications',
    events: [
      { time: '09:30 AM - 11:00 AM', title: 'Keynote Address: Next-Gen Wireless Sensor Networks', speaker: 'Prof. Rajesh Kumar (IISc)', location: 'Main Seminar Hall', batches: [1] },
      { time: '11:15 AM - 01:00 PM', title: 'Paper Presentations: Track 3 (Cyber Security & Privacy)', location: 'Seminar Hall A', batches: [1] },
      { time: '01:00 PM - 02:00 PM', title: 'Lunch & Networking Break', location: 'University Cafeteria', batches: [1] },
      { time: '02:00 PM - 04:00 PM', title: 'Poster Session & Interactive Demonstrations', location: 'Exhibition Hall', batches: [1] },
      { time: '04:15 PM - 05:30 PM', title: 'Panel Discussion: Security & Ethical Abstractions', location: 'Main Seminar Hall', batches: [1] }
    ]
  },
  {
    day: 'Day 03',
    date: 'July 16',
    theme: 'Security, Privacy & Valedictory',
    events: [
      { time: '09:30 AM - 11:00 AM', title: 'Keynote Address: Post-Quantum Cryptographic Protocols', speaker: 'Dr. Elena Rostova (TUM, Germany)', location: 'Main Seminar Hall', batches: [1] },
      { time: '11:15 AM - 01:00 PM', title: 'Paper Presentations: Track 4 (Software & Cloud Computing)', location: 'Seminar Hall B', batches: [1] },
      { time: '01:00 PM - 02:00 PM', title: 'Lunch & Networking Break', location: 'University Cafeteria', batches: [1] },
      { time: '02:30 PM - 04:30 PM', title: 'Valedictory Ceremony & Best Paper Awards', location: 'Main Seminar Hall', batches: [1] }
    ]
  }
];

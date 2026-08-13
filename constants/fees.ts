export interface RegistrationCategory {
  id: string;
  name: string;
  amount: number; // in INR
  description: string;
}

export const REGISTRATION_CATEGORIES: RegistrationCategory[] = [
  {
    id: 'speaker_academic',
    name: 'Speaker: Academic',
    amount: 9500,
    description: 'For faculty members, academicians, and academic researchers presenting a paper.'
  },
  {
    id: 'speaker_student',
    name: 'Speaker: Student',
    amount: 7500,
    description: 'For undergraduate/postgraduate students and research scholars presenting a paper.'
  },
  {
    id: 'speaker_industry',
    name: 'Speaker: Industry',
    amount: 12500,
    description: 'For corporate professionals and industry practitioners presenting a paper.'
  },
  {
    id: 'delegate_offline',
    name: 'Delegate (Offline)',
    amount: 6500,
    description: 'For offline participants attending conference sessions and events on campus.'
  },
  {
    id: 'delegate_online',
    name: 'Delegate (Online)',
    amount: 3500,
    description: 'For virtual participants attending conference sessions online.'
  }
];

export const getCategoryById = (id: string): RegistrationCategory | undefined => {
  const legacyMap: Record<string, string> = {
    'student_presenter': 'speaker_student',
    'academic_presenter': 'speaker_academic',
    'industry_presenter': 'speaker_industry',
    'attendee': 'delegate_offline',
    'foreign_delegate': 'delegate_online'
  };
  const resolvedId = legacyMap[id] || id;
  return REGISTRATION_CATEGORIES.find(cat => cat.id === resolvedId);
};


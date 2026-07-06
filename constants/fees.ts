export interface RegistrationCategory {
  id: string;
  name: string;
  amount: number; // in INR
  description: string;
}

export const REGISTRATION_CATEGORIES: RegistrationCategory[] = [
  {
    id: 'student_presenter',
    name: 'Student / Research Scholar (Presenter)',
    amount: 1500,
    description: 'For students and full-time research scholars presenting a paper.'
  },
  {
    id: 'academic_presenter',
    name: 'Academician (Presenter)',
    amount: 3000,
    description: 'For faculty members and academicians presenting a paper.'
  },
  {
    id: 'industry_presenter',
    name: 'Industry Professional (Presenter)',
    amount: 5000,
    description: 'For corporate and industry professionals presenting a paper.'
  },
  {
    id: 'attendee',
    name: 'Attendee / Non-Presenter',
    amount: 1000,
    description: 'For individuals attending the conference without presenting a paper.'
  },
  {
    id: 'foreign_delegate',
    name: 'Foreign Delegate',
    amount: 8000, // Equivalent to ~$100 USD
    description: 'For international participants (presenters and attendees).'
  }
];

export const getCategoryById = (id: string): RegistrationCategory | undefined => {
  return REGISTRATION_CATEGORIES.find(cat => cat.id === id);
};

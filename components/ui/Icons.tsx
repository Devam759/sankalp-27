import React from 'react';
import {
  AtIcon as HugeAtom,
  FavouriteIcon as HugeHeart,
  BrainIcon as HugeBrain,
  DatabaseIcon as HugeDatabase,
  CpuIcon as HugeCpu,
  Activity01Icon as HugePulse,
  GraduationScrollIcon as HugeGraduationCap,
  Building01Icon as HugeBuilding,
  ChipIcon as HugeMicrochip,
  Certificate01Icon as HugeBadge,
  PresentationOnlineIcon as HugePresentation,
  ComputerIcon as HugeMonitor,
  UserGroupIcon as HugeUsersGroup,
  RocketIcon as HugeRocket,
  File01Icon as HugePoster,
  RestaurantIcon as HugeUtensils,
  ParkingAreaSquareIcon as HugeParking,
  Hospital01Icon as HugeMedical,
  WheelchairIcon as HugeAccessibility,
  Copy01Icon as HugeCopy,
  Mail01Icon as HugeEnvelope,
  AppleIcon as HugeApple,
} from 'hugeicons-react';

interface IconProps {
  size?: number;
  className?: string;
}

export const AtomIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugeAtom size={size} className={className} />
);

export const HeartIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugeHeart size={size} className={className} />
);

export const BrainIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugeBrain size={size} className={className} />
);

export const DatabaseIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugeDatabase size={size} className={className} />
);

export const CpuIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugeCpu size={size} className={className} />
);

export const PulseIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugePulse size={size} className={className} />
);

export const GraduationCapIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugeGraduationCap size={size} className={className} />
);

export const BuildingIcon = ({ size = 20, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 9L12 3L22 9H2Z" />
    <path d="M5 9v9" />
    <path d="M9.6 9v9" />
    <path d="M14.4 9v9" />
    <path d="M19 9v9" />
    <path d="M2 18h20" />
    <path d="M4 21h16" />
  </svg>
);

export const MicrochipIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugeMicrochip size={size} className={className} />
);

export const BadgeIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugeBadge size={size} className={className} />
);

export const PresentationIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugePresentation size={size} className={className} />
);

export const MonitorIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugeMonitor size={size} className={className} />
);

export const UsersGroupIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugeUsersGroup size={size} className={className} />
);

export const RocketIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugeRocket size={size} className={className} />
);

export const PosterIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugePoster size={size} className={className} />
);

export const UtensilsIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugeUtensils size={size} className={className} />
);

export const ParkingIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugeParking size={size} className={className} />
);

export const MedicalIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugeMedical size={size} className={className} />
);

export const AccessibilityIcon = ({ size = 20, className = '' }: IconProps) => (
  <HugeAccessibility size={size} className={className} />
);

export const CopyIcon = ({ size = 16, className = '' }: IconProps) => (
  <HugeCopy size={size} className={className} />
);

export const EnvelopeIcon = ({ size = 18, className = '' }: IconProps) => (
  <HugeEnvelope size={size} className={className} />
);

export const AppleIcon = ({ size = 16, className = '' }: IconProps) => (
  <HugeApple size={size} className={className} fill="currentColor" color="white" />
);

export const LinkedInIcon = ({ size = 18, className = '' }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const PlaneIcon = ({ size = 20, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.7-.1-1.3.2-1.6.8l-.4.9 5.2 4.1-3.2 3.2-2.4-.7c-.4-.1-.8.1-1 .4l-.4.5 3.3 2.5 2.5 3.3.5-.4c.3-.2.5-.6.4-1l-.7-2.4 3.2-3.2 4.1 5.2.9-.4c.6-.3.9-.9.8-1.6z" />
  </svg>
);

export const BusIcon = ({ size = 20, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8 6v6" />
    <path d="M16 6v6" />
    <path d="M4 12h16" />
    <path d="M4 18v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2" />
    <path d="M17 18v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2" />
    <rect x="4" y="3" width="16" height="15" rx="2" />
    <circle cx="7.5" cy="15.5" r=".5" fill="currentColor" />
    <circle cx="16.5" cy="15.5" r=".5" fill="currentColor" />
  </svg>
);

export const TrainIcon = ({ size = 20, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="3" width="16" height="13" rx="2" />
    <path d="M4 11h16" />
    <path d="M12 3v8" />
    <path d="m8 19-3 3" />
    <path d="m16 19 3 3" />
    <path d="M8 16h8" />
    <circle cx="8" cy="13.5" r=".5" fill="currentColor" />
    <circle cx="16" cy="13.5" r=".5" fill="currentColor" />
  </svg>
);

export const CarIcon = ({ size = 20, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 10L8 5H16L18 10" />
    <rect x="3" y="10" width="18" height="8" rx="2" />
    <circle cx="7" cy="14" r="1" fill="currentColor" />
    <circle cx="17" cy="14" r="1" fill="currentColor" />
    <path d="M10 14h4" />
    <path d="M5 18v2" />
    <path d="M19 18v2" />
  </svg>
);


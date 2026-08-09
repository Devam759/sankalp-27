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
  <HugeBuilding size={size} className={className} />
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


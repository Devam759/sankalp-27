'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import {
  MapPin,
  Calendar,
  Compass,
  ArrowRight,
  Wifi,
  Building,
  Cpu,
  GraduationCap,
  Leaf,
  Layers,
  Map,
  Copy,
  Check,
  Plane,
  Train,
  Car,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CloudSun,
  Thermometer,
  Sun,
  CloudMoon,
  Cloud,
  Droplets,
  Coffee,
  Bookmark,
  Users,
  Award,
  Sparkles,
  Info,
  UserCheck,
  Lightbulb,
  Heart,
  Monitor
} from 'lucide-react';

export default function VenuePage() {
  const [copied, setCopied] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const copyAddress = () => {
    navigator.clipboard.writeText(
      "JK Lakshmipat University, Near Mahindra SEZ, Ajmer Road, Jaipur, Rajasthan 302026, India"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  // Gallery items
  const galleryItems = [
    { title: 'Library', src: '/Images/gallery/library.png' },
    { title: 'Main Academic Building', src: '/Images/gallery/academic_block.png' },
    { title: 'Innovation', src: '/Images/gallery/innovation_centre.png' },
    { title: 'Research Laboratories', src: '/Images/gallery/research_labs.png' },
    { title: 'Main Entrance', src: '/Images/gallery/main_entry.png' },
    { title: 'Campus Greens & Sports', src: '/Images/gallery/green_campus.png' }
  ];

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => prev === null ? null : (prev === 0 ? galleryItems.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => prev === null ? null : (prev === galleryItems.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'Escape') {
        setLightboxIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Facilities items
  const facilities = [
    { name: 'Registration Area', desc: 'Dedicated desk in the main lobby for badges, kits, and queries.', icon: UserCheck, emoji: '🟠' },
    { name: 'Conference Hall', desc: 'Main session venue with state-of-the-art acoustics and screen setup.', icon: Building, emoji: '🧡' },
    { name: 'Technical Session Rooms', desc: 'Multiple parallel tracks equipped with advanced presentation systems.', icon: Cpu, emoji: '🔶' },
    { name: 'Networking Lounge', desc: 'Comfortable break-out zones for research collaborations and dialogue.', icon: Users, emoji: '🦊' },
    { name: 'Startup Exhibition Area', desc: 'Showcase of cutting-edge sustainable AI systems and applications.', icon: Lightbulb, emoji: '💥' },
    { name: 'Poster Presentation Zone', desc: 'Spacious corridor with high visibility for selected poster works.', icon: Monitor, emoji: '🍁' },
    { name: 'Cafeteria', desc: 'Hygienic multi-cuisine options serving fresh beverages and meals.', icon: Coffee, emoji: '🍊' },
    { name: 'Parking', desc: 'Ample on-campus parking spaces for delegates and attendees.', icon: Car, emoji: '🏀' },
    { name: 'Medical Assistance', desc: '24/7 first aid assistance and emergency response team on call.', icon: Heart, emoji: '🥕' },
    { name: 'Accessibility Support', desc: 'Wheelchair access ramps, elevators, and dedicated seating layout.', icon: Info, emoji: '🔸' }
  ];

  // Accommodation items
  const hotels = [
    { 
      name: 'The Oberoi Rajvilas', 
      distance: '38 km from JK Lakshmipat University', 
      time: 'Approx. 55 minutes by road',
      badgeText: '55 min Drive',
      category: 'Luxury Hotel',
      bottomText: 'Preferred by International Guests',
      location: 'Jaipur, Rajasthan',
      src: '/Images/oberoi_rajvilas.jpg', 
      link: 'https://www.oberoihotels.com/' 
    },
    { 
      name: 'ITC Rajputana, Jaipur', 
      distance: '22 km from JK Lakshmipat University', 
      time: 'Approx. 35 minutes by road',
      badgeText: '35 min Drive',
      category: 'Business Hotel',
      bottomText: 'Ideal for Conference Delegates',
      location: 'Jaipur, Rajasthan',
      src: '/Images/itc_rajputana.jpg', 
      link: 'https://www.itchotels.com/' 
    },
    { 
      name: 'Radisson Blu Jaipur', 
      distance: '28 km from JK Lakshmipat University', 
      time: 'Approx. 45 minutes by road',
      badgeText: '45 min Drive',
      category: 'Premium Stay',
      bottomText: 'Business Friendly Accommodation',
      location: 'Jaipur, Rajasthan',
      src: '/Images/radisson_blu.jpg', 
      link: 'https://www.radissonhotels.com/' 
    },
    { 
      name: 'Four Points by Sheraton', 
      distance: '26 km from JK Lakshmipat University', 
      time: 'Approx. 40 minutes by road',
      badgeText: '40 min Drive',
      category: 'Delegate Recommended',
      bottomText: 'Near Conference Venue',
      location: 'Jaipur, Rajasthan',
      src: '/Images/four_points.jpg', 
      link: 'https://www.marriott.com/' 
    }
  ];

  // Attractions
  const attractions = [
    { 
      name: 'Hawa Mahal', 
      distance: '25 km', 
      duration: '1–2 Hours',
      category: 'Royal Palace',
      desc: 'The iconic Palace of Winds featuring intricate honeycomb sandstone lattice windows.', 
      src: 'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=600&q=80',
      mapLink: 'https://maps.google.com/?q=Hawa+Mahal+Jaipur'
    },
    { 
      name: 'Amer Fort', 
      distance: '34 km', 
      duration: '2–3 Hours',
      category: 'UNESCO World Heritage',
      desc: 'A majestic UNESCO World Heritage fortress overlooking Maota Lake with spectacular murals.', 
      src: '/Images/amer_fort.png',
      mapLink: 'https://maps.google.com/?q=Amer+Fort+Jaipur'
    },
    { 
      name: 'Jal Mahal', 
      distance: '30 km', 
      duration: '1 Hour',
      category: 'Historic Monument',
      desc: 'A breathtaking palace resting silently in the center of the serene Man Sagar Lake.', 
      src: '/Images/jal_mahal.png',
      mapLink: 'https://maps.google.com/?q=Jal+Mahal+Jaipur'
    },
    { 
      name: 'City Palace', 
      distance: '24 km', 
      duration: '2–3 Hours',
      category: 'Royal Palace',
      desc: 'The magnificent royal residence blending traditional Rajasthani and Mughal architectural styles.', 
      src: '/Images/city_palace_v2.png',
      mapLink: 'https://maps.google.com/?q=City+Palace+Jaipur'
    },
    { 
      name: 'Albert Hall Museum', 
      distance: '23 km', 
      duration: '1.5–2 Hours',
      category: 'Museum',
      desc: 'The oldest state museum displaying exceptional industrial art and ancient treasures.', 
      src: '/Images/albert_hall.jpg',
      mapLink: 'https://maps.google.com/?q=Albert+Hall+Museum+Jaipur'
    },
    { 
      name: 'Nahargarh Fort', 
      distance: '29 km', 
      duration: '1.5–2 Hours',
      category: 'Hill Fort',
      desc: 'A historic hilltop fort offering absolute panoramic sunset views over the Pink City.', 
      src: '/Images/nahargarh_fort.png',
      mapLink: 'https://maps.google.com/?q=Nahargarh+Fort+Jaipur'
    }
  ];

  // FAQs
  const faqs = [
    { 
      q: 'Where is the conference venue located?', 
      a: "SANKALP'27 is hosted at JK Lakshmipat University (JKLU), near Mahindra SEZ on Ajmer Road, Jaipur, Rajasthan 302026, India. The campus is well-connected and easily accessible via pre-paid airport taxis and ride-sharing services." 
    },
    { 
      q: 'Is parking available on campus?', 
      a: 'Yes, secure and spacious parking zones are available on campus free of charge for all registered delegates, speakers, and attendees throughout the conference.' 
    },
    { 
      q: 'Is campus-wide Wi-Fi available?', 
      a: 'Complimentary high-speed Wi-Fi access will be provided to all registered attendees across all academic halls, seminar rooms, and dining areas on campus.' 
    },
    { 
      q: 'Is the venue wheelchair accessible?', 
      a: 'Yes, the JKLU campus features fully wheelchair-accessible pathways, entry ramps, elevators in all multi-story academic blocks, and dedicated assistance layout.' 
    },
    { 
      q: 'How can I reach the venue from Jaipur Airport?', 
      a: 'Jaipur International Airport (JAI) is approximately 25 km (around 45 minutes) from the venue. Pre-paid airport taxis, Uber, and Ola cabs are readily available at the terminal exit.' 
    },
    { 
      q: 'Will food and refreshments be available during the conference?', 
      a: 'Yes, complimentary catered lunches, coffee/tea, and evening refreshments will be served during designated networking breaks to all registered delegates.' 
    },
    { 
      q: 'Who should I contact for travel-related assistance?', 
      a: "For travel, transit, or accommodation support, please contact our logistics helpdesk at sankalp@jklu.edu.in or visit the assistance counter in the main academic lobby." 
    }
  ];

  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans selection:bg-brand-orange selection:text-white pt-20">
      <Navbar />

      {/* SECTION 1: HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center text-center text-white overflow-hidden bg-brand-ink">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Images/footer_image.webp"
            alt="JKLU Campus Banner"
            fill
            sizes="100vw"
            className="object-cover opacity-45 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-transparent to-brand-ink/30" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block border-2 border-brand-orange text-brand-orange bg-brand-orange/15 px-4 py-1 text-xs sm:text-sm font-bold tracking-widest uppercase rounded-sm"
          >
            Venue
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-serif font-black tracking-tight uppercase"
          >
            JK Lakshmipat University
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl font-medium tracking-wide max-w-2xl mx-auto text-white/90"
          >
            Jaipur, Rajasthan, India
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm sm:text-base opacity-75 max-w-xl mx-auto"
          >
            Host Venue of SANKALP'27 – International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning & Prediction
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-2 text-brand-orange text-sm font-bold"
          >
            <Calendar size={18} />
            <span>5–6 March 2027</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <a
              href="#map-section"
              className="bg-brand-orange text-white font-bold py-3 px-8 border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] hover:bg-orange-600 active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#030404] transition-all rounded-md flex items-center gap-2 cursor-pointer text-sm"
            >
              <MapPin size={16} /> Get Directions
            </a>
            <a
              href="#about-section"
              className="bg-white text-brand-ink font-bold py-3 px-8 border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] hover:bg-slate-100 active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#030404] transition-all rounded-md flex items-center gap-2 cursor-pointer text-sm"
            >
              <Compass size={16} /> Explore Campus
            </a>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: ABOUT THE VENUE */}
      <section id="about-section" className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-amber-50/15 via-brand-cloud to-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative border border-brand-ink/10 shadow-lg rounded-2xl overflow-hidden aspect-[4/3] bg-white group">
            <Image
              src="/Images/footer_image.webp"
              alt="JK Lakshmipat University Campus"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 bg-brand-ink/80 backdrop-blur-md text-white border border-white/10 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide shadow-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              JK Lakshmipat University • Jaipur, Rajasthan • Host Venue
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-brand-orange font-bold uppercase tracking-widest text-xs block">
                ABOUT THE VENUE
              </span>
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight leading-tight">
                  JK Lakshmipat University
                </h2>
                <p className="text-lg sm:text-xl font-medium text-brand-blue tracking-wide">
                  Where Innovation Meets Research
                </p>
              </div>
              <div className="w-16 h-1 bg-brand-orange rounded-full" />
            </div>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base max-w-xl">
              JK Lakshmipat University (JKLU), Jaipur, is a premier institution distinguished by its advanced research ecosystem, vibrant innovation culture, and strong industry engagement. Featuring a sustainable, eco-friendly campus, state-of-the-art research laboratories, and collaborative learning environments, JKLU serves as a dynamic hub for academia and industry, providing an ideal venue for high-impact international conferences.
            </p>

            <div className="space-y-6 pt-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Why JKLU?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {[
                  { num: '01', title: 'Lush Green Campus', desc: 'A serene 30-acre campus offering a vibrant, nature-integrated learning environment.' },
                  { num: '02', title: 'Advanced Research Laboratories', desc: 'State-of-the-art facilities hosting modern instrumentation and active research groups.' },
                  { num: '03', title: 'Innovation', desc: 'A dedicated startup ecosystem fostering entrepreneurship and technological translation.' },
                  { num: '04', title: 'Campus-wide High-Speed Wi-Fi', desc: 'Seamless high-bandwidth connectivity enabling global research and real-time collaboration.' },
                  { num: '05', title: 'Collaborative Learning Spaces', desc: 'Flexible, student-centric classrooms designed for peer learning and creative dialogue.' },
                  { num: '06', title: 'Sustainable Infrastructure', desc: 'Eco-conscious design featuring solar energy systems, water recycling, and zero-waste initiatives.' }
                ].map((item, idx) => (
                  <div key={idx} className="group flex gap-4 items-start border-t border-slate-100/80 pt-4">
                    <div className="font-serif text-3xl sm:text-4xl font-black text-transparent [-webkit-text-stroke:1px_#cbd5e1] group-hover:[-webkit-text-stroke:1px_#f5821e] transition-all duration-300 select-none leading-none shrink-0">
                      {item.num}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm sm:text-base text-brand-ink leading-tight">
                        {item.title}
                      </h4>
                      <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-20 group-hover:opacity-100 transition-all duration-350 ease-in-out">
                        <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs pt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thick Black Line Separator */}
      <div className="border-t-4 border-brand-ink w-full" />

      {/* SECTION 3: CAMPUS GALLERY */}
      <section className="py-24 bg-white border-y border-slate-100 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight">
              Explore the Campus
            </h2>
            <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full mt-2" />
            <p className="text-sm text-slate-500 font-medium leading-relaxed mt-4">
              Explore the spaces that foster innovation, collaboration, and academic excellence at JK Lakshmipat University.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {galleryItems.map((item, index) => {
              // Custom span configuration for Bento/Asymmetric layout
              const bentoClasses = index === 1 // Main Academic Building (2nd item in array)
                ? 'md:col-span-2 md:row-span-2'
                : 'md:col-span-1 md:row-span-1';

              return (
                <div
                  key={index}
                  onClick={() => setLightboxIndex(index)}
                  className={`relative border border-brand-ink/5 shadow-sm rounded-2xl overflow-hidden group cursor-zoom-in bg-brand-cloud ${bentoClasses}`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Permanent soft gradient at bottom for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  {/* Hover dark overlay */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  
                  {/* Location label inside the card */}
                  <div className="absolute bottom-5 left-5 z-20">
                    <p className="text-white font-serif font-bold text-base sm:text-lg tracking-wide">
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: CONFERENCE FACILITIES */}
      <section className="py-28 bg-[#FAFAFB] border-y border-[#E6E8EC]/60 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-2">
            <span className="text-brand-orange font-semibold uppercase tracking-[0.25em] text-[10px] sm:text-xs">ON-CAMPUS EXPERIENCE</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue uppercase tracking-tight">
              Conference Facilities
            </h2>
            <div className="w-8 h-[2px] bg-brand-orange mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {facilities.map((fac, index) => {
              return (
                <div
                  key={index}
                  className="relative bg-[#FCFCFC] border border-[#E6E8EC] rounded-2xl p-7 flex flex-col justify-between group hover:border-brand-orange hover:bg-[#FFFBF9] transition-all duration-300 overflow-hidden"
                >
                  {/* Top orange accent line that animates on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand-orange origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      {(() => {
                        const IconComponent = fac.icon;
                        return (
                          <span className="inline-block text-brand-orange mb-3 transform group-hover:scale-110 origin-left transition-transform duration-300">
                            <IconComponent size={24} />
                          </span>
                        );
                      })()}
                      <h3 className="font-serif font-bold text-base text-[#1F4E8C] leading-snug group-hover:text-brand-orange transition-colors duration-300">
                        {fac.name}
                      </h3>
                      
                      {/* Smooth collapsible description container */}
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-in-out">
                        <div className="overflow-hidden">
                          <div className="w-full h-[1px] bg-[#E6E8EC]/85 my-3" />
                          <p className="text-[13px] text-[#5F6B7A] font-sans leading-relaxed">
                            {fac.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider text-brand-orange mt-6 inline-flex items-center gap-1 cursor-pointer transition-all duration-300 origin-bottom group-hover:h-0 group-hover:mt-0 group-hover:opacity-0 overflow-hidden">
                      Learn More &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: LOCATION */}
      <section id="map-section" className="py-20 bg-white border-t-4 border-brand-ink px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">VENUE LOCATION</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight">
              Find the Venue
            </h2>
            <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-full" />
          </div>

          {/* Map Container */}
          <div className="w-full border border-[#E6E8EC] shadow-md rounded-[18px] overflow-hidden h-96 mb-10 transition-shadow duration-300">
            {/* 
              Note: This default iframe embed can be easily replaced in the future with the 
              Google Maps JavaScript API component. To do so, load the Google Maps API script 
              and instantiate a Map instance pointing to the lat/long coordinates (26.857, 75.699) 
              with a custom colored marker.
            */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1052887370965!2d75.64772927502109!3d26.83660327669258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4af4fe68f403%3A0x3bf05f95df22b8c4!2sJK%20Lakshmipat%20University!5e0!3m2!1sen!2sin!4v1779876968774!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="JK Lakshmipat University Map Location"
              id="jklu-venue-map-iframe"
            />
          </div>

          {/* Editorial Venue Information Card with Address, Actions and QR Code */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 sm:p-10 bg-[#FCFCFC] border border-[#E6E8EC] rounded-[18px] shadow-sm">
            {/* Left Column: Venue Address & Coordinates */}
            <div className="md:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-brand-orange font-bold uppercase tracking-widest text-[10px] sm:text-xs">VENUE ADDRESS</span>
                <h4 className="font-serif font-bold text-xl sm:text-2xl text-brand-blue leading-tight">JK Lakshmipat University</h4>
                <div className="text-sm text-slate-700 leading-relaxed font-sans font-medium space-y-1">
                  <p>Near Mahindra SEZ</p>
                  <p>Ajmer Road</p>
                  <p>Jaipur</p>
                  <p>Rajasthan 302026</p>
                  <p>India</p>
                </div>
              </div>
              
              <div className="space-y-1 pt-4 border-t border-[#E6E8EC]/60">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A99AD] font-sans">Coordinates</span>
                <p className="text-xs text-[#8A99AD] font-medium font-sans">
                  26.857° N, 75.699° E
                </p>
              </div>
            </div>

            {/* Middle Column: Action Buttons */}
            <div className="md:col-span-4 flex flex-col justify-center gap-4 border-t md:border-t-0 md:border-l border-[#E6E8EC]/60 pt-6 md:pt-0 md:pl-8">
              <a
                href="https://www.google.com/maps/search/?api=1&query=JK+Lakshmipat+University+Jaipur"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-brand-orange text-white font-bold py-3 px-6 hover:bg-orange-600 active:translate-y-[1px] transition-all rounded-[10px] flex items-center justify-center gap-2 cursor-pointer text-xs"
              >
                <ExternalLink size={14} /> Get Directions
              </a>
              <button
                onClick={copyAddress}
                className="w-full bg-white text-brand-ink font-bold py-3 px-6 border border-[#E6E8EC] hover:bg-[#FFFBF7] hover:border-brand-orange active:translate-y-[1px] transition-all rounded-[10px] flex items-center justify-center gap-2 cursor-pointer text-xs shadow-sm"
              >
                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                {copied ? 'Address Copied!' : 'Copy Venue Address'}
              </button>
            </div>

            {/* Right Column: QR Code Navigator */}
            <div className="md:col-span-3 flex flex-col items-center justify-center text-center border-t md:border-t-0 md:border-l border-[#E6E8EC]/60 pt-6 md:pt-0 md:pl-8 space-y-3">
              <div className="p-2 bg-white border border-[#E6E8EC] rounded-xl shadow-sm w-24 h-24 flex items-center justify-center">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fwww.google.com%2Fmaps%2Fsearch%2F%3Fapi%3D1%26query%3DJK%2BLakshmipat%2BUniversity%2BJaipur" 
                  alt="Scan to Navigate to JKLU"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold tracking-wider text-brand-orange uppercase">SCAN TO NAVIGATE</span>
                <p className="text-[11px] text-[#8A99AD] leading-normal font-medium max-w-[160px] font-sans">
                  Scan with your mobile device to open the venue location instantly in Google Maps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TRAVEL INFORMATION */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-brand-orange font-bold uppercase tracking-widest text-[10px] sm:text-xs">TRAVEL GUIDE</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue uppercase tracking-tight">
            Getting to the Venue
          </h2>
          <p className="text-[#5F6B7A] text-sm sm:text-base font-sans leading-relaxed">
            Conveniently connected by air, rail, and road, JK Lakshmipat University is easily accessible for both national and international delegates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'By Air',
              icon: Plane,
              distance: '35–40 km',
              time: '45–60 minutes',
              hubLabel: 'Airport',
              hubValue: 'Jaipur International Airport',
              caption: 'Regular domestic and international connections via Jaipur International Airport.'
            },
            {
              title: 'By Train',
              icon: Train,
              distance: '22 km',
              time: '35–40 minutes',
              hubLabel: 'Station',
              hubValue: 'Jaipur Junction (JP)',
              caption: 'Jaipur Junction is well connected to major Indian cities.'
            },
            {
              title: 'By Road',
              icon: Car,
              distance: 'Convenient Access',
              time: 'Flexible / Taxi',
              hubLabel: 'Route',
              hubValue: 'NH-48 & Ajmer Road',
              caption: 'Convenient access through NH-48 with app-based taxis and local transport available.'
            }
          ].map((travel, index) => {
            const Icon = travel.icon;
            return (
              <div
                key={index}
                className="bg-[#FCFCFC] border border-[#E6E8EC] rounded-[18px] p-8 sm:p-10 flex flex-col justify-between group hover:border-brand-orange hover:bg-[#FFFBF7] hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="text-brand-orange group-hover:text-[#184176] transition-colors duration-300">
                    <Icon size={24} />
                  </div>

                  {/* Title */}
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-xl text-brand-blue">{travel.title}</h3>
                  </div>

                  {/* Metadata Rows */}
                  <div className="space-y-4 pt-2 border-t border-[#E6E8EC]/60">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#8A99AD] font-semibold font-sans">Distance</span>
                      <span className="text-[14px] font-medium text-brand-ink leading-tight font-sans">{travel.distance}</span>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#8A99AD] font-semibold font-sans">Travel Time</span>
                      <span className="text-[14px] font-medium text-brand-ink leading-tight font-sans">{travel.time}</span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#8A99AD] font-semibold font-sans">{travel.hubLabel}</span>
                      <span className="text-[14px] font-medium text-brand-ink leading-tight font-sans">{travel.hubValue}</span>
                    </div>
                  </div>
                </div>

                {/* Muted Caption */}
                <p className="text-[12px] text-[#8A99AD] italic leading-relaxed pt-6 border-t border-[#E6E8EC]/40 mt-6 font-sans">
                  "{travel.caption}"
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 7: NEARBY ACCOMMODATION */}
      <section className="py-24 bg-white border-t-4 border-brand-ink px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">DELEGATE STAY</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight">
              Recommended Hotels
            </h2>
            <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotels.map((hotel, index) => (
              <div
                key={index}
                className="bg-[#FCFCFC] border border-[#E6E8EC] rounded-[18px] overflow-hidden flex flex-col justify-between group hover:border-brand-orange hover:shadow-md transition-all duration-300"
              >
                <div className="relative aspect-[4/3] bg-brand-cloud overflow-hidden">
                  <Image
                    src={hotel.src}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {/* Soft dark gradient overlay on hover */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  
                  {/* Clean rounded distance/time badge */}
                  <div className="absolute top-3.5 right-3.5 bg-[#E6E8EC]/90 backdrop-blur-sm text-[#1F4E8C] px-3 py-1 text-[10px] font-bold tracking-wide rounded-full shadow-sm z-20">
                    {hotel.badgeText}
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between gap-5">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-serif font-semibold text-[17px] text-brand-ink leading-snug">{hotel.name}</h3>
                      <span className="inline-block bg-[#E6E8EC]/60 text-[#1F4E8C] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                        {hotel.category}
                      </span>
                    </div>
                    
                    <div className="space-y-1.5 text-[13px] text-[#5F6B7A] font-sans">
                      <p className="flex items-center gap-1.5 font-medium text-brand-ink">
                        <MapPin size={13} className="text-brand-orange shrink-0" />
                        <span>{hotel.location}</span>
                      </p>
                      <p className="pl-[19px] leading-relaxed text-slate-500 font-medium">{hotel.distance}</p>
                      <p className="pl-[19px] leading-relaxed text-slate-500 font-medium">{hotel.time}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <a
                      href={hotel.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center border border-[#E6E8EC] text-brand-ink hover:text-brand-orange group-hover:border-brand-orange hover:border-brand-orange font-bold py-2.5 transition-all duration-300 rounded-[10px] flex items-center justify-center gap-2 cursor-pointer text-xs bg-white shadow-sm"
                    >
                      Visit Hotel Website &rarr;
                    </a>

                    {/* Muted line at the bottom */}
                    <p className="text-[11px] text-[#8A99AD] italic border-t border-[#E6E8EC]/40 pt-3 text-center font-sans">
                      {hotel.bottomText}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: WEATHER */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-brand-orange font-bold uppercase tracking-widest text-[10px] sm:text-xs">PLAN YOUR VISIT</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue uppercase tracking-tight">
            Weather During the Conference
          </h2>
          <p className="text-[#5F6B7A] text-sm sm:text-base font-sans leading-relaxed">
            March offers pleasant weather in Jaipur, providing comfortable conditions for conference sessions, networking events, and campus activities.
          </p>
        </div>

        {/* Weather Card */}
        <div className="bg-brand-blue text-white rounded-[18px] p-8 sm:p-10 space-y-8 relative overflow-hidden shadow-md">
          {/* Subtle abstract dot grid background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Large Minimalist Weather Illustration Watermark */}
          <div className="absolute -right-12 -bottom-12 opacity-[0.08] pointer-events-none z-0 text-white select-none">
            <svg width="320" height="320" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
              {/* Cloud Outline */}
              <path d="M25 65h40a15 15 0 000-30h-3.5A20 20 0 0025 45v1a10 10 0 000 19z" />
              {/* Sun Arc / Halos behind the cloud */}
              <path d="M45 28a16 16 0 0113-13M32 24a20 20 0 018-8" />
              {/* Wind / Accent lines */}
              <line x1="15" y1="50" x2="5" y2="50" strokeWidth="0.75" />
              <line x1="18" y1="58" x2="10" y2="58" strokeWidth="0.75" />
              <line x1="22" y1="42" x2="12" y2="42" strokeWidth="0.75" />
              {/* Tiny accent dots / stars */}
              <circle cx="72" cy="20" r="1" fill="currentColor" stroke="none" />
              <circle cx="82" cy="35" r="1.5" fill="currentColor" stroke="none" />
              <circle cx="15" cy="25" r="1" fill="currentColor" stroke="none" />
              <circle cx="78" cy="55" r="0.75" fill="currentColor" stroke="none" />
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10 font-sans">
            {/* Card 1: Conference Month */}
            <div className="space-y-4 p-6 bg-white/5 border border-white/10 rounded-[12px] flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange">CONFERENCE MONTH</span>
                <p className="text-xl font-bold flex items-center gap-1.5 text-white">
                  <CloudSun size={18} className="text-brand-orange" />
                  March 2027
                </p>
                <p className="text-lg font-bold flex items-center gap-1.5 text-white/95">
                  <Thermometer size={18} className="text-brand-orange" />
                  18°C – 30°C
                </p>
              </div>
              <p className="text-xs text-white/70 leading-relaxed pt-2 border-t border-white/5 font-medium">
                Comfortable daytime temperatures with pleasant evenings.
              </p>
            </div>

            {/* Card 2: Weather Conditions */}
            <div className="space-y-4 p-6 bg-white/5 border border-white/10 rounded-[12px]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange block">WEATHER CONDITIONS</span>
              <ul className="space-y-2.5 text-sm text-white/90 font-medium">
                <li className="flex items-center gap-2.5">
                  <Sun size={14} className="text-brand-orange shrink-0" />
                  <span>Warm afternoons</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CloudSun size={14} className="text-brand-orange shrink-0" />
                  <span>Pleasant mornings</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CloudMoon size={14} className="text-brand-orange shrink-0" />
                  <span>Comfortable evenings</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Cloud size={14} className="text-brand-orange shrink-0" />
                  <span>Mostly clear skies</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Droplets size={14} className="text-brand-orange shrink-0" />
                  <span>Low probability of rainfall</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Information Bar: Travel Tips */}
          <div className="pt-6 border-t border-white/10 relative z-10 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-orange block">TRAVEL TIPS</span>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs sm:text-sm text-white/80 leading-relaxed font-sans list-disc list-inside">
              <li>Light cotton clothing is recommended during the day.</li>
              <li>Carry a light jacket for evening sessions.</li>
              <li>Comfortable walking shoes are recommended for exploring the campus.</li>
              <li>Sunscreen and sunglasses are advisable during outdoor activities.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 9: NEARBY ATTRACTIONS */}
      <section className="py-24 bg-white border-y-4 border-brand-ink px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Explore Jaipur</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight">
              Discover Jaipur
            </h2>
            <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-full" />
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Explore Jaipur's rich cultural heritage and iconic landmarks during your visit to SANKALP'27.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((att, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 shadow-sm rounded-[18px] overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
              >
                <div className="relative aspect-[16/10] bg-brand-cloud overflow-hidden">
                  <Image
                    src={att.src}
                    alt={att.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{att.category}</span>
                      <h3 className="font-serif font-bold text-xl text-brand-blue">{att.name}</h3>
                    </div>

                    <div className="space-y-1 text-xs text-slate-500 border-y border-slate-100 py-2">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-brand-orange shrink-0" />
                        <span>Distance: <span className="font-medium text-slate-700">{att.distance}</span></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-brand-orange shrink-0" />
                        <span>Visit Duration: <span className="font-medium text-slate-700">{att.duration}</span></span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{att.desc}</p>
                  </div>

                  <div className="pt-2">
                    <a
                      href={att.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-bold text-brand-orange hover:text-brand-orange/80 transition-colors gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      View on Google Maps <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 px-6 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Help & Support</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-full" />
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Find quick answers to common questions about the venue, travel, facilities, accommodation, and your visit to SANKALP'27.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFAQ === index;
            return (
              <div
                key={index}
                className={`bg-white border transition-all duration-300 rounded-[16px] overflow-hidden shadow-sm ${
                  isOpen 
                    ? 'border-[#E6E8EC] border-l-4 border-l-brand-orange' 
                    : 'border-[#E6E8EC] hover:border-brand-orange hover:bg-[#FFFDF8]'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left font-semibold text-brand-ink cursor-pointer select-none text-sm sm:text-base gap-4 group"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-brand-orange' : 'text-slate-400 group-hover:text-brand-orange'
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed font-sans text-xs sm:text-sm">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 11: CALL TO ACTION */}
      <section className="py-24 bg-brand-blue text-white border-t-4 border-brand-ink text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:16px_16px]"></div>
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <div className="space-y-2">
            <span className="text-brand-orange font-bold tracking-widest text-xs sm:text-sm uppercase">Join SANKALP'27</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight">
              Join Us at SANKALP'27
            </h2>
            <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full" />
          </div>

          <p className="text-base sm:text-lg text-white/95 max-w-xl mx-auto leading-relaxed font-medium">
            Experience world-class research, innovation, and collaboration at JK Lakshmipat University.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/#registration"
              className="w-full sm:w-auto text-center bg-brand-orange text-white font-bold py-3 px-8 border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] hover:bg-orange-600 active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#030404] transition-all rounded-md cursor-pointer text-sm"
            >
              Register Now
            </Link>
            <Link
              href="/#contact"
              className="w-full sm:w-auto text-center bg-white text-brand-ink font-bold py-3 px-8 border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] hover:bg-slate-100 active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#030404] transition-all rounded-md cursor-pointer text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-brand-ink/95 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl max-h-[85vh] w-full aspect-[4/3] rounded-2xl overflow-hidden bg-brand-ink flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryItems[lightboxIndex].src}
                alt={galleryItems[lightboxIndex].title}
                fill
                className="object-contain"
              />
              
              {/* Image Title */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide border border-white/10 shadow-lg text-center">
                {galleryItems[lightboxIndex].title}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all rounded-full w-10 h-10 flex items-center justify-center font-bold cursor-pointer border border-white/10 shadow-md"
              >
                ✕
              </button>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => prev === null ? null : (prev === 0 ? galleryItems.length - 1 : prev - 1));
                }}
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all rounded-full w-12 h-12 flex items-center justify-center cursor-pointer border border-white/10 shadow-md"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => prev === null ? null : (prev === galleryItems.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all rounded-full w-12 h-12 flex items-center justify-center cursor-pointer border border-white/10 shadow-md"
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

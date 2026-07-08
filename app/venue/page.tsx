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
  CloudSun,
  Thermometer,
  Coffee,
  Bookmark,
  Users,
  Award,
  Sparkles,
  Info
} from 'lucide-react';

export default function VenuePage() {
  const [copied, setCopied] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

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
    { title: 'Aerial View', src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Main Entrance', src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Academic Block', src: 'https://images.unsplash.com/photo-1498243691581-b148c55361c5?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Auditorium', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Library', src: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Research Labs', src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Innovation Centre', src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80' },
    { title: 'Green Campus', src: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80' }
  ];

  // Facilities items
  const facilities = [
    { name: 'Registration Area', desc: 'Dedicated desk in the main lobby for badges, kits, and queries.', icon: Layers },
    { name: 'Conference Hall', desc: 'Main session venue with state-of-the-art acoustics and screen setup.', icon: Building },
    { name: 'Technical Session Rooms', desc: 'Multiple parallel tracks equipped with advanced presentation systems.', icon: Cpu },
    { name: 'Networking Lounge', desc: 'Comfortable break-out zones for research collaborations and dialogue.', icon: Users },
    { name: 'Startup Exhibition Area', desc: 'Showcase of cutting-edge sustainable AI systems and applications.', icon: Sparkles },
    { name: 'Poster Presentation Zone', desc: 'Spacious corridor with high visibility for selected poster works.', icon: Bookmark },
    { name: 'Cafeteria', desc: 'Hygienic multi-cuisine options serving fresh beverages and meals.', icon: Coffee },
    { name: 'Parking', desc: 'Ample on-campus parking spaces for delegates and attendees.', icon: Car },
    { name: 'Medical Assistance', desc: '24/7 first aid assistance and emergency response team on call.', icon: Award },
    { name: 'Accessibility Support', desc: 'Wheelchair access ramps, elevators, and dedicated seating layout.', icon: Info }
  ];

  // Accommodation items
  const hotels = [
    { name: 'The Oberoi Rajvilas', distance: '38 km from JKLU', rating: '5 ★', src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80', link: 'https://www.oberoihotels.com/' },
    { name: 'ITC Rajputana, Jaipur', distance: '22 km from JKLU', rating: '5 ★', src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80', link: 'https://www.itchotels.com/' },
    { name: 'Radisson Blu Jaipur', distance: '28 km from JKLU', rating: '4.5 ★', src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80', link: 'https://www.radissonhotels.com/' },
    { name: 'Four Points by Sheraton', distance: '26 km from JKLU', rating: '4.2 ★', src: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80', link: 'https://www.marriott.com/' }
  ];

  // Attractions
  const attractions = [
    { name: 'Hawa Mahal', distance: '25 km', desc: 'The iconic Palace of Winds featuring intricate honeycomb sandstone lattice windows.', src: 'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=600&q=80' },
    { name: 'Amer Fort', distance: '34 km', desc: 'A majestic UNESCO World Heritage fortress overlooking Maota Lake with spectacular murals.', src: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80' },
    { name: 'Jal Mahal', distance: '30 km', desc: 'A breathtaking palace resting silently in the center of the serene Man Sagar Lake.', src: 'https://images.unsplash.com/photo-1477584322813-ac2386df21a2?auto=format&fit=crop&w=600&q=80' },
    { name: 'City Palace', distance: '24 km', desc: 'The magnificent royal residence blending traditional Rajasthani and Mughal architectural styles.', src: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80' },
    { name: 'Albert Hall Museum', distance: '23 km', desc: 'The oldest state museum displaying exceptional industrial art and ancient treasures.', src: 'https://images.unsplash.com/photo-1616428789508-3d607e4d8fb8?auto=format&fit=crop&w=600&q=80' },
    { name: 'Nahargarh Fort', distance: '29 km', desc: 'A historic hilltop fort offering absolute panoramic sunset views over the Pink City.', src: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80' }
  ];

  // FAQs
  const faqs = [
    { q: 'Where is the venue located?', a: 'SANKALP\'27 is hosted at JK Lakshmipat University (JKLU), near Mahindra SEZ on Ajmer Road, Jaipur, Rajasthan 302026, India. The location is easily accessible by taxis and cabs.' },
    { q: 'Is parking available?', a: 'Yes, secure and spacious on-campus parking is available free of charge for all registered delegates, speakers, and attendees.' },
    { q: 'Are hotels available nearby?', a: 'Yes, we have multiple recommended hotels ranging from luxury resorts to budget stays within reasonable transit distance from the campus. Taxi booking facilities are easily available.' },
    { q: 'Is Wi-Fi available?', a: 'High-speed Wi-Fi access will be provided to all attendees throughout the campus academic blocks, conference halls, and networking spaces.' },
    { q: 'Is the campus wheelchair accessible?', a: 'Yes, JKLU campus features wheelchair accessible pathways, entrance ramps, elevators in multi-story blocks, and dedicated assistance layout.' }
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
      <section id="about-section" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative border-4 border-brand-ink shadow-[8px_8px_0px_0px_#030404] rounded-xl overflow-hidden aspect-[4/3] bg-white group">
            <Image
              src="/Images/footer_image.webp"
              alt="JK Lakshmipat University Campus"
              fill
              className="object-cover group-hover:scale-102 transition-transform duration-300"
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Host Institution</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-blue uppercase tracking-tight">
                About The Venue
              </h2>
              <div className="w-16 h-1.5 bg-brand-orange rounded-full" />
            </div>

            <p className="text-slate-700 leading-relaxed font-medium text-sm sm:text-base">
              JK Lakshmipat University (JKLU), Jaipur, is a leading multidisciplinary university committed to innovation, research excellence, entrepreneurship, and industry collaboration. The university provides world-class academic infrastructure, modern laboratories, collaborative learning spaces, incubation facilities, and a sustainable green campus, making it an ideal venue for an international research conference.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Smart Campus', icon: Cpu },
                { title: 'Research Laboratories', icon: Layers },
                { title: 'Modern Auditorium', icon: Building },
                { title: 'High-Speed Wi-Fi', icon: Wifi },
                { title: 'Innovation & Incubation Centre', icon: Compass },
                { title: 'Green Sustainable Campus', icon: Leaf }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] rounded-lg hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#030404] transition-all"
                  >
                    <IconComponent className="text-brand-orange shrink-0" size={20} />
                    <span className="font-bold text-xs sm:text-sm text-brand-ink">{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CAMPUS GALLERY */}
      <section className="py-20 bg-white border-y-4 border-brand-ink px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Visual Tour</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight">
              Campus Gallery
            </h2>
            <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                onClick={() => setLightboxImage(item)}
                className="relative aspect-[4/3] border-4 border-brand-ink shadow-[4px_4px_0px_0px_#030404] rounded-lg overflow-hidden group cursor-zoom-in bg-brand-cloud"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-brand-ink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold font-mono text-xs uppercase tracking-widest border border-white px-3 py-1.5 bg-brand-ink/40">
                    View Large
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 bg-white border border-brand-ink px-2.5 py-1 text-[10px] font-bold font-mono text-brand-ink uppercase shadow-[1px_1px_0px_0px_#030404]">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CONFERENCE FACILITIES */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Amenities</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-blue uppercase tracking-tight">
            Conference Facilities
          </h2>
          <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {facilities.map((fac, index) => {
            const Icon = fac.icon;
            return (
              <div
                key={index}
                className="bg-white border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] rounded-lg p-5 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_#030404] transition-all"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 bg-brand-orange/10 border border-brand-ink rounded flex items-center justify-center">
                    <Icon className="text-brand-orange" size={20} />
                  </div>
                  <h3 className="font-bold text-sm text-brand-ink leading-tight">{fac.name}</h3>
                  <p className="text-xs text-slate-600 font-mono font-bold leading-normal">{fac.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: LOCATION */}
      <section id="map-section" className="py-20 bg-white border-t-4 border-brand-ink px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Google Maps</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight">
              Location Map
            </h2>
            <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-full" />
          </div>

          <div className="w-full border-4 border-brand-ink shadow-[8px_8px_0px_0px_#030404] rounded-xl overflow-hidden h-96 mb-10 transform hover:scale-[1.002] transition-transform duration-250">
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

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 sm:p-8 bg-brand-cloud border-2 border-brand-ink shadow-[4px_4px_0px_0px_#030404] rounded-lg gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold font-mono tracking-widest text-brand-orange uppercase">Full Address</span>
              <h4 className="font-bold text-base sm:text-lg text-brand-ink leading-tight">JK Lakshmipat University</h4>
              <p className="text-xs sm:text-sm font-mono text-brand-ink/80 leading-relaxed font-bold">
                Near Mahindra SEZ, Ajmer Road, Jaipur, Rajasthan 302026, India
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0 w-full md:w-auto">
              <a
                href="https://maps.app.goo.gl/3Xp5o5899yqDqFh1A"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center bg-brand-orange text-white font-bold py-2.5 px-6 border-2 border-brand-ink shadow-[2px_2px_0px_0px_#030404] hover:bg-orange-600 active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#030404] transition-all rounded-md flex items-center justify-center gap-2 cursor-pointer text-xs"
              >
                <ExternalLink size={14} /> Open in Google Maps
              </a>
              <button
                onClick={copyAddress}
                className="w-full sm:w-auto bg-white text-brand-ink font-bold py-2.5 px-6 border-2 border-brand-ink shadow-[2px_2px_0px_0px_#030404] hover:bg-slate-50 active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#030404] transition-all rounded-md flex items-center justify-center gap-2 cursor-pointer text-xs"
              >
                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                {copied ? 'Address Copied!' : 'Copy Address'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TRAVEL INFORMATION */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Getting Here</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-blue uppercase tracking-tight">
            Travel Information
          </h2>
          <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'By Air',
              icon: Plane,
              station: 'Jaipur International Airport',
              distance: 'Approximately 35–40 km',
              time: '45–60 minutes'
            },
            {
              title: 'By Train',
              icon: Train,
              station: 'Jaipur Junction (JP)',
              distance: 'Approximately 22 km',
              time: '35–40 minutes'
            },
            {
              title: 'By Road',
              icon: Car,
              station: 'Connected via NH-48 & Ajmer Road',
              distance: 'Taxi, Uber & Ola cabs available',
              time: 'Local transit & autos easily found'
            }
          ].map((travel, index) => {
            const Icon = travel.icon;
            return (
              <div
                key={index}
                className="bg-white border-4 border-brand-ink shadow-[6px_6px_0px_0px_#030404] rounded-xl p-6 sm:p-8 space-y-6 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#030404] transition-all"
              >
                <div className="w-12 h-12 bg-brand-orange text-white border-2 border-brand-ink shadow-[2px_2px_0px_0px_#030404] rounded flex items-center justify-center shrink-0">
                  <Icon size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-xl text-brand-blue">{travel.title}</h3>
                  <div className="w-8 h-1 bg-brand-orange rounded" />
                </div>
                <div className="space-y-3 font-mono text-xs text-slate-700 font-bold leading-relaxed">
                  <p className="text-brand-ink font-sans text-sm font-black">{travel.station}</p>
                  <p className="flex items-center gap-2">
                    <Compass size={14} className="text-brand-orange shrink-0" />
                    <span>{travel.distance}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={14} className="text-brand-orange shrink-0" />
                    <span>{travel.time}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 7: NEARBY ACCOMMODATION */}
      <section className="py-24 bg-white border-t-4 border-brand-ink px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Where to Stay</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight">
              Nearby Accommodation
            </h2>
            <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotels.map((hotel, index) => (
              <div
                key={index}
                className="bg-brand-cloud border-2 border-brand-ink shadow-[4px_4px_0px_0px_#030404] rounded-lg overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#030404] transition-all"
              >
                <div className="relative aspect-[4/3] bg-brand-cloud">
                  <Image
                    src={hotel.src}
                    alt={hotel.name}
                    fill
                    className="object-cover border-b-2 border-brand-ink"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-white border border-brand-ink px-2 py-0.5 text-[10px] font-bold font-mono text-brand-ink uppercase shadow-[1.5px_1.5px_0px_0px_#030404]">
                    {hotel.rating}
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm sm:text-base text-brand-ink leading-tight">{hotel.name}</h3>
                    <p className="text-xs font-mono font-bold text-slate-600 flex items-center gap-1.5">
                      <MapPin size={12} className="text-brand-orange" />
                      {hotel.distance}
                    </p>
                  </div>

                  <a
                    href={hotel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-brand-orange text-white font-bold py-2 border-2 border-brand-ink shadow-[2px_2px_0px_0px_#030404] hover:bg-orange-600 active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#030404] transition-all rounded flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    Book Now <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: WEATHER */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <div className="bg-brand-blue text-white border-4 border-brand-ink shadow-[8px_8px_0px_0px_#030404] rounded-xl p-6 sm:p-10 space-y-6 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12">
            <CloudSun size={240} className="text-white" />
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <CloudSun className="text-brand-orange" size={28} />
            <h3 className="font-serif font-black text-xl sm:text-2xl tracking-wide uppercase">March Weather</h3>
          </div>

          <div className="w-16 h-1 bg-brand-orange rounded-full relative z-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 font-mono text-xs sm:text-sm font-bold text-white/95">
            <div className="space-y-2 p-4 bg-white/5 border border-white/10 rounded">
              <span className="text-[10px] font-sans tracking-widest text-brand-orange uppercase">Average Temperature</span>
              <p className="text-lg sm:text-xl font-sans font-black flex items-center gap-1.5 text-white">
                <Thermometer size={18} className="text-brand-orange" />
                18°C – 30°C
              </p>
            </div>
            <div className="space-y-2 p-4 bg-white/5 border border-white/10 rounded">
              <span className="text-[10px] font-sans tracking-widest text-brand-orange uppercase">Conditions</span>
              <p className="text-sm font-sans font-black text-white leading-relaxed">
                Pleasant mornings and warm afternoons. Clean skies.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-medium leading-relaxed border-l-2 border-brand-orange pl-4 text-white/80 relative z-10">
            <strong>Recommendation:</strong> Light cotton clothing is recommended for daytime travel. A light jacket might be pleasant for late evening sessions.
          </p>
        </div>
      </section>

      {/* SECTION 9: NEARBY ATTRACTIONS */}
      <section className="py-24 bg-white border-y-4 border-brand-ink px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Explore Jaipur</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight">
              Nearby Attractions
            </h2>
            <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((att, index) => (
              <div
                key={index}
                className="bg-brand-cloud border-4 border-brand-ink shadow-[6px_6px_0px_0px_#030404] rounded-xl overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#030404] transition-all"
              >
                <div className="relative aspect-[16/10] bg-brand-cloud">
                  <Image
                    src={att.src}
                    alt={att.name}
                    fill
                    className="object-cover border-b-2 border-brand-ink"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute bottom-3 left-3 bg-brand-orange border border-brand-ink px-2.5 py-0.5 text-[10px] font-bold font-mono text-white uppercase shadow-[1.5px_1.5px_0px_0px_#030404] flex items-center gap-1">
                    <MapPin size={10} /> {att.distance}
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-xl text-brand-blue">{att.name}</h3>
                    <p className="text-xs text-slate-700 leading-relaxed font-mono font-bold">{att.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: FREQUENTLY ASKED QUESTIONS */}
      <section className="py-24 px-6 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">Help Desk</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-blue uppercase tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-full" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFAQ === index;
            return (
              <div
                key={index}
                className="bg-white border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] rounded-lg overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-5 text-left font-bold text-brand-ink hover:text-brand-orange transition-colors cursor-pointer select-none text-sm sm:text-base gap-4"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={20} className="shrink-0 text-brand-orange" /> : <ChevronDown size={20} className="shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 border-t-2 border-brand-ink/5 pt-4 text-xs sm:text-sm font-mono text-slate-700 font-bold leading-relaxed">
                    {faq.a}
                  </div>
                )}
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
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-brand-ink/90 flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[85vh] w-full aspect-[4/3] border-4 border-brand-ink shadow-[8px_8px_0px_0px_#030404] rounded-lg overflow-hidden bg-brand-cloud"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-4 left-4 bg-white border border-brand-ink px-3 py-1.5 text-xs font-bold font-mono text-brand-ink uppercase shadow-[2px_2px_0px_0px_#030404]">
                {lightboxImage.title}
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 bg-brand-orange text-white border-2 border-brand-ink shadow-[2px_2px_0px_0px_#030404] hover:bg-orange-600 active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#030404] transition-all rounded-md w-8 h-8 flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

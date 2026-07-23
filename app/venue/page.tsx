'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';


export default function VenuePage() {
  const [copied, setCopied] = useState(false);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const copyAddress = () => {
    navigator.clipboard.writeText(
      "JK Lakshmipat University, Near Mahindra SEZ, Ajmer Road, Jaipur, Rajasthan 302026, India"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    { name: 'Registration Area', desc: 'Dedicated desk in the main lobby for badges, kits, and queries.' },
    { name: 'Conference Hall', desc: 'Main session venue with state-of-the-art acoustics and screen setup.' },
    { name: 'Technical Session Rooms', desc: 'Multiple parallel tracks equipped with advanced presentation systems.' },
    { name: 'Networking Lounge', desc: 'Comfortable break-out zones for research collaborations and dialogue.' },
    { name: 'Startup Exhibition Area', desc: 'Showcase of cutting-edge sustainable AI systems and applications.' },
    { name: 'Poster Presentation Zone', desc: 'Spacious corridor with high visibility for selected poster works.' },
    { name: 'Cafeteria', desc: 'Hygienic multi-cuisine options serving fresh beverages and meals.' },
    { name: 'Parking', desc: 'Ample on-campus parking spaces for delegates and attendees.' },
    { name: 'Medical Assistance', desc: '24/7 first aid assistance and emergency response team on call.' },
    { name: 'Accessibility Support', desc: 'Wheelchair access ramps, elevators, and dedicated seating layout.' }
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
      src: '/Images/itc-rajputana.jpg', 
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
      src: '/Images/radisson.jpg', 
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
          >
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
              Get Directions
            </a>
            <a
              href="#about-section"
              className="bg-white text-brand-ink font-bold py-3 px-8 border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] hover:bg-slate-100 active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#030404] transition-all rounded-md flex items-center gap-2 cursor-pointer text-sm"
            >
              Explore Campus
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
            <div className="absolute top-4 left-4 bg-brand-ink text-white border border-white/10 px-3 py-1.5 rounded-md text-[10px] sm:text-xs font-semibold tracking-wide shadow-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-sm bg-brand-orange animate-pulse" />
              JK Lakshmipat University • Jaipur, Rajasthan • Host Venue
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight leading-tight">
                  JK Lakshmipat University
                </h2>
                <p className="text-lg sm:text-xl font-medium text-brand-blue tracking-wide">
                  Where Innovation Meets Research
                </p>
              </div>
              <div className="w-16 h-1 bg-brand-orange rounded-sm" />
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
                  { num: '04', title: 'High-Speed Wi-Fi', desc: 'Seamless high-bandwidth connectivity enabling global research and real-time collaboration.' },
                  { num: '05', title: 'Collaborative Learning Spaces', desc: 'Flexible, student-centric classrooms designed for peer learning and creative dialogue.' },
                  { num: '06', title: 'Sustainable Infrastructure', desc: 'Eco-conscious design featuring solar energy systems, water recycling, and zero-waste initiatives.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start border-t border-slate-100/80 pt-4">
                    <div className="font-serif text-3xl sm:text-4xl font-black text-transparent [-webkit-text-stroke:1px_#f5821e] select-none leading-none shrink-0">
                      {item.num}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm sm:text-base text-brand-ink leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs pt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* SECTION 3: CAMPUS GALLERY */}
      <section className="py-24 bg-white border-y border-slate-100 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight">
              Explore the Campus
            </h2>
            <div className="w-16 h-1 bg-brand-orange mx-auto rounded-sm mt-2" />
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
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-blue uppercase tracking-tight">
              Conference Facilities
            </h2>
            <div className="w-8 h-[2px] bg-brand-orange mx-auto rounded-sm mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {facilities.map((fac, index) => {
              return (
                <div
                  key={index}
                  className="relative bg-[#FCFCFC] border border-[#E6E8EC] rounded-2xl p-7 flex flex-col justify-between"
                >
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div>

                      <h3 className="font-serif font-bold text-base text-[#1F4E8C] leading-snug">
                        {fac.name}
                      </h3>
                      
                      <div className="w-full h-[1px] bg-[#E6E8EC]/85 my-3" />
                      <p className="text-[13px] text-[#5F6B7A] font-sans leading-relaxed">
                        {fac.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: LOCATION */}
      <section id="map-section" className="py-20 bg-white border-t border-[#E6E8EC]/60 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight">
              Find the Venue
            </h2>
            <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-sm" />
          </div>

          {/* Map Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Map */}
            <div className="lg:col-span-7 border border-[#E6E8EC] shadow-md rounded-[18px] overflow-hidden h-[450px] lg:h-auto min-h-[350px]">
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

            {/* Right Column: Address and Actions card */}
            <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 bg-[#FCFCFC] border border-[#E6E8EC] rounded-[18px] shadow-sm gap-8">
              {/* Address & Coordinates */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-brand-orange font-bold uppercase tracking-widest text-[10px] sm:text-xs">VENUE ADDRESS</span>
                  <h4 className="font-serif font-bold text-xl sm:text-2xl text-brand-blue leading-tight">JK Lakshmipat University</h4>
                  <div className="text-sm text-slate-700 leading-relaxed font-sans font-medium space-y-1">
                    <p>Near Mahindra SEZ, Ajmer Road</p>
                    <p>Jaipur, Rajasthan 302026, India</p>
                  </div>
                </div>
                
                <div className="space-y-1 pt-4 border-t border-[#E6E8EC]/60">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A99AD] font-sans">Coordinates</span>
                  <p className="text-xs text-[#8A99AD] font-medium font-sans">
                    26.857° N, 75.699° E
                  </p>
                </div>
              </div>

              {/* Action Buttons & QR Code Row */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-6 border-t border-[#E6E8EC]/60 items-center">
                {/* Actions */}
                <div className="sm:col-span-7 flex flex-col gap-3">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=JK+Lakshmipat+University+Jaipur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-brand-orange text-white font-bold py-3 px-4 hover:bg-orange-600 active:translate-y-[1px] transition-all rounded-[10px] flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    Open in Google Maps ↗
                  </a>
                  <a
                    href="https://maps.apple.com/?q=JK+Lakshmipat+University+Jaipur&ll=26.836603,75.647729"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-brand-blue text-white font-bold py-3 px-4 hover:bg-[#184176] active:translate-y-[1px] transition-all rounded-[10px] flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    Open in Apple Maps ↗
                  </a>
                  <button
                    onClick={copyAddress}
                    className="w-full bg-white text-brand-ink font-bold py-3 px-4 border border-[#E6E8EC] hover:bg-[#FFFBF7] hover:border-brand-orange active:translate-y-[1px] transition-all rounded-[10px] flex items-center justify-center gap-2 cursor-pointer text-xs shadow-sm"
                  >
                    {copied ? '✓ Address Copied!' : 'Copy Venue Address'}
                  </button>
                </div>

                {/* QR Codes */}
                <div className="sm:col-span-5 flex flex-col items-center gap-3">
                  <div className="flex gap-5">
                    {/* Google Maps QR */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="p-1.5 bg-white border border-[#E6E8EC] rounded-lg shadow-sm w-20 h-20 flex items-center justify-center">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https%3A%2F%2Fwww.google.com%2Fmaps%2Fsearch%2F%3Fapi%3D1%26query%3DJK%2BLakshmipat%2BUniversity%2BJaipur" 
                          alt="Scan for Google Maps"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-[9px] font-bold tracking-wider text-brand-orange uppercase">Google Maps</span>
                    </div>

                    {/* Apple Maps QR */}
                    <div className="flex flex-col items-center gap-1">
                      <div className="p-1.5 bg-white border border-[#E6E8EC] rounded-lg shadow-sm w-20 h-20 flex items-center justify-center">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https%3A%2F%2Fmaps.apple.com%2F%3Fq%3DJK%2BLakshmipat%2BUniversity%2BJaipur%26ll%3D26.836603%2C75.647729" 
                          alt="Scan for Apple Maps"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-[9px] font-bold tracking-wider text-brand-blue uppercase">Apple Maps</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-extrabold tracking-widest text-slate-400 uppercase mt-1">Scan to Navigate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TRAVEL INFORMATION */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
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
              distance: '35-40 km',
              time: '45-60 minutes',
              hubLabel: 'Airport',
              hubValue: 'Jaipur International Airport',
              caption: 'Regular domestic and international connections via Jaipur International Airport.'
            },
            {
              title: 'By Train',
              distance: '22 km',
              time: '35-40 minutes',
              hubLabel: 'Station',
              hubValue: 'Jaipur Junction (JP)',
              caption: 'Jaipur Junction is well connected to major Indian cities.'
            },
            {
              title: 'By Road',
              distance: 'Convenient Access',
              time: 'Flexible / Taxi',
              hubLabel: 'Route',
              hubValue: 'NH-48 & Ajmer Road',
              caption: 'Convenient access through NH-48 with app-based taxis and local transport available.'
            }
          ].map((travel, index) => {
            return (
              <div
                key={index}
                className="bg-[#FCFCFC] border border-[#E6E8EC] rounded-[18px] p-8 sm:p-10 flex flex-col justify-between group hover:border-brand-orange hover:bg-[#FFFBF7] hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-6">

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
      <section className="py-24 bg-white border-t border-[#E6E8EC]/60 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight">
              Recommended Hotels
            </h2>
            <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-sm" />
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
                  <div className="absolute top-3.5 right-3.5 bg-[#E6E8EC] text-[#1F4E8C] px-3 py-1 text-[10px] font-bold tracking-wide rounded-md shadow-sm z-20">
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
                        <span>{hotel.location}</span>
                      </p>
                      <p className="pl-0 leading-relaxed text-slate-500 font-medium">{hotel.distance}</p>
                      <p className="pl-0 leading-relaxed text-slate-500 font-medium">{hotel.time}</p>
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
                  March 2027
                </p>
                <p className="text-lg font-bold flex items-center gap-1.5 text-white/95">
                  18°C - 30°C
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
                  <span className="text-brand-orange shrink-0">•</span>
                  <span>Warm afternoons</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-brand-orange shrink-0">•</span>
                  <span>Pleasant mornings</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-brand-orange shrink-0">•</span>
                  <span>Comfortable evenings</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-brand-orange shrink-0">•</span>
                  <span>Mostly clear skies</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-brand-orange shrink-0">•</span>
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
      <section className="py-24 bg-white border-y border-[#E6E8EC]/60 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight">
              Discover Jaipur
            </h2>
            <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-sm" />
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
                        <span>Distance: <span className="font-medium text-slate-700">{att.distance}</span></span>
                      </div>
                      <div className="flex items-center gap-1.5">
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
                      View on Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* SECTION 11: CALL TO ACTION */}
      <section className="py-24 bg-brand-blue text-white text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:16px_16px]"></div>
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight">
              Join Us at SANKALP'27
            </h2>
            <div className="w-16 h-1 bg-brand-orange mx-auto rounded-sm" />
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
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/90 text-white px-5 py-2.5 rounded-md text-xs sm:text-sm font-semibold tracking-wide border border-white/10 shadow-lg text-center">
                {galleryItems[lightboxIndex].title}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-5 right-5 bg-slate-900 hover:bg-slate-800 text-white transition-all rounded-md w-10 h-10 flex items-center justify-center font-bold cursor-pointer border border-white/10 shadow-md"
              >
                ✕
              </button>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => prev === null ? null : (prev === 0 ? galleryItems.length - 1 : prev - 1));
                }}
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-slate-900 hover:bg-slate-800 text-white transition-all rounded-md w-12 h-12 flex items-center justify-center cursor-pointer border border-white/10 shadow-md font-bold text-xl"
              >
                ←
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => prev === null ? null : (prev === galleryItems.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-slate-900 hover:bg-slate-800 text-white transition-all rounded-md w-12 h-12 flex items-center justify-center cursor-pointer border border-white/10 shadow-md font-bold text-xl"
              >
                →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

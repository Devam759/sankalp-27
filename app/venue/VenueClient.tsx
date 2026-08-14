'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Reveal from '@/components/ui/Reveal';
import WordReveal from '@/components/ui/WordReveal';
import { gsap, usePrefersReducedMotion } from '@/lib/animations/gsap';
import {
  BadgeIcon,
  PresentationIcon,
  MonitorIcon,
  UsersGroupIcon,
  RocketIcon,
  PosterIcon,
  UtensilsIcon,
  ParkingIcon,
  MedicalIcon,
  AccessibilityIcon,
  CopyIcon,
  AppleIcon,
  PlaneIcon,
  BusIcon,
  TrainIcon,
  CarIcon,
  BuildingIcon
} from '@/components/ui/Icons';

export default function VenueClient() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(
      "JK Lakshmipat University, Near Mahindra SEZ, Ajmer Road, Jaipur, Rajasthan 302026, India"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const heroRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // Subtle GSAP parallax on the hero campus image as the page scrolls.
  useEffect(() => {
    const hero = heroRef.current;
    const img = heroImageRef.current;
    if (!hero || !img || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, hero);

    return () => ctx.revert();
  }, [reduced]);

  const facilities = [
    { icon: BadgeIcon, name: 'Registration Area', desc: 'Dedicated desk in the main lobby for badges, kits, and queries.' },
    { icon: PresentationIcon, name: 'Conference Hall', desc: 'Main session venue with state-of-the-art acoustics and screen setup.' },
    { icon: MonitorIcon, name: 'Technical Session Rooms', desc: 'Multiple parallel tracks equipped with advanced presentation systems.' },
    { icon: UsersGroupIcon, name: 'Networking Lounge', desc: 'Comfortable break-out zones for research collaborations and dialogue.' },
    { icon: RocketIcon, name: 'Startup Exhibition Area', desc: 'Showcase of cutting-edge sustainable AI systems and applications.' },
    { icon: PosterIcon, name: 'Poster Presentation Zone', desc: 'Spacious corridor with high visibility for selected poster works.' },
    { icon: UtensilsIcon, name: 'Cafeteria', desc: 'Hygienic multi-cuisine options serving fresh beverages and meals.' },
    { icon: ParkingIcon, name: 'Parking', desc: 'Ample on-campus parking spaces for delegates and attendees.' },
    { icon: MedicalIcon, name: 'Medical Assistance', desc: '24/7 first aid assistance and emergency response team on call.' },
    { icon: AccessibilityIcon, name: 'Accessibility Support', desc: 'Wheelchair access ramps, elevators, and dedicated seating layout.' }
  ];

  const hotels = [
    {
      name: 'Hotel Polo Inn SEZ',
      distance: '175, SEZ Road, Mahindra World City',
      time: 'Approx. 3 minutes from JKLU',
      badgeText: '3 min Drive',
      category: 'Boutique Hotel',
      bottomText: 'Closest to JKLU Campus',
      location: 'Mahindra SEZ, Jaipur',
      src: '/Images/hotels/polo_inn_sez.webp',
      link: 'https://www.google.com/maps/search/Hotel+Polo+Inn+SEZ+Jaipur'
    },
    {
      name: 'Atulya Green by Meyatri',
      distance: 'Omaxe City, Ajmer Road',
      time: 'Approx. 5 minutes from JKLU',
      badgeText: '5 min Drive',
      category: '3-Star Hotel',
      bottomText: 'Near Omaxe City',
      location: 'Ajmer Road, Jaipur',
      src: '/Images/hotels/atulya_green.webp',
      link: 'https://www.google.com/maps/search/Atulya+Green+by+Meyatri+Jaipur'
    },
    {
      name: 'Hotel The Sawai',
      distance: 'Opp. Pink Pearl, Ajmer Highway',
      time: 'Approx. 8 minutes from JKLU',
      badgeText: '8 min Drive',
      category: 'Business Hotel',
      bottomText: 'Mahapura, Jaipur',
      location: 'Ajmer Road, Jaipur',
      src: '/Images/hotels/hotel_sawai.webp',
      link: 'https://www.google.com/maps/search/Hotel+The+Sawai+Jaipur'
    },
    {
      name: 'Navya Residency',
      distance: 'Near Malot Hospital, Mahindra SEZ',
      time: 'Approx. 7 minutes from JKLU',
      badgeText: '7 min Drive',
      category: 'Comfort Stay',
      bottomText: 'SEZ Corridor, Jaipur',
      location: 'Mahindra SEZ, Jaipur',
      src: '/Images/hotels/navya_residency.webp',
      link: 'https://www.google.com/maps/search/Navya+Residency+Mahindra+SEZ+Jaipur'
    },
    {
      name: 'Four Points by Sheraton Jaipur',
      distance: 'Tonk Road, Jaipur',
      time: 'Approx. 20 minutes by road',
      badgeText: '20 min Drive',
      category: 'Business Hotel',
      bottomText: 'Near Airport / City Center',
      location: 'Jaipur, Rajasthan',
      src: '/Images/hotels/four_points.webp',
      link: 'https://www.google.com/maps/search/Four+Points+by+Sheraton+Jaipur'
    },
    {
      name: 'ITC Rajputana, Jaipur',
      distance: 'Gopal Bari, Jaipur City',
      time: 'Approx. 25 minutes by road',
      badgeText: '25 min Drive',
      category: 'Heritage Luxury',
      bottomText: 'Iconic Heritage Hotel',
      location: 'Jaipur, Rajasthan',
      src: '/Images/hotels/itc_rajputana.webp',
      link: 'https://www.google.com/maps/search/ITC+Rajputana+Jaipur'
    },
    {
      name: 'Radisson Blu Jaipur',
      distance: 'Durgapura, Jaipur',
      time: 'Approx. 20 minutes by road',
      badgeText: '20 min Drive',
      category: 'Premium Stay',
      bottomText: 'Airport Corridor',
      location: 'Jaipur, Rajasthan',
      src: '/Images/hotels/radisson_blu.webp',
      link: 'https://www.google.com/maps/search/Radisson+Blu+Jaipur'
    },
    {
      name: 'The Oberoi Rajvilas, Jaipur',
      distance: 'Goner Road, Jaipur',
      time: 'Approx. 40 minutes by road',
      badgeText: '40 min Drive',
      category: 'Luxury Resort',
      bottomText: 'World-Class Luxury',
      location: 'Jaipur, Rajasthan',
      src: '/Images/hotels/oberoi_rajvilas.webp',
      link: 'https://www.google.com/maps/search/The+Oberoi+Rajvilas+Jaipur'
    }
  ];

  const attractions = [
    {
      name: 'Hawa Mahal',
      distance: '25 km',
      duration: '1-2 Hours',
      category: 'Royal Palace',
      desc: 'The iconic Palace of Winds featuring intricate honeycomb sandstone lattice windows.',
      src: 'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=600&q=80',
      mapLink: 'https://maps.google.com/?q=Hawa+Mahal+Jaipur'
    },
    {
      name: 'Amer Fort',
      distance: '34 km',
      duration: '2-3 Hours',
      category: 'UNESCO World Heritage',
      desc: 'A majestic UNESCO World Heritage fortress overlooking Maota Lake with spectacular murals.',
      src: '/Images/jaipur_sightseeing/amer_fort.webp',
      mapLink: 'https://maps.google.com/?q=Amer+Fort+Jaipur'
    },
    {
      name: 'Jal Mahal',
      distance: '30 km',
      duration: '1 Hour',
      category: 'Historic Monument',
      desc: 'A breathtaking palace resting silently in the center of the serene Man Sagar Lake.',
      src: '/Images/jaipur_sightseeing/jal_mahal.webp',
      mapLink: 'https://maps.google.com/?q=Jal+Mahal+Jaipur'
    },
    {
      name: 'City Palace',
      distance: '24 km',
      duration: '2-3 Hours',
      category: 'Royal Palace',
      desc: 'The magnificent royal residence blending traditional Rajasthani and Mughal architectural styles.',
      src: '/Images/jaipur_sightseeing/city_palace.webp',
      mapLink: 'https://maps.google.com/?q=City+Palace+Jaipur'
    },
    {
      name: 'Albert Hall Museum',
      distance: '23 km',
      duration: '1.5-2 Hours',
      category: 'Museum',
      desc: 'The oldest state museum displaying exceptional industrial art and ancient treasures.',
      src: '/Images/jaipur_sightseeing/albert_hall.webp',
      mapLink: 'https://maps.google.com/?q=Albert+Hall+Museum+Jaipur'
    },
    {
      name: 'Nahargarh Fort',
      distance: '29 km',
      duration: '1.5-2 Hours',
      category: 'Hill Fort',
      desc: 'A historic hilltop fort offering absolute panoramic sunset views over the Pink City.',
      src: '/Images/jaipur_sightseeing/nahargarh_fort.webp',
      mapLink: 'https://maps.google.com/?q=Nahargarh+Fort+Jaipur'
    }
  ];

  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans selection:bg-brand-orange selection:text-white pt-0">
      <Navbar />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-[80vh] min-h-[550px] flex items-center justify-center text-center text-white overflow-hidden bg-brand-ink pt-20">
        <div ref={heroImageRef} className="absolute -inset-y-10 inset-x-0 z-0 will-change-transform">
          <Image
            src="/Images/campus/jklu_campus.webp"
            alt="JKLU Campus Banner"
            fill
            sizes="100vw"
            className="object-cover opacity-45 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-transparent to-brand-ink/30" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 space-y-6">
          <div className="flex justify-center">
            <Image
              src="/logos/white_jklu_logo.webp"
              alt="JKLU Logo"
              width={220}
              height={70}
              className="h-12 sm:h-16 w-auto object-contain drop-shadow-md"
              priority
            />
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight uppercase">
            <WordReveal text="JK Lakshmipat University" className="text-white" />
          </h1>
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
            Host Venue of SANKALP 2027 - International Conference on Sustainable AI and Next-Gen Knowledge, Automation, Learning & Prediction
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm sm:text-base font-semibold text-amber-200/90 tracking-wider uppercase"
          >
            <span>5-6 March 2027</span>
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
              Get Directions →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ABOUT THE VENUE */}
      <section id="about-section" className="relative py-24 px-6 md:px-12 overflow-hidden bg-gradient-to-br from-amber-50/15 via-brand-cloud to-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal variant="left" className="relative border border-brand-ink/10 shadow-lg rounded-2xl overflow-hidden aspect-[4/3] bg-white">
            <Image
              src="/Images/campus/jklu_campus.webp"
              alt="JK Lakshmipat University Campus"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </Reveal>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight leading-tight">
                  <WordReveal text="JK Lakshmipat University" className="text-brand-ink" />
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

      {/* FACILITIES */}
      <section className="py-28 bg-[#FAFAFB] border-y border-[#E6E8EC]/60 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-2">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue uppercase tracking-wide">
              <WordReveal text="Conference Facilities" className="text-brand-blue" />
            </h2>
            <div className="w-8 h-[2px] bg-brand-orange mx-auto rounded-sm mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {facilities.map((fac, index) => {
              const IconComp = fac.icon;
              return (
                <Reveal
                  key={index}
                  delay={(index % 5) * 0.08}
                  className="relative bg-[#FCFCFC] border border-[#E6E8EC] rounded-2xl p-7 flex flex-col justify-between"
                >
                  <div className="space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-brand-orange shrink-0 flex items-center justify-center">
                          <IconComp size={18} />
                        </span>
                        <h3 className="font-serif font-bold text-base text-[#1F4E8C] leading-snug">
                          {fac.name}
                        </h3>
                      </div>
                      <div className="w-full h-[1px] bg-[#E6E8EC]/85 my-3" />
                      <p className="text-[13px] text-[#5F6B7A] font-sans leading-relaxed">
                        {fac.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* LOCATION MAP */}
      <section id="map-section" className="py-24 bg-[#FAFAFB] px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight">
              <WordReveal text="Location & Navigation" className="text-brand-ink" />
            </h2>
            <div className="flex items-center justify-center gap-2 max-w-2xl mx-auto">
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                JK Lakshmipat University &middot; Near Mahindra SEZ, Ajmer Road, Jaipur, Rajasthan 302026, India
              </p>
              <button
                onClick={copyAddress}
                title="Copy Venue Address"
                aria-label="Copy Venue Address"
                className="p-1.5 rounded-md hover:bg-slate-200/60 text-slate-500 hover:text-brand-orange transition-all shrink-0 cursor-pointer flex items-center justify-center border border-slate-200/60 bg-white shadow-2xs"
              >
                {copied ? (
                  <span className="text-xs font-bold text-emerald-600 px-1">✓ Copied!</span>
                ) : (
                  <CopyIcon size={14} className="text-slate-500 hover:text-brand-orange" />
                )}
              </button>
            </div>
            <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-sm" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-6 items-stretch">
            {/* Map Iframe */}
            <div className="col-span-2 lg:col-span-6 order-1 lg:order-2 border border-[#E6E8EC] shadow-md rounded-[18px] overflow-hidden min-h-[350px] sm:min-h-[420px] h-full bg-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1052887370965!2d75.64772927502109!3d26.83660327669258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4af4fe68f403%3A0x3bf05f95df22b8c4!2sJK%20Lakshmipat%20University!5e0!3m2!1sen!2sin!4v1779876968774!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '350px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JK Lakshmipat University Map Location"
                id="jklu-venue-map-iframe"
              />
            </div>

            {/* Google Maps Card */}
            <div className="col-span-1 lg:col-span-3 order-2 lg:order-1 bg-[#FCFCFC] border border-[#E6E8EC] rounded-[18px] p-4 sm:p-6 flex flex-col justify-between items-center text-center shadow-sm gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4 w-full flex flex-col items-center">
                <span className="text-[#1A73E8] font-black uppercase tracking-widest text-[10px] sm:text-xs">Google Maps</span>
                <div className="p-2 sm:p-3 bg-white border border-[#E6E8EC] rounded-xl shadow-sm w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https%3A%2F%2Fmaps.app.goo.gl%2FBr41eEjiNpgZaDjA9%3Fg_st%3Daw"
                    alt="Scan for Google Maps"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/Br41eEjiNpgZaDjA9?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-white hover:bg-[#F8F9FA] text-[#3C4043] hover:text-[#1A73E8] border border-[#DADCE0] hover:border-[#BDC1C6] font-semibold py-2.5 sm:py-3 px-2 sm:px-4 transition-all rounded-xl flex items-center justify-center gap-2 sm:gap-2.5 cursor-pointer text-[11px] sm:text-xs shadow-xs hover:shadow-md group"
              >
                <Image
                  src="/logos/gmaps logo.webp"
                  alt="Google Maps Logo"
                  width={20}
                  height={20}
                  className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 object-contain"
                />
                <span className="leading-tight text-center">
                  Open in <br className="sm:hidden" />Google Maps
                </span>
              </a>
            </div>

            {/* Apple Maps Card */}
            <div className="col-span-1 lg:col-span-3 order-3 lg:order-3 bg-[#FCFCFC] border border-[#E6E8EC] rounded-[18px] p-4 sm:p-6 flex flex-col justify-between items-center text-center shadow-sm gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4 w-full flex flex-col items-center">
                <span className="text-black font-black uppercase tracking-widest text-[10px] sm:text-xs">Apple Maps</span>
                <div className="p-2 sm:p-3 bg-white border border-[#E6E8EC] rounded-xl shadow-sm w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https%3A%2F%2Fmaps.apple%2Fp%2FV7C2aunFdCLYnJ"
                    alt="Scan for Apple Maps"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="w-full space-y-2.5">
                <a
                  href="https://maps.apple/p/V7C2aunFdCLYnJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-black hover:bg-[#1C1C1E] text-white font-semibold py-2.5 sm:py-3 px-2 sm:px-4 transition-all rounded-xl flex items-center justify-center gap-2 sm:gap-2.5 cursor-pointer text-[11px] sm:text-xs shadow-xs hover:shadow-md border border-white/10 group"
                >
                  <AppleIcon size={16} className="shrink-0 text-white" />
                  <span className="leading-tight text-center">
                    Open in <br className="sm:hidden" />Apple Maps
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO REACH */}
      <section id="how-to-reach" className="py-24 bg-white border-t border-[#E6E8EC]/80 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-brand-blue uppercase tracking-tight">
              <WordReveal text="Getting to SANKALP'27" className="text-brand-blue" />
            </h2>
            <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-sm" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* BY AIR */}
            <Reveal delay={0.1} className="bg-[#FCFCFC] border border-[#E6E8EC] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E6E8EC] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
                      <PlaneIcon size={22} />
                    </span>
                    <div>
                      <h3 className="font-serif font-bold text-2xl text-brand-blue">By Air</h3>
                    </div>
                  </div>
                </div>

                {/* 3-POINT DOTTED CONNECTED TIMELINE */}
                <div className="space-y-4">
                  
                  {/* Desktop: Smooth Horizontal Wavy Dotted Route */}
                  <div className="hidden sm:block relative pt-2 pb-2">
                    {/* Orange Wavy Dotted Connecting Line */}
                    <svg className="absolute inset-x-0 top-3 h-10 w-full pointer-events-none z-0 overflow-visible" viewBox="0 0 400 40" preserveAspectRatio="none">
                      <path
                        d="M 66,20 C 115,6 150,34 200,20 C 250,6 285,34 334,20"
                        fill="none"
                        stroke="#f5821e"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeOpacity="0.8"
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="grid grid-cols-3 gap-2 relative z-10 text-center">
                      {/* Node 1: AIRPORT */}
                      <div className="flex flex-col items-center space-y-1.5">
                        <div className="w-9 h-9 rounded-full bg-white border-2 border-brand-orange text-brand-orange flex items-center justify-center shadow-xs">
                          <PlaneIcon size={20} />
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-wider text-brand-orange block">AIRPORT</span>
                          <h4 className="font-bold text-brand-blue text-xs leading-snug">Jaipur International<br />Airport</h4>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Approx. 24 km</span>
                        </div>
                      </div>

                      {/* Node 2: CAB / TAXI */}
                      <div className="flex flex-col items-center space-y-1.5">
                        <div className="w-9 h-9 rounded-full bg-white border-2 border-brand-blue text-brand-blue flex items-center justify-center shadow-xs">
                          <CarIcon size={21} />
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-wider text-brand-orange block">CAB / TAXI</span>
                          <h4 className="font-bold text-brand-blue text-xs leading-snug">Recommended<br />Transport</h4>
                        </div>
                      </div>

                      {/* Node 3: VENUE */}
                      <div className="flex flex-col items-center space-y-1.5">
                        <div className="w-9 h-9 rounded-full bg-white border-2 border-brand-orange text-brand-orange flex items-center justify-center shadow-xs">
                          <BuildingIcon size={20} />
                        </div>
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-wider text-brand-orange block">VENUE</span>
                          <h4 className="font-bold text-brand-blue text-xs leading-snug">JK Lakshmipat<br />University</h4>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Mahapura, Ajmer Rd</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile: Smooth Vertical Wavy Dotted Route */}
                  <div className="sm:hidden relative pl-6 space-y-5 py-1">
                    {/* Vertical Orange Wavy Dotted Line */}
                    <svg className="absolute left-[15px] top-4 bottom-6 w-8 -translate-x-1/2 pointer-events-none z-0 overflow-visible" viewBox="0 0 32 180" preserveAspectRatio="none">
                      <path
                        d="M 16,10 C 28,45 4,75 16,90 C 28,105 4,135 16,170"
                        fill="none"
                        stroke="#f5821e"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        strokeOpacity="0.8"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Node 1 */}
                    <div className="relative flex items-start gap-3">
                      <div className="absolute -left-[24px] top-0 w-8 h-8 rounded-full bg-white border-2 border-brand-orange text-brand-orange flex items-center justify-center shadow-xs z-10">
                        <PlaneIcon size={16} />
                      </div>
                      <div className="pl-4">
                        <span className="text-[9px] font-black uppercase tracking-wider text-brand-orange block">AIRPORT</span>
                        <h4 className="font-bold text-brand-blue text-xs">Jaipur International Airport</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Approx. 24 km to venue</span>
                      </div>
                    </div>

                    {/* Node 2 */}
                    <div className="relative flex items-start gap-3">
                      <div className="absolute -left-[24px] top-0 w-8 h-8 rounded-full bg-white border-2 border-brand-blue text-brand-blue flex items-center justify-center shadow-xs z-10">
                        <CarIcon size={17} />
                      </div>
                      <div className="pl-4">
                        <span className="text-[9px] font-black uppercase tracking-wider text-brand-orange block">CAB / TAXI</span>
                        <h4 className="font-bold text-brand-blue text-xs">Recommended Transport</h4>
                      </div>
                    </div>

                    {/* Node 3 */}
                    <div className="relative flex items-start gap-3">
                      <div className="absolute -left-[24px] top-0 w-8 h-8 rounded-full bg-white border-2 border-brand-orange text-brand-orange flex items-center justify-center shadow-xs z-10">
                        <BuildingIcon size={16} />
                      </div>
                      <div className="pl-4">
                        <span className="text-[9px] font-black uppercase tracking-wider text-brand-orange block">VENUE</span>
                        <h4 className="font-bold text-brand-blue text-xs">JK Lakshmipat University</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Mahapura, Ajmer Road</span>
                      </div>
                    </div>
                  </div>

                  {/* Inline Muted Recommendation Note */}
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed pt-3 border-t border-[#E6E8EC]/80">
                    For a faster and more convenient journey, a cab or taxi is recommended, as other public transport options may require significantly more travel time.
                  </p>

                </div>
              </div>

              <div className="pt-6 border-t border-[#E6E8EC] mt-6">
                <a
                  href="https://www.google.com/maps/dir/Jaipur+International+Airport,+Jaipur,+Rajasthan/JK+Lakshmipat+University,+Jaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs shadow-xs hover:shadow-md cursor-pointer group"
                >
                  <span>Get Directions →</span>
                </a>
              </div>
            </Reveal>

            {/* BY BUS */}
            <Reveal delay={0.2} className="bg-[#FCFCFC] border border-[#E6E8EC] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E6E8EC] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
                      <BusIcon size={22} />
                    </span>
                    <div>
                      <h3 className="font-serif font-bold text-2xl text-brand-blue">By Bus</h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-brand-blue uppercase tracking-wider block">Major Bus Drop-Off Points</span>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { point: '200 Feet Bypass', map: 'https://www.google.com/maps/dir/200+Feet+Bypass+Jaipur/JK+Lakshmipat+University+Jaipur' },
                      { point: 'Durgapura', map: 'https://www.google.com/maps/dir/Durgapura+Jaipur/JK+Lakshmipat+University+Jaipur' },
                      { point: 'Sindhi Camp', map: 'https://www.google.com/maps/dir/Sindhi+Camp+Jaipur/JK+Lakshmipat+University+Jaipur' },
                      { point: 'Chomu Puliya', map: 'https://www.google.com/maps/dir/Chomu+Puliya+Jaipur/JK+Lakshmipat+University+Jaipur' },
                    ].map((loc, i) => (
                      <div key={i} className="bg-white p-2.5 rounded-lg border border-[#E6E8EC] flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-slate-900 block">{loc.point}</span>
                          <span className="text-[10px] text-slate-400 font-medium">Distance varies by route &middot; Cab / Auto</span>
                        </div>
                        <a
                          href={loc.map}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-brand-orange hover:text-brand-blue transition-colors shrink-0 pl-2"
                        >
                          Directions →
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* VISUAL ROUTE */}
                  <div className="py-2.5 px-4 bg-slate-50 rounded-xl border border-slate-200/70 text-center space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Travel Route Visualization</span>
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-brand-blue">
                      <span>Bus Drop-Off</span>
                      <span className="text-brand-orange">→</span>
                      <span className="bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded text-[11px]">Cab / Auto</span>
                      <span className="text-brand-orange">→</span>
                      <span>JKLU Campus</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E6E8EC] mt-6">
                <a
                  href="https://www.google.com/maps/dir/Sindhi+Camp+Bus+Stand+Jaipur/JK+Lakshmipat+University+Jaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs shadow-xs hover:shadow-md cursor-pointer group"
                >
                  <span>Get Directions →</span>
                </a>
              </div>
            </Reveal>

            {/* BY TRAIN */}
            <Reveal delay={0.3} className="bg-[#FCFCFC] border border-[#E6E8EC] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#E6E8EC] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
                      <TrainIcon size={22} />
                    </span>
                    <div>
                      <h3 className="font-serif font-bold text-2xl text-brand-blue">By Train</h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-xl border border-[#E6E8EC] space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Starting Point</span>
                    <h4 className="font-bold text-slate-900 text-sm">Jaipur Junction / Railway Station</h4>
                    <p className="text-xs text-slate-500 font-medium">Destination: JK Lakshmipat University, Mahapura, Ajmer Road</p>
                    <p className="text-xs text-brand-orange font-bold pt-1">Recommended: Cab / Taxi &middot; Approx. 20 km</p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-[#E6E8EC] space-y-1">
                    <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block">Alternative Route</span>
                    <h5 className="font-bold text-slate-900 text-xs">METRO + LAST-MILE CAB</h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      "Jaipur Metro can be used for the city portion of the journey, followed by a cab or auto for the final leg to JK Lakshmipat University."
                    </p>
                  </div>

                  {/* VISUAL ROUTE */}
                  <div className="py-2.5 px-4 bg-slate-50 rounded-xl border border-slate-200/70 text-center space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Travel Route Visualization</span>
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-brand-blue">
                      <span>Jaipur Jn</span>
                      <span className="text-brand-orange">→</span>
                      <span className="bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded text-[11px]">Cab / Metro+Cab</span>
                      <span className="text-brand-orange">→</span>
                      <span>JKLU Campus</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E6E8EC] mt-6">
                <a
                  href="https://www.google.com/maps/dir/Jaipur+Junction+Railway+Station/JK+Lakshmipat+University+Jaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-xs shadow-xs hover:shadow-md cursor-pointer group"
                >
                  <span>Get Directions →</span>
                </a>
              </div>
            </Reveal>

          </div>

        </div>
      </section>



      {/* RECOMMENDED HOTELS */}
      <section className="py-24 bg-white border-t border-[#E6E8EC]/60 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight">
              <WordReveal text="Recommended Hotels" className="text-brand-ink" />
            </h2>
            <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotels.map((hotel, index) => (
              <Reveal
                key={index}
                delay={(index % 4) * 0.08}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-200/80 bg-[#0b1220] flex flex-col justify-between group hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={hotel.src}
                  alt={hotel.name}
                  fill
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />

                {/* Top Badges */}
                <div className="relative z-10 p-4 flex items-center justify-between gap-2">
                  <span className="bg-brand-orange text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm">
                    {hotel.badgeText}
                  </span>
                  <span className="bg-slate-900/75 backdrop-blur-md border border-white/15 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm">
                    {hotel.category}
                  </span>
                </div>

                {/* Content Gradient Overlay */}
                <div className="relative inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1220]/95 via-[#0b1220]/70 to-transparent flex flex-col justify-end p-5 z-10 space-y-2">
                  <h3 className="font-serif font-bold text-white text-base sm:text-lg leading-snug drop-shadow-sm group-hover:text-amber-200 transition-colors">
                    {hotel.name}
                  </h3>
                  <p className="text-slate-300 text-xs font-medium leading-relaxed">
                    {hotel.distance}
                  </p>

                  <div className="pt-1">
                    <a
                      href={hotel.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-bold text-brand-orange hover:text-white hover:translate-x-1 transition-all gap-1 cursor-pointer"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WEATHER */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue uppercase tracking-wide">
            <WordReveal text="Weather During the Conference" className="text-brand-blue" />
          </h2>
          <p className="text-[#5F6B7A] text-sm sm:text-base font-sans leading-relaxed">
            March offers pleasant weather in Jaipur, providing comfortable conditions for conference sessions, networking events, and campus activities.
          </p>
        </div>

        <div className="bg-brand-blue text-white rounded-[18px] p-8 sm:p-10 space-y-8 relative overflow-hidden shadow-md">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 relative z-10 font-sans">
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

      {/* DISCOVER JAIPUR */}
      <section className="py-24 bg-white border-y border-[#E6E8EC]/60 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-brand-ink uppercase tracking-tight">
              <WordReveal text="Discover Jaipur" className="text-brand-ink" />
            </h2>
            <div className="w-16 h-1.5 bg-brand-orange mx-auto rounded-sm" />
            <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Explore Jaipur's rich cultural heritage and iconic landmarks during your visit to JKLU SANKALP 2027.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((att, index) => (
              <Reveal
                key={index}
                delay={(index % 3) * 0.1}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-200/80 bg-[#0b1220] flex flex-col justify-end"
              >
                <Image
                  src={att.src}
                  alt={att.name}
                  fill
                  className="object-cover opacity-90"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Content Gradient Overlay - Name Only */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/90 via-[#0b1220]/25 to-transparent flex items-end p-5 z-10">
                  <h3 className="font-serif font-bold text-white text-lg sm:text-xl leading-snug drop-shadow-sm">
                    {att.name}
                  </h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-brand-blue text-white text-center px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:16px_16px]"></div>
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase tracking-tight">
              <WordReveal text="Join Us at JKLU SANKALP 2027" className="text-white" />
            </h2>
            <div className="w-16 h-1 bg-brand-orange mx-auto rounded-sm" />
          </div>

          <p className="text-base sm:text-lg text-white/95 max-w-xl mx-auto leading-relaxed font-medium">
            Experience world-class research, innovation, and collaboration at JK Lakshmipat University.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/registration"
              className="w-full sm:w-auto text-center bg-brand-orange text-white font-bold py-3 px-8 border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] hover:bg-orange-600 active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#030404] transition-all rounded-md cursor-pointer text-sm"
            >
              Register Now
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto text-center bg-white text-brand-ink font-bold py-3 px-8 border-2 border-brand-ink shadow-[3px_3px_0px_0px_#030404] hover:bg-slate-100 active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#030404] transition-all rounded-md cursor-pointer text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

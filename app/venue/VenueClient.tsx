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

  const hotelCategories = [
    {
      categoryTitle: 'Budget Stays',
      hotels: [
        {
          name: 'Navya Residency',
          distance: 'Near Malot Hospital, Mahindra SEZ',
          badgeText: '7 min Drive',
          category: 'Comfort Stay',
          src: 'https://res.cloudinary.com/flufexsc/image/upload/v1787147525/sankalp/Images/hotels/navya_residency.webp',
          link: 'https://www.google.com/maps/search/Navya+Residency+Mahindra+SEZ+Jaipur'
        },
        {
          name: 'Atulya Green by Meyatri',
          distance: 'Omaxe City, Ajmer Road',
          badgeText: '5 min Drive',
          category: '3-Star Hotel',
          src: 'https://res.cloudinary.com/flufexsc/image/upload/v1787147520/sankalp/Images/hotels/atulya_green.webp',
          link: 'https://www.google.com/maps/search/Atulya+Green+by+Meyatri+Jaipur'
        },
        {
          name: 'Ginger Jaipur, Ajmer Road',
          distance: 'Geejgarh House, Civil Lines / Hawa Sadak',
          badgeText: '20 min Drive',
          category: '3-Star Business Hotel',
          src: '/images/hotels/ginger_hotel.webp',
          link: 'https://www.google.com/maps/search/Ginger+Hotel+Jaipur'
        }
      ]
    },
    {
      categoryTitle: 'Mid-Range Stays',
      hotels: [
        {
          name: 'Ramada by Wyndham Jaipur Jaisinghpura',
          distance: 'Ajmer Road, Jaisinghpura',
          badgeText: '10 min Drive',
          category: '4-Star Hotel',
          src: '/images/hotels/ramada_hotel.webp',
          link: 'https://www.google.com/maps/search/Ramada+by+Wyndham+Jaipur+Jaisinghpura'
        },
        {
          name: 'Pink Pearl Hotel & Fun City',
          distance: 'NH-8, Ajmer Expressway',
          badgeText: '8 min Drive',
          category: 'Resort & Stay',
          src: '/images/hotels/pink_pearl.webp',
          link: 'https://www.google.com/maps/search/Pink+Pearl+Hotel+Jaipur'
        },
        {
          name: 'Four Points by Sheraton Jaipur',
          distance: 'Tonk Road, Jaipur',
          badgeText: '20 min Drive',
          category: '4-Star Business Hotel',
          src: '/images/hotels/four_points.webp',
          link: 'https://www.google.com/maps/search/Four+Points+by+Sheraton+Jaipur'
        }
      ]
    },
    {
      categoryTitle: 'Premium & Luxury Stays',
      hotels: [
        {
          name: 'ITC Rajputana, Jaipur',
          distance: 'Gopal Bari, Jaipur City',
          badgeText: '25 min Drive',
          category: 'Heritage Luxury',
          src: 'https://res.cloudinary.com/flufexsc/image/upload/v1787147524/sankalp/Images/hotels/itc_rajputana.webp',
          link: 'https://www.google.com/maps/search/ITC+Rajputana+Jaipur'
        },
        {
          name: 'Radisson Blu Jaipur',
          distance: 'Durgapura, Jaipur',
          badgeText: '20 min Drive',
          category: 'Premium Stay',
          src: 'https://res.cloudinary.com/flufexsc/image/upload/v1787147528/sankalp/Images/hotels/radisson_blu.webp',
          link: 'https://www.google.com/maps/search/Radisson+Blu+Jaipur'
        },
        {
          name: 'The Oberoi Rajvilas, Jaipur',
          distance: 'Goner Road, Jaipur',
          badgeText: '40 min Drive',
          category: 'Luxury Resort',
          src: 'https://res.cloudinary.com/flufexsc/image/upload/v1787147527/sankalp/Images/hotels/oberoi_rajvilas.webp',
          link: 'https://www.google.com/maps/search/The+Oberoi+Rajvilas+Jaipur'
        }
      ]
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
      src: 'https://res.cloudinary.com/flufexsc/image/upload/v1787147530/sankalp/Images/jaipur_sightseeing/amer_fort.webp',
      mapLink: 'https://maps.google.com/?q=Amer+Fort+Jaipur'
    },
    {
      name: 'Jal Mahal',
      distance: '30 km',
      duration: '1 Hour',
      category: 'Historic Monument',
      desc: 'A breathtaking palace resting silently in the center of the serene Man Sagar Lake.',
      src: 'https://res.cloudinary.com/flufexsc/image/upload/v1787147533/sankalp/Images/jaipur_sightseeing/jal_mahal.webp',
      mapLink: 'https://maps.google.com/?q=Jal+Mahal+Jaipur'
    },
    {
      name: 'City Palace',
      distance: '24 km',
      duration: '2-3 Hours',
      category: 'Royal Palace',
      desc: 'The magnificent royal residence blending traditional Rajasthani and Mughal architectural styles.',
      src: 'https://res.cloudinary.com/flufexsc/image/upload/v1787147531/sankalp/Images/jaipur_sightseeing/city_palace.webp',
      mapLink: 'https://maps.google.com/?q=City+Palace+Jaipur'
    },
    {
      name: 'Albert Hall Museum',
      distance: '23 km',
      duration: '1.5-2 Hours',
      category: 'Museum',
      desc: 'The oldest state museum displaying exceptional industrial art and ancient treasures.',
      src: 'https://res.cloudinary.com/flufexsc/image/upload/v1787147529/sankalp/Images/jaipur_sightseeing/albert_hall.webp',
      mapLink: 'https://maps.google.com/?q=Albert+Hall+Museum+Jaipur'
    },
    {
      name: 'Nahargarh Fort',
      distance: '29 km',
      duration: '1.5-2 Hours',
      category: 'Hill Fort',
      desc: 'A historic hilltop fort offering absolute panoramic sunset views over the Pink City.',
      src: 'https://res.cloudinary.com/flufexsc/image/upload/v1787147536/sankalp/Images/jaipur_sightseeing/nahargarh_fort.webp',
      mapLink: 'https://maps.google.com/?q=Nahargarh+Fort+Jaipur'
    }
  ];

  return (
    <main className="min-h-screen bg-brand-cloud text-brand-ink font-sans selection:bg-brand-orange selection:text-white flex flex-col">
      <Navbar />

      {/* CAMPUS SHOWCASE BANNER */}
      <section ref={heroRef} className="relative pt-[84px] min-h-[380px] sm:min-h-[440px] md:min-h-[480px] w-full overflow-hidden bg-brand-ink flex items-center justify-center">
        <div ref={heroImageRef} className="absolute -inset-y-10 inset-x-0 z-0 will-change-transform">
          <Image
            src="https://res.cloudinary.com/flufexsc/image/upload/v1787147495/sankalp/Images/campus/jklu_campus.webp"
            alt="JK Lakshmipat University Campus - Official Venue for SANKALP 2027 Conference Jaipur"
            title="JK Lakshmipat University Campus - Official Venue for SANKALP 2027 Conference Jaipur"
            fill
            sizes="100vw"
            className="object-cover opacity-50 scale-105"
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/40 to-brand-ink/60" />
        </div>

        <div className="relative z-10 h-full max-w-4xl mx-auto px-6 py-12 sm:py-16 flex flex-col items-center justify-center text-center text-white space-y-4">
          <Image
            src="https://res.cloudinary.com/flufexsc/image/upload/v1787147491/sankalp/logos/white_jklu_logo.webp"
            alt="JK Lakshmipat University Official Logo - SANKALP 2027 Host Institution"
            title="JK Lakshmipat University Official Logo - SANKALP 2027 Host Institution"
            width={220}
            height={70}
            className="h-12 sm:h-16 w-auto object-contain drop-shadow-md"
            priority
            loading="eager"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
            JK Lakshmipat University
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-200 font-medium max-w-xl mx-auto leading-relaxed">
            Near Mahindra World City, P.O. Mahapura, Ajmer Road, Jaipur, Rajasthan 302026, India
          </p>
        </div>
      </section>

      {/* ABOUT THE VENUE */}
      <section id="about-section" className="py-20 md:py-24 px-6 md:px-12 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
              <WordReveal text="About the Venue" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange" />
            </h2>
            <p className="text-slate-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto text-center leading-relaxed font-normal mt-8">
              A serene 30-acre modern campus fostering research excellence, technological innovation, and academic collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal variant="left" className="relative border border-slate-200 shadow-lg rounded-2xl overflow-hidden aspect-[4/3] bg-white">
              <Image
                src="https://res.cloudinary.com/flufexsc/image/upload/v1787147495/sankalp/Images/campus/jklu_campus.webp"
                alt="JK Lakshmipat University Campus - State-of-the-art Academic Facility for SANKALP 2027"
                title="JK Lakshmipat University Campus - State-of-the-art Academic Facility for SANKALP 2027"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </Reveal>

            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-blue tracking-tight leading-tight">
                  Where Innovation Meets Research
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  JK Lakshmipat University (JKLU), Jaipur, is a premier institution distinguished by its advanced research ecosystem, vibrant innovation culture, and strong industry engagement. Featuring a sustainable, eco-friendly campus, state-of-the-art research laboratories, and collaborative learning environments, JKLU serves as a dynamic hub for academia and industry, providing an ideal venue for high-impact international conferences.
                </p>
              </div>

              <div className="space-y-6 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-brand-orange rounded-sm shrink-0" />
                  <span className="text-xs sm:text-sm font-black tracking-[0.25em] uppercase text-brand-blue">Campus Highlights</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

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
        </div>
      </section>

      {/* FACILITIES */}
      <section id="facilities-section" className="py-20 md:py-24 bg-[#FAFAFB] border-b border-slate-200/80 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
              <WordReveal text="Conference Facilities" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange" />
            </h2>
            <p className="text-slate-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-center leading-relaxed font-normal mt-8">
              State-of-the-art academic and digital infrastructure designed to support a seamless conference experience.
            </p>
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
                        <h3 className="font-serif font-bold text-base text-brand-blue leading-snug">
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
      <section id="map-section" className="py-20 md:py-24 bg-white border-b border-slate-200/80 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
              <WordReveal text="Location & Navigation" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange" />
            </h2>
            <div className="flex items-center justify-center gap-2 max-w-2xl mx-auto mt-8">
              <p className="text-slate-700 text-sm sm:text-base md:text-lg text-center leading-relaxed font-normal">
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
                    alt="Scan QR Code for Google Maps Navigation to JK Lakshmipat University SANKALP 2027"
                    title="Scan QR Code for Google Maps Navigation to JK Lakshmipat University SANKALP 2027"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/Br41eEjiNpgZaDjA9?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-white hover:bg-slate-50 text-[#1A73E8] border border-slate-300 font-bold py-3 px-3 transition-all rounded-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-sm hover:shadow hover:-translate-y-0.5 cursor-pointer group"
              >
                <Image
                  src="https://res.cloudinary.com/flufexsc/image/upload/v1787147486/sankalp/logos/gmaps%20logo.webp"
                  alt="Google Maps Navigation to JKLU SANKALP 2027"
                  title="Google Maps Navigation to JKLU SANKALP 2027"
                  width={18}
                  height={18}
                  className="w-4 h-4 shrink-0 object-contain"
                />
                <span className="leading-tight text-center">
                  Google Maps
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
                    alt="Scan QR Code for Apple Maps Navigation to JK Lakshmipat University SANKALP 2027"
                    title="Scan QR Code for Apple Maps Navigation to JK Lakshmipat University SANKALP 2027"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="w-full space-y-2.5">
                <a
                  href="https://maps.apple/p/V7C2aunFdCLYnJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-brand-blue hover:bg-brand-ink text-white font-bold py-3 px-3 transition-all rounded-sm flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-sm hover:shadow hover:-translate-y-0.5 cursor-pointer group"
                >
                  <AppleIcon size={16} className="shrink-0 text-white" />
                  <span className="leading-tight text-center">
                    Apple Maps
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO REACH */}
      <section id="how-to-reach" className="py-20 md:py-24 bg-[#FAFAFB] border-b border-slate-200/80 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
              <WordReveal text="How to Reach the Venue" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange" />
            </h2>
            <p className="text-slate-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-center leading-relaxed font-normal mt-8">
              Jaipur is exceptionally well-connected by air, rail, and road. Here are the most convenient transit options to reach JKLU campus.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* BY AIR */}
            <Reveal delay={0.1} className="bg-white border border-slate-200 rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-sm bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
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
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Prepaid / App Cab</span>
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
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Campus</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile: Vertical Linear Timeline */}
                  <div className="sm:hidden relative pl-6 space-y-6 pt-1 pb-1">
                    {/* Vertical Connecting Line */}
                    <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-dashed border-l-2 border-dashed border-brand-orange/60 pointer-events-none" />

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
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed pt-3 border-t border-slate-200/80">
                    For a faster and more convenient journey, a cab or taxi is recommended, as other public transport options may require significantly more travel time.
                  </p>

                </div>
              </div>

              <div className="pt-6 border-t border-slate-200/80 mt-6">
                <a
                  href="https://www.google.com/maps/dir/Jaipur+International+Airport,+Jaipur,+Rajasthan/JK+Lakshmipat+University,+Jaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-brand-orange text-white py-3 px-4 rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-orange-500 transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>Get Directions →</span>
                </a>
              </div>
            </Reveal>

            {/* BY BUS */}
            <Reveal delay={0.2} className="bg-white border border-slate-200 rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-sm bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
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
                      <div key={i} className="bg-slate-50 p-2.5 rounded-sm border border-slate-200 flex items-center justify-between text-xs">
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
                  <div className="py-2.5 px-4 bg-slate-50 rounded-sm border border-slate-200/70 text-center space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Travel Route Visualization</span>
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-brand-blue">
                      <span>Bus Drop-Off</span>
                      <span className="text-brand-orange">→</span>
                      <span className="bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded-sm text-[11px]">Cab / Auto</span>
                      <span className="text-brand-orange">→</span>
                      <span>JKLU Campus</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200/80 mt-6">
                <a
                  href="https://www.google.com/maps/dir/Sindhi+Camp+Bus+Stand+Jaipur/JK+Lakshmipat+University+Jaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-brand-orange text-white py-3 px-4 rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-orange-500 transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>Get Directions →</span>
                </a>
              </div>
            </Reveal>

            {/* BY TRAIN */}
            <Reveal delay={0.3} className="bg-white border border-slate-200 rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-sm bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center shrink-0">
                      <TrainIcon size={22} />
                    </span>
                    <div>
                      <h3 className="font-serif font-bold text-2xl text-brand-blue">By Train</h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-50 p-4 rounded-sm border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Starting Point</span>
                    <h4 className="font-bold text-slate-900 text-sm">Jaipur Junction / Railway Station</h4>
                    <p className="text-xs text-slate-500 font-medium">Destination: JK Lakshmipat University, Mahapura, Ajmer Road</p>
                    <p className="text-xs text-brand-orange font-bold pt-1">Recommended: Cab / Taxi &middot; Approx. 20 km</p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-sm border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block">Alternative Route</span>
                    <h5 className="font-bold text-slate-900 text-xs">METRO + LAST-MILE CAB</h5>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Jaipur Metro can be used for the city portion of the journey, followed by a cab or auto for the final leg to JK Lakshmipat University.
                    </p>
                  </div>

                  {/* VISUAL ROUTE */}
                  <div className="py-2.5 px-4 bg-slate-50 rounded-sm border border-slate-200/70 text-center space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Travel Route Visualization</span>
                    <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-brand-blue">
                      <span>Jaipur Jn</span>
                      <span className="text-brand-orange">→</span>
                      <span className="bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded-sm text-[11px]">Cab / Metro+Cab</span>
                      <span className="text-brand-orange">→</span>
                      <span>JKLU Campus</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200/80 mt-6">
                <a
                  href="https://www.google.com/maps/dir/Jaipur+Junction+Railway+Station/JK+Lakshmipat+University+Jaipur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-brand-orange text-white py-3 px-4 rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-orange-500 transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>Get Directions →</span>
                </a>
              </div>
            </Reveal>

          </div>

        </div>
      </section>



      {/* RECOMMENDED HOTELS */}
      <section id="hotels-section" className="py-20 md:py-24 bg-white border-b border-slate-200/80 px-6 md:px-12 select-none">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
              <WordReveal text="Recommended Accommodations" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange" />
            </h2>
            <p className="text-slate-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-center leading-relaxed font-normal mt-8">
              Curated partner and nearby hotels across luxury and business categories for conference delegates and speakers.
            </p>
          </div>

          <div className="space-y-16">
            {hotelCategories.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-6">
                {/* Category Subheading - Clean title divider matching Committee page */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-3 h-3 bg-brand-orange rounded-sm shrink-0" />
                  <span className="text-xs sm:text-sm font-black tracking-[0.25em] uppercase text-brand-blue">{cat.categoryTitle}</span>
                  <div className="flex-1 h-px bg-slate-300" />
                </div>

                {/* 3-Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.hotels.map((hotel, index) => (
                    <Reveal
                      key={index}
                      delay={(index % 3) * 0.08}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-200/80 bg-[#0b1220] flex flex-col justify-between group hover:shadow-xl transition-all duration-300"
                    >
                      {hotel.src ? (
                        <Image
                          src={hotel.src}
                          alt={`${hotel.name} - Recommended Delegate Accommodation for SANKALP 2027 JKLU Jaipur`}
                          title={`${hotel.name} - Recommended Delegate Accommodation for SANKALP 2027 JKLU Jaipur`}
                          fill
                          className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        /* Empty Image Placeholder Container */
                        <div className="absolute inset-0 bg-[#121929] flex flex-col items-center justify-center p-4 border border-dashed border-white/20 transition-colors group-hover:border-brand-orange/50">
                          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2 group-hover:bg-brand-orange/10 group-hover:border-brand-orange/30 transition-colors">
                            <svg className="w-6 h-6 text-slate-400 group-hover:text-brand-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="text-[11px] font-bold tracking-widest text-slate-300 uppercase">IMAGE PLACEHOLDER</span>
                          <span className="text-[10px] text-slate-500 font-medium mt-0.5">Photo Coming Soon</span>
                        </div>
                      )}

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
                      <div className="relative inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1220]/95 via-[#0b1220]/75 to-transparent flex flex-col justify-end p-5 z-10 space-y-2">
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
            ))}
          </div>
        </div>
      </section>

      {/* WEATHER */}
      <section id="weather-section" className="py-20 md:py-24 bg-[#FAFAFB] border-b border-slate-200/80 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
              <WordReveal text="Weather & Climate" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange" />
            </h2>
            <p className="text-slate-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-center leading-relaxed font-normal mt-8">
              March offers pleasant spring weather in Jaipur, providing comfortable conditions for conference sessions, networking events, and campus activities.
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
        </div>
      </section>

      {/* DISCOVER JAIPUR */}
      <section id="attractions-section" className="py-20 md:py-24 bg-white border-b border-slate-200/80 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue relative inline-block">
              <WordReveal text="Discover Jaipur" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange" />
            </h2>
            <p className="text-slate-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-center leading-relaxed font-normal mt-8">
              Explore the rich cultural heritage, majestic architecture, and iconic landmarks of the Pink City during your visit to SANKALP 2027.
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
                  alt={`${att.name} - Jaipur Heritage & Sightseeing for SANKALP 2027 Attendees`}
                  title={`${att.name} - Jaipur Heritage & Sightseeing for SANKALP 2027 Attendees`}
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
      <section className="py-20 md:py-24 bg-brand-blue text-white text-center px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:16px_16px]"></div>
        <div className="max-w-3xl mx-auto space-y-10 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white relative inline-block">
              <WordReveal text="Join Us at SANKALP 2027" />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brand-orange" />
            </h2>
            <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto leading-relaxed font-normal mt-8">
              Experience world-class research, innovation, and academic collaboration at JK Lakshmipat University.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/registration"
              className="w-full sm:w-auto text-center bg-brand-orange text-white px-8 py-3.5 rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-orange-500 transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center justify-center"
            >
              Register Now
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto text-center bg-white text-brand-blue px-8 py-3.5 rounded-sm font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-all shadow-md hover:-translate-y-0.5 cursor-pointer flex items-center justify-center"
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

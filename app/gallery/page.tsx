'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

const GALLERY_PHOTOS = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop',
    label: 'Opening Keynote Address',
    desc: 'General assembly and welcome greetings during the inaugural session of the conference.'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop',
    label: 'Interdisciplinary Panel Discussions',
    desc: 'Invited industry professionals debating emerging trends and ethics in systems engineering.'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop',
    label: 'Technical Presentation Tracks',
    desc: 'Scholars and presenters showcasing research papers and answering audience queries.'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1531058020387-3be344559be6?w=800&auto=format&fit=crop',
    label: 'Delegate Networking Sessions',
    desc: 'Exchange of ideas and technical project brainstorming between global delegates.'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop',
    label: 'Q&A Discussions',
    desc: 'Active feedback loops between researchers and the technical review committee.'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop',
    label: 'Interactive Poster Exhibitions',
    desc: 'Visual exhibition of research proofs, computational designs, and project findings.'
  }
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-28 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-semibold mb-8 transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Heading */}
        <div className="border-b border-slate-200 pb-6 mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 uppercase font-sans">
            Conference Gallery
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Visual memories and highlights captured across previous editions of ICATS.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_PHOTOS.map((photo) => (
            <div key={photo.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] w-full bg-slate-100">
                <Image
                  src={photo.src}
                  alt={photo.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  {photo.label}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {photo.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

// Pre-seeded accepted papers dictionary for instant 0ms lookup demo & fallback
const SAMPLE_ACCEPTED_PAPERS: Record<string, { title: string; track: string; authorName: string; authorEmail: string }> = {
  '101': {
    title: 'Energy-Efficient Federated Learning Architectures for Edge Computing in Smart Cities',
    track: 'Track 1: Sustainable AI & Smart Ecosystems',
    authorName: 'Dr. Ramesh Sharma',
    authorEmail: 'ramesh.sharma@jklu.edu.in'
  },
  '102': {
    title: 'Generative AI and Large Language Models in Academic Knowledge Discovery',
    track: 'Track 2: Data Science & Generative AI',
    authorName: 'Prof. Anita Verma',
    authorEmail: 'anita.verma@iitj.ac.in'
  },
  '103': {
    title: 'Low-Power VLSI Architecture Design for High-Throughput Neural Network Accelerators',
    track: 'Track 7: VLSI & Embedded Systems',
    authorName: 'Dr. Vikramaditya Singh',
    authorEmail: 'v.singh@bits-pilani.ac.in'
  },
  '104': {
    title: 'AI-Driven Predictive Diagnostics in Smart Healthcare and Bioinformatics',
    track: 'Track 4: Smart Healthcare & Bioinformatics',
    authorName: 'Dr. Meenakshi Sundaram',
    authorEmail: 'meenakshi.s@aiims.edu'
  },
  '105': {
    title: 'Quantum-Resistant Cryptographic Protocols for Next-Gen 6G Wireless Networks',
    track: 'Track 3: High Performance Computing & Emerging Technologies',
    authorName: 'Prof. Rajesh K. Gupta',
    authorEmail: 'rkgupta@nitj.ac.in'
  }
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawId = searchParams.get('id') || '';
    const cleanId = rawId.trim().toUpperCase().replace(/^(PAPER|SANKALP)[-_]?/i, '');

    if (!rawId.trim()) {
      return NextResponse.json({ error: 'Paper ID is required' }, { status: 400 });
    }

    // 1. Check pre-seeded / local dictionary first
    if (SAMPLE_ACCEPTED_PAPERS[cleanId] || SAMPLE_ACCEPTED_PAPERS[rawId.trim()]) {
      const paper = SAMPLE_ACCEPTED_PAPERS[cleanId] || SAMPLE_ACCEPTED_PAPERS[rawId.trim()];
      return NextResponse.json({ success: true, paper });
    }

    // 2. Query Firestore acceptedPapers collection
    try {
      const docSnap = await adminDb.collection('acceptedPapers').doc(cleanId).get();
      if (docSnap.exists) {
        const data = docSnap.data();
        return NextResponse.json({
          success: true,
          paper: {
            title: data?.title || '',
            track: data?.track || '',
            authorName: data?.authorName || '',
            authorEmail: data?.authorEmail || '',
          }
        });
      }

      // Query by paperId field
      const querySnap = await adminDb.collection('acceptedPapers')
        .where('paperId', '==', cleanId)
        .limit(1)
        .get();

      if (!querySnap.empty) {
        const data = querySnap.docs[0].data();
        return NextResponse.json({
          success: true,
          paper: {
            title: data?.title || '',
            track: data?.track || '',
            authorName: data?.authorName || '',
            authorEmail: data?.authorEmail || '',
          }
        });
      }
    } catch (dbErr: any) {
      console.warn("Firestore acceptedPapers query skipped:", dbErr.message);
    }

    // If not found in database, return not found response
    return NextResponse.json({
      success: false,
      message: 'Paper ID not found in pre-accepted database. You may enter details manually.'
    });

  } catch (error: any) {
    console.error("Error fetching paper details:", error);
    return NextResponse.json({ error: 'Failed to fetch paper details' }, { status: 500 });
  }
}

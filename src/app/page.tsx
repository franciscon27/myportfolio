'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Rabbit from '../components/Rabbit';
import '../app/globals.css';

export default function Landing() {
  const router = useRouter();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    // total animation length before navigating (ms)
    const timer = setTimeout(() => router.push('/portfolio'), 4200);
    return () => clearTimeout(timer);
  }, [started, router]);

  return (
    <div className="landing min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="scene text-center">
        <h2 className="lead text-2xl font-semibold text-black dark:text-white">follow the rabbit...</h2>
        <div className="rabbit-area mt-8">
          <Rabbit enter={started} />
          <div className={`hole ${started ? 'open' : ''}`} aria-hidden />
        </div>
        <button
          className="mt-10 px-6 py-2 rounded-full bg-black text-white hover:bg-red-600"
          onClick={() => setStarted(true)}
        >
          Enter
        </button>
        <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">...into the rabbit hole.</p>
      </div>
    </div>
  );
}

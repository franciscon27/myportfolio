// src/app/about/page.tsx
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Sobre */}
      <section className="py-28 px-6 md:px-12 lg:px-24 border-b border-neutral-200">
        <div className="max-w-4xl">
          <span className="text-sm font-semibold tracking-widest text-neutral-500 uppercase mb-4 block">
            The Mind Behind
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Founder &<br />Creative Director
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl">
            I blend art direction, motion, and web development, with a focus on cohesive, 
            motion-driven brand systems. Working from concept to execution, I design experiences 
            guided by clarity, intent, and precision.
          </p>
        </div>
      </section>

      {/* Filosofia */}
      <section className="py-20 px-6 md:px-12 lg:px-24 border-b border-neutral-200">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">The Philosophy</h2>
            <div className="space-y-6 text-neutral-600">
              <p>
                I believe aesthetics only matter when they serve a clear purpose. Every pixel, 
                every animation, every interaction must be intentional.
              </p>
              <p>
                From small to large-scale projects, I lead independently or assemble tailored 
                teams as needed. Through my studio, I partner closely with brands seeking 
                meaningful growth.
              </p>
              <p>
                Remaining deeply involved to ensure every decision is intentional and built to last.
              </p>
            </div>
          </div>
          
          {/* Placeholder para imagem/foto */}
          <div className="relative h-100 bg-neutral-100 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-neutral-400">Your Photo / Illustration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experiência Timeline */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <h2 className="text-4xl font-bold mb-12 text-center">Journey & Milestones</h2>
        
        <div className="max-w-3xl mx-auto">
          {[
            { year: '2019', title: 'Founded Studio', desc: 'Started independent practice after agency experience' },
            { year: '2020', title: 'Motion-First Approach', desc: 'Developed signature motion-driven methodology' },
            { year: '2022', title: 'International Clients', desc: 'Expanded to work with global brands' },
            { year: '2024', title: 'Teaching & Mentoring', desc: 'Started sharing knowledge through workshops' },
          ].map((item) => (
            <motion.div 
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-8 py-8 border-b border-neutral-200 last:border-0"
            >
              <div className="shrink-0">
                <span className="text-2xl font-bold text-neutral-900">{item.year}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-neutral-600">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
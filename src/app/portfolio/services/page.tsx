// src/app/services/page.tsx
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'Motion Systems',
    description: 'Creating fluid motion identities that bring brands to life across all digital touchpoints.',
    features: [
      'Motion Design Language',
      'Interactive Prototypes',
      'Micro-interactions',
      'Lottie Animations'
    ],
    price: 'From €5,000'
  },
  {
    title: 'Web Development',
    description: 'Building performant, accessible websites with modern frameworks and best practices.',
    features: [
      'Next.js / React Development',
      'Headless CMS Integration',
      'Performance Optimization',
      'SEO Implementation'
    ],
    price: 'From €8,000'
  },
  {
    title: 'Brand Identity',
    description: 'Developing cohesive visual systems that communicate clearly and memorably.',
    features: [
      'Logo & Visual Identity',
      'Brand Guidelines',
      'Design Systems',
      'Asset Production'
    ],
    price: 'From €6,500'
  }
];

const processSteps = [
  { number: '01', title: 'Discovery', desc: 'Understanding your goals, audience, and vision.' },
  { number: '02', title: 'Strategy', desc: 'Defining the approach and creating the roadmap.' },
  { number: '03', title: 'Design', desc: 'Developing visual concepts and motion prototypes.' },
  { number: '04', title: 'Development', desc: 'Building the final product with precision.' },
  { number: '05', title: 'Launch', desc: 'Testing, optimizing, and deploying.' },
  { number: '06', title: 'Support', desc: 'Ongoing maintenance and improvements.' },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-28 px-6 md:px-12 lg:px-24 border-b border-neutral-200">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Services &<br />Expertise
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl">
            Over the last decade, I&apos;ve refined a wide range of skills in digital design, 
            offering services mastered to perfection and always driven by the purpose of motion.
          </p>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-20 px-6 md:px-12 lg:px-24 border-b border-neutral-200">
        <div className="grid md:grid-cols-3 gap-12">
          {services.map((service) => (
            <div key={service.title} className="border border-neutral-200 rounded-2xl p-8 hover:border-neutral-300 transition-colors">
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-neutral-600 mb-6">{service.description}</p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-6 border-t border-neutral-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">{service.price}</span>
                  <Link 
                    href="/contact" 
                    className="text-accent font-medium hover:text-accent-dark transition-colors"
                  >
                    Inquire →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Processo */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <h2 className="text-4xl font-bold mb-16 text-center">The Process</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {processSteps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="text-6xl font-black text-neutral-200 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-neutral-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
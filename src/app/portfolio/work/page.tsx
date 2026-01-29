// src/app/work/page.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

// Tipos para os projetos
type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  year: string;
  featured: boolean;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Motion Identity System',
    category: 'Branding',
    description: 'Complete motion-driven brand system for tech startup',
    year: '2024',
    featured: true,
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    category: 'Web Development',
    description: 'High-performance online store with custom interactions',
    year: '2023',
    featured: true,
  },
  {
    id: 3,
    title: 'Corporate Website Redesign',
    category: 'Web Design',
    description: 'Complete overhaul of enterprise company website',
    year: '2023',
    featured: false,
  },
  {
    id: 4,
    title: 'Product Launch Campaign',
    category: 'Motion Graphics',
    description: 'Animated campaign for new product introduction',
    year: '2022',
    featured: true,
  },
  {
    id: 5,
    title: 'Mobile App UI/UX',
    category: 'Product Design',
    description: 'User interface for fitness tracking application',
    year: '2022',
    featured: false,
  },
  {
    id: 6,
    title: 'Annual Report Design',
    category: 'Print & Digital',
    description: 'Interactive digital report with print counterpart',
    year: '2021',
    featured: false,
  },
];

export default function WorkPage() {
  const [filter, setFilter] = useState<string>('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const categories = ['all', ...new Set(projects.map(p => p.category))];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 px-6 md:px-12 lg:px-24 border-b border-neutral-200">
        <div className="max-w-6xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Selected Work</h1>
          <p className="text-xl text-neutral-600 max-w-3xl">
            A curated selection of projects that represent my approach to 
            motion-driven digital experiences.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-10 px-6 md:px-12 lg:px-24 border-b border-neutral-200">
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Grid de Projetos */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/work/${project.id}`}>
                <div className="aspect-square bg-neutral-100 rounded-lg mb-6 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <span className="text-neutral-400">Project Visual</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="text-xs font-semibold px-2 py-1 bg-accent/10 text-accent rounded">
                      Featured
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                
                <p className="mt-3 text-neutral-600">
                  {project.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
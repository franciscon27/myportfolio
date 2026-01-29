// src/components/VerticalMenu.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, User, Briefcase, Mail, Rabbit, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: <Home className="w-5 h-5" />, label: 'Home', href: '/', color: 'text-red-400' },
  { icon: <User className="w-5 h-5" />, label: 'About', href: '/portfolio/about', color: 'text-red-300' },
  { icon: <Briefcase className="w-5 h-5" />, label: 'Work', href: '/portfolio/work', color: 'text-red-200' },
  { icon: <Mail className="w-5 h-5" />, label: 'Contact', href: '/portfolio/contact', color: 'text-red-100' },
  { icon: <Rabbit className="w-5 h-5" />, label: 'Back to Rabbit', href: '/', color: 'text-red-500' },
];

export default function VerticalMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Só mostra menu no portfolio, não na landing page
  useEffect(() => {
    setIsVisible(pathname.includes('/portfolio'));
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <>
      {/* Botão Hamburguer Vertical - Estilo Alice */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1.5 p-3 bg-black/80 backdrop-blur-md rounded-xl hover:bg-black transition-all duration-300 border border-red-500/30 hover:border-red-500/60 group"
        aria-label="Open wonderland menu"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Três pontos animados */}
        <motion.div
          className="w-2 h-2 rounded-full bg-red-500"
          animate={isOpen ? { rotate: 45, y: 6 } : {}}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-red-500"
          animate={isOpen ? { opacity: 0 } : {}}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-red-500"
          animate={isOpen ? { rotate: -45, y: -6 } : {}}
          transition={{ duration: 0.3 }}
        />
        
        {/* Tooltip sutil */}
        <div className="absolute right-full mr-3 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Curious?
        </div>
      </motion.button>

      {/* Menu Deslizante - Estilo Wonderland */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay escuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu lateral */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 200 
              }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-linear-to-b from-black via-gray-900 to-black backdrop-blur-xl border-l border-red-500/40 shadow-2xl shadow-red-900/20"
            >
              {/* Cabeçalho do Menu */}
              <div className="p-6 border-b border-red-500/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="relative w-10 h-10 bg-linear-to-br from-white to-red-500 rounded-lg flex items-center justify-center"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Rabbit className="w-6 h-6 text-black" />
                      <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300" />
                    </motion.div>
                    <div>
                      <h2 className="text-white font-bold text-xl tracking-wider">WONDERLAND</h2>
                      <p className="text-red-500/70 text-xs font-mono">menu</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="w-5 h-5 text-white group-hover:text-red-400 transition-colors" />
                  </motion.button>
                </div>
                <p className="text-red-500/80 text-sm font-mono italic">
                  &quot;Curiouser and curiouser...&quot;
                </p>
              </div>

              {/* Itens do Menu */}
              <nav className="p-4">
                <ul className="space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${item.color} hover:text-white`}
                      >
                        <motion.div
                          className="p-2 rounded-lg bg-black/50 group-hover:bg-red-500/20 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          {item.icon}
                        </motion.div>
                        <span className="font-medium tracking-wide">{item.label}</span>
                        <motion.span
                          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Rodapé do Menu */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-red-500/30">
                <div className="text-center">
                  <p className="text-white/40 text-sm mb-2 font-mono">
                    Follow the white rabbit...
                  </p>
                  <div className="flex justify-center gap-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 h-1 rounded-full bg-red-500/50"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
import Link from 'next/link';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { motion } from "framer-motion";

interface HeaderProps {
  currentPage: 'home' | 'banking' | 'playground';
}

export function Header({ currentPage }: HeaderProps) {
  const navItems = [
    { name: 'Home', href: '/', active: currentPage === 'home' },
    { name: 'Banking', href: '/banking', active: currentPage === 'banking' },
    { name: 'AI Tool Builder', href: '/playground', active: currentPage === 'playground' },
  ];

  return (
    <header className="flex justify-between items-center p-6 bg-neutral-50 dark:bg-neutral-500">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-bold text-neutral-500 dark:text-neutral-50">
          GenUI AI Assist
        </Link>
        <nav className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                item.active
                  ? 'text-primary-dark'
                  : 'text-neutral-400 dark:text-neutral-200 hover:text-neutral-500 dark:hover:text-neutral-50'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      {currentPage !== 'playground' && (
        <Link href="/playground">
          <motion.div 
            className="group"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-xl transform rotate-3 transition-transform group-hover:rotate-6" />
              <div className="relative bg-primary text-neutral-500 px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                <AutoAwesomeIcon className="text-neutral-500 text-xl animate-pulse" />
                <span className="font-semibold whitespace-nowrap">Create your own AI assist</span>
              </div>
            </div>
          </motion.div>
        </Link>
      )}
    </header>
  );
} 
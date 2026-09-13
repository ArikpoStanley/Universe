'use client';

import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-9 w-9" />;
  const dark = resolvedTheme === 'dark';
  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:border-gold"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? 'sun' : 'moon'}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {dark ? <Sun className="h-4 w-4 text-gold" /> : <Moon className="h-4 w-4 text-gold" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(() => scrollY.on('change', (v) => setScrolled(v > 24)), [scrollY]);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-line/60 bg-background/80 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
          <Link href="/" aria-label="Spring home">
            <Logo />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`link-underline text-[13.5px] font-medium tracking-wide transition-colors ${
                  pathname === l.href ? 'active text-gold' : 'text-muted hover:text-foreground'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="btn-gold hidden !px-5 !py-2.5 text-sm lg:inline-flex"
            >
              Partner with Spring
            </Link>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex h-[72px] items-center justify-between px-5">
              <Logo />
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-8 flex flex-col gap-2 px-8">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ x: 48, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 32, opacity: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={l.href}
                    className={`block border-b border-line/50 py-4 font-display text-3xl font-semibold transition-colors ${
                      pathname === l.href ? 'text-gold' : 'text-foreground'
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8"
              >
                <Link href="/contact" className="btn-gold w-full">
                  Partner with Spring
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

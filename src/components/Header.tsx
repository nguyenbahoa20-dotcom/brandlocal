import React, { useState, useEffect, useRef } from 'react';
import { Phone, Menu, X, ArrowUpRight, ExternalLink, Moon, Sun } from 'lucide-react';
import { profile } from '../config/profile';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenConsultation?: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation, theme, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Shortened to the 4 essential anchors per brief
  const navItems = [
    { label: 'Giới thiệu', href: '#about', id: 'about' },
    { label: 'Dịch vụ', href: '#services', id: 'services' },
    { label: 'Công trình', href: '#projects', id: 'projects' },
    { label: 'Liên hệ', href: '#contact', id: 'contact' },
  ];

  const themeLabel = theme === 'dark' ? 'Chuyển sang giao diện ban ngày' : 'Chuyển sang giao diện ban đêm';
  const themeToggle = (
    <button
      onClick={onToggleTheme}
      type="button"
      aria-label={themeLabel}
      aria-pressed={theme === 'light'}
      title={themeLabel}
      className="inline-flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/80 text-slate-200 transition-colors hover:border-cyan-500/40 hover:text-cyan-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );

  // Scroll detection for header style and active navigation section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);

      const sections = ['hero', 'about', 'services', 'skills', 'projects', 'experience', 'contact'];
      const scrollPos = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on Escape key press or click outside
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-header border-b border-slate-800/80 shadow-md py-2.5 sm:py-3'
          : 'bg-transparent py-3.5 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Brand Logo */}
          <div className="shrink-0">
            <Logo size="md" />
          </div>

          {/* Desktop Navigation: Only visible on lg (1024px) and above */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Điều hướng chính">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors relative rounded-md ${
                    isActive
                      ? 'text-cyan-400 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-cyan-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Action Area: Only visible on lg (1024px) and above */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {themeToggle}

            {/* Quick Call Icon (no visible numbers on desktop per earlier constraint) */}
            <a
              href={`tel:${profile.contact.phone}`}
              className="inline-flex h-9 w-9 items-center justify-center text-slate-200 hover:text-white transition-colors border border-slate-700/80 rounded-lg bg-slate-900/70 hover:bg-slate-800"
              aria-label="Gọi điện thoại trực tiếp"
              title={`Gọi trực tiếp: ${profile.contact.phoneDisplay}`}
            >
              <Phone className="w-4 h-4 text-cyan-400" />
            </a>

            {/* Primary Action Button */}
            <button
              onClick={onOpenConsultation}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] rounded-lg transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap cursor-pointer"
            >
              <span>Yêu Cầu Khảo Sát</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile & Tablet Action Area: Visible on all screens under lg (<1024px: 320px, 375px, 640px, 768px, 820px) */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            {themeToggle}
            
            <a
              href={`tel:${profile.contact.phone}`}
              className="inline-flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center text-cyan-400 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Gọi nhanh"
              title={`Gọi ngay: ${profile.contact.phoneDisplay}`}
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              className="inline-flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Dropdown Menu: Only rendered under lg (< 1024px) */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          id="mobile-nav"
          className="lg:hidden glass-header border-b border-slate-800 px-4 sm:px-6 pt-3 pb-5 space-y-3 mt-2.5 max-h-[calc(100dvh-4.5rem)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150 shadow-2xl"
        >
          {/* Navigation Links Grid: 2 columns on mobile, 4 columns on tablet */}
          <nav className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1" aria-label="Điều hướng thiết bị di động">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-3 rounded-lg text-sm font-medium transition-colors text-center border ${
                    isActive
                      ? 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40 font-semibold'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/80 border-slate-800/70'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action Links & Buttons */}
          <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <a
              href="/admin/index.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/40 rounded-lg transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>Quản trị CMS Decap</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation?.();
              }}
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all cursor-pointer"
            >
              <span>Yêu Cầu Khảo Sát</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={profile.contact.zalo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              <span>Nhắn Zalo Tư Vấn</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

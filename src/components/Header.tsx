import React, { useState, useEffect } from 'react';
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/80 text-slate-200 transition-colors hover:border-cyan-500/40 hover:text-cyan-400 cursor-pointer"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-header border-b border-slate-800/80 shadow-md py-2.5 sm:py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Logo size="md" />
          </div>

          {/* Desktop Navigation: Shortened to 4 core anchors */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
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

          {/* Desktop Right Action Area */}
          <div className="hidden sm:flex items-center gap-2.5">
            {themeToggle}

            {/* CMS Access */}
            <a
              href="/admin/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-cyan-300 hover:text-white transition-colors border border-cyan-500/40 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/60 cursor-pointer"
              title="Mở Decap CMS để quản lý hình ảnh và dự án"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>Quản trị CMS</span>
            </a>

            {/* Quick Call Icon (no visible numbers on desktop per earlier constraint) */}
            <a
              href={`tel:${profile.contact.phone}`}
              className="inline-flex items-center justify-center p-2 text-slate-200 hover:text-white transition-colors border border-slate-700/80 rounded-lg bg-slate-900/70 hover:bg-slate-800"
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

          {/* Mobile Action Controls */}
          <div className="flex sm:hidden items-center gap-2">
            {themeToggle}
            
            <a
              href={`tel:${profile.contact.phone}`}
              className="p-2 text-cyan-400 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800"
              aria-label="Gọi nhanh"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 rounded-lg cursor-pointer"
              aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-header border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 mt-2.5 animate-in fade-in slide-in-from-top-2 duration-150 shadow-xl">
          <nav className="grid grid-cols-2 gap-2 pt-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 border border-slate-800/60 transition-colors text-center"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <a
              href="/admin/index.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-cyan-300 bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-500/40 rounded-lg transition-colors cursor-pointer"
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
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all cursor-pointer"
            >
              <span>Yêu Cầu Khảo Sát Tận Nơi</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={profile.contact.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              <span>Nhắn Zalo Tư Vấn</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

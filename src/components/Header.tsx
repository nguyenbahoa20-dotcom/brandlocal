import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowUpRight, Plus } from 'lucide-react';
import { profile } from '../config/profile';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { label: 'Giới Thiệu', href: '#about', id: 'about' },
    { label: 'Dịch Vụ', href: '#services', id: 'services' },
    { label: 'Kỹ Năng', href: '#skills', id: 'skills' },
    { label: 'Dự Án', href: '#projects', id: 'projects' },
    { label: 'Kinh Nghiệm', href: '#experience', id: 'experience' },
    { label: 'Liên Hệ', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Scrollspy active section
      const sections = ['hero', 'about', 'services', 'skills', 'projects', 'experience', 'contact'];
      const scrollPos = window.scrollY + 120;

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
          ? 'glass-header border-b border-slate-800/80 shadow-lg shadow-black/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Brand / Logo */}
          <div className="flex-shrink-0">
            <Logo size="md" />
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 text-xs font-medium tracking-wide uppercase transition-colors relative ${
                    isActive
                      ? 'text-cyan-400 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-cyan-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Desktop) */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-admin-project-modal'))}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors border border-slate-800 rounded-lg bg-slate-900/60 hover:bg-slate-800 cursor-pointer"
              title="Quản trị & Thêm công trình mới"
            >
              <Plus className="w-3.5 h-3.5 text-cyan-400" />
              <span>Quản Trị</span>
            </button>

            <a
              href={`tel:${profile.contact.phone}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white transition-colors border border-slate-800 rounded-lg bg-slate-900/60 hover:bg-slate-800"
              aria-label="Gọi điện thoại"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span className="tabular-nums font-mono">{profile.contact.phoneDisplay}</span>
            </a>

            <button
              onClick={onOpenConsultation}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] rounded-lg transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] whitespace-nowrap cursor-pointer"
            >
              <span>Yêu Cầu Khảo Sát</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={`tel:${profile.contact.phone}`}
              className="p-2 text-cyan-400 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800"
              aria-label="Gọi nhanh"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
              aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-header border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 mt-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/80 border border-slate-800/60 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-admin-project-modal'));
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>+ Thêm Công Trình / Quản Trị</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation?.();
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all"
            >
              <span>Yêu Cầu Khảo Sát &amp; Báo Giá</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href={profile.contact.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              <span>Nhắn Zalo Ngay ({profile.contact.phoneDisplay})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

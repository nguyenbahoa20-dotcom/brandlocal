import React from 'react';
import { Phone, MessageSquare, ArrowUp } from 'lucide-react';
import { profile } from '../config/profile';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-24 sm:pb-16 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
            
            {/* Col 1: Brand & Bio (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <Logo size="md" />
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                {profile.slogan}. Chuyên gia tư vấn &amp; thi công camera an ninh CCTV, WiFi chịu tải cao và hạ tầng mạng viễn thông doanh nghiệp.
              </p>
              <div className="text-[11px] text-slate-500 font-mono">
                KHU VỰC: {profile.contact.address}
              </div>
            </div>

            {/* Col 2: Navigation Mirror (3 cols) */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Điều Hướng Nhanh
              </div>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-cyan-400 transition-colors">Giới thiệu &amp; Năng lực</a></li>
                <li><a href="#services" className="hover:text-cyan-400 transition-colors">Dịch vụ cung cấp</a></li>
                <li><a href="#skills" className="hover:text-cyan-400 transition-colors">Kỹ năng &amp; Thiết bị</a></li>
                <li><a href="#projects" className="hover:text-cyan-400 transition-colors">Dự án đã thực hiện</a></li>
                <li><a href="#experience" className="hover:text-cyan-400 transition-colors">Kinh nghiệm công tác</a></li>
                <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Liên hệ khảo sát</a></li>
                <li>
                  <a
                    href="/admin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400/90 hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1 font-mono text-[11px] pt-1"
                  >
                    <span>Quản Trị CMS (Decap)</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact Channels (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Thông Tin Trực Tuyến
              </div>
              <div className="space-y-2 text-slate-400">
                <p>
                  <strong className="text-slate-300">Hotline Kỹ Thuật: </strong>
                  <a href={`tel:${profile.contact.phone}`} className="text-cyan-400 font-mono hover:underline">
                    {profile.contact.phoneDisplay}
                  </a>
                </p>
                <p>
                  <strong className="text-slate-300">Email: </strong>
                  <a href={`mailto:${profile.contact.email}`} className="text-slate-300 hover:text-cyan-400 transition-colors">
                    {profile.contact.email}
                  </a>
                </p>
                <p>
                  <strong className="text-slate-300">Zalo: </strong>
                  <a href={profile.contact.zalo} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                    {profile.contact.phoneDisplay} (Hỗ trợ 24/7)
                  </a>
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Copyright & Back to Top */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-center sm:text-left">
              <span>&copy; {new Date().getFullYear()} {profile.name} ({profile.brandName}). Bản quyền thuộc về tác giả.</span>
              <span className="text-slate-700 hidden sm:inline">·</span>
              <a
                href="/admin/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Decap CMS
              </a>
            </div>

            <button
              onClick={scrollToTop}
              type="button"
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <span>Lên đầu trang</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Quick Action Bar for Mobile (Strictly under 15% viewport height cap) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-2.5 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 flex items-center gap-2">
        <a
          href={`tel:${profile.contact.phone}`}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 active:scale-[0.98] transition-transform shadow-md shadow-cyan-500/20"
        >
          <Phone className="w-4 h-4" />
          <span>Gọi Ngay</span>
        </a>

        <a
          href={profile.contact.zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-blue-600 active:scale-[0.98] transition-transform shadow-md shadow-blue-600/20"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Zalo</span>
        </a>

        <a
          href="#contact"
          className="flex items-center justify-center py-2.5 px-3 rounded-xl text-xs font-medium text-slate-200 bg-slate-900 border border-slate-800"
          aria-label="Khảo sát"
        >
          <span>Khảo Sát</span>
        </a>
      </div>
    </>
  );
};

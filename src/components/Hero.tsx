import React, { useState } from 'react';
import { ArrowRight, Phone, ShieldCheck, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { profile } from '../config/profile';

interface HeroProps {
  onOpenConsultation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden tech-grid-bg">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Value Proposition (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Trust Kicker / Experience Badge (Unboxed text with dot per anti-slop guidelines) */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-cyan-300 font-semibold">{profile.badge}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">Thi Công Chuẩn Kỹ Thuật</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-cyan-400 font-mono">
                {profile.title}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
                {profile.name}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-300 pt-1 text-balance">
                {profile.slogan}
              </p>
            </div>

            {/* Sub-description */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {profile.description}
            </p>

            {/* Location & Coverage indicator */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profile.contact.area}</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Thiết bị chính hãng 100% · CO/CQ</span>
              </div>
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onOpenConsultation}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] cursor-pointer whitespace-nowrap"
              >
                <span>Yêu Cầu Khảo Sát Tận Nơi</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors whitespace-nowrap"
              >
                <span>Xem Dự Án Thực Tế</span>
              </a>

              <a
                href={profile.contact.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-blue-400 hover:text-blue-300 bg-blue-950/30 hover:bg-blue-900/40 border border-blue-900/50 transition-colors whitespace-nowrap"
              >
                <span>Nhắn Zalo</span>
              </a>
            </div>

            {/* Quick Experience Metrics Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
              {profile.about.stats.map((stat, i) => (
                <div key={i} className="text-left p-3 rounded-lg bg-slate-900/40 border border-slate-800/60">
                  <div className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-mono tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Decorative Frame Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500/20 via-blue-600/10 to-teal-400/20 rounded-2xl blur-lg opacity-75" />

              {/* Main Visual Container */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
                
                {/* Tech Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 tracking-wider">
                    SYSTEM: SECURE &amp; OPERATIONAL
                  </span>
                  <div className="w-4"></div>
                </div>

                {/* Avatar / Engineer Image Frame */}
                <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square bg-slate-950 flex items-center justify-center p-2">
                  {!avatarError ? (
                    <img
                      src={profile.media.avatar}
                      alt={profile.name}
                      onError={() => setAvatarError(true)}
                      className="w-full h-full object-cover rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    /* Fallback styled container */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900/90 rounded-xl">
                      <div className="w-20 h-20 rounded-full bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-extrabold text-2xl font-mono mb-4">
                        {profile.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <h3 className="text-lg font-bold text-white">{profile.name}</h3>
                      <p className="text-xs text-cyan-400 mt-1">{profile.title}</p>
                      <p className="text-[11px] text-slate-400 mt-3 max-w-xs">
                        Đang bảo vệ hơn 350 hệ thống doanh nghiệp và biệt thự an toàn.
                      </p>
                    </div>
                  )}

                  {/* Floating Tech Pill Badge on Image */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Chuyên Gia Độc Lập</div>
                        <div className="text-[10px] text-slate-400">Trực tiếp tư vấn &amp; thi công</div>
                      </div>
                    </div>
                    <a
                      href={`tel:${profile.contact.phone}`}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Gọi Ngay</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

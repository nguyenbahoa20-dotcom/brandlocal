import React, { useState } from 'react';
import { ArrowRight, Phone, ShieldCheck, MapPin, CheckCircle2, MessageSquare, Wrench, Wifi, Camera, ChevronDown } from 'lucide-react';
import { profile } from '../config/profile';

interface HeroProps {
  onOpenConsultation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <section id="hero" className="relative pt-24 pb-14 lg:pt-32 lg:pb-20 overflow-hidden tech-grid-bg">
      {/* Gentle ambient background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clear, Calm Value Proposition (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Trust statement: Uses existing profile values (Name, Title, Badge) */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-medium text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-cyan-400">{profile.name}</span>
              <span>·</span>
              <span className="text-slate-300">{profile.title}</span>
              <span>·</span>
              <span className="text-slate-400">{profile.badge}</span>
            </div>

            {/* Headline in plain Vietnamese */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.2] text-balance">
                Lắp Đặt Camera An Ninh, Mạng WiFi Nhà Phố &amp; Cửa Hàng
              </h1>
              
              {/* Short plain Vietnamese 1-2 sentence summary for everyday customers */}
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed text-balance max-w-2xl mx-auto lg:mx-0">
                Chuyên tư vấn và lắp đặt camera an ninh rõ nét, phủ sóng WiFi mạnh mẽ và hệ thống mạng ổn định cho nhà phố, quán kinh doanh và văn phòng. Thi công thẩm mỹ, đường dây gọn gàng và hỗ trợ kỹ thuật tận tâm.
              </p>

              {/* Accessible collapsed disclosure for dense technical brands & protocols */}
              <details className="group/tech text-left pt-1">
                <summary className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer list-none select-none py-1">
                  <span>Xem thông tin kỹ thuật</span>
                  <ChevronDown className="w-3.5 h-3.5 text-cyan-400 group-open/tech:rotate-180 transition-transform" />
                </summary>
                <div className="pt-2 text-xs text-slate-400 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <p>{profile.description}</p>
                </div>
              </details>
            </div>

            {/* Coverage & Supported Commitment */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-slate-300 font-medium">{profile.contact.area}</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-300">Thiết bị chính hãng 100% · Đầy đủ CO/CQ</span>
              </div>
            </div>

            {/* Primary & Secondary Call To Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onOpenConsultation}
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] transition-all shadow-md shadow-cyan-500/25 cursor-pointer"
              >
                <span>Yêu Cầu Khảo Sát Tận Nơi</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${profile.contact.phone}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Gọi Trực Tiếp: {profile.contact.phoneDisplay}</span>
              </a>

              <a
                href={profile.contact.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-blue-400 hover:text-blue-300 bg-blue-950/40 hover:bg-blue-900/50 border border-blue-900/60 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Nhắn Zalo</span>
              </a>
            </div>

            {/* At most 3 short factual benefits (reduced from 4 for mobile simplicity) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-left">
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Khảo Sát Tận Nơi</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Đo đạc, tư vấn vị trí lắp đặt và lên dự toán thiết bị tối ưu
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Thiết Bị Chính Hãng</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  100% thương hiệu uy tín, đầy đủ chứng nhận CO/CQ
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-xs">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Hỗ Trợ Kỹ Thuật</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {profile.contact.workingHours}, xử lý nhanh khi có phát sinh
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Clean, Personal Portrait & Service Scope Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm sm:max-w-md space-y-4">
              
              {/* Profile Card */}
              <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
                
                {/* Photo Frame */}
                <div className="relative aspect-[4/3] sm:aspect-square bg-slate-950">
                  {!avatarError ? (
                    <img
                      src={profile.media.avatar}
                      alt={profile.name}
                      onError={() => setAvatarError(true)}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900">
                      <div className="w-20 h-20 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-extrabold text-2xl font-mono mb-3">
                        {profile.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <h3 className="text-lg font-bold text-white">{profile.name}</h3>
                      <p className="text-xs text-cyan-400 mt-0.5">{profile.title}</p>
                    </div>
                  )}

                  {/* Gentle gradient bottom scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />

                  {/* Direct service identification badge: no duplicate call button competing with CTA */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{profile.name}</div>
                      <div className="text-[11px] text-cyan-400">{profile.title}</div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Trực tiếp thi công</span>
                    </div>
                  </div>
                </div>

                {/* Scope of installation summary */}
                <div className="p-4 bg-slate-900/90 space-y-2.5 text-xs text-slate-300">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Hạng Mục Lắp Đặt Tiêu Biểu:
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Camera className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Camera quan sát gia đình, nhà xưởng, chuỗi bán lẻ &amp; F&amp;B</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wifi className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Mạng WiFi phủ sóng rộng, Roaming mượt mà, chịu tải cao</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wrench className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Bảo trì, dọn dẹp tủ mạng, kiểm tra &amp; xử lý sự cố mạng</span>
                    </div>
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

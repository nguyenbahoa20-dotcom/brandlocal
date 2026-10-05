import React from 'react';
import { Camera, Network, ShieldAlert, Server, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';
import { profile } from '../config/profile';

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return <Camera className="w-6 h-6 text-cyan-400" />;
      case 'Network':
        return <Network className="w-6 h-6 text-cyan-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-cyan-400" />;
      case 'Server':
        return <Server className="w-6 h-6 text-cyan-400" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-cyan-400" />;
      default:
        return <Camera className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#080d1a] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-cyan-400 font-mono">
            <span>02. DỊCH VỤ CHUYÊN NGHIỆP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Giải Pháp Kỹ Thuật Toàn Diện Cho Doanh Nghiệp &amp; Gia Đình
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Từ khâu khảo sát thực địa, lên dự toán thiết bị tối ưu chi phí đến thi công thẩm mỹ và hỗ trợ vận hành 24/7.
          </p>
        </div>

        {/* Services Grid (Asymmetric Bento layout per guidelines) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.services.map((service, index) => {
            const isMarquee = service.featured || index === 0;

            return (
              <div
                key={service.id}
                className={`p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group ${
                  isMarquee ? 'lg:col-span-1 border-slate-700/80' : ''
                }`}
              >
                <div className="space-y-4">
                  {/* Top Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                      {renderServiceIcon(service.icon)}
                    </div>
                    {service.featured && (
                      <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded-md">
                        Dịch Vụ Trọng Tâm
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs font-medium text-cyan-400/90 mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="text-xs font-semibold text-slate-300">
                      Hạng mục triển khai tiêu chuẩn:
                    </div>
                    <ul className="space-y-2 text-xs text-slate-400">
                      {service.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Target Audience */}
                  <div className="pt-2 text-[11px] text-slate-500">
                    <strong className="text-slate-400 font-medium">Thích hợp cho: </strong>
                    {service.targetAudience}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-6 mt-4 border-t border-slate-800/60">
                  <button
                    onClick={() => onSelectService?.(service.title)}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer"
                  >
                    <span>Yêu Cầu Báo Giá Dịch Vụ Này</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

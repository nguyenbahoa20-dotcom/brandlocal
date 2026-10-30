import React from 'react';
import { Camera, Network, ShieldCheck, Cpu, Check, Layers, ChevronDown } from 'lucide-react';
import { profile } from '../config/profile';

export const Skills: React.FC = () => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return <Camera className="w-5 h-5 text-cyan-400" />;
      case 'Network':
        return <Network className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      default:
        return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-16 lg:py-24 bg-[#090e1c] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-cyan-400 font-mono">
            <span>THIẾT BỊ &amp; NĂNG LỰC KỸ THUẬT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            Thiết Bị Chính Hãng &amp; Tiêu Chuẩn Kỹ Thuật Bền Vững
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Cam kết 100% linh kiện, mắt camera và thiết bị mạng có nguồn gốc xuất xứ rõ ràng, bảo hành chính hãng từ nhà sản xuất.
          </p>
        </div>

        {/* Primary Focus: Supported Hardware Brands (Clear, Calm, Simple Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {profile.skills.supportedBrands.map((brand, bIdx) => (
            <div
              key={bIdx}
              className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-1.5 hover:border-cyan-500/30 transition-colors"
            >
              <div className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                {brand.name}
              </div>
              <div className="text-[11px] font-semibold text-cyan-400">
                {brand.category}
              </div>
              <div className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                {brand.description}
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Detail: Technical Competencies & Protocols in Accessible Disclosure */}
        <details className="group/skills bg-slate-900/40 border border-slate-800 rounded-2xl p-5 sm:p-6 transition-all">
          <summary className="flex items-center justify-between cursor-pointer list-none select-none">
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Danh Mục Kỹ Năng Kỹ Thuật Chuyên Sâu ({profile.skills.categories.length} nhóm năng lực)
                </h3>
                <p className="text-xs text-slate-400">
                  Cấu hình VLAN, VPN Site-to-Site, cân bằng tải đa WAN, Camera AI nhận diện khuôn mặt... Nhấn để xem chi tiết.
                </p>
              </div>
            </div>
            <ChevronDown className="w-5 h-5 text-slate-400 group-open/skills:rotate-180 transition-transform shrink-0 ml-4" />
          </summary>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 pt-5 border-t border-slate-800/80">
            {profile.skills.categories.map((cat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-3"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800/70">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 shrink-0">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{cat.name}</h4>
                    <p className="text-xs text-slate-400">{cat.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {cat.skillsList.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-1.5 truncate mr-2">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="font-medium text-slate-300 truncate">{skill.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 shrink-0">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </details>

      </div>
    </section>
  );
};

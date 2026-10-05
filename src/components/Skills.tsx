import React from 'react';
import { Camera, Network, ShieldCheck, Cpu, Check, Layers } from 'lucide-react';
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
    <section id="skills" className="py-20 lg:py-28 bg-[#090e1c] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-cyan-400 font-mono">
            <span>03. NĂNG LỰC &amp; THIẾT BỊ LÀM CHỦ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Kỹ Năng Kỹ Thuật Chuyên Sâu &amp; Thiết Bị Đầu Ngành
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Nắm vững nguyên lý viễn thông, liên tục cập nhật công nghệ trí tuệ nhân tạo và chuẩn mực hạ tầng mạng hiện đại.
          </p>
        </div>

        {/* 4 Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {profile.skills.categories.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              {/* Category Header */}
              <div className="flex items-start gap-3.5 mb-5 pb-4 border-b border-slate-800/80">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 shrink-0">
                  {getCategoryIcon(cat.icon)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{cat.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{cat.description}</p>
                </div>
              </div>

              {/* Skills List in Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cat.skillsList.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 truncate mr-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="font-medium text-slate-200 truncate">{skill.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 shrink-0 font-medium">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Supported Hardware Brands */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-lg font-bold text-white">Thương Hiệu Thiết Bị Hợp Tác &amp; Làm Chủ</h3>
            <p className="text-xs text-slate-400 mt-1">
              Cam kết lắp đặt thiết bị chính hãng, có nguồn gốc rõ ràng và hỗ trợ kỹ thuật trực tiếp từ hãng
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {profile.skills.supportedBrands.map((brand, bIdx) => (
              <div
                key={bIdx}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 text-center space-y-1 hover:border-cyan-500/30 transition-colors"
              >
                <div className="text-base font-extrabold text-white tracking-tight">
                  {brand.name}
                </div>
                <div className="text-[11px] font-semibold text-cyan-400">
                  {brand.category}
                </div>
                <div className="text-[11px] text-slate-400 leading-snug line-clamp-2 pt-1">
                  {brand.description}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

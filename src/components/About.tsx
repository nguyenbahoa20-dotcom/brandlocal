import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, Headphones, Award, FileBadge, ChevronDown } from 'lucide-react';
import { profile } from '../config/profile';

export const About: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-cyan-400" />;
      case 'Lock':
        return <Lock className="w-5 h-5 text-cyan-400" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5 text-cyan-400" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="about" className="py-16 lg:py-24 bg-[#090e1c] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-cyan-400 font-mono">
            <span>VỀ NGUYỄN BÁ HÒA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            {profile.about.storyHeading}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Làm việc trực tiếp, tư vấn trung thực theo nhu cầu thực tế của từng gia đình và cơ sở kinh doanh, không vẽ thêm chi phí.
          </p>
        </div>

        {/* 2-Column Story & Commitments */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-8">
          
          {/* Left Column: Personal Story in 2 Short Readable Paragraphs (7 cols) */}
          <div className="lg:col-span-7 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p className="text-slate-300">
              Với hơn 8 năm làm việc trực tiếp tại các công trình từ nhà phố, biệt thự, cửa hàng kinh doanh đến văn phòng và kho xưởng, tôi thấu hiểu rằng một hệ thống camera quan sát rõ nét và kết nối WiFi ổn định là điều cốt lõi để bảo vệ tài sản và duy trì sinh hoạt, kinh doanh thông suốt.
            </p>

            <p className="text-slate-300">
              Tôi trực tiếp khảo sát tận nơi, tư vấn giải pháp sát với nhu cầu thực tế và trực tiếp thi công cẩn thận. Không vẽ thêm thiết bị dư thừa, tối ưu chi phí đầu tư và luôn đồng hành hỗ trợ kỹ thuật chu đáo sau khi bàn giao.
            </p>

            {/* Philosophy highlight card */}
            <div className="p-4 rounded-xl bg-slate-900/80 border-l-4 border-cyan-400 border border-slate-800 space-y-1.5 mt-4">
              <div className="text-xs uppercase tracking-wider font-bold text-cyan-400 font-mono">
                {profile.about.philosophyTitle}
              </div>
              <blockquote className="text-xs sm:text-sm italic font-medium text-slate-200">
                &ldquo;{profile.about.philosophyQuote}&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Right Column: Commitments (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2 pb-1">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>Tiêu Chuẩn Thi Công &amp; Cam Kết</span>
            </h3>

            <div className="space-y-3">
              {profile.about.commitments.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-colors flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-slate-800/80 shrink-0 mt-0.5">
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Biographical Technical Details & Certifications behind Collapsed Accessible Disclosure */}
        <div className="pt-2">
          <details className="group/techbio bg-slate-900/40 border border-slate-800 rounded-2xl p-5 sm:p-6 transition-all">
            <summary className="flex items-center justify-between cursor-pointer list-none select-none">
              <div className="flex items-center gap-2.5">
                <FileBadge className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Xem Thêm Kinh Nghiệm Kỹ Thuật &amp; Chứng Chỉ Chuyên Ngành ({profile.certifications.length})
                  </h3>
                  <p className="text-xs text-slate-400">
                    Quy chuẩn thi công doanh nghiệp và chứng chỉ từ Cisco, MikroTik, Hikvision, Dahua...
                  </p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-slate-400 group-open/techbio:rotate-180 transition-transform shrink-0 ml-4" />
            </summary>

            <div className="mt-5 pt-5 border-t border-slate-800/80 space-y-5">
              {/* Deeper technical background paragraphs */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/70">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                  Quy chuẩn kỹ thuật thực tế
                </h4>
                {profile.about.storyParagraphs.slice(1).map((para, pIdx) => (
                  <p key={pIdx} className="text-slate-300 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Certifications Grid */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
                  Danh mục chứng chỉ đã đạt
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {profile.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono mb-1">
                        <span>{cert.year}</span>
                        {cert.credentialId && (
                          <span className="text-slate-500 truncate max-w-[120px]">{cert.credentialId}</span>
                        )}
                      </div>
                      <h5 className="text-xs font-bold text-white leading-snug">{cert.name}</h5>
                      <p className="text-[11px] text-slate-400 mt-0.5">{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </details>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, Headphones, Award, FileBadge } from 'lucide-react';
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
    <section id="about" className="py-20 lg:py-28 bg-[#090e1c] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-cyan-400 font-mono">
            <span>01. GIỚI THIỆU &amp; NĂNG LỰC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            {profile.about.storyHeading}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Uy tín thương hiệu xây dựng trên từng mối nối cáp quang, từng mắt camera sắc nét và sự an tâm tuyệt đối của khách hàng.
          </p>
        </div>

        {/* Story & Philosophy 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Story Paragraphs (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed">
            {profile.about.storyParagraphs.map((para, index) => (
              <p key={index} className="text-slate-300">
                {para}
              </p>
            ))}

            {/* Philosophy Callout Card */}
            <div className="p-5 sm:p-6 rounded-xl bg-slate-900/80 border-l-4 border-cyan-400 border-t border-r border-b border-slate-800 space-y-2 mt-6">
              <div className="text-xs uppercase tracking-wider font-bold text-cyan-400 font-mono">
                {profile.about.philosophyTitle}
              </div>
              <blockquote className="text-base sm:text-lg italic font-medium text-slate-200">
                &ldquo;{profile.about.philosophyQuote}&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Right Column: Commitments (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <span>Tiêu Chuẩn Thi Công &amp; Cam Kết</span>
            </h3>

            <div className="space-y-3">
              {profile.about.commitments.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-colors flex items-start gap-3.5"
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

        {/* Certifications Row */}
        <div className="pt-10 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileBadge className="w-4 h-4 text-cyan-400" />
                <span>Chứng Chỉ Chuyên Ngành Quốc Tế</span>
              </h3>
              <p className="text-xs text-slate-400">
                Được đào tạo và cấp chứng chỉ trực tiếp từ các hãng công nghệ mạng &amp; an ninh hàng đầu
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {profile.certifications.map((cert, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono mb-2">
                  <span>{cert.year}</span>
                  {cert.credentialId && (
                    <span className="text-slate-500 truncate max-w-[120px]">{cert.credentialId}</span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-white line-clamp-2">{cert.name}</h4>
                <p className="text-xs text-slate-400 mt-1">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

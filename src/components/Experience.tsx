import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, Star, Quote, ChevronDown } from 'lucide-react';
import { profile } from '../config/profile';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 lg:py-24 bg-[#090e1c] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-cyan-400 font-mono">
            <span>KINH NGHIỆM &amp; ĐÁNH GIÁ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            Kinh Nghiệm Thực Chiến &amp; Phản Hồi Từ Khách Hàng
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Hơn 8 năm kinh nghiệm thực chiến trong lĩnh vực viễn thông và an ninh giám sát, tạo dựng uy tín từ sự hài lòng của từng gia đình và doanh nghiệp.
          </p>
        </div>

        {/* 2-Column Layout: Left = Experience Timeline (7 cols), Right = Testimonials (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-1">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <span>Quá Trình Công Tác &amp; Dự Án Đảm Nhận</span>
            </h3>

            <div className="relative pl-6 sm:pl-7 border-l border-slate-800 space-y-8">
              {profile.experiences.map((exp, index) => (
                <div key={index} className="relative group">
                  
                  {/* Timeline Dot Indicator */}
                  <div className="absolute -left-[31px] sm:-left-[35px] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors" />

                  {/* Content Card */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-2.5">
                    
                    {/* Period & Location */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-cyan-400">
                      <div className="flex items-center gap-1.5 font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 font-sans">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Role & Company */}
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {exp.role}
                      </h4>
                      <p className="text-xs font-semibold text-slate-300 mt-0.5">
                        {exp.company}
                      </p>
                    </div>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {exp.summary}
                    </p>

                    {/* Achievements behind disclosure for clean scanning */}
                    {exp.achievements.length > 0 && (
                      <details className="group/ach mt-2 pt-2 border-t border-slate-800/80">
                        <summary className="flex items-center justify-between text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer list-none select-none py-0.5">
                          <span>Các kết quả &amp; dự án tiêu biểu ({exp.achievements.length})</span>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-open/ach:rotate-180 transition-transform" />
                        </summary>
                        <div className="pt-2 space-y-1.5">
                          {exp.achievements.map((ach, aIdx) => (
                            <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span className="leading-snug">{ach}</span>
                            </div>
                          ))}
                        </div>
                      </details>
                    )}

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Testimonials */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-1">
              <Quote className="w-5 h-5 text-cyan-400" />
              <span>Khách Hàng Nói Về Dịch Vụ</span>
            </h3>

            <div className="space-y-4">
              {profile.testimonials.map((test, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3"
                >
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    &ldquo;{test.content}&rdquo;
                  </p>

                  {/* Author Meta */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{test.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {test.role} · <span className="text-slate-300">{test.organization}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {test.projectRef}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

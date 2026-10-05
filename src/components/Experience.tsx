import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, Star, Quote } from 'lucide-react';
import { profile } from '../config/profile';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 lg:py-28 bg-[#090e1c] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-cyan-400 font-mono">
            <span>05. HÀNH TRÌNH NGHỀ NGHIỆP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Kinh Nghiệm Thực Chiến &amp; Đánh Giá Khách Hàng
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Hành trình tôi tích lũy kinh nghiệm qua hàng trăm dự án thực tế và những lời nhận xét chân thực từ đối tác.
          </p>
        </div>

        {/* 2-Column Layout: Left = Experience Timeline (7 cols), Right = Testimonials (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Timeline */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <span>Quá Trình Công Tác &amp; Dự Án Đảm Nhận</span>
            </h3>

            <div className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-10">
              {profile.experiences.map((exp, index) => (
                <div key={index} className="relative group">
                  
                  {/* Timeline Dot Indicator */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors" />

                  {/* Content Card */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-3">
                    
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
                      <h4 className="text-base sm:text-lg font-bold text-white">
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

                    {/* Achievements */}
                    {exp.achievements.length > 0 && (
                      <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                        {exp.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Testimonials */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Quote className="w-5 h-5 text-cyan-400" />
              <span>Khách Hàng Nói Gì Về Tôi?</span>
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
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
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

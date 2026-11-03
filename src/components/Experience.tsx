import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, ClipboardCheck, Search, Wrench, ChevronDown } from 'lucide-react';
import { profile } from '../config/profile';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16 lg:py-24 bg-[#090e1c] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-cyan-400 font-mono">
            <span>KINH NGHIỆM &amp; QUY TRÌNH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            Làm việc rõ ràng từ khảo sát đến bàn giao
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Bạn biết trước phương án, hạng mục thực hiện và cách nghiệm thu hệ thống.
          </p>
        </div>

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

          {/* Practical process instead of anonymous or unverifiable testimonials. */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-1">
              <ClipboardCheck className="w-5 h-5 text-cyan-400" />
              <span>Quy Trình Triển Khai</span>
            </h3>
            <div className="space-y-3">
              {[
                { icon: Search, title: '01 · Khảo sát nhu cầu', detail: 'Ghi nhận phạm vi, vị trí lắp đặt và ưu tiên của công trình.' },
                { icon: ClipboardCheck, title: '02 · Thống nhất phương án', detail: 'Giải thích thiết bị, hạng mục và dự toán trước khi thi công.' },
                { icon: Wrench, title: '03 · Thi công và bàn giao', detail: 'Kiểm tra vận hành, hướng dẫn sử dụng và thông tin hỗ trợ sau lắp đặt.' },
              ].map(({ icon: Icon, title, detail }) => (
                <div key={title} className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-cyan-400"><Icon className="h-4 w-4" /></span>
                  <div><h4 className="text-sm font-semibold text-white">{title}</h4><p className="mt-1 text-xs leading-relaxed text-slate-400">{detail}</p></div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

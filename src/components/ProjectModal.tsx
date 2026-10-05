import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calendar, MapPin, Building, Cpu, Camera, ChevronLeft, ChevronRight, Phone, MessageSquare } from 'lucide-react';
import { ProjectItem, profile } from '../config/profile';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onConsultProject?: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onConsultProject,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image when project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  // Keyboard navigation (Esc to close, Left/Right for album photos)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      const images = project.images && project.images.length > 0
        ? project.images
        : [project.image || '/assets/cover.svg'];

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Prepare images list (album)
  const albumImages = (project.images && project.images.length > 0)
    ? project.images
    : [project.image || '/assets/cover.svg'];

  const currentImage = albumImages[activeImageIndex] || albumImages[0];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : albumImages.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev < albumImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden z-10 my-6 flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-950 shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono font-bold text-cyan-400 uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300 font-mono flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              {project.completionDate || project.year}
            </span>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1">
          
          {/* Main Title & Scale */}
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {project.title}
            </h3>
            {project.scale && (
              <p className="text-xs sm:text-sm text-cyan-300 font-medium mt-1">
                {project.scale}
              </p>
            )}
          </div>

          {/* Photo Album Viewer Carousel */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group select-none">
              <img
                src={currentImage}
                alt={`${project.title} - Ảnh ${activeImageIndex + 1}`}
                className="w-full h-full object-cover sm:object-contain transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Album Controls (Previous / Next) */}
              {albumImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    type="button"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-slate-700 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg cursor-pointer"
                    aria-label="Ảnh trước"
                  >
                    <ChevronLeft className="w-5 h-5 text-cyan-300" />
                  </button>

                  <button
                    onClick={handleNextImage}
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-slate-700 text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-lg cursor-pointer"
                    aria-label="Ảnh kế tiếp"
                  >
                    <ChevronRight className="w-5 h-5 text-cyan-300" />
                  </button>
                </>
              )}

              {/* Photo Indicator Badge */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-cyan-300">
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ảnh {activeImageIndex + 1} / {albumImages.length}</span>
              </div>
            </div>

            {/* Thumbnails Strip (If more than 1 image) */}
            {albumImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {albumImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    type="button"
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-cyan-400 ring-2 ring-cyan-500/30 scale-102'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Meta Grid (Client, Location, Completion Date) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
            {project.client && (
              <div className="flex items-center gap-2.5 text-slate-300">
                <Building className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Chủ Đầu Tư / Khách Hàng</span>
                  <span className="font-semibold truncate block">{project.client}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Địa Điểm Công Trình</span>
                <span className="font-semibold truncate block">{project.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-300">
              <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Thời Gian Hoàn Thành</span>
                <span className="font-semibold font-mono text-cyan-300 block">{project.completionDate || project.year}</span>
              </div>
            </div>
          </div>

          {/* Technical Scope & Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Mô Tả Giải Pháp &amp; Quá Trình Triển Khai
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
              {project.description}
            </p>
          </div>

          {/* Highlights Checklist */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                Kết Quả Nghiệm Thu &amp; Điểm Nổi Bật
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {project.highlights.map((h, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies & Equipment Used */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-mono">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Thiết Bị &amp; Công Nghệ Sử Dụng</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 sm:px-6 py-4 bg-slate-950 border-t border-slate-800 shrink-0">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>Hotline tư vấn nhanh:</span>
            <a href={`tel:${profile.contact.phone}`} className="text-cyan-400 font-mono font-bold hover:underline">
              {profile.contact.phoneDisplay}
            </a>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              type="button"
              className="w-1/2 sm:w-auto px-4 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Đóng Lại
            </button>

            <button
              onClick={() => {
                onClose();
                onConsultProject?.(project.title);
              }}
              type="button"
              className="w-1/2 sm:w-auto px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              Tư Vấn Dự Án Tương Tự
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

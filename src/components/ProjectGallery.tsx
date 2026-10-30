import React, { useState, useEffect } from 'react';
import { Camera, ArrowUpRight, MapPin, Sparkles, RotateCw, ExternalLink } from 'lucide-react';
import { projects as defaultProjects, projectCategories, ProjectItem } from '../config/profile';
import { ProjectModal } from './ProjectModal';
import { fetchProjectsFromGitHub, resolveProjectImageUrl, normalizeProjects } from '../utils/githubProjects';

interface ProjectGalleryProps {
  onConsultProject?: (projectTitle: string) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onConsultProject }) => {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(() => normalizeProjects(defaultProjects));
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất Cả');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Tải dữ liệu công trình từ raw.githubusercontent.com khi tải trang
  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const result = await fetchProjectsFromGitHub();
      setProjectsList(result.projects);
    } catch (err) {
      console.warn('Lỗi khi tải dữ liệu công trình:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Lọc dự án theo danh mục người dùng chọn
  const filteredProjects = selectedCategory === 'Tất Cả'
    ? projectsList
    : projectsList.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-16 lg:py-24 bg-[#080d1a] relative border-t border-slate-800/80">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-cyan-400 font-mono">
            <span>HÌNH ẢNH THỰC TẾ CÔNG TRÌNH</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            Công Trình &amp; Giải Pháp Đã Thi Công
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Hình ảnh chụp thực tế tại các công trình nhà phố, biệt thự, chuỗi bán lẻ, F&amp;B và nhà xưởng do Nguyễn Bá Hòa trực tiếp khảo sát và thi công.
          </p>

          {/* Sync status & CMS link: quiet, without "Nguồn dữ liệu: GitHub (main)" */}
          <div className="pt-2 flex items-center justify-center gap-3 text-xs text-slate-400">
            <button
              onClick={loadProjects}
              type="button"
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer disabled:opacity-50"
              title="Tải lại nội dung mới nhất từ GitHub"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{isLoading ? 'Đang tải...' : 'Làm mới danh sách'}</span>
            </button>
            <span className="text-slate-600">·</span>
            <a
              href="/admin/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
              title="Truy cập Decap CMS quản trị nội dung"
            >
              <span>Quản trị CMS</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl max-w-fit mx-auto mb-10 shadow-lg">
          {projectCategories.map((category) => {
            const isActive = selectedCategory === category;
            const count = category === 'Tất Cả'
              ? projectsList.length
              : projectsList.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                type="button"
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive
                      ? 'bg-cyan-950 text-cyan-200'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project, pIdx) => {
            const images = Array.isArray(project.images) ? project.images : [];
            const technologies = Array.isArray(project.technologies) ? project.technologies : [];
            const albumCount = images.length > 0
              ? images.filter((img) => Boolean(img && typeof img === 'string' && img.trim())).length
              : (project.image ? 1 : 0);
            const originalCover = project.image || images[0] || '/assets/cover.svg';
            const rawCover = resolveProjectImageUrl(originalCover);

            return (
              <div
                key={project.id || `project-${pIdx}`}
                className="group rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl"
              >
                {/* Project Image Frame & Badges */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer"
                  onClick={() => setActiveModalProject(project)}
                >
                  <img
                    src={rawCover}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={(e) => {
                      if (originalCover && e.currentTarget.src !== originalCover) {
                        e.currentTarget.src = originalCover;
                      }
                    }}
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top-Left: Category */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800 text-cyan-300">
                    <span>{project.category}</span>
                  </div>

                  {/* Top-Right: Photo Count Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {project.isFeatured && (
                      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span>Nổi Bật</span>
                      </span>
                    )}

                    <span className="flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-lg bg-slate-950/85 text-slate-300 border border-slate-800 backdrop-blur-md">
                      <Camera className="w-3 h-3 text-cyan-400" />
                      <span>{albumCount} ảnh</span>
                    </span>
                  </div>

                  {/* Bottom Image Overlay: Location */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-xs text-slate-300 truncate">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate font-medium">{project.location}</span>
                  </div>
                </div>

                {/* Project Details Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 
                      onClick={() => setActiveModalProject(project)}
                      className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    {project.scale && (
                      <p className="text-xs text-cyan-400 font-medium">
                        {project.scale}
                      </p>
                    )}

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies Tags Chips & Modal Trigger */}
                  <div className="space-y-3 pt-1">
                    {technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {technologies.slice(0, 3).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono text-slate-300 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {technologies.length > 3 && (
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded">
                            +{technologies.length - 3} thiết bị
                          </span>
                        )}
                      </div>
                    )}

                    <button
                      onClick={() => setActiveModalProject(project)}
                      type="button"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Xem Album &amp; Chi Tiết</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Filter State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-slate-400 bg-slate-900/30 border border-slate-800 rounded-2xl p-8 max-w-md mx-auto space-y-3">
            <Camera className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-medium text-slate-300">Không có công trình nào trong mục này</p>
            <p className="text-xs text-slate-500">Vui lòng chọn danh mục khác hoặc kiểm tra lại tệp nội dung trên GitHub.</p>
          </div>
        )}

      </div>

      {/* Interactive Project Modal & Album Viewer */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onConsultProject={onConsultProject}
      />
    </section>
  );
};

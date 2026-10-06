import React, { useState, useEffect } from 'react';
import { Camera, ArrowUpRight, MapPin, Sparkles, RotateCw, ExternalLink } from 'lucide-react';
import { projects as defaultProjects, projectCategories, ProjectItem } from '../config/profile';
import { ProjectModal } from './ProjectModal';
import { fetchProjectsFromGitHub, resolveProjectImageUrl } from '../utils/githubProjects';

interface ProjectGalleryProps {
  onConsultProject?: (projectTitle: string) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onConsultProject }) => {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(defaultProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất Cả');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<'github' | 'local_file' | 'fallback'>('fallback');

  // Tải dữ liệu công trình từ raw.githubusercontent.com khi tải trang
  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const result = await fetchProjectsFromGitHub();
      setProjectsList(result.projects);
      setDataSource(result.source);
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
    <section id="projects" className="py-20 lg:py-28 bg-[#080d1a] relative border-t border-slate-800/80">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-bold tracking-widest uppercase text-cyan-400 font-mono">
            <Camera className="w-3.5 h-3.5" />
            <span>HỒ SƠ NĂNG LỰC &amp; DỰ ÁN THỰC CHIẾN</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            Công Trình &amp; Giải Pháp Đã Thi Công
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Tổng hợp hình ảnh chụp thực tế tại công trình, bản vẽ bố trí và thông số kỹ thuật các hệ thống Camera AI &amp; Hạ tầng mạng doanh nghiệp tiêu biểu.
          </p>

          {/* Sync status & Refresh button */}
          <div className="pt-1 flex items-center justify-center gap-3 text-xs text-slate-500 font-mono">
            <span>
              Nguồn dữ liệu:{' '}
              <strong className={dataSource === 'github' ? 'text-emerald-400' : 'text-slate-400'}>
                {dataSource === 'github' ? 'GitHub (main)' : dataSource === 'local_file' ? 'Local Content' : 'Bản Gốc'}
              </strong>
            </span>
            <span>·</span>
            <button
              onClick={loadProjects}
              type="button"
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer disabled:opacity-50"
              title="Tải lại nội dung mới nhất từ GitHub"
            >
              <RotateCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{isLoading ? 'Đang đồng bộ...' : 'Làm mới dữ liệu'}</span>
            </button>
            <span>·</span>
            <a
              href="/admin/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
              title="Truy cập Decap CMS quản trị nội dung"
            >
              <span>Quản trị CMS</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl max-w-fit mx-auto mb-12 shadow-xl shadow-black/40">
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
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const albumCount = project.images?.length || 1;
            const originalCover = project.image || project.images?.[0] || '/assets/cover.svg';
            const rawCover = resolveProjectImageUrl(originalCover);

            return (
              <div
                key={project.id}
                className="group rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-cyan-950/30"
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
                      // Fallback sang đường dẫn nội bộ nếu chưa có trên GitHub raw
                      if (originalCover && e.currentTarget.src !== originalCover) {
                        e.currentTarget.src = originalCover;
                      }
                    }}
                  />

                  {/* Gradient Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top-Left: Category & Completion Date */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800 text-cyan-300 shadow-sm">
                    <span>{project.category}</span>
                    <span className="text-slate-600">·</span>
                    <span>{project.completionDate || project.year}</span>
                  </div>

                  {/* Top-Right: Featured & Photo Count Badge */}
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

                  {/* Bottom Image Overlay: Location Pin */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1 text-xs text-slate-300 truncate">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate font-medium">{project.location}</span>
                  </div>
                </div>

                {/* Project Details Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 
                      onClick={() => setActiveModalProject(project)}
                      className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    {project.scale && (
                      <p className="text-xs text-cyan-400 font-medium">
                        {project.scale}
                      </p>
                    )}

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies Tags Chips */}
                  <div className="space-y-3 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono text-slate-300 bg-slate-950 border border-slate-800/90 px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded">
                          +{project.technologies.length - 3} thiết bị
                        </span>
                      )}
                    </div>

                    {/* Action Button: Opens Photo Album & Full Project Scope */}
                    <button
                      onClick={() => setActiveModalProject(project)}
                      type="button"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group-hover:border-cyan-500/30"
                    >
                      <Camera className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Xem Album &amp; Chi Tiết Công Trình</span>
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
            <p className="text-sm font-medium text-slate-300">Không có dự án nào trong mục này</p>
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

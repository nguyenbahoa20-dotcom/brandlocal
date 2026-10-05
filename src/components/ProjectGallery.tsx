import React, { useState, useEffect } from 'react';
import { Camera, ArrowUpRight, MapPin, Sparkles, Plus, Sliders, CheckCircle2, RefreshCw } from 'lucide-react';
import { projectCategories, ProjectItem } from '../config/profile';
import { ProjectModal } from './ProjectModal';
import { AdminProjectModal } from './AdminProjectModal';
import { getStoredProjects, saveProjectsToStorage, resetProjectsToDefault } from '../utils/projectStorage';

interface ProjectGalleryProps {
  onConsultProject?: (projectTitle: string) => void;
  isAdminOpenExternal?: boolean;
  onCloseAdminExternal?: () => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  onConsultProject,
  isAdminOpenExternal,
  onCloseAdminExternal,
}) => {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(() => getStoredProjects());
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất Cả');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync external open request
  useEffect(() => {
    if (isAdminOpenExternal !== undefined) {
      setIsAdminOpen(isAdminOpenExternal);
    }
  }, [isAdminOpenExternal]);

  // Listen for global custom event to open admin modal from anywhere (e.g. Header, Footer)
  useEffect(() => {
    const handleGlobalOpen = () => setIsAdminOpen(true);
    window.addEventListener('open-admin-project-modal', handleGlobalOpen);
    return () => window.removeEventListener('open-admin-project-modal', handleGlobalOpen);
  }, []);

  // Filter projects based on user selected category
  const filteredProjects = selectedCategory === 'Tất Cả'
    ? projectsList
    : projectsList.filter((p) => p.category === selectedCategory);

  // Save new or updated project
  const handleSaveProject = (projectData: ProjectItem) => {
    setProjectsList((prev) => {
      const existsIndex = prev.findIndex((p) => p.id === projectData.id);
      let updated: ProjectItem[];
      if (existsIndex >= 0) {
        // Edit existing project
        updated = [...prev];
        updated[existsIndex] = projectData;
      } else {
        // Add new project to top of list
        updated = [projectData, ...prev];
      }
      saveProjectsToStorage(updated);
      return updated;
    });

    setToastMessage(`Đã lưu công trình "${projectData.title}" thành công!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Delete project
  const handleDeleteProject = (projectId: string) => {
    setProjectsList((prev) => {
      const updated = prev.filter((p) => p.id !== projectId);
      saveProjectsToStorage(updated);
      return updated;
    });
    setToastMessage('Đã xóa công trình khỏi danh sách.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Reset to original projects from profile.ts
  const handleResetDefaults = () => {
    const defaults = resetProjectsToDefault();
    setProjectsList([...defaults]);
    setToastMessage('Đã khôi phục danh sách công trình gốc từ cấu hình.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    onCloseAdminExternal?.();
  };

  return (
    <section id="projects" className="py-20 lg:py-28 bg-[#080d1a] relative border-t border-slate-800/80">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Floating Success Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl bg-cyan-950/95 border border-cyan-400/60 text-white text-xs font-semibold shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-cyan-300 hover:text-white ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-bold tracking-widest uppercase text-cyan-400 font-mono">
            <Camera className="w-3.5 h-3.5" />
            <span>HỒ SƠ NĂNG LỰC &amp; DỰ ÁN THỰC CHIẾN</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            Album Công Trình &amp; Giải Pháp Đã Thi Công
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Tổng hợp hình ảnh chụp thực tế tại công trình, bản vẽ bố trí và thông số kỹ thuật các hệ thống Camera AI &amp; Hạ tầng mạng doanh nghiệp tiêu biểu.
          </p>

          {/* Admin Action Button Bar directly in section */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsAdminOpen(true)}
              type="button"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>+ Thêm Công Trình Mới / Quản Trị</span>
            </button>

            <button
              onClick={() => setIsAdminOpen(true)}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-xs text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Quản Lý ({projectsList.length} dự án)</span>
            </button>
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

        {/* Project Gallery Cards Grid (Auto-maps over projectsList state) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const albumCount = project.images?.length || 1;
            const coverImage = project.image || project.images?.[0] || '/assets/cover.svg';

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
                    src={coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
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
            <p className="text-xs text-slate-500">Bấm chọn "Tất Cả" hoặc bấm nút thêm dự án mới để thêm công trình vào mục này.</p>
            <button
              onClick={() => setIsAdminOpen(true)}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm Công Trình Vào Mục Này</span>
            </button>
          </div>
        )}

      </div>

      {/* Interactive Project Modal & Album Viewer */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onConsultProject={onConsultProject}
      />

      {/* Admin Dashboard / Management Modal */}
      <AdminProjectModal
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
        onSaveProject={handleSaveProject}
        onDeleteProject={handleDeleteProject}
        projectsList={projectsList}
        onResetDefaults={handleResetDefaults}
      />
    </section>
  );
};

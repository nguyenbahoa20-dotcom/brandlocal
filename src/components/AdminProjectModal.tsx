import React, { useState, useRef } from 'react';
import {
  X,
  Plus,
  Save,
  Trash2,
  Edit3,
  Upload,
  Image as ImageIcon,
  Check,
  Sparkles,
  Camera,
  MapPin,
  Calendar,
  Building,
  Cpu,
  Layers,
  FileCode,
  Copy,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ProjectItem, projectCategories as defaultCategories } from '../config/profile';

interface AdminProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProject: (project: ProjectItem) => void;
  onDeleteProject: (projectId: string) => void;
  projectsList: ProjectItem[];
  onResetDefaults?: () => void;
}

export const AdminProjectModal: React.FC<AdminProjectModalProps> = ({
  isOpen,
  onClose,
  onSaveProject,
  onDeleteProject,
  projectsList,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'manage' | 'export'>('form');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Doanh Nghiệp & Văn Phòng');
  const [customCategory, setCustomCategory] = useState('');
  const [location, setLocation] = useState('');
  const [client, setClient] = useState('');
  const [scale, setScale] = useState('');
  const [completionDate, setCompletionDate] = useState('2024');
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  // Album Images
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Technologies
  const [techInput, setTechInput] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([
    'Hikvision IP ColorVu 4K',
    'MikroTik Gigabit',
    'Switch Cisco PoE',
  ]);

  // Highlights
  const [highlightInput, setHighlightInput] = useState('');
  const [highlights, setHighlights] = useState<string[]>([
    'Hệ thống phủ sóng 100% không góc chết, bảo mật cao',
    'Bàn giao đúng tiến độ, thẩm mỹ gọn gàng tiêu chuẩn công nghiệp',
  ]);

  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Quick suggest tags
  const popularTechSuggestions = [
    'Hikvision ColorVu 4K',
    'MikroTik CCR Gigabit',
    'Cisco Catalyst PoE',
    'Ruijie WiFi 6 Enterprise',
    'UniFi Dream Machine',
    'Dahua WizSense AI',
    'Tủ Rack 27U & Thanh PDU',
    'Cáp Mạng Cat6A CommScope',
    'Nguồn Lưu Điện APC UPS',
    'Hệ Thống Lưu Trữ RAID 5',
  ];

  if (!isOpen) return null;

  // Reset form to blank
  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Doanh Nghiệp & Văn Phòng');
    setCustomCategory('');
    setLocation('');
    setClient('');
    setScale('');
    setCompletionDate('2024');
    setDescription('');
    setIsFeatured(false);
    setImages([]);
    setImageUrlInput('');
    setTechnologies(['Hikvision IP ColorVu 4K', 'MikroTik Gigabit', 'Switch Cisco PoE']);
    setHighlights([
      'Hệ thống phủ sóng 100% không góc chết, bảo mật cao',
      'Bàn giao đúng tiến độ, thẩm mỹ gọn gàng tiêu chuẩn công nghiệp',
    ]);
    setErrorMessage('');
  };

  // Load an existing project for editing
  const handleEditProject = (project: ProjectItem) => {
    setEditingId(project.id);
    setTitle(project.title);
    setCategory(project.category);
    setLocation(project.location);
    setClient(project.client || '');
    setScale(project.scale || '');
    setCompletionDate(project.completionDate || project.year || '2024');
    setDescription(project.description);
    setIsFeatured(!!project.isFeatured);
    setImages(project.images && project.images.length > 0 ? project.images : [project.image || '/assets/cover.svg']);
    setTechnologies(project.technologies || []);
    setHighlights(project.highlights || []);
    setActiveTab('form');
  };

  // Handle local image file upload (convert to Base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Add image from text URL / path
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setImages((prev) => [...prev, imageUrlInput.trim()]);
    setImageUrlInput('');
  };

  // Remove image from album
  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Set image as cover (move to index 0)
  const handleSetCover = (index: number) => {
    if (index === 0) return;
    setImages((prev) => {
      const copy = [...prev];
      const [selected] = copy.splice(index, 1);
      return [selected, ...copy];
    });
  };

  // Technologies handler
  const handleAddTech = (tech: string) => {
    const clean = tech.trim();
    if (clean && !technologies.includes(clean)) {
      setTechnologies((prev) => [...prev, clean]);
    }
    setTechInput('');
  };

  const handleRemoveTech = (index: number) => {
    setTechnologies((prev) => prev.filter((_, i) => i !== index));
  };

  // Highlights handler
  const handleAddHighlight = () => {
    if (!highlightInput.trim()) return;
    setHighlights((prev) => [...prev, highlightInput.trim()]);
    setHighlightInput('');
  };

  const handleRemoveHighlight = (index: number) => {
    setHighlights((prev) => prev.filter((_, i) => i !== index));
  };

  // SUBMIT & SAVE PROJECT
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage('Vui lòng nhập tên công trình / dự án.');
      return;
    }

    const finalCategory = category === 'khac' ? (customCategory.trim() || 'Khác') : category;
    const finalImages = images.length > 0 ? images : ['/assets/projects/project-viettien-office.svg'];
    const finalCover = finalImages[0];

    const projectData: ProjectItem = {
      id: editingId || `prj-${Date.now()}`,
      title: title.trim(),
      category: finalCategory,
      location: location.trim() || 'Hà Nội & Khu vực lân cận',
      client: client.trim() || 'Khách Hàng Doanh Nghiệp',
      scale: scale.trim() || 'Quy mô văn phòng tiêu chuẩn',
      completionDate: completionDate.trim() || '2024',
      year: completionDate.trim().slice(-4) || '2024',
      description: description.trim() || 'Thiết kế và triển khai trọn gói giải pháp kỹ thuật theo tiêu chuẩn công nghiệp.',
      image: finalCover,
      images: finalImages,
      technologies: technologies.length > 0 ? technologies : ['Hikvision ColorVu', 'MikroTik Gigabit', 'Cisco Switch'],
      highlights: highlights.length > 0 ? highlights : ['Hoàn thành đúng tiến độ cam kết', 'Bảo hành tận nơi 24 tháng'],
      isFeatured: isFeatured,
    };

    onSaveProject(projectData);
    resetForm();
    onClose();
  };

  // Generate TypeScript code for export
  const generatedCode = `export const projects: ProjectItem[] = ${JSON.stringify(projectsList, null, 2)};`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden z-10 my-4 flex flex-col max-h-[94vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Quản Trị Dự Án &amp; Thêm Công Trình</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  ADMIN
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Thêm mới hoặc cập nhật công trình - dữ liệu lập tức hiển thị trực tiếp lên website
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab navigation */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'form'
                    ? 'bg-cyan-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {editingId ? 'Chỉnh Sửa Dự Án' : 'Thêm Dự Án Mới'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('manage')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'manage'
                    ? 'bg-cyan-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Danh Sách ({projectsList.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('export')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeTab === 'export'
                    ? 'bg-cyan-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Xuất Code
              </button>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">

          {/* TAB 1: FORM THÊM / SỬA DỰ ÁN */}
          {activeTab === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {editingId && (
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-center justify-between">
                  <span>Đang chỉnh sửa dự án: <strong>{title}</strong></span>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    Hủy sửa / Tạo mới
                  </button>
                </div>
              )}

              {/* 1. Tên dự án & Danh mục */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8 space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                    Tên Dự Án / Tên Công Trình <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="VD: Hạ Tầng Mạng & Camera Tòa Nhà Văn Phòng Việt Tiến 97 Đức Giang"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    required
                  />
                </div>

                <div className="sm:col-span-4 space-y-1.5">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                    Chọn Danh Mục
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    {defaultCategories.filter((c) => c !== 'Tất Cả').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="khac">+ Danh mục tùy chỉnh...</option>
                  </select>
                </div>

                {category === 'khac' && (
                  <div className="sm:col-span-12 space-y-1.5">
                    <label className="text-xs text-slate-400">Nhập tên danh mục mới:</label>
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="VD: Khách Sạn & Resort, Trường Học..."
                      className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                    />
                  </div>
                )}
              </div>

              {/* 2. Địa điểm, Khách hàng, Quy mô, Năm hoàn thành */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Địa Điểm Công Trình</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-cyan-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="VD: 97 Đức Giang, Hà Nội"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Khách Hàng / Chủ Đầu Tư</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-cyan-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                      placeholder="VD: Tổng Công Ty May Việt Tiến"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Quy Mô Công Trình</label>
                  <input
                    type="text"
                    value={scale}
                    onChange={(e) => setScale(e.target.value)}
                    placeholder="VD: 32 Camera IP · 18 Access Point"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">Năm / Tháng Hoàn Thành</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-cyan-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={completionDate}
                      onChange={(e) => setCompletionDate(e.target.value)}
                      placeholder="VD: Tháng 04/2024 hoặc 2024"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 3. TẢI / CHỌN ẢNH (ALBUM ẢNH CÔNG TRÌNH THỰC TẾ) */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Camera className="w-4 h-4 text-cyan-400" />
                      <span>Album Ảnh Công Trình Thực Tế ({images.length} ảnh)</span>
                    </label>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Hỗ trợ tải trực tiếp ảnh từ máy tính/điện thoại hoặc dán đường dẫn file ảnh.
                    </p>
                  </div>

                  {/* Sample photos quick load */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500">Thêm ảnh mẫu:</span>
                    <button
                      type="button"
                      onClick={() => setImages((prev) => [...prev, '/assets/projects/project-viettien-office.svg'])}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 cursor-pointer"
                    >
                      + Tòa nhà
                    </button>
                    <button
                      type="button"
                      onClick={() => setImages((prev) => [...prev, '/assets/projects/project-server-rack.svg'])}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 cursor-pointer"
                    >
                      + Tủ Rack
                    </button>
                  </div>
                </div>

                {/* Upload & Link Input Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  {/* File Upload Button */}
                  <div className="sm:col-span-5">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="project-file-upload"
                    />
                    <label
                      htmlFor="project-file-upload"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold cursor-pointer transition-colors shadow-sm"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Tải Ảnh Từ Thiết Bị (Nhiều ảnh)</span>
                    </label>
                  </div>

                  {/* URL Text Input */}
                  <div className="sm:col-span-7 flex gap-2">
                    <input
                      type="text"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      placeholder="Hoặc dán đường dẫn ảnh: /assets/projects/ten-anh.jpg"
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddImageUrl();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                    >
                      Thêm
                    </button>
                  </div>
                </div>

                {/* Thumbnail Preview Grid */}
                {images.length > 0 ? (
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between">
                      <span>Ảnh đầu tiên là <strong>Ảnh đại diện chính</strong>. Bấm "Đặt làm ảnh chính" để thay đổi.</span>
                      <button
                        type="button"
                        onClick={() => setImages([])}
                        className="text-red-400 hover:underline cursor-pointer"
                      >
                        Xóa tất cả ảnh
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {images.map((img, idx) => (
                        <div
                          key={idx}
                          className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-700 shadow"
                        >
                          <img
                            src={img}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />

                          {/* Cover badge */}
                          {idx === 0 && (
                            <span className="absolute top-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-400 text-slate-950 shadow">
                              Ảnh Bìa
                            </span>
                          )}

                          {/* Hover action overlay */}
                          <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1">
                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={() => handleSetCover(idx)}
                                className="text-[9px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-900 cursor-pointer"
                              >
                                Đặt làm bìa
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="text-[9px] px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40 hover:bg-red-900 cursor-pointer flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Xóa</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-5 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                    Chưa có ảnh nào được thêm vào. Vui lòng tải ảnh lên hoặc dán link ảnh.
                  </div>
                )}
              </div>

              {/* 4. Mô tả chi tiết giải pháp */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                  Mô Tả Chi Tiết Công Trình &amp; Phương Án Kỹ Thuật
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả các yêu cầu của chủ đầu tư, quá trình khảo sát thực địa, giải pháp bố trí thiết bị, quy trình đi dây ngầm, thi công tủ rack mạng và cấu hình bảo mật..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs leading-relaxed focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* 5. Thiết bị & Công nghệ sử dụng */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                  Các Công Nghệ / Thiết Bị Sử Dụng
                </label>
                
                {/* Tech chips list */}
                <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 rounded-xl bg-slate-950 border border-slate-800">
                  {technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(idx)}
                        className="text-slate-400 hover:text-red-400 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}

                  <div className="flex items-center gap-1.5 flex-1 min-w-[150px]">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      placeholder="Nhập thiết bị rồi bấm Enter..."
                      className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full px-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTech(techInput);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Popular tech chips suggestions */}
                <div className="flex flex-wrap items-center gap-1 pt-1 text-[11px] text-slate-400">
                  <span className="text-slate-500">Gợi ý nhanh:</span>
                  {popularTechSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddTech(s)}
                      className="px-2 py-0.5 rounded-md bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] font-mono text-slate-300 hover:text-cyan-300 cursor-pointer"
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Điểm nổi bật / Kết quả bàn giao */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                  Điểm Nổi Bật Kỹ Thuật (Bullet Points)
                </label>
                
                <div className="space-y-2">
                  {highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="flex-1 text-xs text-slate-300">{h}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(idx)}
                        className="p-1 rounded text-slate-500 hover:text-red-400 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={highlightInput}
                      onChange={(e) => setHighlightInput(e.target.value)}
                      placeholder="VD: Phủ sóng WiFi 6 100% không góc chết, camera nhận diện biển số ban đêm..."
                      className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddHighlight();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddHighlight}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>

              {/* 7. Featured Switch */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <div>
                    <span className="text-xs font-bold text-white block">Đặt làm dự án nổi bật (Featured)</span>
                    <span className="text-[11px] text-slate-400">Hiển thị huy hiệu "Nổi Bật" màu xanh ngọc trên thẻ công trình</span>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 text-xs transition-colors cursor-pointer"
                >
                  Xóa trắng form
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Đóng
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingId ? 'Cập Nhật Dự Án' : 'Lưu Dự Án Vào Website'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: QUẢN LÝ DANH SÁCH DỰ ÁN */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Tổng cộng: <strong className="text-white">{projectsList.length}</strong> công trình đang hiển thị trên web.
                </p>

                {onResetDefaults && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Khôi phục danh sách dự án về mặc định ban đầu từ mã nguồn profile.ts?')) {
                        onResetDefaults();
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white text-xs cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Khôi phục dữ liệu gốc</span>
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {projectsList.map((prj) => (
                  <div
                    key={prj.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                        <img
                          src={prj.image || prj.images?.[0] || '/assets/cover.svg'}
                          alt={prj.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">{prj.title}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5">
                          <span className="text-cyan-400">{prj.category}</span>
                          <span>·</span>
                          <span>{prj.completionDate || prj.year}</span>
                          <span>·</span>
                          <span>{prj.images?.length || 1} ảnh</span>
                          {prj.isFeatured && (
                            <span className="text-emerald-400 text-[10px] font-sans font-semibold">★ Nổi bật</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleEditProject(prj)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Sửa</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Bạn có chắc muốn xóa dự án "${prj.title}"?`)) {
                            onDeleteProject(prj.id);
                          }
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-xs text-red-300 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: XUẤT MÃ NGUỒN TYPESCRIPT */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-slate-300 space-y-2">
                <p className="font-semibold text-cyan-300">
                  💡 Bạn muốn lưu trữ dữ liệu vĩnh viễn vào mã nguồn dự án?
                </p>
                <p>
                  Mặc dù các dự án mới đã được lưu tự động trên trình duyệt của bạn (LocalStorage), bạn có thể sao chép đoạn mã TypeScript dưới đây và dán đè vào vị trí `export const projects = [...]` trong file `src/config/profile.ts` để đồng bộ vĩnh viễn vào source code Git!
                </p>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-all shadow cursor-pointer z-10"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Đã Sao Chép!' : 'Sao Chép Mã Nguồn'}</span>
                </button>

                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 max-h-96 overflow-y-auto overflow-x-auto leading-relaxed">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

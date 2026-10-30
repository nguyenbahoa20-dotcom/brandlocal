import { projects as fallbackProjects, ProjectItem } from '../config/profile';

export const GITHUB_REPO = 'nguyenbahoa20-dotcom/brandlocal';
export const GITHUB_BRANCH = 'main';
export const RAW_GITHUB_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}`;
export const GITHUB_PROJECTS_URL = `${RAW_GITHUB_BASE}/public/content/projects.json`;
export const LOCAL_CONTENT_URL = '/content/projects.json';

export function normalizeProjects(list: unknown[]): ProjectItem[] {
  if (!Array.isArray(list)) return [];
  return list
    .filter((value): value is Record<string, unknown> => {
      if (!value || typeof value !== 'object') return false;
      const p = value as Record<string, unknown>;
      // Loại bỏ các bản ghi rỗng không có tiêu đề lẫn mã định danh (như draft rỗng)
      return Boolean(p.title || p.id || p.description || p.scale);
    })
    .map((value, idx) => {
      const project = value as Partial<ProjectItem>;
      const id = project.id ? String(project.id) : `project-${idx + 1}`;
      const title = project.title ? String(project.title) : 'Dự Án Đang Cập Nhật';
      const category = project.category ? String(project.category) : 'Chuỗi Bán Lẻ & F&B';
      const client = project.client ? String(project.client) : '';
      const location = project.location ? String(project.location) : '';
      const completionDate = (project.completionDate || project.year) ? String(project.completionDate || project.year) : '';
      const scale = project.scale ? String(project.scale) : '';
      const description = project.description ? String(project.description) : '';
      const isFeatured = Boolean(project.isFeatured);
      const image = typeof project.image === 'string' && project.image.trim() ? project.image.trim() : undefined;
      const images = Array.isArray(project.images)
        ? project.images.filter((img): img is string => typeof img === 'string' && img.trim().length > 0)
        : [];
      const technologies = Array.isArray(project.technologies)
        ? project.technologies.filter((tech): tech is string => typeof tech === 'string' && tech.trim().length > 0)
        : [];
      const highlights = Array.isArray(project.highlights)
        ? project.highlights.filter((h): h is string => typeof h === 'string' && h.trim().length > 0)
        : [];

      return {
        ...project,
        id,
        title,
        category,
        client,
        location,
        completionDate,
        scale,
        description,
        isFeatured,
        image,
        images,
        technologies,
        highlights,
      } as ProjectItem;
    });
}

/**
 * Chuyển đổi đường dẫn ảnh tương đối thành Raw GitHub URL để ảnh mới commit
 * lập tức hiển thị được trên website mà không cần AI Studio build lại.
 */
export function resolveProjectImageUrl(url: string | undefined): string {
  if (!url) return '/assets/cover.svg';

  // Nếu đã là link tuyệt đối (http/https/data)
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }

  // Chuẩn hóa đường dẫn bỏ dấu / ở đầu
  const cleanPath = url.startsWith('/') ? url.slice(1) : url;

  // Trong repository, file tĩnh nằm trong thư mục public/
  const repoPath = cleanPath.startsWith('public/')
    ? cleanPath
    : `public/${cleanPath}`;

  return `${RAW_GITHUB_BASE}/${repoPath}`;
}

/**
 * Lấy danh sách dự án từ tệp public/content/projects.json trên raw.githubusercontent.com
 * (có gắn timestamp chống cache). Nếu mạng lỗi hoặc chưa commit, tự động fallback
 * sang /content/projects.json nội bộ và dữ liệu tĩnh trong profile.ts.
 */
export async function fetchProjectsFromGitHub(): Promise<{
  projects: ProjectItem[];
  source: 'github' | 'local_file' | 'fallback';
}> {
  // 1. Thử lấy trực tiếp từ raw.githubusercontent.com (nhánh main)
  try {
    const timestamp = Date.now();
    const response = await fetch(`${GITHUB_PROJECTS_URL}?t=${timestamp}`, {
      cache: 'no-cache',
    });

    if (response.ok) {
      const data = await response.json();
      const list = Array.isArray(data) ? data : data.projects;
      if (Array.isArray(list) && list.length > 0) {
        return { projects: normalizeProjects(list), source: 'github' };
      }
    }
  } catch (err) {
    console.warn('[HOANET] Không thể tải dữ liệu từ raw.githubusercontent.com:', err);
  }

  // 2. Dự phòng: Thử lấy từ tệp /content/projects.json nội bộ
  try {
    const localRes = await fetch(LOCAL_CONTENT_URL);
    if (localRes.ok) {
      const data = await localRes.json();
      const list = Array.isArray(data) ? data : data.projects;
      if (Array.isArray(list) && list.length > 0) {
        return { projects: normalizeProjects(list), source: 'local_file' };
      }
    }
  } catch (err) {
    console.warn('[HOANET] Không thể tải tệp /content/projects.json cục bộ:', err);
  }

  // 3. Dự phòng cấp cuối: Dùng dữ liệu tĩnh từ profile.ts (được chuẩn hóa an toàn)
  return { projects: normalizeProjects(fallbackProjects), source: 'fallback' };
}

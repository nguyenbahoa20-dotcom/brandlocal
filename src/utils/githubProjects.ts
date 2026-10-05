import { projects as fallbackProjects, ProjectItem } from '../config/profile';

export const GITHUB_REPO = 'nguyenbahoa20-dotcom/brandlocal';
export const GITHUB_BRANCH = 'main';
export const RAW_GITHUB_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}`;
export const GITHUB_PROJECTS_URL = `${RAW_GITHUB_BASE}/public/content/projects.json`;
export const LOCAL_CONTENT_URL = '/content/projects.json';

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
        return { projects: list, source: 'github' };
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
        return { projects: list, source: 'local_file' };
      }
    }
  } catch (err) {
    console.warn('[HOANET] Không thể tải tệp /content/projects.json cục bộ:', err);
  }

  // 3. Dự phòng cấp cuối: Dùng dữ liệu tĩnh từ profile.ts
  return { projects: fallbackProjects, source: 'fallback' };
}

import { projects as defaultProjects, ProjectItem } from '../config/profile';

const STORAGE_KEY = 'hoanet_custom_projects_v1';

/**
 * Lấy danh sách dự án từ LocalStorage, nếu chưa có thì lấy từ profile.ts
 */
export function getStoredProjects(): ProjectItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultProjects;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return defaultProjects;
  } catch (e) {
    console.error('Lỗi khi đọc danh sách dự án từ LocalStorage:', e);
    return defaultProjects;
  }
}

/**
 * Lưu danh sách dự án vào LocalStorage để dữ liệu tồn tại lâu dài khi F5/reload trang
 */
export function saveProjectsToStorage(projects: ProjectItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Lỗi khi lưu danh sách dự án vào LocalStorage:', e);
  }
}

/**
 * Khôi phục danh sách dự án về mặc định ban đầu từ profile.ts
 */
export function resetProjectsToDefault(): ProjectItem[] {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Lỗi khi khôi phục dự án mặc định:', e);
  }
  return defaultProjects;
}

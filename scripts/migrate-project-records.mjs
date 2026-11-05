import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourcePath = path.join(root, 'public/content/projects.json');
const recordsPath = path.join(root, 'public/content/project-records');
const source = JSON.parse(await readFile(sourcePath, 'utf8'));
const projects = Array.isArray(source) ? source : source.projects;

if (!Array.isArray(projects) || projects.length === 0) {
  throw new Error('Không tìm thấy danh sách công trình để chuyển đổi.');
}

await mkdir(recordsPath, { recursive: true });
const existing = (await readdir(recordsPath)).filter((file) => file.endsWith('.json'));
if (existing.length > 0) {
  throw new Error(`Thư mục ${recordsPath} đã có hồ sơ JSON; dừng để tránh ghi đè.`);
}

function localizeImage(value) {
  if (typeof value !== 'string') return value;
  return value.replace(
    /^https:\/\/raw\.githubusercontent\.com\/nguyenbahoa20-dotcom\/brandlocal\/main\/public(\/assets\/)/,
    '$1',
  );
}

function safeFileName(id, index) {
  const fallback = `project-${String(index + 1).padStart(2, '0')}`;
  return (id || fallback)
    .toLowerCase()
    .replace(/^prj-/, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '') || fallback;
}

for (const [index, original] of projects.entries()) {
  const project = { ...original };
  const { id, title, category, location, completionDate, year, client, isFeatured } = project;
  const { image, images = [] } = project;
  const { scale, description } = project;
  const { technologies = [], highlights = [] } = project;
  const record = {
    title: title || 'Công trình đang cập nhật',
    details: {
      ...(id ? { id } : {}),
      category: category || 'Doanh Nghiệp & Văn Phòng',
      location: location || '',
      ...(completionDate ? { completionDate } : {}),
      ...(year ? { year } : {}),
      ...(client ? { client } : {}),
      ...(isFeatured ? { isFeatured: true } : {}),
      sortOrder: index + 1,
    },
    photos: {
      ...(image ? { image: localizeImage(image) } : {}),
      images: images.filter((item) => typeof item === 'string').map(localizeImage),
    },
    solution: {
      ...(scale ? { scale } : {}),
      description: description || '',
    },
    equipment: {
      technologies: technologies.filter((item) => typeof item === 'string'),
      highlights: highlights.filter((item) => typeof item === 'string'),
    },
  };

  const fileName = `${safeFileName(id, index)}.json`;
  const targetPath = path.join(recordsPath, fileName);
  if ((await readdir(recordsPath)).includes(fileName)) {
    throw new Error(`Tên hồ sơ bị trùng: ${fileName}`);
  }
  await writeFile(targetPath, `${JSON.stringify(record, null, 2)}\n`, 'utf8');
}

console.log(`Đã chuyển ${projects.length} công trình thành hồ sơ riêng. Tệp tổng hợp cũ vẫn được giữ nguyên.`);

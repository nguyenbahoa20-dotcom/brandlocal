import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const recordsDirectory = path.join(root, 'public/content/project-records');
const outputPath = path.join(root, 'public/content/projects.json');
const files = (await readdir(recordsDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.json'))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

if (files.length === 0) {
  throw new Error('Không có hồ sơ công trình; giữ nguyên tệp tổng hợp để tránh xóa toàn bộ nội dung.');
}

const projects = [];
for (const fileName of files) {
  const source = JSON.parse(await readFile(path.join(recordsDirectory, fileName), 'utf8'));
  const details = source.details ?? {};
  const photos = source.photos ?? {};
  const solution = source.solution ?? {};
  const equipment = source.equipment ?? {};
  const sortOrder = Number(details.sortOrder ?? source.sortOrder ?? 9999);
  const { sortOrder: _ignoredSortOrder, ...visibleDetails } = details;
  const id = visibleDetails.id || `prj-${path.basename(fileName, path.extname(fileName))}`;

  projects.push({
    id,
    title: source.title || 'Công trình đang cập nhật',
    ...visibleDetails,
    ...(photos.image ? { image: photos.image } : {}),
    images: Array.isArray(photos.images) ? photos.images : [],
    ...(solution.scale ? { scale: solution.scale } : {}),
    description: solution.description || '',
    technologies: Array.isArray(equipment.technologies) ? equipment.technologies : [],
    highlights: Array.isArray(equipment.highlights) ? equipment.highlights : [],
    _sortOrder: Number.isFinite(sortOrder) ? sortOrder : 9999,
  });
}

const ids = new Set();
for (const project of projects) {
  if (ids.has(project.id)) throw new Error(`Mã công trình bị trùng: ${project.id}`);
  ids.add(project.id);
}

projects.sort((a, b) => a._sortOrder - b._sortOrder || a.title.localeCompare(b.title, 'vi'));
for (const project of projects) delete project._sortOrder;

await writeFile(outputPath, `${JSON.stringify({ projects }, null, 2)}\n`, 'utf8');
console.log(`Đã tổng hợp ${projects.length} công trình vào public/content/projects.json.`);

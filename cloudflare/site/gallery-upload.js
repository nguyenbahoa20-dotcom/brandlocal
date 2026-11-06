const $ = (id) => document.getElementById(id);
const login = $('login');
const form = $('uploadForm');
const status = $('status');
const apiBase = location.origin;
let sessionToken = sessionStorage.getItem('hoanet-gallery-session') || '';
let previewUrls = [];

function showStatus(message = '', kind = '') {
  status.textContent = message;
  status.className = `status ${kind}`.trim();
}

function api(path) {
  return fetch(`${apiBase}${path}`, { headers: { Accept: 'application/json', ...(sessionToken ? { Authorization: `Bearer ${sessionToken}` } : {}) } });
}

async function loadProjects() {
  const response = await api('/api/projects');
  if (response.status === 401) {
    sessionToken = '';
    sessionStorage.removeItem('hoanet-gallery-session');
    login.hidden = false;
    form.hidden = true;
    $('loginStatus').textContent = '';
    return;
  }
  if (!response.ok) throw new Error((await response.json()).error || 'Không tải được danh sách công trình.');
  const projects = await response.json();
  const select = $('project');
  select.replaceChildren(new Option('Chọn công trình', ''));
  projects.forEach(({ id, title }) => select.add(new Option(title, id)));
  login.hidden = true;
  form.hidden = false;
}

function showFiles(files) {
  previewUrls.forEach(URL.revokeObjectURL);
  previewUrls = [];
  const preview = $('preview');
  preview.replaceChildren();
  const selected = Array.from(files || []);
  const totalBytes = selected.reduce((sum, file) => sum + file.size, 0);
  if (selected.length > 20 || totalBytes > 50 * 1024 * 1024) {
    $('files').value = '';
    showStatus('Vượt giới hạn 20 ảnh hoặc 50 MB. Hãy chọn ít ảnh hơn.', 'error');
    return;
  }
  showStatus(selected.length ? `${selected.length} ảnh · ${(totalBytes / 1024 / 1024).toFixed(1)} MB` : '');
  selected.forEach((file) => {
    const url = URL.createObjectURL(file);
    previewUrls.push(url);
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.src = url;
    image.alt = '';
    const caption = document.createElement('figcaption');
    caption.textContent = file.name;
    figure.append(image, caption);
    preview.append(figure);
  });
}

$('loginButton').addEventListener('click', () => { location.href = `${apiBase}/auth/start?return_to=${encodeURIComponent(location.href.split('#')[0])}`; });
$('logoutButton').addEventListener('click', () => {
  sessionToken = '';
  sessionStorage.removeItem('hoanet-gallery-session');
  form.hidden = true;
  login.hidden = false;
  $('loginStatus').textContent = '';
});
$('files').addEventListener('change', (event) => showFiles(event.target.files));

const drop = document.querySelector('.drop');
for (const eventName of ['dragenter', 'dragover']) drop.addEventListener(eventName, (event) => { event.preventDefault(); drop.style.borderColor = '#0085a3'; });
for (const eventName of ['dragleave', 'drop']) drop.addEventListener(eventName, (event) => { event.preventDefault(); drop.style.borderColor = ''; });
drop.addEventListener('drop', (event) => {
  const images = Array.from(event.dataTransfer.files).filter((file) => file.type.startsWith('image/'));
  const transfer = new DataTransfer();
  images.forEach((file) => transfer.items.add(file));
  $('files').files = transfer.files;
  showFiles(transfer.files);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const files = Array.from($('files').files);
  if (!$('project').value || !files.length) return showStatus('Chọn công trình và ít nhất một ảnh.', 'error');
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  if (files.length > 20 || totalBytes > 50 * 1024 * 1024) return showStatus('Vượt giới hạn 20 ảnh hoặc 50 MB.', 'error');
  $('uploadButton').disabled = true;
  showStatus('Đang tải ảnh và lưu thay đổi vào GitHub…');
  try {
    const body = new FormData();
    body.append('projectId', $('project').value);
    body.append('setCover', String($('setCover').checked));
    files.forEach((file) => body.append('images', file, file.name));
    const response = await fetch(`${apiBase}/api/upload`, { method: 'POST', headers: { Authorization: `Bearer ${sessionToken}` }, body });
    const result = await response.json();
    if (response.status === 401) {
      login.hidden = false;
      form.hidden = true;
      $('loginStatus').textContent = 'Phiên đăng nhập đã hết hạn. Đăng nhập GitHub lại để tiếp tục.';
      throw new Error('Phiên đăng nhập đã hết hạn. Đăng nhập GitHub lại để tiếp tục.');
    }
    if (!response.ok) throw new Error(result.error || 'Tải ảnh thất bại.');
    $('files').value = '';
    showFiles([]);
    $('setCover').checked = false;
    showStatus(`Đã thêm ${result.count} ảnh vào album. Commit: ${result.commit.slice(0, 7)}.`, 'success');
  } catch (error) {
    showStatus(error.message || 'Tải ảnh thất bại.', 'error');
  } finally {
    $('uploadButton').disabled = false;
  }
});

if (location.hash.startsWith('#gallery_session=')) {
  sessionToken = decodeURIComponent(location.hash.slice('#gallery_session='.length));
  sessionStorage.setItem('hoanet-gallery-session', sessionToken);
  history.replaceState(null, '', location.pathname + location.search);
}

loadProjects().catch((error) => {
  login.hidden = false;
  form.hidden = true;
  $('loginStatus').textContent = error.message || 'Không kết nối được dịch vụ tải ảnh.';
});


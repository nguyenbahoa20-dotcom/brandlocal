const OWNER = 'nguyenbahoa20-dotcom';
const REPO = 'brandlocal';
const BRANCH = 'main';
const MAX_IMAGES = 20;
const MAX_TOTAL_BYTES = 50 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    if (url.pathname.startsWith('/api/') && origin && origin !== url.origin) return json({ error: 'Nguồn truy cập không được phép.' }, 403);

    try {
      if (url.pathname === '/auth/start' && request.method === 'GET') return authStart(request, env, url);
      if (url.pathname === '/auth/callback' && request.method === 'GET') return authCallback(request, env, url);
      if (url.pathname === '/api/projects' && request.method === 'GET') {
        await requireSession(request, env);
        const token = await installationToken(env);
        const tree = await github(`/git/trees/${BRANCH}?recursive=1`, token);
        const records = (tree.tree || []).filter((item) => item.type === 'blob' && item.path.startsWith('public/content/project-records/') && item.path.endsWith('.json'));
        const projects = await Promise.all(records.map(async (item) => {
          const record = await github(`/contents/${encodeURIComponent(item.path).replaceAll('%2F', '/')}?ref=${BRANCH}`, token);
          const content = decodeBase64Utf8(record.content);
          const project = JSON.parse(content);
          return { id: project.details?.id, title: project.title };
        }));
        return json(projects.filter((project) => project.id && project.title).sort((a, b) => a.title.localeCompare(b.title, 'vi')));
      }
      if (url.pathname === '/api/upload' && request.method === 'POST') return upload(request, env);
      return env.ASSETS.fetch(request);
    } catch (error) {
      const status = error.status || 500;
      return json({ error: status >= 500 ? 'Không thể hoàn tất thao tác GitHub. Thử lại sau ít phút.' : error.message }, status);
    }
  },
};

function json(value, status = 200) {
  const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' };
  return new Response(JSON.stringify(value), { status, headers });
}

function b64url(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

function decodeBase64Utf8(value) {
  return new TextDecoder().decode(Uint8Array.from(atob(value.replace(/\s/g, '')), (char) => char.charCodeAt(0)));
}

async function sign(value, secret) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64url(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))));
}

async function signedCookie(value, env) {
  return `${value}.${await sign(value, env.SESSION_SECRET)}`;
}

async function validCookie(value, env) {
  if (!value) return false;
  const split = value.lastIndexOf('.');
  return split > 0 && await sign(value.slice(0, split), env.SESSION_SECRET) === value.slice(split + 1);
}

function cookie(request, name) {
  const pair = (request.headers.get('Cookie') || '').split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return pair ? decodeURIComponent(pair.slice(name.length + 1)) : '';
}

function setCookie(name, value, maxAge) {
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=${maxAge}`;
}

async function authStart(request, env, url) {
  const destination = url.searchParams.get('return_to') || url.origin;
  if (new URL(destination).origin !== url.origin) throw Object.assign(new Error('Đường dẫn quay lại không hợp lệ.'), { status: 400 });
  const state = b64url(crypto.getRandomValues(new Uint8Array(24)));
  const signedState = await signedCookie(`${state}.${Date.now() + 10 * 60 * 1000}.${b64url(new TextEncoder().encode(destination))}`, env);
  const callback = `${url.origin}/auth/callback`;
  const githubUrl = new URL('https://github.com/login/oauth/authorize');
  githubUrl.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID);
  githubUrl.searchParams.set('redirect_uri', callback);
  githubUrl.searchParams.set('scope', 'read:user');
  githubUrl.searchParams.set('state', state);
  const headers = new Headers({ Location: githubUrl.toString(), 'Cache-Control': 'no-store' });
  headers.append('Set-Cookie', setCookie('hoanet_oauth_state', signedState, 600));
  return new Response(null, { status: 302, headers });
}

async function authCallback(request, env, url) {
  const expectedState = url.searchParams.get('state');
  const stateCookie = cookie(request, 'hoanet_oauth_state');
  if (!await validCookie(stateCookie, env)) throw Object.assign(new Error('Phiên đăng nhập hết hạn. Hãy đăng nhập lại.'), { status: 401 });
  const [storedState, expiresAt, destinationPart] = stateCookie.slice(0, stateCookie.lastIndexOf('.')).split('.');
  const destination = new TextDecoder().decode(Uint8Array.from(atob(destinationPart.replaceAll('-', '+').replaceAll('_', '/')), (char) => char.charCodeAt(0)));
  if (new URL(destination).origin !== url.origin) throw Object.assign(new Error('Đường dẫn quay lại không hợp lệ.'), { status: 400 });
  if (expectedState !== storedState || Date.now() > Number(expiresAt)) throw Object.assign(new Error('Xác thực OAuth không hợp lệ.'), { status: 401 });
  if (url.searchParams.has('error')) return new Response(null, { status: 302, headers: { Location: destination } });

  const exchange = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: env.GITHUB_OAUTH_CLIENT_ID, client_secret: env.GITHUB_OAUTH_CLIENT_SECRET, code: url.searchParams.get('code'), redirect_uri: `${url.origin}/auth/callback` }),
  });
  const exchangeData = await exchange.json();
  if (!exchange.ok || !exchangeData.access_token) throw Object.assign(new Error('GitHub không cấp được phiên đăng nhập.'), { status: 401 });
  const identity = await fetch('https://api.github.com/user', { headers: { Authorization: `Bearer ${exchangeData.access_token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'HOANET-Gallery-Upload' } });
  const user = await identity.json();
  if (!identity.ok || user.login?.toLowerCase() !== env.ALLOWED_GITHUB_USERNAME.toLowerCase()) throw Object.assign(new Error('Tài khoản GitHub này chưa được cấp quyền tải ảnh.'), { status: 403 });
  const sessionValue = `${user.login}.${Date.now() + 8 * 60 * 60 * 1000}`;
  const signedSession = await signedCookie(sessionValue, env);
  const headers = new Headers({ Location: `${destination}#gallery_session=${encodeURIComponent(signedSession)}`, 'Cache-Control': 'no-store' });
  headers.append('Set-Cookie', setCookie('hoanet_oauth_state', '', 0));
  return new Response(null, { status: 302, headers });
}

async function requireSession(request, env) {
  const value = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!await validCookie(value, env)) throw Object.assign(new Error('Cần đăng nhập lại bằng tài khoản GitHub được cấp quyền.'), { status: 401 });
  const [username, expiresAt] = value.slice(0, value.lastIndexOf('.')).split('.');
  if (username.toLowerCase() !== env.ALLOWED_GITHUB_USERNAME.toLowerCase() || Date.now() > Number(expiresAt)) throw Object.assign(new Error('Phiên đăng nhập hết hạn hoặc không được phép.'), { status: 401 });
}

function pemToPkcs8(pem) {
  const base64 = pem.replace(/-----BEGIN RSA PRIVATE KEY-----|-----END RSA PRIVATE KEY-----|-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, '');
  const keyDer = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
  if (pem.includes('BEGIN PRIVATE KEY')) return keyDer;
  const prefix = Uint8Array.from([0x30, 0x82, 0x00, 0x00, 0x02, 0x01, 0x00, 0x30, 0x0d, 0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01, 0x05, 0x00, 0x04, 0x82, 0x00, 0x00]);
  const length = keyDer.length;
  prefix[2] = ((prefix.length + length - 4) >>> 8) & 0xff;
  prefix[3] = (prefix.length + length - 4) & 0xff;
  prefix[24] = (length >>> 8) & 0xff;
  prefix[25] = length & 0xff;
  const combined = new Uint8Array(prefix.length + length);
  combined.set(prefix);
  combined.set(keyDer, prefix.length);
  return combined;
}

async function appJwt(env) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(new TextEncoder().encode(JSON.stringify({ alg: 'RS256', typ: 'JWT' })));
  const payload = b64url(new TextEncoder().encode(JSON.stringify({ iat: now - 30, exp: now + 8 * 60, iss: env.GITHUB_APP_ID })));
  const message = `${header}.${payload}`;
  const key = await crypto.subtle.importKey('pkcs8', pemToPkcs8(env.GITHUB_APP_PRIVATE_KEY), { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(message));
  return `${message}.${b64url(new Uint8Array(signature))}`;
}

async function installationToken(env) {
  const jwt = await appJwt(env);
  const response = await fetch(`https://api.github.com/app/installations/${env.GITHUB_INSTALLATION_ID}/access_tokens`, {
    method: 'POST', headers: ghHeaders(jwt), body: JSON.stringify({ repositories: [REPO], permissions: { contents: 'write' } }),
  });
  const data = await response.json();
  if (!response.ok || !data.token) throw new Error('Không tạo được GitHub App installation token.');
  return data.token;
}

function ghHeaders(token) {
  return { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'HOANET-Gallery-Upload', 'Content-Type': 'application/json' };
}

async function github(path, token, init = {}) {
  const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}${path}`, { ...init, headers: { ...ghHeaders(token), ...init.headers } });
  const data = await response.json();
  if (!response.ok) throw Object.assign(new Error(data.message || `GitHub API lỗi ${response.status}.`), { status: 502 });
  return data;
}

async function upload(request, env) {
  await requireSession(request, env);
  const data = await request.formData();
  const projectId = String(data.get('projectId') || '');
  const files = data.getAll('images').filter((file) => file instanceof File && file.size > 0);
  const setCover = data.get('setCover') === 'true';
  if (!/^[a-z0-9][a-z0-9-]{1,79}$/i.test(projectId)) throw Object.assign(new Error('Mã công trình không hợp lệ.'), { status: 400 });
  if (!files.length || files.length > MAX_IMAGES) throw Object.assign(new Error(`Chọn từ 1 đến ${MAX_IMAGES} ảnh.`), { status: 400 });
  if (files.some((file) => !ALLOWED_TYPES.has(file.type))) throw Object.assign(new Error('Chỉ nhận ảnh JPG, PNG, WebP hoặc GIF.'), { status: 400 });
  if (files.reduce((sum, file) => sum + file.size, 0) > MAX_TOTAL_BYTES) throw Object.assign(new Error('Tổng dung lượng ảnh vượt 50 MB.'), { status: 400 });

  const token = await installationToken(env);
  const allRecords = await github(`/git/trees/${BRANCH}?recursive=1`, token);
  const recordPaths = allRecords.tree?.filter((item) => item.type === 'blob' && item.path.startsWith('public/content/project-records/') && item.path.endsWith('.json')) || [];
  let recordFile;
  let project;
  for (const item of recordPaths) {
    const file = await github(`/contents/${item.path}?ref=${BRANCH}`, token);
    const candidate = JSON.parse(decodeBase64Utf8(file.content));
    if (candidate.details?.id === projectId) {
      recordFile = { path: item.path };
      project = candidate;
      break;
    }
  }
  if (!recordFile || !project) throw Object.assign(new Error('Không tìm thấy đúng hồ sơ công trình.'), { status: 404 });

  const ref = await github(`/git/ref/heads/${BRANCH}`, token);
  const head = await github(`/git/commits/${ref.object.sha}`, token);
  const baseTree = head.tree.sha;
  const folder = `public/assets/projects/${projectId}`;
  const timestamp = `${new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)}-${crypto.randomUUID().slice(0, 6)}`;
  const additions = [];
  const newPaths = [];
  for (let index = 0; index < files.length; index += 1) {
    const file = files[index];
    const extension = ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' })[file.type];
    const original = file.name.replace(/\.[^.]+$/, '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 55) || 'anh';
    const filename = `${timestamp}-${String(index + 1).padStart(2, '0')}-${original}.${extension}`;
    const path = `${folder}/${filename}`;
    const bytes = new Uint8Array(await file.arrayBuffer());
    const content = bytesToBase64(bytes);
    const blob = await github('/git/blobs', token, { method: 'POST', body: JSON.stringify({ content, encoding: 'base64' }) });
    additions.push({ path, mode: '100644', type: 'blob', sha: blob.sha });
    newPaths.push(`/assets/projects/${projectId}/${filename}`);
  }
  project.photos ||= {};
  project.photos.images = [...(Array.isArray(project.photos.images) ? project.photos.images : []), ...newPaths];
  if (setCover) project.photos.image = newPaths[0];
  const recordBlob = await github('/git/blobs', token, { method: 'POST', body: JSON.stringify({ content: JSON.stringify(project, null, 2) + '\n', encoding: 'utf-8' }) });
  additions.push({ path: recordFile.path, mode: '100644', type: 'blob', sha: recordBlob.sha });
  const tree = await github('/git/trees', token, { method: 'POST', body: JSON.stringify({ base_tree: baseTree, tree: additions }) });
  const commit = await github('/git/commits', token, { method: 'POST', body: JSON.stringify({ message: `feat: add ${files.length} project photo${files.length === 1 ? '' : 's'} to ${projectId}`, tree: tree.sha, parents: [head.sha] }) });
  await github(`/git/refs/heads/${BRANCH}`, token, { method: 'PATCH', body: JSON.stringify({ sha: commit.sha, force: false }) });
  return json({ ok: true, count: files.length, commit: commit.sha, commitUrl: `https://github.com/${OWNER}/${REPO}/commit/${commit.sha}`, paths: newPaths });
}

function bytesToBase64(bytes) {
  const chunkSize = 48 * 1024; // divisible by three, so intermediate chunks have no padding
  let encoded = '';
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const chunk = bytes.subarray(offset, Math.min(offset + chunkSize, bytes.length));
    let binary = '';
    for (const byte of chunk) binary += String.fromCharCode(byte);
    encoded += btoa(binary);
  }
  return encoded;
}


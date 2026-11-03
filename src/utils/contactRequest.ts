import { profile } from '../config/profile';

interface ContactRequest {
  name: string;
  phone: string;
  location: string;
  service: string;
  message: string;
}

export function buildContactRequestMailto(request: ContactRequest): string {
  const subject = `Yêu cầu khảo sát: ${request.service}`;
  const body = [
    `Họ tên: ${request.name}`,
    `Số điện thoại/Zalo: ${request.phone}`,
    `Khu vực: ${request.location || 'Chưa cung cấp'}`,
    `Dịch vụ: ${request.service}`,
    `Ghi chú: ${request.message || 'Không có'}`,
  ].join('\n');
  return `mailto:${profile.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

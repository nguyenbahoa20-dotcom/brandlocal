import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Clock, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { profile } from '../config/profile';

interface ContactProps {
  prefilledService?: string;
}

export const Contact: React.FC<ContactProps> = ({ prefilledService = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    service: prefilledService || 'Camera an ninh (CCTV)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate instant client-side submission & storage
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#080d1a] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-cyan-400 font-mono">
            <span>06. KẾT NỐI &amp; YÊU CẦU KHẢO SÁT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            Tư Vấn Giải Pháp &amp; Khảo Sát Thực Địa Miễn Phí
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Tôi luôn sẵn sàng lắng nghe bài toán an ninh và mạng của bạn. Đừng ngần ngại gọi trực tiếp hoặc gửi thông tin để nhận phản hồi trong vòng 30 phút.
          </p>
        </div>

        {/* 2-Column Grid: Left = Direct Quick Actions & Channels, Right = Survey Request Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Action Buttons */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Kết Nối Trực Tiếp Nhanh Chóng</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${profile.contact.phone}`}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>Gọi Ngay ({profile.contact.phoneDisplay})</span>
                </a>

                <a
                  href={profile.contact.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Nhắn Zalo</span>
                </a>
              </div>

              <a
                href={`mailto:${profile.contact.email}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Gửi Email: {profile.contact.email}</span>
              </a>
            </div>

            {/* Detailed Contact Points */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4 text-xs">
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Khu Vực Phục Vụ Trực Tiếp</strong>
                  <span className="text-slate-400">{profile.contact.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Thời Gian Làm Việc</strong>
                  <span className="text-slate-400">{profile.contact.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Social Media Link Grid */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Kênh Mạng Xã Hội Chính Thức
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {profile.social.facebook && (
                  <a
                    href={profile.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                )}
                {profile.social.tiktok && (
                  <a
                    href={profile.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-colors"
                  >
                    TikTok
                  </a>
                )}
                {profile.social.youtube && (
                  <a
                    href={profile.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-colors"
                  >
                    YouTube
                  </a>
                )}
                {profile.social.github && (
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Lead Capture Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Đăng Ký Khảo Sát &amp; Lên Dự Toán</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Điền thông tin sơ bộ của bạn, tôi sẽ liên hệ lại để tư vấn giải pháp tối ưu chi phí nhất.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Họ và tên của bạn <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ví dụ: Nguyễn Văn A"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-600 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Số điện thoại / Zalo <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Ví dụ: 0901 234 567"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-600 outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Địa chỉ / Khu vực cần khảo sát
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Ví dụ: TP. Thủ Đức, TP.HCM"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-600 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Dịch vụ quan tâm
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white outline-none transition-all"
                      >
                        <option value="Hệ Thống Camera Giám Sát IP/AI">Hệ Thống Camera Giám Sát IP/AI</option>
                        <option value="Hạ Tầng Mạng Doanh Nghiệp & WiFi Chịu Tải">Hạ Tầng Mạng Doanh Nghiệp &amp; WiFi Chịu Tải</option>
                        <option value="Tường Lửa & VPN Site-to-Site Chi Nhánh">Tường Lửa &amp; VPN Site-to-Site Chi Nhánh</option>
                        <option value="Chuẩn Hóa & Dọn Dẹp Tủ Rack Server">Chuẩn Hóa &amp; Dọn Dẹp Tủ Rack Server</option>
                        <option value="Bảo Trì Định Kỳ & Ứng Cứu Sự Cố 24/7">Bảo Trì Định Kỳ &amp; Ứng Cứu Sự Cố 24/7</option>
                        <option value="Nhu cầu kỹ thuật khác">Nhu cầu kỹ thuật khác...</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Mô tả hiện trạng hoặc yêu cầu kỹ thuật
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Ví dụ: Văn phòng có 50 nhân viên cần cải tạo mạng, hoặc xưởng cần lắp 16 mắt camera ban đêm có màu..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-600 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 active:scale-[0.99] transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
                  >
                    {loading ? (
                      <span>Đang tiếp nhận...</span>
                    ) : (
                      <>
                        <span>Gửi Yêu Cầu Khảo Sát Ngay</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500 text-center">
                    Cam kết bảo mật thông tin cá nhân. Không gửi tin nhắn quảng cáo rác.
                  </p>
                </form>
              ) : (
                /* Submission Confirmation State */
                <div className="py-12 px-4 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold text-white">Đã Nhận Thông Tin Của Bạn!</h3>
                  
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Cảm ơn <strong className="text-white">{formData.name}</strong>. Tôi đã tiếp nhận yêu cầu về <span className="text-cyan-400">{formData.service}</span> và sẽ gọi lại cho bạn qua số điện thoại <span className="font-mono text-cyan-300">{formData.phone}</span> trong thời gian sớm nhất.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`tel:${profile.contact.phone}`}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
                    >
                      Cần gấp? Gọi ngay {profile.contact.phoneDisplay}
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', phone: '', address: '', service: 'Camera an ninh (CCTV)', notes: '' });
                      }}
                      type="button"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                      Gửi yêu cầu khác
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

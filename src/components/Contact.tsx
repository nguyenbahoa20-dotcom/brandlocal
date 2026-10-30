import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
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

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#080d1a] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-cyan-400 font-mono">
            <span>LIÊN HỆ &amp; KHẢO SÁT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            Tư Vấn &amp; Khảo Sát Thực Địa Miễn Phí Tận Nơi
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Khu vực phục vụ: TP. Hồ Chí Minh và các địa bàn lân cận (Bình Dương, Đồng Nai, Long An). Trực tiếp tư vấn giải pháp phù hợp nhất với kinh phí của bạn.
          </p>
        </div>

        {/* 2-Column Grid: Left = Direct Quick Actions & Channels, Right = Survey Request Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Quick Action Buttons Card */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white">Liên Hệ Trực Tiếp Với Nguyễn Bá Hòa</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${profile.contact.phone}`}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-sm cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Gọi {profile.contact.phoneDisplay}</span>
                </a>

                <a
                  href={profile.contact.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Nhắn Zalo Ngay</span>
                </a>
              </div>

              <a
                href={`mailto:${profile.contact.email}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Email: {profile.contact.email}</span>
              </a>
            </div>

            {/* Service Area & Work Hours */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4 text-xs">
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Địa Bàn Phục Vụ Trọng Tâm</strong>
                  <span className="text-slate-400">{profile.contact.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Thời Gian Làm Việc &amp; Hỗ Trợ</strong>
                  <span className="text-slate-400">{profile.contact.workingHours} (Hỗ trợ sự cố khẩn cấp 24/7)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-300 pt-2 border-t border-slate-800/60">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Cam Kết Chất Lượng</strong>
                  <span className="text-slate-400">Khảo sát tận nơi · Tư vấn giải pháp chuẩn kỹ thuật · Thiết bị chính hãng 100% đầy đủ CO/CQ</span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
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

          {/* Right Column: Clean Lead Capture Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">Đăng Ký Khảo Sát &amp; Lên Dự Toán</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Để lại thông tin nhu cầu, tôi sẽ liên hệ lại trực tiếp trong vòng 30 phút để hỗ trợ.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Họ và tên của bạn <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ví dụ: Anh Nam / Chị Mai"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-sm text-white placeholder-slate-500 outline-none transition-all"
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-sm text-white placeholder-slate-500 outline-none transition-all font-mono"
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
                        placeholder="Ví dụ: Quận 7, TP. Thủ Đức, Bình Dương..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-sm text-white placeholder-slate-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Dịch vụ bạn quan tâm
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-sm text-white outline-none transition-all"
                      >
                        <option value="Hệ Thống Camera Giám Sát IP & AI">Camera an ninh (CCTV gia đình, cửa hàng)</option>
                        <option value="Hạ Tầng Mạng Doanh Nghiệp & WiFi Chịu Tải">WiFi phủ sóng mạnh & Mạng nội bộ</option>
                        <option value="Bảo Mật Tường Lửa & VPN Chi Nhánh">Bảo mật mạng & Kết nối chi nhánh (VPN)</option>
                        <option value="Chuẩn Hóa & Dọn Dẹp Tủ Rack Server">Dọn dẹp tủ mạng rack / quy hoạch dây</option>
                        <option value="Bảo Trì Định Kỳ & Ứng Cứu Sự Cố 24/7">Bảo trì định kỳ & Sửa chữa sự cố mạng</option>
                        <option value="Nhu cầu kỹ thuật khác">Nhu cầu kỹ thuật khác...</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Mô tả hiện trạng hoặc mong muốn (không bắt buộc)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Ví dụ: Cần lắp 4 mắt camera cho nhà 3 tầng, hoặc quán cafe 100m2 bị chập chờn WiFi..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-sm text-white placeholder-slate-500 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 active:scale-[0.99] transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    {loading ? (
                      <span>Đang gửi thông tin...</span>
                    ) : (
                      <>
                        <span>Gửi Yêu Cầu Khảo Sát Miễn Phí</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500 text-center">
                    Tôi cam kết bảo mật số điện thoại và địa chỉ của bạn. Không gọi quấy rầy hay spam quảng cáo.
                  </p>
                </form>
              ) : (
                /* Submission Confirmation State */
                <div className="py-10 px-4 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-white">Đã Tiếp Nhận Yêu Cầu Khảo Sát!</h3>
                  
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Cảm ơn <strong className="text-white">{formData.name}</strong>. Tôi đã nhận được thông tin về nhu cầu <span className="text-cyan-400">{formData.service}</span> và sẽ gọi lại cho bạn qua số điện thoại <span className="font-mono text-cyan-300 font-semibold">{formData.phone}</span> để hẹn giờ khảo sát thực tế.
                  </p>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
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

import React from 'react';
import { Camera, Network, ShieldAlert, Server, Wrench, CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react';
import { profile } from '../config/profile';

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return <Camera className="w-5 h-5 text-cyan-400" />;
      case 'Network':
        return <Network className="w-5 h-5 text-cyan-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-cyan-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-cyan-400" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-cyan-400" />;
      default:
        return <Camera className="w-5 h-5 text-cyan-400" />;
    }
  };

  // Plain everyday Vietnamese titles for ordinary homeowners and business owners
  const plainTitles: Record<string, string> = {
    'cctv-enterprise': 'Camera Quan Sát Sắc Nét Cho Gia Đình & Cửa Hàng',
    'cctv-ip-ai': 'Camera Quan Sát Sắc Nét Cho Gia Đình & Cửa Hàng',
    'network-infrastructure': 'Hệ Thống WiFi Phủ Sóng Rộng & Mạng Ổn Định',
    'enterprise-wifi': 'Hệ Thống WiFi Phủ Sóng Rộng & Mạng Ổn Định',
    'firewall-vpn': 'Bảo Mật Dữ Liệu & Kết Nối Chi Nhánh Từ Xa',
    'server-rack-cleanup': 'Sắp Xếp & Dọn Dẹp Tủ Dây Mạng Gọn Gàng',
    'datacenter-cleanup': 'Sắp Xếp & Dọn Dẹp Tủ Dây Mạng Gọn Gàng',
    'maintenance-support': 'Bảo Trì Định Kỳ & Hỗ Trợ Kỹ Thuật Nhanh Chóng',
    'maintenance-sla': 'Bảo Trì Định Kỳ & Hỗ Trợ Kỹ Thuật Nhanh Chóng',
  };

  // Plain-language one-sentence summaries without technical jargon (no LAN/WAN/WLAN, VLAN, failover, Cat6A, firmware)
  const plainSummaries: Record<string, string> = {
    'cctv-enterprise': 'Lắp đặt camera độ nét cao, quan sát rõ 24/7 từ điện thoại, ban đêm có màu sắc nét và báo động chống trộm chuẩn xác.',
    'cctv-ip-ai': 'Lắp đặt camera độ nét cao, quan sát rõ 24/7 từ điện thoại, ban đêm có màu sắc nét và báo động chống trộm chuẩn xác.',
    'network-infrastructure': 'Phủ sóng WiFi mạnh mẽ toàn bộ ngôi nhà, quán cà phê hoặc văn phòng, kết nối mượt mà và không lo nghẽn mạng khi đông người.',
    'enterprise-wifi': 'Phủ sóng WiFi mạnh mẽ toàn bộ ngôi nhà, quán cà phê hoặc văn phòng, kết nối mượt mà và không lo nghẽn mạng khi đông người.',
    'firewall-vpn': 'Bảo vệ dữ liệu an toàn trước nguy cơ xâm nhập và kết nối làm việc giữa các chi nhánh, cửa hàng từ xa ổn định.',
    'server-rack-cleanup': 'Sắp xếp lại đường dây mạng ngăn nắp, đánh dấu rõ ràng giúp hệ thống thông thoáng, thẩm mỹ và dễ kiểm tra khi cần.',
    'datacenter-cleanup': 'Sắp xếp lại đường dây mạng ngăn nắp, đánh dấu rõ ràng giúp hệ thống thông thoáng, thẩm mỹ và dễ kiểm tra khi cần.',
    'maintenance-support': 'Kiểm tra định kỳ toàn bộ hệ thống camera và mạng, hỗ trợ kỹ thuật từ xa kịp thời và có mặt tận nơi xử lý sự cố nhanh chóng.',
    'maintenance-sla': 'Kiểm tra định kỳ toàn bộ hệ thống camera và mạng, hỗ trợ kỹ thuật từ xa kịp thời và có mặt tận nơi xử lý sự cố nhanh chóng.',
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-[#080d1a] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-cyan-400 font-mono">
            <span>DỊCH VỤ THI CÔNG &amp; LẮP ĐẶT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
            Giải Pháp Kỹ Thuật Đáng Tin Cậy Cho Nhà Phố &amp; Cửa Hàng
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Khảo sát thực tế, tư vấn đúng nhu cầu sử dụng, báo giá trọn gói minh bạch và trực tiếp thi công chuẩn thẩm mỹ.
          </p>
        </div>

        {/* Services Grid: Concise Cards with Accessible Expandable Technical Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.services.map((service) => {
            const displayTitle = plainTitles[service.id] || service.title;
            const summaryText = plainSummaries[service.id] || service.description;

            return (
              <div
                key={service.id}
                className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div className="space-y-4">
                  
                  {/* Top Icon & Category Tag */}
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                      {renderServiceIcon(service.icon)}
                    </div>
                    {service.featured && (
                      <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-0.5 rounded-md">
                        Nhu Cầu Phổ Biến
                      </span>
                    )}
                  </div>

                  {/* Title in Plain Vietnamese */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {displayTitle}
                    </h3>
                  </div>

                  {/* One-Sentence Plain Language Summary (No Jargon) */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {summaryText}
                  </p>

                  {/* Suitable Audience */}
                  <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
                    <strong className="text-slate-300 font-medium">Phù hợp: </strong>
                    {service.targetAudience}
                  </div>

                  {/* Accessible Expand/Collapse for Technical Deliverables (Closed by default) */}
                  <details className="group/details mt-2 pt-2 border-t border-slate-800/80">
                    <summary className="flex items-center justify-between text-xs font-semibold text-cyan-400 hover:text-cyan-300 cursor-pointer list-none select-none py-1">
                      <span>Chi tiết thiết bị &amp; hạng mục bàn giao ({service.deliverables.length})</span>
                      <ChevronDown className="w-4 h-4 text-slate-400 group-open/details:rotate-180 transition-transform" />
                    </summary>
                    <div className="pt-3 pb-1 space-y-2 text-xs text-slate-400">
                      <ul className="space-y-1.5">
                        {service.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-snug text-slate-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-[11px] text-slate-500 pt-1 italic">
                        {service.tagline}
                      </p>
                    </div>
                  </details>

                </div>

                {/* Bottom Action Button */}
                <div className="pt-5 mt-4 border-t border-slate-800/60">
                  <button
                    onClick={() => onSelectService?.(displayTitle)}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer"
                  >
                    <span>Yêu Cầu Khảo Sát Dịch Vụ Này</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string; // আপনার হোয়াটসঅ্যাপ নম্বর (কান্ট্রি কোড সহ, যেমন: 8801700000000)
  message?: string;    // ডিফল্ট মেসেজ যা ইউজার ক্লিক করার সাথে দেখতে পাবে
}

export default function WhatsAppButton({
  phoneNumber = "8801700000000", // আপনার আসল হোয়াটসঅ্যাপ নম্বরটি এখানে বসিয়ে দিন
  message = "Hello! I need help with Verbal Victory courses.",
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group font-sans">
      {/* Tooltip text on hover */}
      <div className="absolute right-16 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 bg-white text-[#12372A] text-xs font-bold py-2 px-3.5 rounded-2xl shadow-xl border border-emerald-100 whitespace-nowrap pointer-events-none">
        Chat with Support 💬
      </div>

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact support on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer relative"
      >
        {/* Pulsing ring background effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-35 -z-10"></span>
        <MessageCircle size={28} className="fill-white text-[#25D366]" />
      </a>
    </div>
  );
}
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleClick = () => {
    const phoneNumber = "5500000000000"; // Número placeholder
    const message = encodeURIComponent("Olá! Gostaria de falar com um pescador da região.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
      aria-label="Entrar em contato pelo WhatsApp"
    >
      <MessageCircle className="h-6 w-6 fill-current" />
      <span className="font-semibold hidden sm:inline">
        Entre em contato com um pescador
      </span>
      <span className="font-semibold sm:hidden">
        Falar com pescador
      </span>
    </button>
  );
};

export default WhatsAppButton;

import { Anchor } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Anchor className="h-6 w-6 text-primary-foreground" />
          <span className="text-xl font-bold text-primary-foreground">
            Pesca Conectada
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#inicio" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium">
            Início
          </a>
          <a href="#mares" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium">
            Tábua de Marés
          </a>
          <a href="#sobre" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-medium">
            Sobre
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

import heroImage from "@/assets/hero-ocean.jpg";
import RegionSelector from "./RegionSelector";
import TideCard from "./TideCard";
import { Button } from "@/components/ui/button";
import { Waves } from "lucide-react";
import { useState } from "react";

const HeroSection = () => {
  const [showTides, setShowTides] = useState(false);

  const handleSearch = (region: string) => {
    console.log("Buscando região:", region);
    setShowTides(true);
  };

  return (
    <section id="inicio" className="relative min-h-[90vh] flex flex-col">
      {/* Hero Image Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Vista do oceano ao amanhecer com barco de pesca"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 max-w-3xl leading-tight">
          Consulte a Tábua de Marés e Conecte-se ao Pescador Local
        </h1>
        <p className="text-lg text-primary-foreground/90 mb-8 max-w-xl">
          Acompanhe as marés da sua região e entre em contato direto com pescadores artesanais
        </p>
        <Button
          onClick={() => document.getElementById('mares')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-secondary hover:bg-teal-light text-secondary-foreground font-semibold px-8 py-6 text-lg rounded-full shadow-lg transition-all hover:scale-105"
        >
          <Waves className="h-5 w-5 mr-2" />
          Ver Tábua de Marés
        </Button>
      </div>

      {/* Tide Info Section */}
      <div id="mares" className="relative z-10 bg-gradient-to-b from-transparent to-background pb-8 pt-4 px-4">
        <div className="container mx-auto space-y-6">
          <RegionSelector onSearch={handleSearch} />
          
          {showTides && (
            <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <TideCard type="high" time="5h42" height="2.1m" />
              <TideCard type="low" time="11h12" height="0.6m" />
              <TideCard type="high" time="17h58" height="2.0m" />
              <TideCard type="low" time="23h45" height="0.5m" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

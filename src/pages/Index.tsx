import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        {/* Sobre Section */}
        <section id="sobre" className="py-20 px-4 bg-muted">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Sobre o Pesca Conectada
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              O Pesca Conectada é uma plataforma que une tecnologia e tradição, 
              permitindo que você acompanhe as marés da sua região e entre em 
              contato direto com pescadores artesanais. Apoie a pesca local e 
              tenha acesso a pescados frescos diretamente de quem conhece o mar.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-primary-foreground/80 text-sm">
            © 2024 Pesca Conectada. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default Index;

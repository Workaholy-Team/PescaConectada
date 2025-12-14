// src/components/HeroSection.tsx
import heroImage from "@/assets/hero-ocean.jpg"; 
import RegionSelector from "./RegionSelector";
import TideCard from "./TideCard";
import { Button } from "@/components/ui/button";
import { Waves, Loader2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { fetchTideData, TideData, HARBORS } from "../services/tideServices"; 

const WHATSAPP_NUMBER = '558193459378'; 

const HeroSection = () => {
    // --- ESTADOS ---
    const [tideResults, setTideResults] = useState<TideData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [harborName, setHarborName] = useState<string>(''); 

    // --- FUNÇÃO DE BUSCA ---
    const handleSearch = async (harborId: number) => {
        setLoading(true);
        setError(null);
        setTideResults(null);
        
        const selectedHarbor = HARBORS.find(h => h.id === harborId)?.name || 'Porto Selecionado';
        setHarborName(selectedHarbor); 

        try {
            const data = await fetchTideData(harborId); 
            setTideResults(data);

            setTimeout(() => {
                document.getElementById('mares-display')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);

        } catch (err: any) {
            setError(err.message || "Erro desconhecido ao buscar dados de maré.");
        } finally {
            setLoading(false);
        }
    };
    
    // --- LINK DO WHATSAPP ---
    const whatsappMessage = `Olá! Consultei a tábua de marés para ${harborName || 'minha área'} no seu site e gostaria de um contato sobre serviços de navegação/pesca.`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(whatsappMessage)}`;


    // --- RENDERIZAÇÃO ---
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

            {/* Content Principal */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 max-w-3xl leading-tight">
                    Consulte a Tábua de Marés e Conecte-se ao Profissional Local
                </h1>
                <p className="text-lg text-primary-foreground/90 mb-8 max-w-xl">
                    Acompanhe as marés da sua região e entre em contato direto com pescadores artesanais.
                </p>
                <Button
                    onClick={() => document.getElementById('search-area')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-secondary hover:bg-teal-light text-secondary-foreground font-semibold px-8 py-6 text-lg rounded-full shadow-lg transition-all hover:scale-105"
                >
                    <Waves className="h-5 w-5 mr-2" />
                    Ver Tábua de Marés
                </Button>
            </div>

            {/* Seção de Seleção e Exibição de Dados */}
            <div id="search-area" className="relative z-10 bg-gradient-to-b from-transparent to-background pb-8 pt-4 px-4">
                <div className="container mx-auto space-y-6">
                    {/* Componente de Seleção do Porto */}
                    <RegionSelector onSearch={handleSearch} />
                    
                    {/* Área de Exibição dos Resultados */}
                    <div id="mares-display" className="min-h-[150px] flex justify-center items-center p-4">
                        
                        {/* 1. Estado de Carregamento */}
                        {loading && (
                            <Loader2 className="h-10 w-10 animate-spin text-secondary" />
                        )}

                        {/* 2. Estado de Erro */}
                        {error && (
                            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center max-w-md">
                                <p className="font-bold">Erro de Busca:</p>
                                <p>{error}</p>
                            </div>
                        )}

                        {/* 3. Estado de Resultado (Sucesso) */}
                        {tideResults && (
                            <div className="w-full">
                                <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {tideResults.events.map((tide, index) => (
                                        <TideCard 
                                            key={index} 
                                            type={tide.type} 
                                            time={tide.time} 
                                            height={tide.height} 
                                        />
                                    ))}
                                </div>

                                {/* Botão do WhatsApp contextualizado */}
                                <div className="mt-8 text-center">
                                    <a 
                                        href={whatsappLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-xl transition duration-300 transform hover:scale-105"
                                    >
                                        <MessageCircle className="h-6 w-6" />
                                        <span className="text-lg">Fale com um Profissional em {harborName}</span>
                                    </a>
                                </div>
                            </div>
                        )}
                        
                        {/* 4. Estado Inicial (Nenhuma busca feita) */}
                        {!loading && !error && !tideResults && (
                            <p className="text-gray-500 italic">Selecione um porto para ver a tábua de marés de hoje.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
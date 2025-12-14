import { HARBORS } from '../services/tideServices';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface RegionSelectorProps {
    // onSearch agora espera o ID numérico do porto
    onSearch: (harborId: number) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ onSearch }) => {
    // Mantém o ID do porto selecionado como string (exigido pelo Select)
    const [selectedHarborId, setSelectedHarborId] = useState<string>('');

    const handleSearch = () => {
        const id = parseInt(selectedHarborId, 10);
        if (id) {
            onSearch(id);
        } else {
            alert("Por favor, selecione um porto.");
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 p-4 bg-background/90 rounded-xl shadow-2xl max-w-xl mx-auto border border-border">
            
            {/* Seletor de Porto */}
            <div className="flex-1">
                <Select value={selectedHarborId} onValueChange={setSelectedHarborId}>
                    <SelectTrigger className="w-full h-12 text-base">
                        <SelectValue placeholder="Selecione o porto para ver a tábua de marés" />
                    </SelectTrigger>
                    <SelectContent>
                        {HARBORS.map((harbor) => (
                            <SelectItem key={harbor.id} value={String(harbor.id)}>
                                {harbor.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            {/* Botão de Busca */}
            <Button 
                onClick={handleSearch}
                disabled={!selectedHarborId}
                className="w-full md:w-auto h-12 px-6 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold transition"
            >
                <Search className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Buscar Marés</span>
            </Button>
        </div>
    );
};

export default RegionSelector;
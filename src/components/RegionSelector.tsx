import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RegionSelectorProps {
  onSearch: (region: string) => void;
}

const RegionSelector = ({ onSearch }: RegionSelectorProps) => {
  const [region, setRegion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (region.trim()) {
      onSearch(region.trim());
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-xl max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-secondary" />
        <h3 className="font-semibold text-foreground">
          Escolha sua região para ver a tábua de marés
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          type="text"
          placeholder="Cidade / Estado"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="flex-1 bg-muted border-0 focus-visible:ring-secondary"
        />
        <Button type="submit" className="bg-secondary hover:bg-teal-light text-secondary-foreground px-6">
          <Search className="h-4 w-4 mr-2" />
          Buscar
        </Button>
      </form>
    </div>
  );
};

export default RegionSelector;

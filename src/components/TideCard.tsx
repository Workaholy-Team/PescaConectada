import { ArrowUp, ArrowDown, Clock } from "lucide-react";

interface TideCardProps {
  type: "high" | "low";
  time: string;
  height: string;
}

const TideCard = ({ type, time, height }: TideCardProps) => {
  const isHigh = type === "high";
  
  return (
    <div className="bg-card rounded-xl p-6 shadow-lg flex items-center gap-4 min-w-[200px]">
      <div className={`p-3 rounded-full ${isHigh ? 'bg-secondary/20' : 'bg-primary/20'}`}>
        {isHigh ? (
          <ArrowUp className="h-6 w-6 text-secondary" />
        ) : (
          <ArrowDown className="h-6 w-6 text-primary" />
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground font-medium">
          {isHigh ? "Maré Alta" : "Maré Baixa"}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">{time}</span>
          <span className="text-sm text-muted-foreground">{height}</span>
        </div>
      </div>
      <Clock className="h-5 w-5 text-muted-foreground" />
    </div>
  );
};

export default TideCard;

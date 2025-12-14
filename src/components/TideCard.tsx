import { TideEvent } from '../services/tideServices';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

// Omitimos o tipo da propriedade height, pois ela já está na interface TideEvent
interface TideCardProps extends TideEvent {}

const TideCard: React.FC<TideCardProps> = ({ type, time, height }) => {
    // Determina classes e ícone com base no tipo (high/low)
    const isHigh = type === 'high';
    const icon = isHigh ? ArrowUpCircle : ArrowDownCircle;
    
    // Classes de cor e borda
    const colorClasses = isHigh 
        ? "border-b-4 border-teal-500 bg-teal-50 text-teal-800"
        : "border-b-4 border-blue-500 bg-blue-50 text-blue-800";
        
    const IconComponent = icon;

    return (
        <div className={`p-4 rounded-lg shadow-md flex flex-col items-center w-[160px] transition-all duration-300 transform hover:scale-[1.03] ${colorClasses}`}>
            
            {/* Ícone e Tipo */}
            <div className="flex items-center space-x-2 mb-2">
                <IconComponent className="h-6 w-6" />
                <span className="text-lg font-bold uppercase">
                    {isHigh ? "Maré Alta" : "Maré Baixa"}
                </span>
            </div>
            
            {/* Hora */}
            <div className="text-4xl font-extrabold mb-1">
                {time}
            </div>
            
            {/* Altura */}
            <div className="text-xl font-semibold">
                {height}
            </div>
            
        </div>
    );
};

export default TideCard;
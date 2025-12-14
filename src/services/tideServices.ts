// src/services/tideServices.ts

const BASE_TIDE_URL = '/api/tabua-mare';

export const HARBORS = [
    { id: 29, name: "Recife, PE" },
    { id: 28, name: "Fernando De Noronha, PE" },
    { id: 30, name: "Ipojuca, PE" },
    { id: 1, name: "Maceió, AL" },
    { id: 53, name: "Barra dos Coqueiros, SE" },
    { id: 55, name: "Aracaju, SE" },
    { id: 27, name: "João Pessoa, PB" },
];

export interface TideEvent {
  type: 'high' | 'low';
  time: string;
  height: string;
}

export interface TideData {
  harborName: string; 
  events: TideEvent[];
}

export async function fetchTideData(harborId: number): Promise<TideData | null> {
    
    const harborInfo = HARBORS.find(h => h.id === harborId);
    if (!harborInfo) {
        throw new Error("ID de Porto inválido.");
    }

    const today = new Date();
    const currentMonth = today.getMonth() + 1; 
    const currentDay = today.getDate();       
    
    const apiUrl = `${BASE_TIDE_URL}/tabua-mare/${harborId}/${currentMonth}/[${currentDay}]`;

    try {
        const res = await fetch(apiUrl, {
             // Mantém o header User-Agent para tentar contornar o 403
             headers: {
                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
             },
        });
        
        // --- INÍCIO DA CORREÇÃO CHAVE ---
        // Cria uma cópia da resposta para que possamos tentar ler o corpo múltiplas vezes
        const clonedRes = res.clone(); 
        
        if (!res.ok) {
            const status = res.status;
            let errorDetail = `Código ${status}.`;
            
            try {
                // Tentativa 1: Lê a CÓPIA como JSON
                const errorJson = await clonedRes.json();
                errorDetail += errorJson.error?.msg ? ` Detalhe: ${errorJson.error.msg}` : '';
            } catch {
                // Tentativa 2: Se falhar, tenta ler a CÓPIA como texto
                const errorText = await clonedRes.text();
                // O texto lido agora conterá o "invalid He..." sem dar erro de stream
                errorDetail += ` Detalhe: ${errorText.substring(0, 100)}...`; 
            }

            throw new Error(`Falha na API: ${errorDetail}. Verifique o CORS ou headers necessários.`);
        }
        // --- FIM DA CORREÇÃO CHAVE ---
        
        // Se res.ok for TRUE, lemos a resposta ORIGINAL como JSON
        const data = await res.json();

        if (!data.data || data.data.length === 0) {''
            throw new Error(`Nenhuma tábua de maré encontrada para ${harborInfo.name}.`);
        }
        
        const tideInfo = data.data[0];
        const currentMonthData = tideInfo.months[0];
        const todayData = currentMonthData.days.find((d: any) => d.day === currentDay);
        
        if (!todayData) {
             throw new Error(`Nenhum dado de maré encontrado para o dia ${currentDay} em ${harborInfo.name}.`);
        }
        
        const meanLevel = tideInfo.mean_level; 

        const events: TideEvent[] = todayData.hours.map((h: any) => {
            const level = parseFloat(h.level);
            return {
                time: h.hour.substring(0, 5),
                height: `${level.toFixed(2)}m`,
                type: level >= meanLevel ? 'high' : 'low',
            }
        }).sort((a: TideEvent, b: TideEvent) => a.time.localeCompare(b.time));

        return {
            harborName: tideInfo.harbor_name,
            events,
        };

    } catch (error: any) {
        console.error("Erro ao buscar dados da Tábua de Marés:", error.message);
        throw new Error(error.message);
    }
}
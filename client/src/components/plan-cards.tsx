import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface PlanCardsProps {
  plans?: Array<{
    id: string;
    name: string;
    type: string;
    speed: number;
    price: number;
    features: string[];
    isPopular: boolean;
  }>;
}

const PlanCards = ({ plans = [] }: PlanCardsProps) => {
  // If no plans are provided, use default plans
  const displayPlans = plans.length > 0 ? plans : [
    {
      id: "fibra-300",
      name: "FIBRA 300 MEGAS",
      type: "FIBRA",
      speed: 300,
      price: 99.90,
      features: [
        "Velocidade de 300 Mbps de download",
        "150 Mbps de upload",
        "Wi-Fi de alta performance incluso",
        "Sem limite de dados",
        "Instalação grátis"
      ],
      isPopular: false
    },
    {
      id: "fibra-400",
      name: "FIBRA 400 MEGAS",
      type: "FIBRA",
      speed: 400,
      price: 119.90,
      features: [
        "Velocidade de 400 Mbps de download",
        "200 Mbps de upload",
        "Roteador Wi-Fi 6 de alta performance",
        "Suporte prioritário 24/7",
        "Instalação expressa grátis",
        "IP fixo opcional"
      ],
      isPopular: true
    },
    {
      id: "radio-50",
      name: "RÁDIO 50 MEGAS",
      type: "RADIO",
      speed: 50,
      price: 119.90,
      features: [
        "Velocidade de 50 Mbps de download",
        "20 Mbps de upload",
        "Equipamento resistente a intempéries",
        "Ideal para áreas sem cobertura de fibra",
        "Instalação especializada inclusa"
      ],
      isPopular: false
    }
  ];

  // Sort plans so that the popular one is in the middle
  const sortedPlans = [...displayPlans].sort((a, b) => {
    if (a.isPopular) return 0;
    if (b.isPopular) return -1;
    return 1;
  });

  const getTypeDescription = (type: string) => {
    if (type === 'FIBRA') return 'Internet de alta velocidade via fibra óptica';
    if (type === 'RADIO') return 'Ideal para áreas rurais mais distantes';
    return 'Internet de alta velocidade';
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-agro-dark mb-4">Nossos Planos</h2>
      <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
        Escolha o plano ideal para você e sua família. Oferecemos opções para todos os tipos de necessidade, 
        seja no campo ou na cidade.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPlans.map((plan, index) => (
          <div 
            key={plan.id}
            className={`plan-card bg-white rounded-xl overflow-hidden shadow-lg border-t-4 ${
              plan.isPopular ? 'border-agro-blue scale-105 relative shadow-xl' : 'border-agro-green'
            } transition duration-300`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-0 right-0 text-center">
                <span className="bg-agro-orange text-white text-sm font-bold py-1 px-4 rounded-full inline-block">
                  MAIS POPULAR
                </span>
              </div>
            )}
            
            <div className={`${plan.isPopular ? 'bg-agro-blue pt-6' : 'bg-agro-green'} text-white p-4 text-center`}>
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-white/80 text-sm">{getTypeDescription(plan.type)}</p>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <span className="text-gray-400 text-sm line-through">
                  R${(plan.price + 30).toFixed(2).replace('.', ',')}
                </span>
                <div className="text-4xl font-bold text-agro-dark">
                  R${plan.price.toFixed(2).replace('.', ',')}
                  <span className="text-sm font-normal">/mês</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle 
                      className={`h-4 w-4 mt-1 mr-2 ${plan.isPopular ? 'text-agro-blue' : 'text-agro-green'}`} 
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a href="#lead-form" className={`block text-center ${
                plan.isPopular 
                  ? 'bg-agro-orange hover:bg-amber-600' 
                  : 'bg-agro-orange hover:bg-amber-600'
              } text-white font-semibold py-3 px-6 rounded-md transition duration-300`}>
                QUERO ESTE PLANO
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanCards;

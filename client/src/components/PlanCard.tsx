import { Check } from 'lucide-react';
import { InternetPlan } from '@/lib/types';

interface PlanCardProps {
  plan: InternetPlan;
  isPopular?: boolean;
}

const PlanCard = ({ plan, isPopular = false }: PlanCardProps) => {
  const borderColor = plan.type === 'FIBRA' && plan.speed < 400 ? 'border-primary' : 'border-secondary';
  const bgColor = plan.type === 'FIBRA' && plan.speed < 400 ? 'bg-primary' : 'bg-secondary';
  const checkColor = plan.type === 'FIBRA' && plan.speed < 400 ? 'text-primary' : 'text-secondary';

  return (
    <div className={`plan-card bg-white rounded-xl overflow-hidden shadow-lg border-t-4 ${borderColor} transition duration-300 ${isPopular ? 'scale-105 shadow-xl relative' : ''}`}>
      {isPopular && (
        <div className="absolute -top-4 left-0 right-0 text-center">
          <span className="bg-accent text-white text-sm font-bold py-1 px-4 rounded-full inline-block">
            MAIS POPULAR
          </span>
        </div>
      )}
      
      <div className={`${bgColor} text-white p-4 text-center ${isPopular ? 'pt-6' : ''}`}>
        <h3 className="text-xl font-bold">{plan.type} {plan.speed} MEGAS</h3>
        <p className="text-white/80 text-sm">
          {plan.type === 'FIBRA' 
            ? `Internet ${plan.speed >= 400 ? 'premium' : 'de alta velocidade'} via fibra óptica` 
            : 'Ideal para áreas rurais mais distantes'}
        </p>
      </div>
      
      <div className="p-6">
        <div className="text-center mb-6">
          <span className="text-gray-400 text-sm line-through">
            R${(Number(plan.price) + 30).toFixed(2).replace('.', ',')}
          </span>
          <div className="text-4xl font-bold text-gray-800">
            R${Number(plan.price).toFixed(2).replace('.', ',')}
            <span className="text-sm font-normal">/mês</span>
          </div>
        </div>
        
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className={`${checkColor} mt-1 mr-2 h-5 w-5`} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <a 
          href="#lead-form" 
          className="block text-center bg-accent hover:bg-accent/80 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
        >
          QUERO ESTE PLANO
        </a>
      </div>
    </div>
  );
};

export default PlanCard;

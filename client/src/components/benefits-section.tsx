import { 
  Gauge, 
  MapPin, 
  Headphones, 
  Wrench, 
  DollarSign, 
  Wifi 
} from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Gauge className="h-6 w-6 text-agro-green" />,
      title: "Alta Velocidade",
      description: "Conexão estável e de alta velocidade para todas as suas necessidades, do trabalho ao entretenimento."
    },
    {
      icon: <MapPin className="h-6 w-6 text-agro-green" />,
      title: "Ampla Cobertura",
      description: "Levamos internet de qualidade para áreas rurais e urbanas, onde outros provedores não chegam."
    },
    {
      icon: <Headphones className="h-6 w-6 text-agro-green" />,
      title: "Suporte Local",
      description: "Atendimento humanizado e suporte técnico com equipe local que conhece sua região."
    },
    {
      icon: <Wrench className="h-6 w-6 text-agro-green" />,
      title: "Instalação Grátis",
      description: "Instalação profissional sem custo adicional, com equipamentos modernos e de qualidade."
    },
    {
      icon: <DollarSign className="h-6 w-6 text-agro-green" />,
      title: "Melhor Custo-Benefício",
      description: "Planos com preços justos e transparentes, sem surpresas na fatura ou taxas ocultas."
    },
    {
      icon: <Wifi className="h-6 w-6 text-agro-green" />,
      title: "Sem Limite de Dados",
      description: "Use à vontade, sem preocupações com franquias ou redução de velocidade."
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-agro-dark mb-4">
        Por que escolher a AGRONET?
      </h2>
      <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
        Oferecemos muito mais que internet. Conheça os benefícios exclusivos de ser nosso cliente.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition duration-300">
            <div className="rounded-full bg-agro-green/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-semibold text-agro-dark mb-3">{benefit.title}</h3>
            <p className="text-gray-600">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;

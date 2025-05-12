import { useState } from 'react';
import { Check, MapPin, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CoverageArea } from '@/lib/types';

interface CoverageMapProps {
  areas: CoverageArea[];
}

const CoverageMap = ({ areas }: CoverageMapProps) => {
  const [zipCode, setZipCode] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCovered, setIsCovered] = useState(false);
  const [message, setMessage] = useState({
    title: '',
    text: ''
  });

  // Formatar CEP ao digitar
  const formatZipCode = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 8) {
      let formatted = digits;
      if (digits.length > 5) {
        formatted = `${digits.slice(0, 5)}-${digits.slice(5)}`;
      }
      return formatted;
    }
    return value;
  };

  // Lista de CEPs dentro da área de cobertura (baseada no requisito)
  const coveredZipCodes = ['65800000', '65800-000'];
  
  const handleCheck = () => {
    // Certifique-se de que temos um CEP para verificar
    if (zipCode.length < 5) {
      alert('Por favor, informe um CEP válido');
      return;
    }
    
    // Limpar o CEP para comparação (remover hífen)
    const cleanedZip = zipCode.replace(/\D/g, '');
    
    // Verificar se o CEP está na lista de cobertos
    const covered = coveredZipCodes.includes(cleanedZip) || 
                   coveredZipCodes.includes(zipCode);
    
    setIsCovered(covered);
    
    if (covered) {
      setMessage({
        title: "Cobertura disponível!",
        text: "Seu endereço em Balsas - MA está em nossa área de cobertura. Temos planos de fibra óptica disponíveis para você!"
      });
    } else {
      setMessage({
        title: "Área ainda não coberta",
        text: "Infelizmente ainda não temos cobertura nesse CEP. Deixe seus dados que entraremos em contato quando nossa rede chegar até você."
      });
    }
    
    setShowResult(true);
  };

  return (
    <section id="cobertura" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Nossa Área de Cobertura
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Verifique se sua região está dentro da nossa área de cobertura.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-2 h-[400px] md:h-[500px] relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')" }}
              />
              
              <div className="absolute inset-0">
                {/* Fiber Coverage - Focado em Balsas-MA */}
                <div className="absolute top-[20%] left-[30%] w-[35%] h-[45%] bg-secondary/20 rounded-full border-2 border-secondary animate-pulse">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-lg text-shadow">
                    Balsas-MA
                  </div>
                </div>
                
                {/* Radio Coverage */}
                <div className="absolute top-[15%] left-[25%] w-[50%] h-[60%] bg-primary/20 rounded-full border-2 border-primary"></div>
                
                {/* Map Legend */}
                <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-md shadow-md">
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-secondary/40 border border-secondary mr-2"></div>
                    <span className="text-sm">Cobertura Fibra</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-primary/40 border border-primary mr-2"></div>
                    <span className="text-sm">Cobertura Rádio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Verifique sua cobertura</h3>
              
              <div className="mb-6">
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                <Input
                  id="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(formatZipCode(e.target.value))}
                  placeholder="Digite seu CEP (65800-000)"
                  className="px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                  maxLength={9}
                />
              </div>
              
              <Button
                onClick={handleCheck}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-md transition duration-300 mb-4"
              >
                VERIFICAR DISPONIBILIDADE
              </Button>
              
              {/* Coverage Results */}
              {showResult && (
                <div className={`mt-4 p-4 rounded-md ${isCovered ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                  <div className="flex">
                    {isCovered ? (
                      <Check className="text-green-500 h-6 w-6 mr-3 mt-1" />
                    ) : (
                      <AlertCircle className="text-yellow-500 h-6 w-6 mr-3 mt-1" />
                    )}
                    <div>
                      <h4 className={`font-semibold ${isCovered ? 'text-green-800' : 'text-yellow-800'}`}>{message.title}</h4>
                      <p className={`mt-1 ${isCovered ? 'text-green-700' : 'text-yellow-700'}`}>{message.text}</p>
                      <a href="#lead-form" className="inline-block mt-3 text-accent hover:text-accent/80 font-medium">
                        Solicitar contato <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2">Áreas com cobertura:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <MapPin className="text-primary mt-1 mr-2 h-4 w-4" />
                    <span>Balsas - MA (CEP 65800-000)</span>
                  </li>
                  {areas.slice(0, 2).map((area, index) => (
                    <li key={index} className="flex items-start">
                      <MapPin className="text-primary mt-1 mr-2 h-4 w-4" />
                      <span>{area.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageMap;

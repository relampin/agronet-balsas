import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, MapPin, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CoverageMap = () => {
  const [zipCode, setZipCode] = useState('');
  const [showCoverageResult, setShowCoverageResult] = useState(false);
  const { toast } = useToast();
  
  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
      setZipCode(value);
    }
  };
  
  const formatZipCode = (value: string) => {
    if (value.length <= 5) return value;
    return `${value.substring(0, 5)}-${value.substring(5)}`;
  };
  
  const checkCoverage = () => {
    if (zipCode.length < 8) {
      toast({
        title: "CEP inválido",
        description: "Por favor, informe um CEP válido com 8 números.",
        variant: "destructive",
      });
      return;
    }
    
    // In a production environment, this would call an API to check coverage
    // For this example, we'll just show the result for any valid CEP
    setShowCoverageResult(true);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-agro-dark mb-4">
        Nossa Área de Cobertura
      </h2>
      <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
        Verifique se sua região está dentro da nossa área de cobertura.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-2 h-[400px] md:h-[500px] relative overflow-hidden">
            {/* Map visualization */}
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')" }}
            ></div>
            
            {/* Map Overlays */}
            <div className="absolute inset-0">
              {/* Fiber Coverage */}
              <div className="absolute top-[20%] left-[30%] w-[35%] h-[45%] bg-agro-blue/20 rounded-full border-2 border-agro-blue animate-pulse"></div>
              
              {/* Radio Coverage */}
              <div className="absolute top-[15%] left-[25%] w-[50%] h-[60%] bg-agro-green/20 rounded-full border-2 border-agro-green"></div>
              
              {/* Map Legend */}
              <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-md shadow-md">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-agro-blue/40 border border-agro-blue mr-2"></div>
                  <span className="text-sm">Cobertura Fibra</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-agro-green/40 border border-agro-green mr-2"></div>
                  <span className="text-sm">Cobertura Rádio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-agro-dark mb-4">Verifique sua cobertura</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                <div className="flex">
                  <Input 
                    value={formatZipCode(zipCode)}
                    onChange={handleZipCodeChange}
                    placeholder="Digite seu CEP" 
                    className="w-full px-4 py-3"
                  />
                </div>
              </div>
              
              <Button 
                onClick={checkCoverage}
                className="w-full bg-agro-green hover:bg-green-700 text-white font-semibold py-3 px-6 h-auto"
              >
                <Search className="mr-2 h-4 w-4" /> VERIFICAR DISPONIBILIDADE
              </Button>
              
              {/* Coverage Results */}
              {showCoverageResult && (
                <div className="mt-4 p-4 rounded-md bg-green-50 border border-green-200">
                  <div className="flex">
                    <CheckCircle className="text-green-500 text-xl mr-3 mt-1 h-5 w-5" />
                    <div>
                      <h4 className="font-semibold text-green-800">Cobertura disponível!</h4>
                      <p className="text-green-700 mt-1">Seu endereço está em nossa área de cobertura. Temos planos de fibra disponíveis para você!</p>
                      <a href="#lead-form" className="inline-block mt-3 text-agro-orange hover:text-amber-600 font-medium">
                        Solicitar contato <i className="fas fa-arrow-right ml-1"></i>
                      </a>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-agro-dark mb-2">Áreas com cobertura:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <MapPin className="text-agro-green mt-1 mr-2 h-4 w-4" />
                    <span>Centro e região metropolitana</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="text-agro-green mt-1 mr-2 h-4 w-4" />
                    <span>Zona rural até 40km da cidade</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="text-agro-green mt-1 mr-2 h-4 w-4" />
                    <span>Distritos e comunidades rurais</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoverageMap;

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InternetPlan {
  id: string;
  name: string;
  type: string;
  speed: number;
  price: number;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  bannerImage?: string;
  bannerOrder?: number;
}

interface BannerCarouselProps {
  plans: InternetPlan[];
}

const SLIDE_DURATION = 5000; // 5 seconds per slide

const bannerBackgrounds = [
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
  "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
];

const BannerCarousel = ({ plans }: BannerCarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = plans.length > 0 ? plans.length : 3;
  
  // Reset autoplay when slide changes
  useEffect(() => {
    if (isAutoPlaying) {
      resetAutoPlay();
    }
    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [activeSlide, isAutoPlaying]);

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
    
    autoPlayRef.current = setTimeout(() => {
      nextSlide();
    }, SLIDE_DURATION);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  // Handle control click - pause autoplay temporarily
  const handleControlClick = (action: () => void) => {
    action();
    setIsAutoPlaying(true);
    resetAutoPlay();
  };

  return (
    <section className="relative bg-gray-100 overflow-hidden">
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        {/* Render banners based on plan data or fallback to mockup if no data */}
        {plans.length > 0 ? (
          plans.map((plan, index) => (
            <div 
              key={plan.id}
              className={cn(
                "hero-slide absolute w-full h-full transition-opacity duration-500",
                activeSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
              data-index={index}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-agro-green/80 to-agro-blue/80"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ 
                  backgroundImage: `url('${plan.bannerImage || bannerBackgrounds[index % bannerBackgrounds.length]}')`,
                  filter: 'brightness(0.7)' 
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4 text-center">
                  <h2 className="text-white text-4xl md:text-5xl font-bold mb-2 text-shadow">{plan.name}</h2>
                  <p className="text-white text-2xl md:text-3xl font-semibold mb-4 text-shadow">
                    Apenas R$ {plan.price.toFixed(2).replace('.', ',')}/mês
                  </p>
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 inline-block mb-6">
                    <ul className="text-white text-left space-y-2">
                      {plan.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <i className="fas fa-check text-agro-orange mr-2"></i> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a 
                    href="#lead-form" 
                    className="bg-agro-orange hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-block"
                  >
                    ASSINAR AGORA
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Fallback slides if no plan data
          Array.from({ length: 3 }).map((_, index) => (
            <div 
              key={`fallback-${index}`}
              className={cn(
                "hero-slide absolute w-full h-full transition-opacity duration-500",
                activeSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
              data-index={index}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-agro-green/80 to-agro-blue/80"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ 
                  backgroundImage: `url('${bannerBackgrounds[index % bannerBackgrounds.length]}')`,
                  filter: 'brightness(0.7)' 
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4 text-center">
                  <h2 className="text-white text-4xl md:text-5xl font-bold mb-2 text-shadow">
                    {index === 0 && "FIBRA 300 MEGAS"}
                    {index === 1 && "FIBRA 400 MEGAS"}
                    {index === 2 && "RÁDIO 50 MEGAS"}
                  </h2>
                  <p className="text-white text-2xl md:text-3xl font-semibold mb-4 text-shadow">
                    {index === 0 && "Apenas R$ 99,90/mês"}
                    {index === 1 && "Apenas R$ 119,90/mês"}
                    {index === 2 && "Apenas R$ 119,90/mês"}
                  </p>
                  <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 inline-block mb-6">
                    <ul className="text-white text-left space-y-2">
                      {index === 0 && (
                        <>
                          <li className="flex items-center"><i className="fas fa-check text-agro-orange mr-2"></i> Velocidade para toda família</li>
                          <li className="flex items-center"><i className="fas fa-check text-agro-orange mr-2"></i> Streaming sem travamentos</li>
                          <li className="flex items-center"><i className="fas fa-check text-agro-orange mr-2"></i> Instalação Grátis</li>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <li className="flex items-center"><i className="fas fa-check text-agro-orange mr-2"></i> Ideal para home office</li>
                          <li className="flex items-center"><i className="fas fa-check text-agro-orange mr-2"></i> Jogos online sem lag</li>
                          <li className="flex items-center"><i className="fas fa-check text-agro-orange mr-2"></i> Wi-Fi de alta performance</li>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <li className="flex items-center"><i className="fas fa-check text-agro-orange mr-2"></i> Disponível em áreas remotas</li>
                          <li className="flex items-center"><i className="fas fa-check text-agro-orange mr-2"></i> Estabilidade mesmo em tempestades</li>
                          <li className="flex items-center"><i className="fas fa-check text-agro-orange mr-2"></i> Suporte técnico local</li>
                        </>
                      )}
                    </ul>
                  </div>
                  <a 
                    href="#lead-form" 
                    className="bg-agro-orange hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-block"
                  >
                    ASSINAR AGORA
                  </a>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Navigation Arrows */}
        <button 
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition duration-300" 
          onClick={() => handleControlClick(prevSlide)}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition duration-300" 
          onClick={() => handleControlClick(nextSlide)}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button 
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-colors duration-300",
                activeSlide === index ? "bg-white/80" : "bg-white/30"
              )}
              onClick={() => handleControlClick(() => goToSlide(index))}
              aria-label={`Go to slide ${index + 1}`}
              data-index={index}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerCarousel;

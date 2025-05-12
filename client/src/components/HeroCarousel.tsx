import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { PlanType, InternetPlan } from '@/lib/types';

interface HeroCarouselProps {
  plans: InternetPlan[];
}

const HeroCarousel = ({ plans }: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = plans.length;

  const backgrounds = [
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080',
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, nextSlide]);

  const getGradient = (index: number) => {
    return index % 2 === 0 
      ? 'from-primary/80 to-secondary/80' 
      : 'from-secondary/80 to-primary/80';
  };

  return (
    <section className="relative bg-gray-100 overflow-hidden">
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        {plans.map((plan, index) => (
          <div 
            key={plan.id}
            className={`hero-slide absolute w-full h-full ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            aria-hidden={currentSlide !== index}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${getGradient(index)}`}></div>
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${backgrounds[index % backgrounds.length]}')`, filter: 'brightness(0.7)' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-white text-4xl md:text-5xl font-bold mb-2 text-shadow">
                  {plan.type} {plan.speed} MEGAS
                </h2>
                <p className="text-white text-2xl md:text-3xl font-semibold mb-4 text-shadow">
                  Apenas R$ {Number(plan.price).toFixed(2).replace('.', ',')}/mês
                </p>
                <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 inline-block mb-6">
                  <ul className="text-white text-left space-y-2">
                    {plan.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="text-accent mr-2 h-5 w-5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="#lead-form" className="bg-accent hover:bg-accent/80 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 inline-block">
                  ASSINAR AGORA
                </a>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
          onClick={prevSlide}
          aria-label="Slide anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white w-10 h-10 rounded-full flex items-center justify-center transition duration-300"
          onClick={nextSlide}
          aria-label="Próximo slide"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Indicator Dots */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-2">
          {plans.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              className={`w-3 h-3 p-0 rounded-full ${
                currentSlide === index ? 'bg-white/80' : 'bg-white/30'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;

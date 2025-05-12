import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, UserCircle2 } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  comment: string;
  rating: number;
  imageUrl?: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

const Testimonials = ({ testimonials = [] }: TestimonialsProps) => {
  // Use default testimonials if none are provided
  const displayTestimonials = testimonials.length > 0 ? testimonials : [
    {
      id: "1",
      name: "João Carlos",
      location: "Fazenda Santa Luzia",
      comment: "Depois de anos sofrendo com internet instável, finalmente temos uma conexão confiável na fazenda. As videoconferências não caem mais e consigo gerenciar meu negócio sem preocupações.",
      rating: 5
    },
    {
      id: "2",
      name: "Maria Aparecida",
      location: "Sítio Boa Esperança",
      comment: "Meus filhos precisavam de internet boa para estudar online e nenhuma operadora chegava até nossa região. A AGRONET foi a única que resolveu nosso problema com um plano que atende toda família.",
      rating: 5
    },
    {
      id: "3",
      name: "Pedro Santos",
      location: "Centro",
      comment: "O atendimento é o diferencial. Tive um problema no final de semana e o técnico veio no mesmo dia. A velocidade é excelente e nunca tive problemas de oscilação, mesmo em dias de chuva forte.",
      rating: 4.5
    }
  ];

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-amber-400 text-amber-400 h-4 w-4" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="text-amber-400 h-4 w-4" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="fill-amber-400 text-amber-400 h-4 w-4" />
          </div>
        </div>
      );
    }
    
    // Add empty stars to complete 5
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-amber-400 h-4 w-4" />);
    }
    
    return stars;
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-agro-dark mb-4">
        O que dizem nossos clientes
      </h2>
      <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
        A satisfação de nossos clientes é nosso maior orgulho.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-gray-50 hover:shadow-lg transition duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="text-amber-400 flex">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 italic">
                "{testimonial.comment}"
              </p>
              
              <div className="flex items-center">
                <div className="bg-agro-green/10 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                  {testimonial.imageUrl ? (
                    <img 
                      src={testimonial.imageUrl} 
                      alt={testimonial.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-agro-green font-bold text-xl">
                      {testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h5 className="font-semibold text-agro-dark">{testimonial.name}</h5>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <div className="bg-gray-50 inline-block px-6 py-3 rounded-full mb-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="text-amber-400 text-2xl">4.9</div>
            <div className="text-amber-400 flex">
              <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
              <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
              <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
              <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
              <Star className="fill-amber-400 text-amber-400 h-5 w-5" />
            </div>
            <div className="text-gray-500">| 200+ avaliações</div>
          </div>
        </div>
        
        <a 
          href="#lead-form" 
          className="inline-block bg-agro-orange hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-md transition duration-300 mt-4"
        >
          QUERO SER CLIENTE AGRONET
        </a>
      </div>
    </div>
  );
};

export default Testimonials;

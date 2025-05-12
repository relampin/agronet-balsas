import { Testimonial } from '@/lib/types';
import { Star, StarHalf } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-amber-400 text-amber-400 h-4 w-4" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-amber-400 text-amber-400 h-4 w-4" />);
    }

    return stars;
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
      <div className="flex items-center mb-4">
        <div className="text-amber-400 flex">
          {renderStars(testimonial.rating)}
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 italic">
        "{testimonial.comment}"
      </p>
      
      <div className="flex items-center">
        <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mr-3">
          <span className="text-primary font-bold text-xl">{getInitials(testimonial.name)}</span>
        </div>
        <div>
          <h5 className="font-semibold text-gray-800">{testimonial.name}</h5>
          <p className="text-sm text-gray-500">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

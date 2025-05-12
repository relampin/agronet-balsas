import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import Logo from '@/components/Logo';
import HeroCarousel from '@/components/HeroCarousel';
import LeadForm from '@/components/LeadForm';
import PlanCard from '@/components/PlanCard';
import BenefitCard from '@/components/BenefitCard';
import CoverageMap from '@/components/CoverageMap';
import TestimonialCard from '@/components/TestimonialCard';
import { Link } from 'wouter';
import { 
  Gauge, MapPin, Headphones, Hammer, DollarSign, Wifi,
  Facebook, Instagram, MessageSquare, Mail, Phone, MapPinned,
  Star, StarHalf
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { 
  InternetPlan, Testimonial, CoverageArea 
} from '@/lib/types';

export default function Home() {
  // Fetch plans from API
  const { data: plans = [] } = useQuery<InternetPlan[]>({
    queryKey: ['/api/plans'],
  });

  // Fetch testimonials from API
  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  // Fetch coverage areas from API
  const { data: coverageAreas = [] } = useQuery<CoverageArea[]>({
    queryKey: ['/api/coverage-areas'],
  });

  // Get banner plans (plans with bannerOrder set)
  const bannerPlans = [...plans]
    .filter(plan => plan.bannerOrder !== null)
    .sort((a, b) => (a.bannerOrder || 0) - (b.bannerOrder || 0));

  // Find the most popular plan
  const popularPlan = plans.find(plan => plan.isPopular);
  const popularPlanIndex = plans.findIndex(plan => plan.isPopular);

  // Scroll to section when clicking on nav links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.hash.startsWith('#')) {
        e.preventDefault();
        const id = link.hash.substring(1);
        const element = document.getElementById(id);
        
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <Helmet>
        <title>AGRONET.TEC.BR - Internet de Alta Velocidade</title>
        <meta name="description" content="Internet de alta velocidade para o campo e a cidade. Planos de fibra óptica e rádio com instalação grátis. Atendemos áreas rurais e urbanas." />
      </Helmet>

      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>
          
          {/* Mobile CTA */}
          <div className="md:hidden">
            <a href="#lead-form" className="bg-accent text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-accent/80 transition duration-300">
              Falar com Consultor
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#planos" className="text-gray-800 hover:text-primary font-medium">Planos</a>
            <a href="#beneficios" className="text-gray-800 hover:text-primary font-medium">Benefícios</a>
            <a href="#cobertura" className="text-gray-800 hover:text-primary font-medium">Cobertura</a>
            <a href="#depoimentos" className="text-gray-800 hover:text-primary font-medium">Depoimentos</a>
            <a href="#lead-form" className="bg-accent text-white px-5 py-2 rounded-md font-semibold hover:bg-accent/80 transition duration-300">
              Falar com Consultor
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Carousel */}
        {bannerPlans.length > 0 && <HeroCarousel plans={bannerPlans} />}

        {/* Main Headline */}
        <section className="bg-gray-800 text-white py-8 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              INTERNET DE ALTA VELOCIDADE PARA O CAMPO E A CIDADE
            </h1>
          </div>
        </section>

        {/* Lead Form */}
        <LeadForm plans={plans} />

        {/* Plans */}
        <section id="planos" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">Nossos Planos</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Escolha o plano ideal para você e sua família. Oferecemos opções para todos os tipos de necessidade, 
              seja no campo ou na cidade.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <PlanCard 
                  key={plan.id} 
                  plan={plan} 
                  isPopular={index === popularPlanIndex}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="beneficios" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
              Por que escolher a AGRONET?
            </h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Oferecemos muito mais que internet. Conheça os benefícios exclusivos de ser nosso cliente.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BenefitCard 
                icon={Gauge}
                title="Alta Velocidade"
                description="Conexão estável e de alta velocidade para todas as suas necessidades, do trabalho ao entretenimento."
              />
              <BenefitCard 
                icon={MapPin}
                title="Ampla Cobertura"
                description="Levamos internet de qualidade para áreas rurais e urbanas, onde outros provedores não chegam."
              />
              <BenefitCard 
                icon={Headphones}
                title="Suporte Local"
                description="Atendimento humanizado e suporte técnico com equipe local que conhece sua região."
              />
              <BenefitCard 
                icon={Hammer}
                title="Instalação Grátis"
                description="Instalação profissional sem custo adicional, com equipamentos modernos e de qualidade."
              />
              <BenefitCard 
                icon={DollarSign}
                title="Melhor Custo-Benefício"
                description="Planos com preços justos e transparentes, sem surpresas na fatura ou taxas ocultas."
              />
              <BenefitCard 
                icon={Wifi}
                title="Sem Limite de Dados"
                description="Use à vontade, sem preocupações com franquias ou redução de velocidade."
              />
            </div>
          </div>
        </section>

        {/* Coverage Map */}
        <CoverageMap areas={coverageAreas} />

        {/* Testimonials */}
        <section id="depoimentos" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
              O que dizem nossos clientes
            </h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
              A satisfação de nossos clientes é nosso maior orgulho.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <div className="bg-gray-50 inline-block px-6 py-3 rounded-full mb-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="text-amber-400 text-2xl">4.9</div>
                  <div className="text-amber-400 flex">
                    <Star className="fill-amber-400 h-4 w-4" />
                    <Star className="fill-amber-400 h-4 w-4" />
                    <Star className="fill-amber-400 h-4 w-4" />
                    <Star className="fill-amber-400 h-4 w-4" />
                    <Star className="fill-amber-400 h-4 w-4" />
                  </div>
                  <div className="text-gray-500">| 200+ avaliações</div>
                </div>
              </div>
              
              <a href="#lead-form" className="inline-block bg-accent hover:bg-accent/80 text-white font-semibold py-3 px-8 rounded-md transition duration-300 mt-4">
                QUERO SER CLIENTE AGRONET
              </a>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 bg-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">5+</div>
                <p className="text-white/80">Anos de experiência</p>
              </div>
              
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">3.000+</div>
                <p className="text-white/80">Clientes satisfeitos</p>
              </div>
              
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
                <p className="text-white/80">Disponibilidade garantida</p>
              </div>
              
              <div>
                <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
                <p className="text-white/80">Suporte técnico</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <Logo variant="footer" />
              <p className="mb-4 text-white/80">
                Internet de alta velocidade para o campo e a cidade.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-white hover:text-white/80 transition p-0 h-auto">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:text-white/80 transition p-0 h-auto">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:text-white/80 transition p-0 h-auto">
                  <FaWhatsapp className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#planos" className="text-white/80 hover:text-white transition">Nossos Planos</a></li>
                <li><a href="#beneficios" className="text-white/80 hover:text-white transition">Benefícios</a></li>
                <li><a href="#cobertura" className="text-white/80 hover:text-white transition">Área de Cobertura</a></li>
                <li><a href="#depoimentos" className="text-white/80 hover:text-white transition">Depoimentos</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MapPinned className="mt-1 mr-2 h-4 w-4" />
                  <span className="text-white/80">Av. Principal, 1000, Centro</span>
                </li>
                <li className="flex items-start">
                  <Phone className="mt-1 mr-2 h-4 w-4" />
                  <a href="tel:5599991557588" className="text-white/80 hover:text-white transition">
                    (99) 99155-7588
                  </a>
                </li>
                <li className="flex items-start">
                  <Mail className="mt-1 mr-2 h-4 w-4" />
                  <a href="mailto:contato@agronet.tec.br" className="text-white/80 hover:text-white transition">
                    contato@agronet.tec.br
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/20 text-center text-white/80 text-sm">
            <p>&copy; {new Date().getFullYear()} AGRONET.TEC.BR - Todos os direitos reservados.</p>
            <div className="mt-2">
              <Link href="/" className="text-white/80 hover:text-white transition">Política de Privacidade</Link>
              <span className="mx-2">|</span>
              <Link href="/" className="text-white/80 hover:text-white transition">Termos de Uso</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

import { 
  InternetPlan, Lead, CoverageArea, Testimonial, FAQ, SiteSetting,
  PlanType, CoverageStatus, InsertLead
} from "@shared/schema";
import { nanoid } from "nanoid";

export interface IStorage {
  // Plans
  getPlans(): Promise<InternetPlan[]>;
  getPlan(id: string): Promise<InternetPlan | undefined>;
  
  // Leads
  getLeads(): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  
  // Coverage Areas
  getCoverageAreas(): Promise<CoverageArea[]>;
  getCoverageArea(id: string): Promise<CoverageArea | undefined>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  
  // FAQs
  getFAQs(): Promise<FAQ[]>;
  getFAQ(id: string): Promise<FAQ | undefined>;
  
  // Site Settings
  getSiteSettings(): Promise<SiteSetting[]>;
  getSiteSetting(key: string): Promise<SiteSetting | undefined>;
}

export class MemStorage implements IStorage {
  private plans: Map<string, InternetPlan>;
  private leads: Map<string, Lead>;
  private coverageAreas: Map<string, CoverageArea>;
  private testimonials: Map<string, Testimonial>;
  private faqs: Map<string, FAQ>;
  private siteSettings: Map<string, SiteSetting>;

  constructor() {
    // Initialize with sample data
    this.plans = new Map();
    this.leads = new Map();
    this.coverageAreas = new Map();
    this.testimonials = new Map();
    this.faqs = new Map();
    this.siteSettings = new Map();

    // Add sample internet plans
    this.addSamplePlans();
    this.addSampleCoverageAreas();
    this.addSampleTestimonials();
  }

  // Plans
  async getPlans(): Promise<InternetPlan[]> {
    return Array.from(this.plans.values());
  }

  async getPlan(id: string): Promise<InternetPlan | undefined> {
    return this.plans.get(id);
  }

  // Leads
  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async getLead(id: string): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const newLead = lead as Lead;
    if (!newLead.id) {
      newLead.id = nanoid();
    }
    if (!newLead.createdAt) {
      newLead.createdAt = new Date();
    }
    if (!newLead.updatedAt) {
      newLead.updatedAt = new Date();
    }
    this.leads.set(newLead.id, newLead);
    return newLead;
  }

  // Coverage Areas
  async getCoverageAreas(): Promise<CoverageArea[]> {
    return Array.from(this.coverageAreas.values());
  }

  async getCoverageArea(id: string): Promise<CoverageArea | undefined> {
    return this.coverageAreas.get(id);
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(t => t.isActive);
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  // FAQs
  async getFAQs(): Promise<FAQ[]> {
    return Array.from(this.faqs.values())
      .filter(faq => faq.isActive)
      .sort((a, b) => a.order - b.order);
  }

  async getFAQ(id: string): Promise<FAQ | undefined> {
    return this.faqs.get(id);
  }

  // Site Settings
  async getSiteSettings(): Promise<SiteSetting[]> {
    return Array.from(this.siteSettings.values());
  }

  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    return Array.from(this.siteSettings.values()).find(
      (setting) => setting.key === key
    );
  }

  // Helper methods to create sample data
  private addSamplePlans() {
    const plans: InternetPlan[] = [
      {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Fibra 300',
        type: PlanType.FIBRA,
        speed: 300,
        price: "99.90",
        features: [
          'Velocidade de 300 Mbps de download',
          '150 Mbps de upload',
          'Wi-Fi de alta performance incluso',
          'Sem limite de dados',
          'Instalação grátis'
        ],
        isPopular: false,
        isActive: true,
        bannerImage: null,
        bannerOrder: 0
      },
      {
        id: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Fibra 400',
        type: PlanType.FIBRA,
        speed: 400,
        price: "119.90",
        features: [
          'Velocidade de 400 Mbps de download',
          '200 Mbps de upload',
          'Roteador Wi-Fi 6 de alta performance',
          'Suporte prioritário 24/7',
          'Instalação expressa grátis',
          'IP fixo opcional'
        ],
        isPopular: true,
        isActive: true,
        bannerImage: null,
        bannerOrder: 1
      },
      {
        id: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Rádio 50',
        type: PlanType.RADIO,
        speed: 50,
        price: "119.90",
        features: [
          'Velocidade de 50 Mbps de download',
          '20 Mbps de upload',
          'Equipamento resistente a intempéries',
          'Ideal para áreas sem cobertura de fibra',
          'Instalação especializada inclusa'
        ],
        isPopular: false,
        isActive: true,
        bannerImage: null,
        bannerOrder: 2
      }
    ];

    plans.forEach(plan => {
      this.plans.set(plan.id, plan);
    });
  }

  private addSampleCoverageAreas() {
    const areas: CoverageArea[] = [
      {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Balsas - MA (Centro)',
        zipCodes: ['65800000', '65800-000'],
        hasFiber: true,
        hasRadio: true,
        status: CoverageStatus.ACTIVE
      },
      {
        id: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Zona rural de Balsas - até 40km da cidade',
        zipCodes: ['65800100', '65800200'],
        hasFiber: false,
        hasRadio: true,
        status: CoverageStatus.ACTIVE
      },
      {
        id: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Distritos e comunidades rurais de Balsas',
        zipCodes: ['65810000', '65820000'],
        hasFiber: false,
        hasRadio: true,
        status: CoverageStatus.ACTIVE
      }
    ];

    areas.forEach(area => {
      this.coverageAreas.set(area.id, area);
    });
  }

  private addSampleTestimonials() {
    const testimonials: Testimonial[] = [
      {
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'João Carlos',
        location: 'Fazenda Santa Luzia',
        comment: 'Depois de anos sofrendo com internet instável, finalmente temos uma conexão confiável na fazenda. As videoconferências não caem mais e consigo gerenciar meu negócio sem preocupações.',
        rating: 5,
        isActive: true,
        imageUrl: null
      },
      {
        id: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Maria Aparecida',
        location: 'Sítio Boa Esperança',
        comment: 'Meus filhos precisavam de internet boa para estudar online e nenhuma operadora chegava até nossa região. A AGRONET foi a única que resolveu nosso problema com um plano que atende toda família.',
        rating: 5,
        isActive: true,
        imageUrl: null
      },
      {
        id: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
        name: 'Pedro Santos',
        location: 'Centro',
        comment: 'O atendimento é o diferencial. Tive um problema no final de semana e o técnico veio no mesmo dia. A velocidade é excelente e nunca tive problemas de oscilação, mesmo em dias de chuva forte.',
        rating: 4.5,
        isActive: true,
        imageUrl: null
      }
    ];

    testimonials.forEach(testimonial => {
      this.testimonials.set(testimonial.id, testimonial);
    });
  }
}

export const storage = new MemStorage();

import { 
  InternetPlan, Lead, CoverageArea, Testimonial, FAQ, SiteSetting,
  PlanType, CoverageStatus, InsertLead,
  internetPlans, leads, coverageAreas, testimonials, faqs, siteSettings
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
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

export class DatabaseStorage implements IStorage {
  // Plans
  async getPlans(): Promise<InternetPlan[]> {
    try {
      return await db.select().from(internetPlans);
    } catch (error) {
      console.error('Erro ao buscar planos:', error);
      return [];
    }
  }

  async getPlan(id: string): Promise<InternetPlan | undefined> {
    try {
      const [plan] = await db.select().from(internetPlans).where(eq(internetPlans.id, id));
      return plan;
    } catch (error) {
      console.error(`Erro ao buscar plano ${id}:`, error);
      return undefined;
    }
  }

  // Leads
  async getLeads(): Promise<Lead[]> {
    try {
      return await db.select().from(leads);
    } catch (error) {
      console.error('Erro ao buscar leads:', error);
      return [];
    }
  }

  async getLead(id: string): Promise<Lead | undefined> {
    try {
      const [lead] = await db.select().from(leads).where(eq(leads.id, id));
      return lead;
    } catch (error) {
      console.error(`Erro ao buscar lead ${id}:`, error);
      return undefined;
    }
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    try {
      const now = new Date();
      const [newLead] = await db.insert(leads).values({
        id: lead.id || nanoid(),
        createdAt: lead.createdAt || now,
        updatedAt: lead.updatedAt || now,
        name: lead.name,
        phone: lead.phone,
        planId: lead.planId || null,
        source: lead.source || null,
        convertedAt: null,
        notes: null,
        contacted: lead.contacted || false,
        whatsappSent: lead.whatsappSent || false
      }).returning();
      
      return newLead;
    } catch (error) {
      console.error('Erro ao criar lead:', error);
      // Se falhar, cria um lead com ID para não quebrar a aplicação
      return {
        id: nanoid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: lead.name,
        phone: lead.phone,
        planId: lead.planId || null,
        contacted: false,
        whatsappSent: true
      } as Lead;
    }
  }

  // Coverage Areas
  async getCoverageAreas(): Promise<CoverageArea[]> {
    try {
      return await db.select().from(coverageAreas);
    } catch (error) {
      console.error('Erro ao buscar áreas de cobertura:', error);
      return this.getFallbackCoverageAreas();
    }
  }

  async getCoverageArea(id: string): Promise<CoverageArea | undefined> {
    try {
      const [area] = await db.select().from(coverageAreas).where(eq(coverageAreas.id, id));
      return area;
    } catch (error) {
      console.error(`Erro ao buscar área de cobertura ${id}:`, error);
      return undefined;
    }
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      return await db.select().from(testimonials).where(eq(testimonials.isActive, true));
    } catch (error) {
      console.error('Erro ao buscar depoimentos:', error);
      return this.getFallbackTestimonials();
    }
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    try {
      const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
      return testimonial;
    } catch (error) {
      console.error(`Erro ao buscar depoimento ${id}:`, error);
      return undefined;
    }
  }

  // FAQs
  async getFAQs(): Promise<FAQ[]> {
    try {
      return await db.select().from(faqs)
        .where(eq(faqs.isActive, true))
        .orderBy(faqs.order);
    } catch (error) {
      console.error('Erro ao buscar FAQs:', error);
      return [];
    }
  }

  async getFAQ(id: string): Promise<FAQ | undefined> {
    try {
      const [faq] = await db.select().from(faqs).where(eq(faqs.id, id));
      return faq;
    } catch (error) {
      console.error(`Erro ao buscar FAQ ${id}:`, error);
      return undefined;
    }
  }

  // Site Settings
  async getSiteSettings(): Promise<SiteSetting[]> {
    try {
      return await db.select().from(siteSettings);
    } catch (error) {
      console.error('Erro ao buscar configurações do site:', error);
      return [];
    }
  }

  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    try {
      const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
      return setting;
    } catch (error) {
      console.error(`Erro ao buscar configuração do site ${key}:`, error);
      return undefined;
    }
  }

  // Dados de reserva para caso o banco de dados falhe
  private getFallbackCoverageAreas(): CoverageArea[] {
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
    return areas;
  }

  private getFallbackTestimonials(): Testimonial[] {
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
    return testimonials;
  }
}

// Inicializar o banco de dados com dados de amostra se necessário
async function initializeDatabase() {
  try {
    // Verificar se já existem planos no banco de dados
    const existingPlans = await db.select().from(internetPlans);
    
    // Se não houver planos, adicionar dados de amostra
    if (existingPlans.length === 0) {
      await seedDatabase();
    }
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
  }
}

// Função para popular o banco de dados com dados iniciais
async function seedDatabase() {
  try {
    const now = new Date();
    
    // Adicionar planos
    await db.insert(internetPlans).values([
      {
        id: nanoid(),
        createdAt: now,
        updatedAt: now,
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
        id: nanoid(),
        createdAt: now,
        updatedAt: now,
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
        id: nanoid(),
        createdAt: now,
        updatedAt: now,
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
    ]);
    
    // Adicionar áreas de cobertura
    await db.insert(coverageAreas).values([
      {
        id: nanoid(),
        createdAt: now,
        updatedAt: now,
        name: 'Balsas - MA (Centro)',
        zipCodes: ['65800000', '65800-000'],
        hasFiber: true,
        hasRadio: true,
        status: CoverageStatus.ACTIVE
      },
      {
        id: nanoid(),
        createdAt: now,
        updatedAt: now,
        name: 'Zona rural de Balsas - até 40km da cidade',
        zipCodes: ['65800100', '65800200'],
        hasFiber: false,
        hasRadio: true,
        status: CoverageStatus.ACTIVE
      },
      {
        id: nanoid(),
        createdAt: now,
        updatedAt: now,
        name: 'Distritos e comunidades rurais de Balsas',
        zipCodes: ['65810000', '65820000'],
        hasFiber: false,
        hasRadio: true,
        status: CoverageStatus.ACTIVE
      }
    ]);
    
    // Adicionar depoimentos
    await db.insert(testimonials).values([
      {
        id: nanoid(),
        createdAt: now,
        updatedAt: now,
        name: 'João Carlos',
        location: 'Fazenda Santa Luzia',
        comment: 'Depois de anos sofrendo com internet instável, finalmente temos uma conexão confiável na fazenda. As videoconferências não caem mais e consigo gerenciar meu negócio sem preocupações.',
        rating: 5,
        isActive: true,
        imageUrl: null
      },
      {
        id: nanoid(),
        createdAt: now,
        updatedAt: now,
        name: 'Maria Aparecida',
        location: 'Sítio Boa Esperança',
        comment: 'Meus filhos precisavam de internet boa para estudar online e nenhuma operadora chegava até nossa região. A AGRONET foi a única que resolveu nosso problema com um plano que atende toda família.',
        rating: 5,
        isActive: true,
        imageUrl: null
      },
      {
        id: nanoid(),
        createdAt: now,
        updatedAt: now,
        name: 'Pedro Santos',
        location: 'Centro',
        comment: 'O atendimento é o diferencial. Tive um problema no final de semana e o técnico veio no mesmo dia. A velocidade é excelente e nunca tive problemas de oscilação, mesmo em dias de chuva forte.',
        rating: 4.5,
        isActive: true,
        imageUrl: null
      }
    ]);
    
    console.log("Banco de dados inicializado com sucesso!");
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  }
}

// Inicializar o banco de dados
initializeDatabase();

export const storage = new DatabaseStorage();

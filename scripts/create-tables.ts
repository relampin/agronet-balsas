import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from '../shared/schema';
import { nanoid } from 'nanoid';
import { 
  PlanType,
  CoverageStatus,
  internetPlans,
  leads,
  coverageAreas,
  testimonials,
  faqs,
  siteSettings
} from '../shared/schema';

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set");
  }
  
  try {
    console.log("Conectando ao banco de dados...");
    
    const connectionString = process.env.DATABASE_URL;
    const client = postgres(connectionString, { ssl: 'require' });
    const db: PostgresJsDatabase = drizzle(client, { schema });
    
    try {
      // Verificar conexão
      console.log("Testando conexão com o banco de dados...");
      await client`SELECT 1`;
      console.log("Conexão com o banco de dados bem-sucedida!");
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error);
      return;
    }

    console.log("Criando tabelas através do Drizzle...");
    
    // Usando Drizzle para criar tabelas e inserir dados
    const now = new Date();

    console.log("Inserindo planos de internet...");
    try {
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
          bannerOrder: 1
        },
        {
          id: nanoid(),
          createdAt: now,
          updatedAt: now,
          name: 'Rádio 50',
          type: PlanType.RADIO,
          speed: 50,
          price: "79.90",
          features: [
            'Velocidade de 50 Mbps de download',
            '20 Mbps de upload',
            'Equipamento resistente a intempéries',
            'Ideal para áreas sem cobertura de fibra',
            'Instalação especializada inclusa'
          ],
          isPopular: false,
          isActive: true,
        }
      ]);
      console.log("Planos inseridos com sucesso!");
    } catch (error) {
      console.error("Erro ao inserir planos:", error);
    }

    console.log("Inserindo áreas de cobertura...");
    try {
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
      console.log("Áreas de cobertura inseridas com sucesso!");
    } catch (error) {
      console.error("Erro ao inserir áreas de cobertura:", error);
    }

    console.log("Inserindo depoimentos...");
    try {
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
        }
      ]);
      console.log("Depoimentos inseridos com sucesso!");
    } catch (error) {
      console.error("Erro ao inserir depoimentos:", error);
    }

    console.log("Banco de dados inicializado com sucesso!");
  } catch (error) {
    console.error("Erro durante a configuração do banco de dados:", error);
  }
}

main().catch(console.error);
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';

async function createTables() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set");
  }
  
  console.log("Connecting to database...");
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  console.log("Creating tables...");
  
  try {
    // Criar as tabelas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "internet_plans" (
        "id" VARCHAR PRIMARY KEY NOT NULL,
        "created_at" TIMESTAMP DEFAULT now() NOT NULL,
        "updated_at" TIMESTAMP NOT NULL,
        "name" VARCHAR NOT NULL,
        "type" TEXT NOT NULL,
        "speed" INTEGER NOT NULL,
        "price" TEXT NOT NULL,
        "features" JSONB NOT NULL,
        "is_popular" BOOLEAN DEFAULT false NOT NULL,
        "is_active" BOOLEAN DEFAULT true NOT NULL,
        "banner_image" VARCHAR,
        "banner_order" INTEGER
      );
      
      CREATE TABLE IF NOT EXISTS "leads" (
        "id" VARCHAR PRIMARY KEY NOT NULL,
        "created_at" TIMESTAMP DEFAULT now() NOT NULL,
        "updated_at" TIMESTAMP NOT NULL,
        "name" VARCHAR NOT NULL,
        "phone" VARCHAR NOT NULL,
        "plan_id" VARCHAR REFERENCES "internet_plans"("id") ON DELETE SET NULL,
        "source" VARCHAR,
        "converted_at" TIMESTAMP,
        "notes" TEXT,
        "contacted" BOOLEAN DEFAULT false NOT NULL,
        "whatsapp_sent" BOOLEAN DEFAULT false NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS "coverage_areas" (
        "id" VARCHAR PRIMARY KEY NOT NULL,
        "created_at" TIMESTAMP DEFAULT now() NOT NULL,
        "updated_at" TIMESTAMP NOT NULL,
        "name" VARCHAR NOT NULL,
        "zip_codes" JSONB NOT NULL,
        "has_fiber" BOOLEAN DEFAULT false NOT NULL,
        "has_radio" BOOLEAN DEFAULT true NOT NULL,
        "status" TEXT DEFAULT 'ACTIVE' NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS "testimonials" (
        "id" VARCHAR PRIMARY KEY NOT NULL,
        "created_at" TIMESTAMP DEFAULT now() NOT NULL,
        "updated_at" TIMESTAMP NOT NULL,
        "name" VARCHAR NOT NULL,
        "location" VARCHAR NOT NULL,
        "comment" TEXT NOT NULL,
        "rating" DECIMAL NOT NULL,
        "is_active" BOOLEAN DEFAULT true NOT NULL,
        "image_url" VARCHAR
      );
      
      CREATE TABLE IF NOT EXISTS "faqs" (
        "id" VARCHAR PRIMARY KEY NOT NULL,
        "created_at" TIMESTAMP DEFAULT now() NOT NULL,
        "updated_at" TIMESTAMP NOT NULL,
        "question" VARCHAR NOT NULL,
        "answer" TEXT NOT NULL,
        "category" VARCHAR,
        "order" INTEGER DEFAULT 0 NOT NULL,
        "is_active" BOOLEAN DEFAULT true NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS "site_settings" (
        "id" VARCHAR PRIMARY KEY NOT NULL,
        "created_at" TIMESTAMP DEFAULT now() NOT NULL,
        "updated_at" TIMESTAMP NOT NULL,
        "key" VARCHAR UNIQUE NOT NULL,
        "value" TEXT NOT NULL
      );
    `);
    
    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    await pool.end();
  }
}

createTables().catch(console.error);
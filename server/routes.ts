import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertLeadSchema } from "@shared/schema";
import { nanoid } from 'nanoid';

export async function registerRoutes(app: Express): Promise<Server> {
  // Get plans
  app.get("/api/plans", async (req, res) => {
    try {
      const plans = await storage.getPlans();
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Error fetching plans" });
    }
  });

  // Get testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Error fetching testimonials" });
    }
  });

  // Get coverage areas
  app.get("/api/coverage-areas", async (req, res) => {
    try {
      const areas = await storage.getCoverageAreas();
      res.json(areas);
    } catch (error) {
      res.status(500).json({ message: "Error fetching coverage areas" });
    }
  });

  // Get FAQs
  app.get("/api/faqs", async (req, res) => {
    try {
      const faqs = await storage.getFAQs();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching FAQs" });
    }
  });

  // Create lead
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      
      const lead = await storage.createLead({
        id: nanoid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: leadData.name,
        phone: leadData.phone,
        planId: leadData.planId || null,
        source: req.headers.referer || null,
        contacted: false,
        whatsappSent: true
      });
      
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid lead data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating lead" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

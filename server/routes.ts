import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRhymeSchema, insertToySchema } from "@/types/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Rhymes routes
  app.get("/api/rhymes", async (req, res) => {
    try {
      const { category } = req.query;
      let rhymes;
      
      if (category && category !== "all") {
        rhymes = await storage.getRhymesByCategory(category as string);
      } else {
        rhymes = await storage.getRhymes();
      }
      
      res.json(rhymes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rhymes" });
    }
  });

  app.get("/api/rhymes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const rhyme = await storage.getRhyme(id);
      
      if (!rhyme) {
        return res.status(404).json({ error: "Rhyme not found" });
      }
      
      res.json(rhyme);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rhyme" });
    }
  });

  app.post("/api/rhymes", async (req, res) => {
    try {
      const validatedData = insertRhymeSchema.parse(req.body);
      const rhyme = await storage.createRhyme(validatedData);
      res.status(201).json(rhyme);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid rhyme data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create rhyme" });
    }
  });

  app.put("/api/rhymes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertRhymeSchema.partial().parse(req.body);
      const rhyme = await storage.updateRhyme(id, validatedData);
      
      if (!rhyme) {
        return res.status(404).json({ error: "Rhyme not found" });
      }
      
      res.json(rhyme);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid rhyme data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update rhyme" });
    }
  });

  app.delete("/api/rhymes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteRhyme(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Rhyme not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete rhyme" });
    }
  });

  // Toys routes
  app.get("/api/toys", async (req, res) => {
    try {
      const { category } = req.query;
      let toys;
      
      if (category && category !== "all") {
        toys = await storage.getToysByCategory(category as string);
      } else {
        toys = await storage.getToys();
      }
      
      res.json(toys);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch toys" });
    }
  });

  app.get("/api/toys/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const toy = await storage.getToy(id);
      
      if (!toy) {
        return res.status(404).json({ error: "Toy not found" });
      }
      
      res.json(toy);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch toy" });
    }
  });

  app.post("/api/toys", async (req, res) => {
    try {
      const validatedData = insertToySchema.parse(req.body);
      const toy = await storage.createToy(validatedData);
      res.status(201).json(toy);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid toy data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create toy" });
    }
  });

  app.put("/api/toys/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertToySchema.partial().parse(req.body);
      const toy = await storage.updateToy(id, validatedData);
      
      if (!toy) {
        return res.status(404).json({ error: "Toy not found" });
      }
      
      res.json(toy);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid toy data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update toy" });
    }
  });

  app.delete("/api/toys/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteToy(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Toy not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete toy" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

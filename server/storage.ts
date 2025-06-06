import { rhymes, toys, type Rhyme, type InsertRhyme, type Toy, type InsertToy } from "@/types/schema";

export interface IStorage {
  // Rhymes
  getRhymes(): Promise<Rhyme[]>;
  getRhyme(id: number): Promise<Rhyme | undefined>;
  getRhymesByCategory(category: string): Promise<Rhyme[]>;
  createRhyme(rhyme: InsertRhyme): Promise<Rhyme>;
  updateRhyme(id: number, rhyme: Partial<InsertRhyme>): Promise<Rhyme | undefined>;
  deleteRhyme(id: number): Promise<boolean>;

  // Toys
  getToys(): Promise<Toy[]>;
  getToy(id: number): Promise<Toy | undefined>;
  getToysByCategory(category: string): Promise<Toy[]>;
  createToy(toy: InsertToy): Promise<Toy>;
  updateToy(id: number, toy: Partial<InsertToy>): Promise<Toy | undefined>;
  deleteToy(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private rhymes: Map<number, Rhyme>;
  private toys: Map<number, Toy>;
  private currentRhymeId: number;
  private currentToyId: number;

  constructor() {
    this.rhymes = new Map();
    this.toys = new Map();
    this.currentRhymeId = 1;
    this.currentToyId = 1;
    this.seedData();
  }

  private seedData() {
    // Seed with initial rhymes data
    const initialRhymes: InsertRhyme[] = [
      {
        title: "Twinkle Twinkle Little Star",
        description: "A classic bedtime song about stars and wonder!",
        category: "lullabies",
        ageGroup: "1-5",
        youtubeId: "yCjJyiqpAuU",
        thumbnailUrl: `https://img.youtube.com/vi/yCjJyiqpAuU/maxresdefault.jpg`,
        duration: 180,
      },
      {
        title: "Old MacDonald Had a Farm",
        description: "Learn about farm animals with this classic song!",
        category: "animals",
        ageGroup: "2-5",
        youtubeId: "_6HzoUcx3eo",
        thumbnailUrl: `https://img.youtube.com/vi/_6HzoUcx3eo/maxresdefault.jpg`,
        duration: 200,
      },
      {
        title: "The Wheels on the Bus",
        description: "Sing along with this fun transportation song!",
        category: "action",
        ageGroup: "2-6",
        youtubeId: "e_04ZrNroTo",
        thumbnailUrl: `https://img.youtube.com/vi/e_04ZrNroTo/maxresdefault.jpg`,
        duration: 220,
      },
      {
        title: "Five Little Ducks",
        description: "Learn counting with these playful ducks!",
        category: "numbers",
        ageGroup: "1-4",
        youtubeId: "WST-5m8ojl8",
        thumbnailUrl: `https://img.youtube.com/vi/WST-5m8ojl8/maxresdefault.jpg`,
        duration: 150,
      },
      {
        title: "ABC Song",
        description: "Learn the alphabet with this classic tune!",
        category: "abc",
        ageGroup: "2-5",
        youtubeId: "hq3yfQnllfQ",
        thumbnailUrl: `https://img.youtube.com/vi/hq3yfQnllfQ/maxresdefault.jpg`,
        duration: 140,
      },
      {
        title: "Mary Had a Little Lamb",
        description: "A sweet story about friendship and kindness!",
        category: "animals",
        ageGroup: "1-4",
        youtubeId: "f4qOnJK4a2I",
        thumbnailUrl: `https://img.youtube.com/vi/f4qOnJK4a2I/maxresdefault.jpg`,
        duration: 160,
      },
      {
        title: "If You're Happy and You Know It",
        description: "Clap your hands and stomp your feet!",
        category: "action",
        ageGroup: "1-5",
        youtubeId: "l4WNrvVjiTw",
        thumbnailUrl: `https://img.youtube.com/vi/l4WNrvVjiTw/maxresdefault.jpg`,
        duration: 170,
      },
      {
        title: "Rock-a-Bye Baby",
        description: "A gentle lullaby for peaceful sleep time!",
        category: "lullabies",
        ageGroup: "0-3",
        youtubeId: "R0VIwL6DTGI",
        thumbnailUrl: `https://img.youtube.com/vi/R0VIwL6DTGI/maxresdefault.jpg`,
        duration: 130,
      },
    ];

    initialRhymes.forEach((rhyme) => {
      const id = this.currentRhymeId++;
      this.rhymes.set(id, { ...rhyme, id });
    });

    // Seed with initial toys data
    const initialToys: InsertToy[] = [
      {
        name: "Musical Learning Piano",
        description: "Interactive piano with lights and sounds for musical exploration!",
        price: "29.99",
        category: "musical",
        ageGroup: "2-5",
        imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop&auto=format",
        rating: "4.8",
        relatedRhymes: ["Twinkle Star", "ABC Song"],
      },
      {
        name: "Farm Animal Friends Set",
        description: "Soft and cuddly farm animals perfect for storytelling!",
        price: "24.99",
        category: "animals",
        ageGroup: "1-4",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fdcd9c8cd62d?w=800&h=600&fit=crop&auto=format",
        rating: "4.6",
        relatedRhymes: ["Old MacDonald", "Mary's Lamb"],
      },
      {
        name: "Rainbow Counting Bears",
        description: "Learn numbers and colors with these adorable counting bears!",
        price: "19.99",
        category: "numbers",
        ageGroup: "3-6",
        imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop&auto=format",
        rating: "4.9",
        relatedRhymes: ["Five Little Ducks", "Ten in a Bed"],
      },
      {
        name: "Alphabet Learning Blocks",
        description: "Stack and play while learning letters and words!",
        price: "34.99",
        category: "abc",
        ageGroup: "2-5",
        imageUrl: "https://images.unsplash.com/photo-1594736797933-d0d9a3f97268?w=800&h=600&fit=crop&auto=format",
        rating: "4.7",
        relatedRhymes: ["ABC Song", "Bingo"],
      },
      {
        name: "Baby's First Shakers",
        description: "Perfect for rhythm and music exploration!",
        price: "16.99",
        category: "musical",
        ageGroup: "1-3",
        imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop&auto=format",
        rating: "4.8",
        relatedRhymes: ["If You're Happy", "Shake It Up"],
      },
      {
        name: "Classic Rhymes Book Set",
        description: "Beautiful illustrated books with all favorite nursery rhymes!",
        price: "22.99",
        category: "reading",
        ageGroup: "1-5",
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&auto=format",
        rating: "4.9",
        relatedRhymes: ["All Classics", "Bedtime"],
      },
    ];

    initialToys.forEach((toy) => {
      const id = this.currentToyId++;
      this.toys.set(id, { ...toy, id });
    });
  }

  // Rhymes methods
  async getRhymes(): Promise<Rhyme[]> {
    return Array.from(this.rhymes.values());
  }

  async getRhyme(id: number): Promise<Rhyme | undefined> {
    return this.rhymes.get(id);
  }

  async getRhymesByCategory(category: string): Promise<Rhyme[]> {
    return Array.from(this.rhymes.values()).filter(
      (rhyme) => rhyme.category === category
    );
  }

  async createRhyme(insertRhyme: InsertRhyme): Promise<Rhyme> {
    const id = this.currentRhymeId++;
    const rhyme: Rhyme = { ...insertRhyme, id };
    this.rhymes.set(id, rhyme);
    return rhyme;
  }

  async updateRhyme(id: number, updates: Partial<InsertRhyme>): Promise<Rhyme | undefined> {
    const existing = this.rhymes.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.rhymes.set(id, updated);
    return updated;
  }

  async deleteRhyme(id: number): Promise<boolean> {
    return this.rhymes.delete(id);
  }

  // Toys methods
  async getToys(): Promise<Toy[]> {
    return Array.from(this.toys.values());
  }

  async getToy(id: number): Promise<Toy | undefined> {
    return this.toys.get(id);
  }

  async getToysByCategory(category: string): Promise<Toy[]> {
    return Array.from(this.toys.values()).filter(
      (toy) => toy.category === category
    );
  }

  async createToy(insertToy: InsertToy): Promise<Toy> {
    const id = this.currentToyId++;
    const toy: Toy = { ...insertToy, id };
    this.toys.set(id, toy);
    return toy;
  }

  async updateToy(id: number, updates: Partial<InsertToy>): Promise<Toy | undefined> {
    const existing = this.toys.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.toys.set(id, updated);
    return updated;
  }

  async deleteToy(id: number): Promise<boolean> {
    return this.toys.delete(id);
  }
}

export const storage = new MemStorage();

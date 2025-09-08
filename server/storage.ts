import { type User, type InsertUser, type QuizAssessment, type InsertQuizAssessment } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createQuizAssessment(assessment: InsertQuizAssessment): Promise<QuizAssessment>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quizAssessments: Map<string, QuizAssessment>;

  constructor() {
    this.users = new Map();
    this.quizAssessments = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createQuizAssessment(insertAssessment: InsertQuizAssessment): Promise<QuizAssessment> {
    const id = randomUUID();
    const assessment: QuizAssessment = { 
      id,
      responses: insertAssessment.responses,
      result: insertAssessment.result,
      completedAt: new Date().toISOString()
    };
    this.quizAssessments.set(id, assessment);
    return assessment;
  }
}

export const storage = new MemStorage();

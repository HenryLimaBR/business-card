import { PrismaClient } from '@prisma/client';

let db: PrismaClient | null = null

export function getDb() {
  if (db) return db
  db = new PrismaClient()
  return db
}
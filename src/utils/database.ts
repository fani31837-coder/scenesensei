import Dexie, { Table } from 'dexie'
import { Scene, Project, Character } from '@/types'

export interface DBSchema {
  scenes: Scene
  projects: Project
  characters: Character
}

export class SceneSenseiDB extends Dexie {
  scenes!: Table<Scene>
  projects!: Table<Project>
  characters!: Table<Character>

  constructor() {
    super('SceneSenseiDB')
    this.version(1).stores({
      scenes: '++id, createdAt',
      projects: '++id, ownerId, createdAt',
      characters: '++id, createdAt',
    })
  }
}

export const db = new SceneSenseiDB()

// Scene operations
export const sceneDB = {
  async create(scene: Scene) {
    return db.scenes.add(scene)
  },

  async read(id: string) {
    return db.scenes.get(id)
  },

  async update(id: string, updates: Partial<Scene>) {
    return db.scenes.update(id, updates)
  },

  async delete(id: string) {
    return db.scenes.delete(id)
  },

  async all() {
    return db.scenes.toArray()
  },
}

// Project operations
export const projectDB = {
  async create(project: Project) {
    return db.projects.add(project)
  },

  async read(id: string) {
    return db.projects.get(id)
  },

  async update(id: string, updates: Partial<Project>) {
    return db.projects.update(id, updates)
  },

  async delete(id: string) {
    return db.projects.delete(id)
  },

  async byOwner(ownerId: string) {
    return db.projects.where('ownerId').equals(ownerId).toArray()
  },
}

// Character operations
export const characterDB = {
  async create(character: Character) {
    return db.characters.add(character)
  },

  async read(id: string) {
    return db.characters.get(id)
  },

  async update(id: string, updates: Partial<Character>) {
    return db.characters.update(id, updates)
  },

  async delete(id: string) {
    return db.characters.delete(id)
  },

  async all() {
    return db.characters.toArray()
  },
}

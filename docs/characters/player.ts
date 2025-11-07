import type { CharacterSkill } from './skills'

export interface CharacterIdentity {
  fullName: string
  gender: string
  age: number
  occupation: string
  appearanceUrl?: string
  backstory: string
  personality: string
  motivation: string
  fear: string
  imageOffset: {
    x: number
    y: number
  }
}

export interface Attributes {
  body: number
  mind: number
  charisma: number
  will: number
}

export interface AttributesRules {
  totalPoints: number
  minPerAttribute: number
  maxPerAttribute: number
}

export enum BodyState {
  HEALTHY = 'healthy',
  HURT = 'hurt',
  DEEP_WOUNDS = 'deep_wounds',
}

export enum MindState {
  SANE = 'sane',
  UNSTABLE = 'unstable',
  INSANE = 'insane',
}

export interface Status {
  body: BodyState
  mind: MindState
  resonance: number
}

export interface PlayerCharacter {
  identity: CharacterIdentity
  attributes: Attributes
  skills: CharacterSkill[]
  status: Status
}

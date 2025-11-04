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

export interface PlayerCharacter {
  identity: CharacterIdentity
  attributes: Attributes
  skills: CharacterSkill[]
}

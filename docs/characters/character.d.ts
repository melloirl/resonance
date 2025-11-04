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

export interface Skill {
  name: string
  level: number
  bonus?: boolean
}

export interface SkillsRules {
  totalPoints: number
  maxPerSkill: number
  bonusLevels: number
}

export interface PlayerCharacter {
  identity: CharacterIdentity
  attributes: Attributes
  skills: Skill[]
}

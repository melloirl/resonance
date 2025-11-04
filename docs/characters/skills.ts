export enum Domain {
  PHYSICAL,
  INVESTIGATION,
  TECHNICAL,
  SOCIAL,
  OCCULT,
  COMBAT,
}

export interface DomainConfig {
  color: string
}

export type DomainColors = Record<Domain, DomainConfig>

export const DOMAIN_COLORS: DomainColors = {
  [Domain.PHYSICAL]: { color: '#ff4666' },
  [Domain.INVESTIGATION]: { color: '#6c72ff' },
  [Domain.TECHNICAL]: { color: '#ffc100' },
  [Domain.SOCIAL]: { color: '#c9eaff' },
  [Domain.OCCULT]: { color: '#b792ff' },
  [Domain.COMBAT]: { color: '#9dff8a' },
}

export function getDomainColor(domain: Domain): string {
  return DOMAIN_COLORS[domain].color
}

export enum SkillNames {
  ATLETISMO,
  DESTREZA,
  FURTIVIDADE,
  REFLEXOS,
  INVESTIGACAO,
  PESQUISA,
  PSICOLOGIA,
  LOGICA,
  ELETRONICA,
  COMPUTACAO,
  MECANICA,
  MEDICINA,
  PERSUASAO,
  INTIMIDACAO,
  CONTATOS,
  EMPATIA,
  CONHECIMENTO,
  SEXTO,
  VONTADE,
  RITUALISMO,
  TIRO,
  CORTE,
  MARCIAIS,
}

export interface Skill {
  name: string
  description: string
  domain: Domain
}

export interface CharacterSkill extends Skill {
  level: number
  bonus?: boolean
}

export interface SkillsRules {
  totalPoints: number
  maxPerSkill: number
  bonusLevels: number
}

export type SkillIndex = Record<SkillNames, Skill>

export const SKILLS: SkillIndex = {
  // Physical
  [SkillNames.ATLETISMO]: {
    name: 'Atletismo',
    description: 'corrida, escalada, resistência.',
    domain: Domain.PHYSICAL,
  },
  [SkillNames.DESTREZA]: {
    name: 'Destreza',
    description: 'precisão e coordenação.',
    domain: Domain.PHYSICAL,
  },
  [SkillNames.FURTIVIDADE]: {
    name: 'Furtividade',
    description: 'movimentar-se sem ser visto, seguir, esconder-se.',
    domain: Domain.PHYSICAL,
  },
  [SkillNames.REFLEXOS]: {
    name: 'Reflexos',
    description: 'reagir a perigos ou surpresas.',
    domain: Domain.PHYSICAL,
  },
  // Investigation
  [SkillNames.INVESTIGACAO]: {
    name: 'Investigação',
    description: 'busca, dedução, análise de cenas.',
    domain: Domain.INVESTIGATION,
  },
  [SkillNames.PESQUISA]: {
    name: 'Pesquisa',
    description: 'estudo de registros, dados, arquivos.',
    domain: Domain.INVESTIGATION,
  },
  [SkillNames.PSICOLOGIA]: {
    name: 'Psicologia',
    description: 'leitura de pessoas, detecção de mentiras.',
    domain: Domain.INVESTIGATION,
  },
  [SkillNames.LOGICA]: {
    name: 'Lógica',
    description: 'resolução de enigmas, códigos, raciocínio estruturado.',
    domain: Domain.INVESTIGATION,
  },
  // Technical
  [SkillNames.ELETRONICA]: {
    name: 'Eletrônica',
    description: 'reparo e modificação de dispositivos.',
    domain: Domain.TECHNICAL,
  },
  [SkillNames.COMPUTACAO]: {
    name: 'Computação',
    description: 'hacking, software, gerenciamento de dados.',
    domain: Domain.TECHNICAL,
  },
  [SkillNames.MECANICA]: {
    name: 'Mecânica',
    description: 'veículos, máquinas, ferramentas.',
    domain: Domain.TECHNICAL,
  },
  [SkillNames.MEDICINA]: {
    name: 'Medicina',
    description: 'primeiros socorros, anatomia, perícia forense.',
    domain: Domain.TECHNICAL,
  },
  // Social
  [SkillNames.PERSUASAO]: {
    name: 'Persuasão',
    description: 'convencimento, enganação, liderança.',
    domain: Domain.SOCIAL,
  },
  [SkillNames.INTIMIDACAO]: {
    name: 'Intimidação',
    description: 'coerção, ameaças, presença dominante.',
    domain: Domain.SOCIAL,
  },
  [SkillNames.CONTATOS]: {
    name: 'Contatos',
    description: 'pedir favores, explorar conexões.',
    domain: Domain.SOCIAL,
  },
  [SkillNames.EMPATIA]: {
    name: 'Empatia',
    description: 'acalmar, reconfortar, perceber emoções.',
    domain: Domain.SOCIAL,
  },
  // Occult
  [SkillNames.CONHECIMENTO]: {
    name: 'Conhecimento Oculto',
    description: 'saberes sobre folclore, lendas urbanas e o paranormal.',
    domain: Domain.OCCULT,
  },
  [SkillNames.SEXTO]: {
    name: 'Sexto Sentido',
    description: 'detectar presenças e perturbações paranormais.',
    domain: Domain.OCCULT,
  },
  [SkillNames.VONTADE]: {
    name: 'Força de Vontade',
    description: 'resistir à corrupção e à possessão.',
    domain: Domain.OCCULT,
  },
  [SkillNames.RITUALISMO]: {
    name: 'Ritualismo',
    description: 'interação paranormal avançada, obtida através de ?̴͙̪͙̝͌̽̂̉*̵̨̪͖͎͒͋́̾°̷̼̺͚͉̟͆̍̃(̶̤́ṵ̵̼̼͆̅1̷̩̳̿̉D̷͎̮̮̄̇̉̆4̶͇̱̘͗́͘d̴̲̪͚̭͓̈́̀0̷͔̤͆ͅ.',
    domain: Domain.OCCULT,
  },
  // Combat
  [SkillNames.TIRO]: {
    name: 'Armas de Fogo',
    description: 'Perícia e habilidade com armas de fogo, tiro ao alvo.',
    domain: Domain.COMBAT,
  },
  [SkillNames.CORTE]: {
    name: 'Armas Brancas',
    description: 'Perícia e habilidade com armas brancas, de corte ou contusão.',
    domain: Domain.COMBAT,
  },
  [SkillNames.MARCIAIS]: {
    name: 'Artes Marciais',
    description: 'Conhecimento e técnicas em artes marciais, combater usando o corpo.',
    domain: Domain.COMBAT,
  },
}

export const getSkill = (name: SkillNames): Skill | undefined => SKILLS[name]

import type { PlayerCharacter } from './character'

const slugFromName = (fullName: string) => fullName.trim().split(' ')[0].toLowerCase()

export const characters: PlayerCharacter[] = [
  {
    identity: {
      fullName: 'Silas Vane',
      gender: 'Male',
      age: 27,
      occupation: 'Forensic Analyst',
      backstory: 'A young forensic analyst drawn into the mysteries of the supernatural after a string of bizarre cases at the city morgue.',
      personality: 'Cynical',
      motivation: 'Truth',
      fear: 'Oblivion',
    },
    attributes: {
      body: 0,
      mind: 3,
      charisma: -1,
      will: 2,
    },
    skills: [
      { name: 'Investigation', level: 3, bonus: true },
      { name: 'Medicine', level: 2 },
      { name: 'Occult', level: 2 },
      { name: 'Perception', level: 1 },
      { name: 'Stealth', level: 2 },
    ],
  },
  {
    identity: {
      fullName: 'Tallulah Paz Trembley',
      gender: 'Mulher Cis',
      age: 31,
      occupation: 'Roteirista',
      appearanceUrl: 'https://i.imgur.com/oBkm3Fk.jpeg',
      backstory:
        'Tallulah nasceu em Natchez, Mississippi, em uma família indígena Choctaw, cercada por afeto e histórias que moldaram sua imaginação. A caminho de visitá-la na faculdade, no seu aniversário de 19 anos, seus pais morreram em um acidente de carro, deixando para ela apenas memórias e a responsabilidade de seguir em frente. Anos depois, ela se mudou para a Califórnia e encontrou trabalho como roteirista na American Broadcasting Company, tentando se ancorar no trabalho enquanto lidava com o luto. Lá, se apaixonou por Evelyn, um amor secreto que precisou ser escondido do mundo — até que Evelyn desapareceu durante uma viagem de trabalho há quatro anos, deixando um vazio que Tallulah tentou preencher com longas jornadas de escrita e recaídas na bebida. Em junho de 1999, um e-mail inesperado de Evelyn, pedindo que ela fosse ao Canadá, reacendeu todas as dores e esperanças, levando Tallulah a cruzar estradas e cidades desconhecidas em busca de respostas e da mulher que ainda ama.',
      personality: 'Resiliente',
      motivation: 'Amorosa',
      fear: 'Abandono',
    },
    attributes: {
      body: 3,
      mind: 2,
      charisma: 0,
      will: 1,
    },
    skills: [
      {
        name: 'Roteirismo & Narrativa',
        level: 3,
        bonus: true,
      },
      {
        name: 'Pesquisa',
        level: 2,
      },
      {
        name: 'Investigação informal',
        level: 2,
      },
      {
        name: 'Empatia',
        level: 2,
      },
      {
        name: 'Direção em longas distâncias',
        level: 1,
      },
    ],
  },
  {
    identity: {
      fullName: 'Adam Piotr Kubitszek',
      gender: 'Homem Cis',
      age: 36,
      occupation: 'Produtor Musical / Engenheiro de som',
      appearanceUrl: 'https://i.imgur.com/mKxPDdJ.jpeg',
      backstory:
        'Filho de brasileiros exilados pela ditadura, Adam nasceu em Katowice, na Polônia, em um lar politizado e marcado por histórias de repressão e injustiça. Cresceu rodeado de música e encontrou nos instrumentos uma forma de canalizar sua raiva e inquietação. Tornou-se figura conhecida na cena metal europeia, especialmente com a banda Requiem, onde viveu o auge do estrelato e também o fundo do poço em vícios, crises de raiva e conflitos pessoais. Após perder banda, família e quase a própria vida, passou por Seattle, mergulhado na cena grunge e em mais autodestruição, até buscar reabilitação. Hoje, em Welderhide, Ontário, vive de forma discreta, trabalhando como produtor e engenheiro de som, engajado em causas sociais e grupos de apoio, tentando manter a sobriedade e reconstruir a própria humanidade.',
      personality: 'Rebelde',
      motivation: 'Redenção',
      fear: 'Perda',
    },
    attributes: {
      body: -1,
      mind: 2,
      charisma: 2,
      will: 3,
    },
    skills: [
      {
        name: 'Eletrônica',
        level: 1,
        bonus: true,
      },
      {
        name: 'Contatos',
        level: 3,
        bonus: true,
      },
      {
        name: 'Idiomas',
        level: 1,
      },
      {
        name: 'Instinto',
        level: 2,
      },
      {
        name: 'Autocontrole',
        level: 1,
      },
      {
        name: 'Carisma',
        level: 2,
      },
      {
        name: 'Ocultismo',
        level: 2,
      },
    ],
  },
]

export const getSlugForCharacter = (character: PlayerCharacter): string => slugFromName(character.identity.fullName)

export const findCharacterBySlug = (slug: string): PlayerCharacter | undefined => characters.find((c) => getSlugForCharacter(c) === slug)

import type { PlayerCharacter } from './character'
import { getSkill, SkillNames } from './skills'

const slugFromName = (fullName: string) => fullName.trim().split(' ')[0].toLowerCase()

const cs = (name: SkillNames, level: number, bonus?: boolean) => ({
  ...getSkill(name)!,
  level,
  ...(bonus ? { bonus } : {}),
})

export const characters: PlayerCharacter[] = [
  {
    identity: {
      fullName: 'Tallulah Paz Trembley',
      gender: 'Mulher Cis',
      age: 31,
      occupation: 'Roteirista',
      appearanceUrl: 'https://i.imgur.com/oBkm3Fk.jpeg',
      backstory:
        'Tallulah nasceu em Natchez, Mississippi, em uma família indígena Choctaw, cercada por afeto e histórias que moldaram sua imaginação.\n\n A caminho de visitá-la na faculdade, no seu aniversário de 19 anos, seus pais morreram em um acidente de carro, deixando para ela apenas memórias e a responsabilidade de seguir em frente.\n\n Anos depois, ela se mudou para a Califórnia e encontrou trabalho como roteirista na American Broadcasting Company, tentando se ancorar no trabalho enquanto lidava com o luto.\n\n Lá, se apaixonou por Evelyn, um amor secreto que precisou ser escondido do mundo — até que Evelyn desapareceu durante uma viagem de trabalho há quatro anos, deixando um vazio que Tallulah tentou preencher com longas jornadas de escrita e recaídas na bebida.\n\n Em junho de 1999, um e-mail inesperado de Evelyn, pedindo que ela fosse ao Canadá, reacendeu todas as dores e esperanças, levando Tallulah a cruzar estradas e cidades desconhecidas em busca de respostas e da mulher que ainda ama.',
      personality: 'Resiliente',
      motivation: 'Amorosa',
      fear: 'Abandono',
      imageOffset: {
        x: 0,
        y: 0,
      },
    },
    attributes: {
      body: 3,
      mind: 2,
      charisma: 0,
      will: 1,
    },
    skills: [
      cs(SkillNames.CONTATOS, 1, true),
      cs(SkillNames.PESQUISA, 2, true),
      cs(SkillNames.ATLETISMO, 2),
      cs(SkillNames.REFLEXOS, 1),
      cs(SkillNames.CONHECIMENTO, 1),
      cs(SkillNames.TIRO, 2),
      cs(SkillNames.MARCIAIS, 1),
      cs(SkillNames.MECANICA, 1),
      cs(SkillNames.VONTADE, 1),
    ],
  },
  {
    identity: {
      fullName: 'Adam Piotr Kubitszek',
      gender: 'Homem Cis',
      age: 36,
      occupation: 'Produtor Musical | Engenheiro de som',
      appearanceUrl: 'https://i.imgur.com/mKxPDdJ.jpeg',
      backstory:
        'Filho de brasileiros exilados pela ditadura, Adam nasceu em Katowice, na Polônia, em um lar politizado e marcado por histórias de repressão e injustiça.\n\n Cresceu rodeado de música e encontrou nos instrumentos uma forma de canalizar sua raiva e inquietação. Tornou-se figura conhecida na cena metal europeia, especialmente com a banda Requiem, onde viveu o auge do estrelato e também o fundo do poço em vícios, crises de raiva e conflitos pessoais.\n\n Após perder banda, família e quase a própria vida, passou por Seattle, mergulhado na cena grunge e em mais autodestruição, até buscar reabilitação.\n\n Hoje, em Welderhide, Ontário, vive de forma discreta, trabalhando como produtor e engenheiro de som, engajado em causas sociais e grupos de apoio, tentando manter a sobriedade e reconstruir a própria humanidade.',
      personality: 'Rebelde',
      motivation: 'Redenção',
      fear: 'Perda',
      imageOffset: {
        x: 0,
        y: 45,
      },
    },
    attributes: {
      body: -1,
      mind: 2,
      charisma: 2,
      will: 3,
    },
    skills: [
      cs(SkillNames.ELETRONICA, 1, true),
      cs(SkillNames.CONTATOS, 3, true),
      cs(SkillNames.EMPATIA, 1),
      cs(SkillNames.SEXTO, 2),
      cs(SkillNames.VONTADE, 1),
      cs(SkillNames.PERSUASAO, 2),
      cs(SkillNames.CONHECIMENTO, 2),
    ],
  },
  {
    identity: {
      fullName: 'Oliver Boucher Bergman',
      gender: 'Homem Cis',
      age: 55,
      occupation: 'Ex-minerador | Dono de Bar',
      appearanceUrl: 'https://i.imgur.com/peVYrKn.jpeg',
      backstory:
        'Oliver Boucher Bergman, conhecido como "Velho Canarrí", nasceu e viveu toda a vida em Welderhide.\n\n Descendente de imigrantes europeus que ajudaram a fundar a cidade no século XIX, começou a trabalhar nas minas ainda jovem. Fraco de corpo, mas dono de uma percepção aguçada, ganhou respeito entre os colegas por seu estranho talento em prever acidentes e desastres nas galerias subterrâneas. \n\n Tornou-se uma figura importante no sindicato dos mineradores, lutando por melhores condições e denunciando abusos da Eidolon.\n\n Após o fechamento das minas, foi demitido e perdeu quase tudo, mas junto de alguns amigos abriu um pequeno bar — um refúgio para os velhos mineradores e um lembrete do passado da cidade.\n\n Amargurado e teimoso, Oliver continua investigando a Eidolon por conta própria, guiado mais pela raiva e nostalgia do que pela esperança.',
      personality: 'Ranzinza',
      motivation: 'Justiça',
      fear: 'Altura e Cachorros',
      imageOffset: {
        x: 0,
        y: 15,
      },
    },
    attributes: {
      body: 3,
      mind: 2,
      charisma: -1,
      will: 2,
    },
    skills: [cs(SkillNames.SEXTO, 1, true), cs(SkillNames.CONTATOS, 1, true)],
  },
]

export const getSlugForCharacter = (character: PlayerCharacter): string => slugFromName(character.identity.fullName)

export const findCharacterBySlug = (slug: string): PlayerCharacter | undefined => characters.find((c) => getSlugForCharacter(c) === slug)

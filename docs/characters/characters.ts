import type { PlayerCharacter } from './player'
import { BodyState, MindState } from './player'
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
    status: {
      body: BodyState.HEALTHY,
      mind: MindState.SANE,
      resonance: 0.1,
    },
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
        x: 45,
        y: 0,
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
    status: {
      body: BodyState.HEALTHY,
      mind: MindState.UNSTABLE,
      resonance: 0.15,
    },
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
    skills: [cs(SkillNames.SEXTO, 4, true), cs(SkillNames.CONTATOS, 3, true), cs(SkillNames.ATLETISMO, 2), cs(SkillNames.INVESTIGACAO, 2), cs(SkillNames.MECANICA, 1)],
    status: {
      body: BodyState.HEALTHY,
      mind: MindState.SANE,
      resonance: 0.15,
    },
  },
  {
    identity: {
      fullName: 'Leo Wen (温凉)',
      gender: 'Homem Cis',
      age: 22,
      occupation: 'Caixista do Tim Hortons',
      appearanceUrl: '',
      backstory:
        "Leo é o cara quieto que trabalha no turno da noite no Tim Hortons da estação de metrô.\n\nSempre de moletom largo, tênis gastos e cabelo meio bagunçado, ele vive com aquela cara de quem não dorme direito, mas ainda assim trata todo mundo com um cuidado quase automático.\n\n Filho de imigrantes taiwaneses, cresceu ouvindo a avó chamar ele de 'A-Liang' e aprendendo pequenos costumes, como fazer chá pra quem tá mal ou colocar a família sempre em primeiro lugar.\n\nEle largou a faculdade de engenharia pra cuidar dela, mas nunca fala disso com detalhes, só dá um sorriso cansado e diz que 'alguém tinha que fazer'.\n\nNo geral, é prestativo, observador e gentil.",
      personality: 'Prestativa',
      motivation: 'Família',
      fear: 'Morte',
      imageOffset: {
        x: 0,
        y: 15,
      },
    },
    attributes: {
      body: 0,
      mind: 3,
      charisma: 1,
      will: 1,
    },
    skills: [cs(SkillNames.ELETRONICA, 4, true), cs(SkillNames.COMPUTACAO, 3, true), cs(SkillNames.FURTIVIDADE, 2), cs(SkillNames.LOGICA, 2), cs(SkillNames.EMPATIA, 1)],
    status: {
      body: BodyState.HEALTHY,
      mind: MindState.UNSTABLE,
      resonance: 0.15,
    },
  },
  {
    identity: {
      fullName: 'Vivienne Paradis',
      gender: 'Mulher Cis',
      age: 26,
      occupation: 'Enfermeira',
      appearanceUrl: 'https://i.imgur.com/UmtKcaV.png',
      backstory: 'Ela é uma garotinha muito divertida.',
      personality: 'Perfeccionista',
      motivation: 'Felicidade',
      fear: 'Vazio',
      imageOffset: {
        x: 60,
        y: 0,
      },
    },
    attributes: {
      body: 2,
      mind: 0,
      charisma: 2,
      will: 2,
    },
    skills: [
      cs(SkillNames.MEDICINA, 4, true),
      cs(SkillNames.EMPATIA, 1, true),
      cs(SkillNames.DESTREZA, 1),
      cs(SkillNames.FURTIVIDADE, 1),
      cs(SkillNames.REFLEXOS, 1),
      cs(SkillNames.PSICOLOGIA, 2),
      cs(SkillNames.SEXTO, 2),
    ],
    status: {
      body: BodyState.HEALTHY,
      mind: MindState.UNSTABLE,
      resonance: 0.15,
    },
  },
  {
    identity: {
      fullName: 'Silas Campbell',
      gender: 'Homem Cis',
      age: 26,
      occupation: 'Legista',
      appearanceUrl: 'https://i.imgur.com/yoaVWbD.png',
      backstory:
        'Silas nasceu em uma família tranquila e pacata, na cidade de Toronto, no Canadá. Ao lado dos pais e da irmã mais velha, cresceu em um ambiente harmonioso, sem precisar lidar com grandes conflitos até os oito anos de idade, quando sua irmã mais velha desapareceu repentinamente em um dia comum. Alicia, então uma estudante do ensino médio, simplesmente não voltou para casa. O desaparecimento abalou profundamente a família, que passou meses se movimentando incansavelmente em busca de respostas, sem jamais desistir de encontrá-la.\n\n Aos 14 anos, Silas começou a ter “vislumbres” da irmã desaparecida. Ele afirmava vê-la e conversar com ela, como se ainda estivesse por perto, observando-o à distância. Foi então que percebeu que, talvez, Alicia realmente não estivesse mais neste mundo  e que, por mais que quisesse, nada poderia fazer por ela naquele momento.\n\n A partir daí, sua mente passou a pregá-lo peças com frequência. Silas começou a se comunicar não apenas com a irmã supostamente falecida, mas também com outras pessoas que ninguém mais conseguia ver. Aquilo despertava nele tanto medo quanto curiosidade. Os pais, desesperados, buscaram toda a ajuda possível e, na tentativa de recomeçar, decidiram se mudar para Ontário, acreditando que uma nova vida e novas memórias poderiam amenizar o trauma da perda e o sofrimento do filho. Mas, apesar dos esforços, as visões nunca cessaram.\n\n Com o passar dos anos, Silas aprendeu a lidar com a própria mente e a conviver com as vozes e presenças que o acompanhavam. Acostumou-se a nunca mais estar realmente sozinho. E foi assim que decidiu dedicar sua vida ao que mais entendia: cuidar daqueles que já partiram.',
      personality: 'Sereno',
      motivation: 'Propósito',
      fear: 'Perda',
      imageOffset: {
        x: 50,
        y: 0,
      },
    },
    attributes: {
      body: 0,
      mind: 3,
      charisma: 2,
      will: 1,
    },
    skills: [cs(SkillNames.MEDICINA, 3, true), cs(SkillNames.SEXTO, 3, true), cs(SkillNames.INVESTIGACAO, 2), cs(SkillNames.DESTREZA, 2), cs(SkillNames.PERSUASAO, 1), cs(SkillNames.REFLEXOS, 1)],
    status: {
      body: BodyState.HEALTHY,
      mind: MindState.UNSTABLE,
      resonance: 0.15,
    },
  },
]

export const getSlugForCharacter = (character: PlayerCharacter): string => slugFromName(character.identity.fullName)

export const findCharacterBySlug = (slug: string): PlayerCharacter | undefined => characters.find((c) => getSlugForCharacter(c) === slug)

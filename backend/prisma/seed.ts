import { PrismaClient, StickerType, Rarity } from '@prisma/client'

const prisma = new PrismaClient()

// Datos de muestra: un par de grupos del Mundial con sus selecciones,
// escudos y jugadores, mas algunas especiales y leyendas foil.

type SeedSticker = {
  number: string
  name: string
  type: StickerType
  rarity?: Rarity
}

type SeedTeam = {
  name: string
  code: string
  group: string
  flagUrl?: string
  stickers: SeedSticker[]
}

const flag = (code: string) => `https://flagcdn.com/${code}.svg`

const teams: SeedTeam[] = [
  {
    name: 'Argentina',
    code: 'ARG',
    group: 'C',
    flagUrl: flag('ar'),
    stickers: [
      { number: 'ARG 1', name: 'Escudo Argentina', type: StickerType.BADGE, rarity: Rarity.FOIL },
      { number: 'ARG 2', name: 'E. Martinez', type: StickerType.PLAYER },
      { number: 'ARG 3', name: 'N. Otamendi', type: StickerType.PLAYER },
      { number: 'ARG 4', name: 'R. De Paul', type: StickerType.PLAYER },
      { number: 'ARG 5', name: 'L. Messi', type: StickerType.PLAYER, rarity: Rarity.FOIL },
      { number: 'ARG 6', name: 'J. Alvarez', type: StickerType.PLAYER },
    ],
  },
  {
    name: 'Mexico',
    code: 'MEX',
    group: 'C',
    flagUrl: flag('mx'),
    stickers: [
      { number: 'MEX 1', name: 'Escudo Mexico', type: StickerType.BADGE, rarity: Rarity.FOIL },
      { number: 'MEX 2', name: 'G. Ochoa', type: StickerType.PLAYER },
      { number: 'MEX 3', name: 'C. Montes', type: StickerType.PLAYER },
      { number: 'MEX 4', name: 'H. Lozano', type: StickerType.PLAYER },
      { number: 'MEX 5', name: 'S. Gimenez', type: StickerType.PLAYER },
    ],
  },
  {
    name: 'Polonia',
    code: 'POL',
    group: 'C',
    flagUrl: flag('pl'),
    stickers: [
      { number: 'POL 1', name: 'Escudo Polonia', type: StickerType.BADGE, rarity: Rarity.FOIL },
      { number: 'POL 2', name: 'W. Szczesny', type: StickerType.PLAYER },
      { number: 'POL 3', name: 'J. Bednarek', type: StickerType.PLAYER },
      { number: 'POL 4', name: 'P. Zielinski', type: StickerType.PLAYER },
      { number: 'POL 5', name: 'R. Lewandowski', type: StickerType.PLAYER, rarity: Rarity.FOIL },
    ],
  },
  {
    name: 'Arabia Saudita',
    code: 'KSA',
    group: 'C',
    flagUrl: flag('sa'),
    stickers: [
      { number: 'KSA 1', name: 'Escudo Arabia Saudita', type: StickerType.BADGE, rarity: Rarity.FOIL },
      { number: 'KSA 2', name: 'M. Al-Owais', type: StickerType.PLAYER },
      { number: 'KSA 3', name: 'A. Al-Bulaihi', type: StickerType.PLAYER },
      { number: 'KSA 4', name: 'S. Al-Dawsari', type: StickerType.PLAYER },
    ],
  },
  {
    name: 'Francia',
    code: 'FRA',
    group: 'D',
    flagUrl: flag('fr'),
    stickers: [
      { number: 'FRA 1', name: 'Escudo Francia', type: StickerType.BADGE, rarity: Rarity.FOIL },
      { number: 'FRA 2', name: 'H. Lloris', type: StickerType.PLAYER },
      { number: 'FRA 3', name: 'D. Upamecano', type: StickerType.PLAYER },
      { number: 'FRA 4', name: 'A. Griezmann', type: StickerType.PLAYER },
      { number: 'FRA 5', name: 'K. Mbappe', type: StickerType.PLAYER, rarity: Rarity.FOIL },
      { number: 'FRA 6', name: 'O. Dembele', type: StickerType.PLAYER },
    ],
  },
  {
    name: 'Dinamarca',
    code: 'DEN',
    group: 'D',
    flagUrl: flag('dk'),
    stickers: [
      { number: 'DEN 1', name: 'Escudo Dinamarca', type: StickerType.BADGE, rarity: Rarity.FOIL },
      { number: 'DEN 2', name: 'K. Schmeichel', type: StickerType.PLAYER },
      { number: 'DEN 3', name: 'A. Christensen', type: StickerType.PLAYER },
      { number: 'DEN 4', name: 'C. Eriksen', type: StickerType.PLAYER },
    ],
  },
  {
    name: 'Australia',
    code: 'AUS',
    group: 'D',
    flagUrl: flag('au'),
    stickers: [
      { number: 'AUS 1', name: 'Escudo Australia', type: StickerType.BADGE, rarity: Rarity.FOIL },
      { number: 'AUS 2', name: 'M. Ryan', type: StickerType.PLAYER },
      { number: 'AUS 3', name: 'H. Souttar', type: StickerType.PLAYER },
      { number: 'AUS 4', name: 'M. Duke', type: StickerType.PLAYER },
    ],
  },
  {
    name: 'Tunez',
    code: 'TUN',
    group: 'D',
    flagUrl: flag('tn'),
    stickers: [
      { number: 'TUN 1', name: 'Escudo Tunez', type: StickerType.BADGE, rarity: Rarity.FOIL },
      { number: 'TUN 2', name: 'A. Dahmen', type: StickerType.PLAYER },
      { number: 'TUN 3', name: 'M. Talbi', type: StickerType.PLAYER },
      { number: 'TUN 4', name: 'Y. Msakni', type: StickerType.PLAYER },
    ],
  },
]

// Stickers especiales y leyendas, sin seleccion asociada.
const specials: SeedSticker[] = [
  { number: 'FWC 1', name: 'Trofeo del Mundial', type: StickerType.SPECIAL, rarity: Rarity.FOIL },
  { number: 'FWC 2', name: 'Mascota Oficial', type: StickerType.SPECIAL },
  { number: 'FWC 3', name: 'Estadio Final', type: StickerType.SPECIAL },
  { number: 'LEG 1', name: 'Diego Maradona', type: StickerType.LEGEND, rarity: Rarity.FOIL },
  { number: 'LEG 2', name: 'Pele', type: StickerType.LEGEND, rarity: Rarity.FOIL },
  { number: 'LEG 3', name: 'Zinedine Zidane', type: StickerType.LEGEND, rarity: Rarity.FOIL },
]

async function main() {
  console.log('Limpiando datos previos...')
  await prisma.userSticker.deleteMany()
  await prisma.sticker.deleteMany()
  await prisma.team.deleteMany()
  await prisma.user.deleteMany()

  console.log('Cargando selecciones y figuritas...')
  for (const team of teams) {
    await prisma.team.create({
      data: {
        name: team.name,
        code: team.code,
        group: team.group,
        flagUrl: team.flagUrl,
        stickers: {
          create: team.stickers.map((s) => ({
            number: s.number,
            name: s.name,
            type: s.type,
            rarity: s.rarity ?? Rarity.NORMAL,
          })),
        },
      },
    })
  }

  console.log('Cargando especiales y leyendas...')
  for (const s of specials) {
    await prisma.sticker.create({
      data: {
        number: s.number,
        name: s.name,
        type: s.type,
        rarity: s.rarity ?? Rarity.NORMAL,
      },
    })
  }

  // Perfil de muestra para arrancar a jugar de una.
  const demo = await prisma.user.create({ data: { name: 'Jugador Demo' } })

  const totalStickers = await prisma.sticker.count()
  console.log(`Listo: ${teams.length} selecciones, ${totalStickers} figuritas.`)
  console.log(`Perfil demo creado: ${demo.name} (id ${demo.id})`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

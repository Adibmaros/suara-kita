import { customAlphabet } from 'nanoid'
import { prisma } from './prisma'

// Custom alphabet: no ambiguous characters like 0, O, 1, I, l
const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
const generateNanoId = customAlphabet(alphabet, 8)


export async function generateUniqueTokenCode(): Promise<string> {
  let isUnique = false
  let code = ''

  while (!isUnique) {
    code = `SK-${generateNanoId()}`
    const existingToken = await prisma.token.findUnique({
      where: { code },
    })

    if (!existingToken) {
      isUnique = true
    }
  }

  return code
}

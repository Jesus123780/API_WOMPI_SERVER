import fs from 'fs/promises'
import { tokensCards } from '../../transaction'
import { LogDanger } from '../../../utils'
const PATH_TOKENIZED_CARD_ID = './tokenizedCardId.json'

/**
 * Saves the tokenized card ID to a file.
 * @param id The tokenized card ID to save.
 * @returns A Promise that resolves to the saved ID, or null if an error occurs.
 */
export const saveTokenizedCardId = async (id: string): Promise<string | null> => {
  if (id === null || id === undefined || id === '') {
    return null
  }
  try {
    await fs.writeFile(PATH_TOKENIZED_CARD_ID, JSON.stringify({ id }))
    return id
  } catch (error: any) {
    LogDanger(`[saveTokenizedCardId] = [ERROR] ${error.message}`)
    return null
  }
}

/**
 * Retrieves the tokenized card ID from the file.
 * @returns A Promise that resolves to the tokenized card ID, or an empty string if not found.
 */
export async function getTokenizedCardId (): Promise<string> {
  try {
    const data = await fs.readFile(PATH_TOKENIZED_CARD_ID, 'utf-8')
    const { id } = JSON.parse(data)
    return id ?? ''
  } catch (error: any) {
    LogDanger(`[getTokenizedCardId] = [ERROR] ${error.message}`)
    return ''
  }
}

/**
 * Retrieves or creates the tokenized card ID.
 * @returns A Promise that resolves to the tokenized card ID.
 */
export async function getOrCreateTokenizedCardId (): Promise<string> {
  try {
    let existingId = null
    if (existingId === null || existingId === '') {
      const tokenizedCard = await tokensCards()
      existingId = tokenizedCard?.response?.data?.data?.id ?? ''
    }

    return existingId
  } catch (error: any) {
    LogDanger(`[getOrCreateTokenizedCardId] = [ERROR] ${error.message}`)
    return ''
  }
}

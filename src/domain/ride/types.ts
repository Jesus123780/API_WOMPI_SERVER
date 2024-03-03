import type { typeCard } from '../transaction/types'

export interface RequestBody {
  latitude: number
  longitude: number
  email: string
  currency?: string
  endLongitude: number
  endLatitude: number
  idUserRider: number
  type: typeCard
}

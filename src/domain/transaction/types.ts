export type typeCard = 'CARD' | 'NEQUI'

export interface PaymentSourceDataData {
  type: string
  token: string
  customer_email: string
  acceptance_token: string
}

interface PublicData {
  bin: string
  last_four: string
  exp_month: string
  exp_year: string
  card_holder: string
  validity_ends_at: string
  type: 'CARD'
}

interface Data {
  id: number
  public_data: PublicData
  token: string
  type: typeCard
  status: 'AVAILABLE'
  customer_email: string
}

export interface PaymentSourceDataResponse {
  data: Data
  meta: object
  error?: {
    type: string
    messages: Record<string, string[]>
  }
}
export interface WompiTokenResponse {

  response: {
    data: {
      data: {
        id: string
        public_data: {
          type: string
        }
        type: string
        status: string
      }
    }
  }
}

export interface TransactionData {
  amount_in_cents: number
  currency: string
  signature: string
  customer_email: string
  payment_method?: {
    installments: number
  }
  reference: string
  payment_source_id: number
}

export interface WompiMerchantResponse {
  data: {
    presigned_acceptance: {
      acceptance_token: string
      permalink: string
      type: string
    }
  }
}

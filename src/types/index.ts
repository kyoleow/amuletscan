export interface AmuletResult {
  temple: string
  type: string
  effect: string
  material: string
  nameEN: string
  nameTH: string
  master: string
  price: string
  remarks: string
  accuracy: number
  imageQuality: string
  imageData?: string
}

export interface Feedback {
  id?: string
  accuracy: number
  helpful: boolean
  comment: string
  timestamp?: number
}

export type ProductCategory = 'api' | 'sterile' | 'intermediate' | 'development'

export type TherapeuticArea =
  | 'antihistamine'
  | 'antifungal'
  | 'cardiovascular'
  | 'antidiabetic'
  | 'oncology'
  | 'respiratory'
  | 'dermatology'
  | 'anticoagulant'
  | 'anti-infective'
  | 'gastrointestinal'
  | 'musculoskeletal'
  | 'urology'
  | 'cns'
  | 'other'

export interface Product {
  slug: string
  name: string
  casNumber: string
  category: ProductCategory
  therapeuticArea: TherapeuticArea
  grade: 'sterile' | 'non-sterile' | 'both'
  description: string
  molecularFormula?: string
  molecularWeight?: string
  dmfStatus?: string
  pharmacopeia?: string[]
  /** Parent API this intermediate is used to synthesise (intermediates only) */
  parentApi?: string
  available: boolean
}

export interface ProductCategoryInfo {
  value: ProductCategory
  label: string
  count: number
}

export interface TherapeuticAreaInfo {
  value: TherapeuticArea
  label: string
  count: number
}

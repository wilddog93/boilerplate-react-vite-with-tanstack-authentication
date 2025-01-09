export interface ResponseAPI {
  code: string
  description: string
}

export interface PaginationAPI {
  page: number
  limit: number
  totalItems: number
  totalPages: number
}
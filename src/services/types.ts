export interface ResponseAPI {
  code: string
  description: string
}

export interface PaginationAPI {
  page: number
  limit: number
  totalItem: number
  totalPage: number
}
declare module '@ioc:AdonisCrud/Types/AbstractRepositoryQsParamsIndex' {
  type AbstractRepositoryQsParamsIndex<T> = {
    page?: number
    perPage?: number
    all?: boolean
    order?: 'asc' | 'desc'
    sort?: string
  }

  type AbstractRepositorRequestUpdatePayload<T> = {
    id: string
    body: Partial<T>
  }

  type AbstractRepositorIndexRequest<T> = {
    qs: AbstractRepositoryQsParamsIndex<T> & Partial<T>
    authUser?: any
  }

  export { AbstractRepositorRequestUpdatePayload, AbstractRepositorIndexRequest }
}

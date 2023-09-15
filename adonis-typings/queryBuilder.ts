
declare module '@ioc:AdonisCrud/Crud/QueryBuilder' {
    import { LucidModel } from '@ioc:Adonis/Lucid/Orm'
    interface QueryBuild {
        model: LucidModel
        qs: any
        selectFields?: String[]
    }
    type QueryBuilderType = {
        build: ({ model, qs }: QueryBuild) => {}
    }
    const QueryBuilder: QueryBuilderType
    export { QueryBuilder }
} 
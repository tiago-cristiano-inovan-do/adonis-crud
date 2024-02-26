async function PaginationResponse({ qs, query, transformerClass, ctx }) {
  const { all, page = 1, perPage = 10 } = qs

  if (all) {
    return query.exec()
  }
  const {
    rows,
    currentPage,
    perPage: per_page,
    total,
    lastPage,
  } = await query.paginate(page, perPage)

  return ctx.transform.paginate(
    {
      rows,
      pages: {
        page: currentPage,
        perPage: per_page,
        total: total,
        lastPage: lastPage,
      },
    },
    transformerClass
  )
}

export default PaginationResponse

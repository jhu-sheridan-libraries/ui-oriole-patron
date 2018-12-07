export const getPage = state => state.search.meta.page
export const getQuery = state => state.search.query
export const getTotalRecords = state => state.search.data.totalRecords
export const isFetching = state => state.search.isFetching
export const getResources = state => state.search.data.resources
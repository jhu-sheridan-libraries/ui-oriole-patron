export const getSearchPage = state => state.search.meta.page
export const getSearchQuery = state => state.search.query
export const getSearchTotalRecords = state => state.search.data.totalRecords
export const isSearchFetching = state => state.search.isFetching
export const getSearchResources = state => state.search.data.resources
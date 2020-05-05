
export const state = () => {
  return {
    searchHistory: [],
    article: []
  }
}

export const mutations = {
  setSearchHistory(state, data) {
    state.searchHistory.unshift(data)
    state.searchHistory = Array.from(new Set(state.searchHistory));
  },
  addArticle(state, data) {

    state.article.unshift(data);
    if (state.article.length > 6) {
      state.article.length = 6
    }
  },

  delSearchHistory(state, data) {
    state.searchHistory.splice(data, 1)
  }
} 
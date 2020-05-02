
export const state = () => {
  return {
    searchHistory: []
  }
}

export const mutations = {
  setSearchHistory(state, data) {


    state.searchHistory.unshift(data)
    state.searchHistory = Array.from(new Set(state.searchHistory));





  },

  delSearchHistory(state, data) {
    state.searchHistory.splice(data, 1)
  }
} 
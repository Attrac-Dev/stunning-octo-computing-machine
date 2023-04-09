// store/index.js

export const state = () => ({
    formSubmitted: false // Initial state of formSubmitted is set to false
  });
  
  export const mutations = {
    setFormSubmitted(state, value) {
      state.formSubmitted = value;
    }
  };
  
  export const actions = {
    updateFormSubmitted({ commit }, value) {
      commit('setFormSubmitted', value);
    }
  };
  
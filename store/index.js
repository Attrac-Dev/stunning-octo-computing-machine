export const state = () => ({
    hasSubscribed: false,
  });
  
  export const mutations = {
    setHasSubscribed(state, value) {
      state.hasSubscribed = value;
    },
  };
  
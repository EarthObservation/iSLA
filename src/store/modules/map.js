const state = {
    layerState: {
        b0: true,
        a0: true,
        a1: true,
    },
};

const getters = {
    getLayerState: state => state.layerState,
};

const actions = {

};
const mutations = {
    toggleBaseLayer: (state, id) => {
        state.layerState[id] = !state.layerState[id];
    },
};


export default {
    state,
    getters,
    mutations,
    actions
}
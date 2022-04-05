import {
    transform
} from "ol/proj";

const state = {
    tab: null,
    newAnswerCoordinates: {
        wgs: {
            x: null,
            y: null,
        },
        web: {
            x: null,
            y: null,
        },
    },
    newAnswer: {
        questionNumber: null,
        nonPhonetic: null,
        phonetic: null,
        place: null,
        coordinates: {
            wgs: {
                x: null,
                y: null,
            },
            web: {
                x: null,
                y: null,
            },
        },
        isSpeaker: false,
        audioUrl: null,
        audio: null,
        docs: [],
        age: null,
        sex: 50,
        residence: null,
        id: null
    }
};

const getters = {
    getActiveTab: state => state.tab,
    getNewAnswer: state => state.newAnswer,
};

const actions = {
};
const mutations = {
    // This set of mutations handles all inputs from newAnswerBasic component
    //except coordinates that are handeled separately with method below this set.
    questionNumber: (state, questionNumber) => {
        state.newAnswer.questionNumber = questionNumber;
    },
    nonPhonetic: (state, nonPhonetic) => {
        state.newAnswer.nonPhonetic = nonPhonetic;
    },
    phonetic: (state, phonetic) => {
        state.newAnswer.phonetic = phonetic;
    },
    place: (state, place) => {
        state.newAnswer.place = place;
    },
    isSpeaker: (state, isSpeaker) => {
        state.newAnswer.isSpeaker = isSpeaker;
    },
    audioUrl: (state, audioUrl) => {
        state.newAnswer.audioUrl = audioUrl;
    },
    audio: (state, audio) => {
        state.newAnswer.audio = audio;
    },
    // End of newAnswerBasic set of methods & beginning of newAnswerBasicFile set

    docs: (state, docs) => {
        state.newAnswer.docs = docs;
    },
    // End of newAnswerFile set of methods & beginning of newAnswerBasicInformant set 

    age: (state, birthYear) => {
        state.newAnswer.birthYear = birthYear;
    },
    sex: (state, sex) => {
        state.newAnswer.sex = sex;
    },
    residence: (state, residence) => {
        state.newAnswer.residence = residence;
    },
    id: (state, id) => {
        state.newAnswer.id = id;
    },
    // End of newAnswerInformant set of methods

    changeTab: (state, tab) => {
        state.tab = tab;
    },

    closeTab: (state) => {
        state.tab = null;
    },

    setCoordinates: (state, {
        coordinates,
        SRS
    }) => {
        if (SRS === "EPSG:3857") {
            const coordinates4326 = transform(
                coordinates,
                "EPSG:3857",
                "EPSG:4326"
            );
            state.newAnswer.coordinates = {
                wgs: {
                    x: coordinates4326[0].toFixed(5),
                    y: coordinates4326[1].toFixed(5),
                },
                web: {
                    x: coordinates[0].toFixed(5),
                    y: coordinates[1].toFixed(5),
                },
            };
        }
        if (SRS === "EPSG:4326") {
            const coordinates3857 = transform(
                coordinates,
                "EPSG:4326",
                "EPSG:3857"
            );
            state.newAnswer.coordinates = {
                wgs: {
                    x: coordinates[0].toFixed(5),
                    y: coordinates[1].toFixed(5),
                },
                web: {
                    x: coordinates3857[0].toFixed(5),
                    y: coordinates3857[1].toFixed(5),
                },
            };
        }
    }
};


export default {
    state,
    getters,
    mutations,
    actions
}
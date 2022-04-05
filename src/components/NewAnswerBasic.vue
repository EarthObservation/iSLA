<template>
  <div>
    <q-scroll-area style="height: 20rem">
      <q-input
        v-model="getNewAnswer.questionNumber"
        @change="questionNumber(getNewAnswer.questionNumber)"
        type="number"
        label="Številka vprašanja"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'To polje je obvezno.']"
        :dense="dense"
      />
      <q-input
        v-model="getNewAnswer.nonPhonetic"
        @change="nonPhonetic(getNewAnswer.nonPhonetic)"
        label="Enostavni zapis"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'To polje je obvezno.']"
        :dense="dense"
      />
      <q-input
        v-model="getNewAnswer.phonetic"
        @change="phonetic(getNewAnswer.phonetic)"
        label="Fonetični zapis"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'To polje je obvezno.']"
        :dense="dense"
      />
      <q-input
        v-model="getNewAnswer.place"
        @change="place(getNewAnswer.place)"
        label="Kraj"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'To polje je obvezno.']"
        :dense="dense"
      />
      <p class="q-placeholder coor-paragraph">Koordinate</p>
      <div>
        <q-input
          v-model.number="getNewAnswer.coordinates.wgs.x"
          @change="
            setCoordinates({
              coordinates: [parseFloat(getNewAnswer.coordinates.wgs.x), parseFloat(getNewAnswer.coordinates.wgs.x)],
              SRS: 'EPSG:4326',
            })
          "
          class="coordinate-input-width coordinate-input-float-left"
          type="number"
          step="0.00001"
          label="X"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Kliknite na zemljevid.',
          ]"
          :dense="dense"
        />
        <q-input
          v-model.number="getNewAnswer.coordinates.wgs.y"
          @change="
            setCoordinates({
              coordinates: [parseFloat(getNewAnswer.coordinates.wgs.x), parseFloat(getNewAnswer.coordinates.wgs.y)],
              SRS: 'EPSG:4326',
            })
          "
          class="coordinate-input-width coordinate-input-float-right"
          type="number"
          step="0.00001"
          label="Y"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Kliknite na zemljevid.',
          ]"
          :dense="dense"
        />
      </div>
      <q-checkbox
        v-model="getNewAnswer.isSpeaker"
        class="checkbox-label"
        color="primary"
        label="Ali ste uporabnik/govorec besede?"
        size="xl"
        @click="checkAudio(), isSpeaker(getNewAnswer.isSpeaker)"
      />
      <q-slide-transition>
        <div v-if="getNewAnswer.isSpeaker">
          <p class="q-placeholder coor-paragraph">Snemanje izgovorjave</p>
          <q-toolbar>
            <q-btn
              icon="mic"
              :loading="progress"
              color="primary"
              @click="startRecording()"
            >
              <template v-slot:loading>
                <q-spinner-audio color="white" />
              </template>
            </q-btn>
            <q-btn
              :disable="!progress"
              color="negative"
              class="q-mr-sm"
              @click="stopRecording()"
              icon="stop"
            />
            <q-separator vertical inset />
            <q-btn
              :disable="!getNewAnswer.audio"
              color="primary"
              class="q-ml-sm"
              @click="playRecording()"
              icon="play_arrow"
            />
            <q-btn
              :disable="!getNewAnswer.audio"
              color="negative"
              @click="deleteRecording()"
              icon="delete"
            />
          </q-toolbar>
        </div>
      </q-slide-transition>
    </q-scroll-area>
    <p></p>
    <q-separator />
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters, mapMutations } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "NewAnswerBasic",
  data() {
    return {
      dense: ref(true),
      progress: ref(false),
      mediaRecorder: ref(null),
      chunks: ref([]),
      timeout: ref(5),
      $q: useQuasar(),
    };
  },

  computed: {
    ...mapGetters(["getNewAnswer"]),
  },

  // watch: {
  //   getNewAnswer: {
  //     deep: true,
  //     handler(newVal) {
  //       this.coorX = newVal.coordinates.wgs.x;
  //       this.coorY = newVal.coordinates.wgs.y;
  //     },
  //   },
  // },

  methods: {
    ...mapMutations([
      "setCoordinates",
      "questionNumber",
      "nonPhonetic",
      "phonetic",
      "place",
      "isSpeaker",
      "audioUrl",
      "audio",
    ]),

    displayNotification(newVal) {
      this.$q.notify({
        position: "center",
        color: "primary",
        message: newVal,
      });
    },

    startRecording() {
      this.deleteRecording();
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.progress = true;
        setTimeout(() => {
          this.stopRecording();
        }, 5000);

        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((stream) => {
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.start();
            this.mediaRecorder.ondataavailable = (e) => {
              this.chunks.push(e.data);
              const audioBlob = new Blob(this.chunks, {
                type: "audio/webm;codecs=opus",
              });
              this.aUrl = URL.createObjectURL(audioBlob);
              this.aud = new Audio(this.aUrl);
              this.audioUrl(this.aUrl)
              this.audio(this.aud)
            };
          })

          // Error callback
          .catch(function (err) {
            this.displayNotification("Prišlo je do sledeče napake: " + err);
          });
      } else {
        this.displayNotification("Vaš brskalnik ne podpira zajema zvoka!");
      }
    },

    stopRecording() {
      this.mediaRecorder.stop();
      this.progress = false;
    },

    playRecording() {
      if (this.getNewAnswer.audio) {
        this.getNewAnswer.audio.play();
      }
    },

    checkAudio() {
      if (this.getNewAnswer.audio && !this.getNewAnswer.isSpeaker) {
        this.deleteRecording();
      }
    },

    deleteRecording() {
      this.mediaRecorder = ref(null);
      this.chunks = ref([]);
      this.aUrl = null;
      this.aud = null;
      this.audioUrl(null);
      this.audio(null);
    },
  },
};
</script>
<style>
.coor-paragraph {
  color: #808080;
  padding-top: 10px;
}
.coordinate-input-width {
  max-width: 50%;
}

.coordinate-input-float-left {
  float: left;
  padding-left: 10px;
}

.coordinate-input-float-right {
  float: right;
  padding-right: 10px;
}

.checkbox-label {
  color: #808080;
}
</style>
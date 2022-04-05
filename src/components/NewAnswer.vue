<template>
  <div class="q-pa-ld">
    <div class="text-h6">Nov odgovor</div>
    <q-separator />
    <q-stepper
      v-model="step"
      header-nav
      ref="stepper"
      color="primary"
      animated
      flat
    >
      <q-step :name="1" title="Osnovno" icon="description" :done="done1">
        <q-form
          @submit="
            () => {
              done1 = true;
              step = 2;
            }
          "
        >
          <new-answer-basic> </new-answer-basic>
          <q-stepper-navigation class="row">
            <q-space />
            <q-btn
              square
              label="Potrdi"
              type="submit"
              color="primary"
              class="q-mr-xs"
            />
          </q-stepper-navigation>
        </q-form>
      </q-step>

      <q-step
        :name="2"
        title="Dodajanje datotek"
        icon="attach_file"
        :done="done2"
      >
        <q-form
          @submit="
            () => {
              done2 = true;
              step = 3;
            }
          "
        >
          <new-answer-file></new-answer-file>
          <q-stepper-navigation class="row">
          <q-space />
            <q-btn
              flat
              @click="step = 1"
              color="primary"
              label="Nazaj"
              class="q-ml-sm"
            />

            <q-btn
              square
              label="Potrdi"
              type="submit"
              color="primary"
              class="q-mr-xs"
            />
          </q-stepper-navigation>
        </q-form>
      </q-step>

      <q-step
        :name="3"
        title="Informant"
        icon="record_voice_over"
        :done="done3"
      >
        <q-form
          @submit="
            () => {
              done3 = true;
            }
          "
        >
          <new-answer-informant></new-answer-informant>
          <q-stepper-navigation class="row">
          <q-space/>
            <q-btn
              flat
              @click="step = 2"
              color="primary"
              label="Nazaj"
              class="q-ml-sm"
            />

            <q-btn
              square
              label="To je to"
              type="submit"
              color="primary"
              class="q-mr-xs"
            />
          </q-stepper-navigation>
        </q-form>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import NewAnswerBasic from "@/components/NewAnswerBasic";
import NewAnswerFile from "@/components/NewAnswerFile";
import NewAnswerInformant from "@/components/NewAnswerInformant";

export default {
  name: "NewAnswer",
  components: {
    NewAnswerBasic,
    NewAnswerFile,
    NewAnswerInformant,
  },

  data() {
    return {
      $q: useQuasar(),
      step: ref(1),
      done1: ref(false),
      done2: ref(false),
      done3: ref(false),
    };
  },

  computed: {},
};
</script>


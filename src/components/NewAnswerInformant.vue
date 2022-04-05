<template>
  <div>
    <q-scroll-area style="height: 20rem">
      <q-input
        v-model="getNewAnswer.age"
        @change="age(getNewAnswer.age)"
        type="number"
        label="Starost"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'To polje je obvezno.']"
        :dense="dense"
      />
      <p class="q-placeholder coor-paragraph">Spol</p>

      <div class="q-pa-md row">
        <q-badge> Ženski: {{ 100 - getNewAnswer.sex }} % </q-badge>
        <q-space />
        <q-badge> Moški: {{ getNewAnswer.sex }} % </q-badge>
        <q-slider v-model="getNewAnswer.sex" 
        @change="sex(getNewAnswer.sex)"
        :min="0" :max="100" />
      </div>
      <q-input
        v-model="getNewAnswer.residence"
        @change="residence(getNewAnswer.residence)"
        label="Kraj bivanja"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'To polje je obvezno.']"
        :dense="dense"
      />
      <q-input
        v-model="getNewAnswer.id"
        @change="id(getNewAnswer.id)"
        label="Identifikator"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'To polje je obvezno.']"
        :dense="dense"
      />
    </q-scroll-area>
    <p></p>
    <q-separator />
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: "NewAnswerInformant",

  data() {
    return {
      dense: ref(true),
    };
  },

  computed: {
    ...mapGetters(["getNewAnswer"])
  },

  methods: {
    ...mapMutations(["age", "sex", "residence", "id"])
  },
};
</script>

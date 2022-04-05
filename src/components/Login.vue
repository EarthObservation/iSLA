<template>
  <div class="q-pa-md form-bg">
    <q-form
      @submit="onLogin({ user_name: user_name, password: password })"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        v-model="user_name"
        label="Uporabniško ime"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Vpišite svoje uporabniško ime.',
        ]"
        :dense="dense"
      />
      <q-input
        v-model="password"
        type="password"
        label="Geslo"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Vpišite svoje geslo.',
        ]"
        :dense="dense"
      />

      <div>
        <q-btn
          label="Potrdi"
          type="submit"
          color="primary"

        />
        <q-btn
          label="Ponastavi"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "login",
  data() {
    return {
      user_name: ref("alesinar"),
      password: ref("asa"),
      dense: ref(false),
      $q: useQuasar(),
    };
  },

  methods: {
    ...mapActions(["onLogin"]),

    displayNotification(newVal) {
      this.$q.notify({
        position: "center",
        color: "primary",
        message: newVal,
      });
    },

    onReset() {
      this.user_name = null;
      this.password = null;
    },
  },

  computed: {
    ...mapGetters(["loginError"]),
  },

  watch: {
    loginError(newVal) {
      this.displayNotification(newVal.error);
    },
  },
};
</script>
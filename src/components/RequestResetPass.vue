<template>
  <div class="q-pa-md form-bg">
    <q-form @submit="requestResetPass(this.email)" @reset="onReset" class="q-gutter-md">
      <q-input
        v-model="email"
        type="email"
        label="Elektronski naslov"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'To polje je obvezno.',
          isValidEmail,
        ]"
        :dense="dense"
      />
      <div>
        <q-btn label="Potrdi" type="submit" color="primary" />

      </div>
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { mapGetters, mapActions} from "vuex";

export default {
  name: "requestResetPass",

  data() {
    return {
      email: ref(null),
      dense: false,
      $q: useQuasar(),

    }
  },

  computed: {
  ...mapGetters(["resetPassError"]),
  },

  watch: {
    resetPassError(newVal) {
      this.displayNotification(newVal.error)
      }
  },

  methods: {
    ...mapActions(["requestResetPass"]),

    displayNotification(newVal) {
      this.$q.notify({
        position: "center",
        color: "primary",
        message: newVal,
      })
    },

    onReset() {
      this.email = null;
    },

    isValidEmail(email) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(email) || "Vaš vnos ne izgleda kot elektronski naslov.";
    },
  },
};
</script>
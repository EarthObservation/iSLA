<template>
  <div class="q-pa-md form-bg">
    <q-form
      @submit="registerNewUser(newUserData)"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        v-model="newUserData.first_name"
        label="Ime"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Prosimo vnesite svoje ime.',
        ]"
        :dense="dense"
      />
      <q-input
        v-model="newUserData.last_name"
        label="Priimek"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'In vaš priimek?']"
        :dense="dense"
      />

      <q-input filled v-model="newUserData.bdate" label="Datum rojstva">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="newUserData.bdate"
                mask="D. M. YYYY"
                :locale="SILocale"
              >
                >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="OK" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        v-model="newUserData.education"
        label="Izobrazba"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Ta podatek je tudi obvezen',
        ]"
        :dense="dense"
      />
      <q-input
        v-model="newUserData.user_name"
        label="Uporabniško ime"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Prosimo izberite uporabniško ime.',
        ]"
        :dense="dense"
      />
      <q-input
        v-model="newUserData.email"
        type="email"
        label="Elektronski naslov"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'To polje je obvezno.',
          isValidEmail,
        ]"
        :dense="dense"
      />
      <q-input
        v-model="newUserData.password"
        type="password"
        label="Geslo"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Prosimo izberite močno geslo.',
        ]"
        :dense="dense"
      />
      <q-input
        v-model="newUserData.confirm_password"
        type="password"
        label="Geslo še enkrat"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Geslo morate vpisati še enkrat.',
          (val) => val == newUserData.password || 'Gesli ne izgledata enaki.',
        ]"
        :dense="dense"
      />
      <div class="q-pa-md">
        <div class="q-gutter-sm">
          <q-checkbox
            v-model="newUserData.terms_checked"
            color="primary"
            label="Ali se strinjate s pogoji uporabe, politiko zasebnosti in piškotki?"
            :rules="[
              (val) => val === true || 'Če se ne, se ne morete vpisati.',
            ]"
            true-value="true"
            false-value="false"
          />
        </div>
      </div>

      <div>
        <q-btn
          label="Potrdi"
          type="submit"
          :disabled="!newUserData.terms_checked"
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "register",

  data() {
    return {
      newUserData: {
        first_name: ref(null),
        last_name: ref(null),
        bdate: ref(null),
        education: ref(null),
        user_name: ref(null),
        email: ref(null),
        password: ref(null),
        confirm_password: ref(null),
        terms_checked: ref("false"),
        language: ref("EN"),
      },
      SILocale: {
        days: [
          "Ponedeljek",
          "Torek",
          "Sreda",
          "Četrtek",
          "Petek",
          "Sobota",
          "Nedelja",
        ],
        daysShort: ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"],
        months: [
          "Januar",
          "Februar",
          "Marec",
          "April",
          "Maj",
          "Junij",
          "Julij",
          "Avgust",
          "September",
          "Oktober",
          "November",
          "December",
        ],
        monthsShort: [
          "Jan",
          "Feb",
          "Mar",
          "Aprl",
          "Maj",
          "Jun",
          "Jul",
          "Avg",
          "Sep",
          "Okt",
          "Nov",
          "Dec",
        ],
      },
      dense: ref(false),
      $q: useQuasar(),
    };
  },

  computed: {
    ...mapGetters(["registerError"]),
  },

  watch: {
    registerError(newVal) {
      this.displayNotification(newVal.error);
    },
  },

  methods: {
    ...mapActions(["registerNewUser"]),

    displayNotification(newVal) {
      this.$q.notify({
        position: "center",
        color: "primary",
        message: newVal,
      });
    },

    onReset() {
      this.newUserData.first_name = null;
      this.newUserData.last_name = null;
      this.newUserData.user_name = null;
      this.newUserData.email = null;
      this.newUserData.password = null;
      this.newUserData.confirm_password = null;
      this.newUserData.terms_checked = "false";
    },

    isValidEmail(email) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return (
        emailPattern.test(email) ||
        "Vaš vnos ne izgleda kot elektronski naslov."
      );
    },
  },
};
</script>

<template>
  <q-separator></q-separator>
  <div class="q-gutter-md">
    <q-list>
      <q-expansion-item group="account-settings">
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon name="alternate_email_icon"> </q-icon>
          </q-item-section>
          <q-item-section>Sprememba elektronskega naslova</q-item-section>
        </template>
        <q-list>
          <q-item class="background-col">
            <q-form @submit="submitNewEmail(email)" class="q-gutter-md">
              <p>{{ user.email }}</p>
              <q-input
                v-model="email"
                type="email"
                label="Nov elektronski naslov"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'To polje je obvezno.',
                  isValidEmail,
                ]"
                :dense="dense"
              />

              <div>
                <q-btn
                  square
                  label="Potrdi"
                  type="submit"
                  color="primary"
                  class="q-mr-xs"
                />
              </div>
            </q-form>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-separator />
      <q-expansion-item group="account-settings">
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon name="password"> </q-icon>
          </q-item-section>
          <q-item-section>Sprememba gesla</q-item-section>
        </template>
        <q-list>
          <q-item class="background-col">
            <q-form
              @submit="
                submitNewPassword({
                  old_password: oldPassword,
                  new_password: newPassword,
                })
              "
              @reset="onResetPass()"
              class="q-gutter-md"
            >
              <q-input
                v-model="oldPassword"
                type="password"
                label="Trenutno geslo"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Prosimo vpišite svoje trenutno geslo',
                ]"
                :dense="dense"
              />
              <q-input
                v-model="newPassword"
                type="password"
                label="Novo geslo"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Prosimo vpišite svoje novo geslo.',
                ]"
                :dense="dense"
              />
              <q-input
                v-model="newPasswordOnceMore"
                type="password"
                label="Še enkrat novo geslo"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Prosimo vpišite svoje novo geslo še enkrat.',
                  (val) => val == newPassword || 'Gesli ne izgledata enaki.',
                ]"
                :dense="dense"
              />

              <div>
                <q-btn
                  square
                  label="Potrdi"
                  type="submit"
                  color="primary"
                  class="q-mr-xs"
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
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "AccountSettings",

  data() {
    return {
      email: ref(null),
      oldPassword: ref(null),
      newPassword: ref(null),
      newPasswordOnceMore: ref(null),
      language: ref(null),
      $q: useQuasar(),
      dense: ref(false),
    };
  },

  computed: {
    ...mapGetters(["submitNewEmailError", "submitNewPasswordError", "user"]),
  },

  watch: {
    submitNewEmailError(newVal) {
      this.displayNotification(newVal.error);
    },

    submitNewPasswordError(newVal) {
      this.displayNotification(newVal.error);
    },
  },

  methods: {
    ...mapActions(["logout", "submitNewEmail", "submitNewPassword"]),

    displayNotification(newVal) {
      this.$q.notify({
        position: "center",
        color: "warning",
        message: newVal,
      });
    },

    isValidEmail(email) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(email) || "This does not look correct.";
    },

    isSamePassword(oldPassword, newPassword) {
      if (oldPassword !== newPassword) {
        return "Passwords do not look the same.";
      }
    },

    onResetPass() {
      this.oldPassword = ref(null);
      this.newPassword = ref(null);
      this.newPasswordOnceMore = ref(null);
    }
  },
};
</script>
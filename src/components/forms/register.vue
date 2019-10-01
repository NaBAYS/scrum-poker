<template>
  <v-form v-model="valid" autocomplete="on">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          sm="6">
          <v-card tile flat>
            <v-card-title>
              <span class="overline">Register</span>
            </v-card-title>
            <v-card-text class="px-10">
              <!-- Name -->
              <v-text-field
                label="Name"
                v-model="name"
                prepend-icon="person"
                type="text"
                autocomplete="name"
                required />

              <!-- Email -->
              <v-text-field
                label="Email Address"
                v-model="email"
                prepend-icon="mail"
                type="email"
                autocomplete="email"
                required />

              <!-- Password -->
              <v-text-field
                label="Password"
                v-model="password"
                prepend-icon="vpn_key"
                type="password"
                autocomplete="new-password"
                required />

            </v-card-text>
            <v-card-actions class="px-10 pb-5">
              <v-btn color="primary"
                block
                outlined
                :loading="loading"
                @click="submit">
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  components: {
    //
  },
  data: () => ({
    valid: false,
    name: null,
    email: null,
    password: null,
    loading: false
  }),
  methods: {
    error (message) {
      this.$store.dispatch('alertType', 'error')
      this.$store.dispatch('alertMessage', message)
      this.$store.dispatch('alert', true)
      this.loading = false
    },
    submit (e) {
      e.preventDefault()

      this.loading = true

      // create user
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
        if (user) {
          // udpate user info
          firebase.auth().currentUser.updateProfile({
            displayName: this.name
          }).then(() => {
            // add user cookie
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
              .then(() => firebase.auth().signInWithEmailAndPassword(this.email, this.password))
              .catch((error) => this.error(error.message))

            this.$store.dispatch('login', true)
            this.loading = false
            this.$router.push('dashboard')
          }).catch((error) => this.error(error.message))
        }
      // eslint-disable-next-line handle-callback-err
      }).catch((error) => this.error(error.message))
    }
  }
}
</script>

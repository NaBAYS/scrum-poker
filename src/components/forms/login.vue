<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          sm="6">
          <v-card tile flat>
            <v-card-title>
              <span class="overline">Login</span>
            </v-card-title>
            <v-card-text class="px-10">
              <!-- Email address -->
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
  data: () => ({
    email: null,
    password: null,
    loading: false
  }),
  methods: {
    error (message) {
      this.loading = false
      this.$store.dispatch('alertType', 'error')
      this.$store.dispatch('alertMessage', message)
      this.$store.dispatch('alert', true)
    },
    submit (e) {
      e.preventDefault()

      this.loading = true

      if (this.error && this.password) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {
          this.$store.dispatch('login', true)
          this.loading = false
          this.$router.push('dashboard')
        }).catch(error => this.error(error.message))
      } else {
        this.error('Invalid input')
      }
    }
  }
}
</script>

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
                :error-messages="emailErrors"
                prepend-icon="mail"
                type="email"
                autocomplete="email"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()" />

              <!-- Password -->
              <v-text-field
                label="Password"
                v-model="password"
                :error-messages="passwordErrors"
                prepend-icon="vpn_key"
                type="password"
                autocomplete="new-password"
                required
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()" />
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
import { required, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  mixins: [ validationMixin ],
  data: () => ({
    email: null,
    password: null,
    loading: false
  }),
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('Email is required.')
      !this.$v.email.email && errors.push('Email must be in proper format.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    }
  },
  methods: {
    error (message) {
      this.loading = false
      this.$store.dispatch('alertType', 'error')
      this.$store.dispatch('alertMessage', message)
      this.$store.dispatch('alert', true)
    },
    clearError () {
      this.$store.dispatch('alert', false)
    },
    submit (e) {
      e.preventDefault()

      this.loading = true
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.clearError()

        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(user => {
          this.$store.dispatch('login', true)
          this.loading = false
          this.$router.push('dashboard')
        }).catch(error => this.error(error.message))
      } else {
        this.error('There has been an error.')
      }
    }
  }
}
</script>

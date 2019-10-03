<template>
  <v-form
    autocomplete="on"
    lazy-validation>
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
                :error-messages="nameErrors"
                :success="nameSuccess"
                prepend-icon="person"
                type="text"
                autocomplete="name"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()" />

              <!-- Email -->
              <v-text-field
                label="Email Address"
                v-model="email"
                :error-messages="emailErrors"
                :success="emailSuccess"
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

                <!-- Confirm Password -->
              <v-text-field
                label="Confirm Password"
                v-model="confirmPassword"
                :error-messages="confirmPasswordErrors"
                prepend-icon="vpn_key"
                type="password"
                autocomplete="new-password"
                required
                @input="$v.confirmPassword.$touch()"
                @blur="$v.confirmPassword.$touch()" />

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
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  mixins: [ validationMixin ],
  data: () => ({
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
    loading: false
  }),
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    },
    confirmPassword: {
      required,
      sameAs: sameAs('password')
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    nameSuccess () {
      let success = false
      if (!this.$v.name.$dirty) return success
      if (this.$v.name.required) success = true
      return success
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('Email is required.')
      !this.$v.email.email && errors.push('Email must be in proper format.')
      return errors
    },
    emailSuccess () {
      let success = false
      if (!this.$v.email.$dirty) return success
      if (this.$v.email.required && this.$v.email.email) success = true
      return success
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')
      !this.$v.password.minLength && errors.push('Password must be at least 8 characters.')
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      !this.$v.confirmPassword.required && errors.push('Password confirmation is required.')
      !this.$v.confirmPassword.sameAs && errors.push('Must match password value.')
      return errors
    }
  },
  methods: {
    error (message) {
      this.$store.dispatch('alertType', 'error')
      this.$store.dispatch('alertMessage', message)
      this.$store.dispatch('alert', true)
      this.loading = false
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
      } else {
        this.error('There has been an error.')
      }
    }
  }
}
</script>

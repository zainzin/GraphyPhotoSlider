<template>
    <v-container text-xs-center mt-5 pt-5>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <h1>Welcome Back!</h1>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card color="secondary" dark>
                    <v-form @submit.prevent="handleSigninUser">
                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field v-model="username" prepend-icon="face" label="Username" type="text" required></v-text-field>    
                            </v-flex>  
                        </v-layout>

                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field v-model="password" prepend-icon="extension" label="Password" type="password" required></v-text-field>    
                            </v-flex>  
                        </v-layout>

                        <v-layout row>
                            <v-flex xs12>
                                <v-btn color="accent" type="submit">Sign In</v-btn>
                                <h3>Don't have an account? <router-link to="/signup">Sign Up</router-link></h3>
                            </v-flex>  
                        </v-layout>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'SignIn',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
    watch: {
        user(value) {
            if (value) {
                this.$router.push('/');
            }
        }
    },
    methods: {
        handleSigninUser() {
            this.$store.dispatch('signinUser', {
                username: this.username,
                password: this.password
            });
        }
    }
}
</script>

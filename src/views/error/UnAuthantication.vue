<template>
    <div>
        <b-card class="text-center">
            
            <p class="d-block"> You are not authorized! 🔏</p>
            <p class="d-block">  You don’t have permission to access this page. Go Home!! </p>
            <b-img
            fluid
            :src="require('@/assets/images/pages/not-authorized.svg')"
            >   
            </b-img>
        </b-card>
        <b-card class="text-center">
            <b-button
            variant="primary"
            @click="loginRoute()"
            >
                Back To Home        
            </b-button>
        </b-card>
    </div>
</template>

<script>
import {
    BCard,
    BCardText,
    BImg,
    BButton
} from 'bootstrap-vue'
export default {
    components: {
        BCard,
        BCardText,
        BImg,
        BButton
    },
    methods: {
        loginRoute() {
            this.$router.push('/');
        }
    }
}
</script>
import CryptoJs from 'crypto-js'
export default {
    methods: {
        loginUserData(token,userInfo) {
            this.$store.commit('app/UPDATE_AUTH_TOKEN', token);

            token = CryptoJs.AES.encrypt(token,process.env.VUE_APP_SECRET_KEY);
            localStorage.setItem('token',token);
            
            let user = {
                id: userInfo.id,
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                email: userInfo.email,
                phone:userInfo.phone,
                is_active:userInfo.is_active,
                role: userInfo.role.role
            }

            this.$store.commit('app/UPDATE_AUTH_USER_DATA',user);
            user = CryptoJs.AES.encrypt(JSON.stringify(user),process.env.VUE_APP_SECRET_KEY).toString();
            localStorage.setItem('userInfo',user);
            this.$router.push('/');
        },
        //reverse vue js state managment
        // authUserData(token,userInfo) {

        //     this.$store.commit('myState/UPDATE_AUTH_USER_TOKEN',token);

        //     token = CryptoJs.AES.encrypt(token,process.env.VUE_APP_SECRET_KEY).toString();
        //     localStorage.setItem('testToken',token);

        //     let user = {
        //         id: userInfo.id,
        //         first_name: userInfo.first_name,
        //         last_name: userInfo.last_name,
        //         email: userInfo.email,
        //         phone:userInfo.phone,
        //         is_active:userInfo.is_active,
        //         role: userInfo.role.role
        //     }
        //     this.$store.commit('myState/UPDATE_AUTH_USER_DATA',user);
        //     user = CryptoJs.AES.encrypt(JSON.stringify(user),process.env.VUE_APP_SECRET_KEY).toString();
        //     localStorage.setItem('testUser',user);

        //     this.$router.push('/');


        // }
     }
}
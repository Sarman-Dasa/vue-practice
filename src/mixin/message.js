import  ToastificationContent  from "@core/components/toastification/ToastificationContent.vue";
export default {
    methods: {
        toastMessage(message,type) {
            this.$toast({
                component: ToastificationContent,
                props: {
                    title: message,
                    icon: 'EditIcon',
                    variant: type
                },
            })
        }
    }
} 
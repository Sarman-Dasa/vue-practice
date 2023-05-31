<template>
    <div>
      <!-- Add Employee Modal -->
      <b-modal 
        id="modal-add-employee"
        ref="addEmployee"
        cancel-variant="danger"
        cancel-title="Clear"
        header-bg-variant="info"
        body-text-variant="dark"
        ok-variant="success"
        ok-title="Submit"
        centered
        size="lg"
        cancel-text="clear"
        @ok.prevent="submit()"
        @cancel.prevent="clear()"
        @close.prevent="close()"
        title="Add new employee"
        no-close-on-backdrop
      >
      <validation-observer ref="employeeValidation">
        <b-form @submit.prevent ref="employeeForm">
        <b-row>
             <!-- Name -->
            <b-col sm="12" md="6">
            <b-form-group label="Name" label-for="title" label-cols-md="2">
                <validation-provider #default="{ errors }" name="name" rules="required">
                <b-form-input id="name" placeholder="Employee Name" v-model="name" :state="errors.length > 0 ? false : null" />
                <span class="text-danger"> {{ errors[0] }}</span>
                </validation-provider>
            </b-form-group>
            </b-col>

             <!-- Email -->
             <b-col sm="12" md="6">
            <b-form-group label="Email" label-for="email" label-cols-md="2">
                <validation-provider #default="{ errors }" name="email" rules="required|email">
                <b-form-input id="email" placeholder="Employee Email" v-model="empEmail" :state="errors.length > 0 ? false : null" />
                <span class="text-danger"> {{ errors[0] }}</span>
                </validation-provider>
            </b-form-group>
            </b-col>
        </b-row>
        <b-row>
             <!-- Phone -->
            <b-col sm="12" md="6">
            <b-form-group label="Phone" label-for="phone" label-cols-md="2">
                <validation-provider #default="{ errors }" name="phone" rules="required">
                <b-form-input id="phone" placeholder="Employee mobile number" v-model="phone" :state="errors.length > 0 ? false : null" />
                <span class="text-danger"> {{ errors[0] }}</span>
                </validation-provider>
            </b-form-group>
            </b-col>

             <!-- SALARY -->
             <b-col sm="12" md="6">
            <b-form-group label="SALARY" label-for="salary" label-cols-md="2">
                <validation-provider #default="{ errors }" name="salary" rules="required">
                <b-form-input id="salary" placeholder="Employee Salary" v-model="salary" :state="errors.length > 0 ? false : null" />
                <span class="text-danger"> {{ errors[0] }}</span>
                </validation-provider>
            </b-form-group>
            </b-col>
            <b-col sm="12" md="6" class="my-1">
                <b-form-group
                label="Joining Date"
                label-cols-sm="2">
                <validation-provider #default="{ errors }" name="joniningDate" rules="required">
                    <flat-pickr
                        v-model="joniningDate"
                        class="form-control" 
                        :state="errors.length > 0 ? false : null"
                    />
                    <span class="text-danger"> {{ errors[0] }}</span>
                </validation-provider>
                </b-form-group>
            </b-col>
        </b-row>
        </b-form>
      </validation-observer>
      </b-modal>
    </div>
</template>

<script>
import {
    BButton,
    BModal,
    VBModal,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
} from 'bootstrap-vue';
import flatPickr from 'vue-flatpickr-component'
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { required, email } from '@validations'
import axios from 'axios';
export default {
    components: {
        BButton,
        BModal,
        ValidationObserver,
        ValidationProvider,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BForm,
        flatPickr
    },
    data() {
        return {
            name:'',
            empEmail:'',
            salary:'',
            phone:'',
            required,
            email,
            joniningDate:null
        }
    },
    directive: {
        'b-modal': VBModal,
    },
    methods: {
        submit() {
          this.$refs.employeeValidation.validate().then((success) => {
               if(success) {
                this.addEmployee();
               }
          })
        },
        async addEmployee() {
            let token = this.$store.state.app.token;
           await axios.post('employee/create',{
            name:this.name,
            email:this.empEmail,
            phone:this.phone,
            joining_date:this.joniningDate,
            salary:this.salary
           },{
            headers: {Authorization: `Bearer ${token}`}

           }).then(() => {
            this.$refs.addEmployee.hide()
            this.close();
           })
        },
        clear() {
           this.$refs.employeeForm.reset();
        },
        close() {
            this.$emit("changebooleanvalue", false);
        }
    },
    mounted() {
        this.$refs.addEmployee.show();
    }
}
</script>
<style lang="scss">
    @import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
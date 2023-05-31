<template>
    <div>
        <b-row>
            <!-- perPage -->
            <b-col sm="2" md="4" class="my-1">
                <b-form-group label="Per Page" label-cols-md="3">
                    <b-form-select v-model="perPage" :options="pageOptions" sm="2">
                    </b-form-select>
                </b-form-group>
            </b-col>

            <!-- Search -->
            <b-col sm="12" md="4" class="my-1">
                <b-form-group label="Search" label-cols-sm="2" label-for="searchInput">
                    <b-input-group>
                        <b-form-input id="searchInput" v-model="search" type="search" placeholder="Type to Search" />
                        <b-input-group-append>
                            <b-button variant="primary" @click="clearFilter()">
                                clear
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>

            <!-- Date Picker -->
            <b-col sm="12" md="4" class="my-1">
                <b-form-group label="Range" label-cols-sm="2">
                    <b-input-group>
                        <flat-pickr v-model="rangeDate" class="form-control" :config="{ mode: 'range' }" />
                        <b-input-group-append>
                            <b-button :variant="rangeDate ? 'primary' : 'secondary'" @click="dateFilter()"
                                :disabled="!rangeDate ? true : false">
                                Apply
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>
        </b-row>

        <b-row>
            <!-- Salary Filter -->
            <b-col sm="12" md="4" class="my-1">
                <b-form-group label="Salary Filter" label-cols-md="3">

                    <vue-slider v-model="salaryFilter" :min="minSalary" :max="maxSalary" :interval="1000" />
                </b-form-group>
            </b-col>
            <b-col>
                <b-button variant="gradient-primary" @click="filterSalary()">
                    Apply
                </b-button>
            </b-col>
        </b-row>

        <b-row>
            <!-- Table -->
            <b-col>
                <b-table :items="items" :fields="fields" responsive :currentPage="currentPage" sticky-header="450px">
                    <template #cell(action)="data">
                        <span v-b-modal.updateTodoModal @click="editData(data.item.id)">
                            <feather-icon icon="Edit2Icon" class="mr-50" />

                        </span>
                        <span v-b-modal.updateTodoModal @click="deleteData(data.item.id)">
                            <feather-icon icon="TrashIcon" class="mr-50" />
                        </span>
                    </template>
                </b-table>
            </b-col>
        </b-row>

        <b-row>
            <!-- Pagination -->
            <b-col cols="12">
                <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="center" size="sm"
                    class="my-0 mb-2" />
            </b-col>
        </b-row>

        <fab :position="position" :bg-color="bgColor" :actions="fabActions" @addEmployee="openModal()" mainIcon="person"
            iconSize="small" />

        Add Employee {{ isAddEmployee }}
        <AddEmployee v-if="isAddEmployee" :employeeData="employeeDataEdit"/>
    </div>
</template>

<script>
import axios from 'axios';
import {
    BRow,
    BCol,
    BTable,
    BCard,
    BCardText,
    BPagination,
    BFormSelect,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BButton,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'
import moment from "moment"
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import fab from 'vue-fab'
import AddEmployee from './AddEmployee.vue';
import Parent from '../test/Parent.vue';
import { eventBus } from '@/main';
export default {
    components: {
        BRow,
        BCol,
        BTable,
        BCard,
        BCardText,
        BPagination,
        vSelect,
        BFormSelect,
        BFormGroup,
        BFormInput,
        BInputGroup,
        BInputGroupAppend,
        BButton,
        flatPickr,
        VueSlider,
        fab,
        AddEmployee,
        Parent
    },
    data() {
        return {
            items: [],
            fields: [
                { key: 'id', label: 'ID', variant: 'success' },
                { key: 'name', label: 'NAME' },
                { key: 'email', label: 'EMAIL' },
                { key: 'phone', label: 'PHONE' },
                { key: 'salary', label: 'SALARY' },
                { key: 'joining_date', label: 'JOINING DATE' },
                { key: 'action', label: 'ACTION' }
            ],
            perPage: 10,
            currentPage: 1,
            totalRows: 10,
            search: null,
            pageOptions: [10, 25, 100],
            search: null,
            minDate: new Date('1999-05-01'),
            maxDate: new Date('2023-05-30'),
            rangeDate: null,
            startDate: null,
            endDate: null,
            salaryFilter: [10000, 60000],
            minSalary: 10000,
            maxSalary: 60000,
            bgColor: '#778899',
            position: 'bottom-right',
            fabActions: [
                {
                    name: 'addEmployee',
                    icon: 'add'
                },
            ],
            isAddEmployee: false,
            employeeDataEdit:[]
        }
    },
    methods: {
        async employeeData() {
            let token = this.$store.state.app.token;
            let input = {
                perPage: this.perPage,
                page: this.currentPage,
                search: this.search,
                startDate: this.startDate,
                endDate: this.endDate,
                minSalary: this.salaryFilter[0],
                maxSalary: this.salaryFilter[1]
            }
            await axios.post('employee/list', input, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((response) => {
                let data = response.data.data;
                this.items = data.employees;
                this.totalRows = data.count;
            });
            console.log("Total row::", this.totalRows);
        },
        dateFilter() {
            let date = this.rangeDate.split('to');
            this.startDate = moment(date[0], 'YYYY-MM-DD');
            this.endDate = moment(date[1], 'YYYY-MM-DD');
            console.log(this.minSalary, this.maxSalary);
            this.employeeData();
        },
        clearFilter() {
            this.rangeDate = '';
            this.search = '';
            this.salaryFilter = [10000, 60000];
            this.startDate = '';
            this.endDate = '';
            this.employeeData();
        },
        filterSalary() {
            this.employeeData();
        },
        openModal() {
            this.isAddEmployee = true;
        },
        editData(id) {
            let token = this.$store.state.app.token;
           axios.get(`employee/get/${id}`,{
            headers:{ Authorization: `Bearer ${token}`}
           }).then((success) => {
            //console.log(success.data.data);
            this.employeeDataEdit = success.data.data;
            this.isAddEmployee  = true;
           })
        },
        // delete employee data
        deleteData(id) {
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-outline-danger ml-1',
                },
                buttonsStyling: false,
            }).then(result => {
                if (result.value) {
                    let token = this.$store.state.app.token;
                    axios
                        .delete(`employee/delete/${id}`,{
                            headers:{Authorization:`Bearer ${token}`}
                        })
                        .then((success) => {
                            this.$swal({
                                icon: 'success',
                                title: 'Deleted!',
                                text: 'Your record has been deleted.',
                                customClass: {
                                    confirmButton: 'btn btn-success',
                                },
                            })
                            this.employeeData();
                        })
                        .catch((error) => {
                            this.toastMessage("Data not found!!!", "danger");
                        });
                } else if (result.dismiss === 'cancel') {
                    this.$swal({
                        title: 'Cancelled',
                        text: 'Your record is safe :)',
                        icon: 'error',
                        customClass: {
                            confirmButton: 'btn btn-success',
                        },
                    })
                }
            })
        },
    },
    watch: {
        currentPage() {
            this.employeeData();
        },
        perPage() {
            this.employeeData();
        },
        search() {
            this.employeeData();
        },
        rangeDate(value) {
            console.log(value);
        },
        salaryFilter(value) {
            console.log(value[0], value[1]);
        }
    },
    mounted() {
        this.employeeData();
    },
    created() {
        eventBus.$on('changebooleanvalue', (data) => {
            this.isAddEmployee = data;
        })
    }
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';

.slider {
    /* overwrite slider styles */
    width: 50%;
}
</style>
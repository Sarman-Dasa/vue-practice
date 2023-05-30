<template>
    <div>
      <b-row>
        <!-- perPage -->
        <b-col sm="2" md="4" class="my-1">
            <b-form-group
                label="select"
                label-cols-md="2"
            >
            <b-form-select
            v-model="perPage"
            :options="pageOptions"
            sm="2"
            >
            </b-form-select>
        </b-form-group>
        </b-col>

        <!-- Search -->
        <b-col sm="12" md="4" class="my-1">
            <b-form-group
                label="Search"
                label-cols-sm="2"
                label-for="searchInput"
            >
                <b-input-group>
                    <b-form-input 
                    id="searchInput"
                    v-model="search"
                    type="search"
                    placeholder="Type to Search"/>
                    <b-input-group-append>
                        <b-button 
                            variant="primary"
                            @click="clearFilter()"
                        >
                        clear
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>
        </b-col>

        <!-- Date Picker -->
        <b-col sm="12" md="4" class="my-1">
            <b-form-group
            label="Range"
            label-cols-sm="2">
            <b-input-group>
                <flat-pickr
                    v-model="rangeDate"
                    class="form-control"
                    :config="{ mode: 'range'}"
                />
                <b-input-group-append>
                    <b-button 
                        :variant="rangeDate ? 'primary': 'secondary'"
                        @click="dateFilter()"
                        :disabled="!rangeDate ? true : false"
                    >
                        Apply
                    </b-button>
                </b-input-group-append>
                </b-input-group>
            </b-form-group>
        </b-col>
      </b-row>
        <b-row>
            <b-col>
                <b-table
                :items="items"
                :fields="fields"
                responsive
                :currentPage="currentPage"
                sticky-header="450px"
                >
                </b-table>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="center"
                    size="sm"
                    class="my-0 mb-2"
                />
             </b-col>
        </b-row>
        <b-card class="mt-5">
            <range-slider
                class="slider"
                min="10000"
                max="60000"
                step="1000"
                v-model="sliderValue"
                >
            </range-slider>
        </b-card>
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
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'
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
        RangeSlider
    },
    data() {
        return {
            items:[],
            fields:[
                { key: 'id', label: 'ID',variant:'success'},
                { key: 'name', label: 'NAME'},
                { key: 'email', label: 'EMAIL'},
                { key: 'phone', label: 'PHONE'},
                { key: 'salary', label: 'SALARY'},
                { key: 'joining_date', label: 'JOINING DATE'}
            ],
            perPage:10,
            currentPage:1,
            totalRows:10,
            search:null,
            pageOptions:[10,25,100],
            search:null,
            minDate: new Date('1999-05-01'),
            maxDate: new Date('2023-05-30'),
            rangeDate: null,
            startDate:null,
            endDate:null,
            sliderValue:10
        }
    },
    methods: {
        async employeeData() {
            let token = this.$store.state.app.token;
            let input = {
                perPage: this.perPage,
                page:this.currentPage,
                search:this.search,
                startDate:this.startDate,
                endDate:this.endDate
            }
            await axios.post('employee/list',input,{
                headers: {Authorization: `Bearer ${token}`}
            }).then((response) => {
                let data = response.data.data;
                this.items = data.employees;
                this.totalRows = data.count;
            });
            console.log("Total row::",this.totalRows);
        },
        dateFilter() {
            let date = this.rangeDate.split('to');
            this.startDate = moment(date[0],'YYYY-MM-DD');
            this.endDate = moment(date[1],'YYYY-MM-DD');
            this.employeeData();
        },
        clearFilter() {
            this.rangeDate = '';
            this.search = '';
        }
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
        sliderValue(value) {
            console.log(value);
        }
    },
    mounted() {
        this.employeeData();
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
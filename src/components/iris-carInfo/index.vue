<template lang="html">
    <div class="row">
        <div class="col-md-6 col-lg-6">
            <b-form-fieldset horizontal label="厂家" label-text-align="right" :label-cols="4">
                <b-form-select :options="factoryCodes" v-model="financeProDetails[0].tDetailCarInfoList[0].factoryCode">
                </b-form-select>
            </b-form-fieldset>
        </div>
        <div class="col-md-6 col-lg-6">
            <b-form-fieldset horizontal label="品牌" label-text-align="right" :label-cols="4">
                <b-form-select :options="brandCodes" v-model="financeProDetails[0].tDetailCarInfoList[0].brandCode">
                </b-form-select>
            </b-form-fieldset>
        </div>
        <div class="col-md-6 col-lg-6">
            <b-form-fieldset horizontal label="车系" label-text-align="right" :label-cols="4">
                <b-form-select :options="seriesCodes" v-model="financeProDetails[0].tDetailCarInfoList[0].seriesCode">
                </b-form-select>
            </b-form-fieldset>
        </div>
        <div class="col-md-6 col-lg-6">
            <b-form-fieldset horizontal label="车型" label-text-align="right" :label-cols="4">
                <b-form-select :options="modelCodes" v-model="financeProDetails[0].tDetailCarInfoList[0].modelCode">
                </b-form-select>
            </b-form-fieldset>
        </div>
        <div class="col-md-6 col-lg-6">
            <b-form-fieldset horizontal label="车款" label-text-align="right" :label-cols="4">
                <b-form-select :options="carCodes" v-model="financeProDetails[0].tDetailCarInfoList[0].carCode">
                </b-form-select>
            </b-form-fieldset>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import config from '../../common/config'
    export default {
        data: function() {
            return {
            }
        },
        props: {
           deep: {
               
           }
        },
        methods: {
            ...mapActions('financePro', [
                'queryCarInfoByCarSearch'
            ])
        },
        computed: {
            ...mapState('financePro', [
                'factoryCodes',
                'brandCodes',
                'seriesCodes',
                'modelCodes',
                'carCodes'
            ])
        },
        components: {
        }
    }
</script>
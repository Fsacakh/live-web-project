<template>
    <div>
        <div class="row">
            <div class="col-md-4">
                <b-form-fieldset horizontal label="首次到店日期" :label-cols="4" class="text-right">
                    <b-form-input v-model="firstInStoreTime" type="text" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-4">
                <b-form-fieldset horizontal label="线索状态" :label-cols="4" class="text-right">
                    <b-form-input type="text" v-model="leadStatusName" readonly/>
                </b-form-fieldset>
            </div>
            <div class="col-md-4">
                <b-form-fieldset horizontal label="所属SC" :label-cols="4" class="text-right">
                    <b-form-input type="text" v-model="scName" readonly/>
                </b-form-fieldset>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                firstInStoreTime:'',
                scName: '',
                leadStatusName: '',
            }
        },
        computed: {

        },
        methods: {
            dataInfo: function(data) {
                const $this = this
                $this.scName = data.scName
                $this.leadStatusName = this.getStatus(data)
                $this.firstInStoreTime = data.firstInStoreTime
            },
            getStatus(item) {
            if (item.defeatStatus == -1) {
                return '准战败'
            } else if (item.salesLeadsStatusInfoVos[0].tryDriveStatus > 0) {
                return '试乘试驾'
            } else if (item.inStoreFlag == 1) {
                return '到店'
            } else if (item.appointmentSubStatus > 0) {
                return '已预约'
            } else if (item.appointmentSubStatus <= 0) {
                return '待跟进'
            } else {
                return ''
            }
        },
        }
    }
</script>

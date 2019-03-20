<template>
    <b-modal title="" v-model="showModal" no-close-on-backdrop no-close-on-esc size="lg" button-size="sm" @hidden="hideModal" @ok="addCarAdjustInStockOrderInfo" ok-title="创建" cancel-title="取消">
        <div class="row">
            <div class="col-md-10 col-lg-10">
                <b-form-fieldset horizontal label="请输入调出单号:" label-text-align="right" :label-cols="4">
                    <b-form-input v-model.trim="outStockNo"></b-form-input>
                </b-form-fieldset>
            </div>
        </div>
   </b-modal>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    import config from '../../../common/config'
    export default {
        mounted() {
            let _this = this
            _this.outStockNo = ''
        },
        data: function() {
            return {
                showModal: false,
                selectRow: -1,
                outStockNo: ''
            }
        },
        computed: {
            ...mapState('callInVehicleResource', [
                'showAddModal',
            ])
        },
        methods: {
            hideModal: function() {
                this.hideAddModal()
            },
            addCarAdjustInStockOrderInfo: function() {
                let _this = this
                _this.addCarAdjustInStockOrder({
                    outStockNo: _this.$data.outStockNo,
                    callback: (purchaseNo) => {
                        _this.$router.push('/vehicle/callIn/add/' + purchaseNo + '/' + config.editDetailFlag)
                    }
                })    
            },
            ...mapActions('callInVehicleResource', [
                'hideAddModal',
                'addCarAdjustInStockOrder' 
            ])
        },
        watch: {
            showAddModal: {
                handler() {
                    let _this = this
                    _this.showModal = _this.showAddModal
                }
            }
        },
        components: {
           
        }
    }
</script>
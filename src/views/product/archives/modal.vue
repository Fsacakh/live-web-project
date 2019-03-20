<template>
<div class="animated fadeIn">
    <b-modal id="insert" ref="insert" :title="'编辑在途状态'" @ok="submit" @cancel="clear" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-10">
                <b-form-fieldset horizontal label="在途状态" :label-cols="4" class="text-right">
                    <select class="form-control" v-model="edit.logisticsSubStatus">
                        <option v-for="item in zt" :value="item.value">{{item.text}}</option>
                    </select>
                </b-form-fieldset>
            </div>
            <div class="col-md-10">
                <b-form-fieldset horizontal label="开始时间" :label-cols="4" class="text-right">
                    <Datepicker 
                        v-model="startTime"
                        :state="sureJudge"
                        feedback="结束时间小于开始时间"
                        >
                    </Datepicker>
                </b-form-fieldset>
            </div>
            <div class="col-md-10">
                <b-form-fieldset horizontal label="开始时间" :label-cols="4" class="text-right">
                    <Datepicker 
                        v-model="endTime"
                        :state="sureJudge"
                        feedback="结束时间小于开始时间"
                        >
                    </Datepicker>
                </b-form-fieldset>
            </div>
        </div>
    </b-modal>
</div>
</template>
<script>
import Vue from 'vue'
import { mapState, mapGetters, mapMutations } from 'vuex'
import api from '../../../common/api'
import config from '../../../common/config.js'
import Datepicker from 'components/datepicker/datepicker'

export default {
    components: {
        Datepicker
    },
    props: ['skuAddInfoVoList'],
    data() {
        return {
            sureJudge: false,
            zt: [{
                    value: '1',
                    text: '管线中'
                },
                {
                    value: '2',
                    text: '运输中'
            }],
            edit: {
                skuCode: this.$route.params.id,
                logisticsStatus: 1,
                logisticsSubStatus: 1,
                skuAddInfoVoList: []
            },
            startTime: '',
            endTime: '',
            addListItem: {}
        }
    },
    computed: {
        ...mapState('archives', [
                'arList',
                'addList'
            ]),
    },
    created() {

    },
    methods: {
        clear: function () {
            this.edit.logisticsSubStatus = '' 
            this.startTime = ''
            this.endTime = ''
        },
        submit: function () {
            const $this = this
            let id = $this.$route.params.id
            if ($this.edit.logisticsSubStatus == '1') {
                if ($this.startTime != '') {
                    $this.getAddData ('REFD001100')
                    let obj = {}
                    obj.skuCode = id,
                    obj.addCode = $this.addListItem.refDetailCode,
                    obj.addName = $this.addListItem.refDetailName,
                    obj.addValue = $this.startTime
                    $this.edit.skuAddInfoVoList.push(obj)
                }
                if ($this.endTime != '') {
                    $this.getAddData ('REFD001115')
                    let obj = {}
                    obj.skuCode = id,
                    obj.addCode = $this.addListItem.refDetailCode,
                    obj.addName = $this.addListItem.refDetailName,
                    obj.addValue = $this.startTime
                    $this.edit.skuAddInfoVoList.push(obj)
                }
            } else {
                if ($this.startTime != '') {
                    $this.getAddData ('REFD001101')
                    let obj = {}
                    obj.skuCode = id,
                    obj.addCode = $this.addListItem.refDetailCode,
                    obj.addName = $this.addListItem.refDetailName,
                    obj.addValue = $this.startTime
                    $this.edit.skuAddInfoVoList.push(obj)
                }
                if ($this.endTime != '') {
                    $this.getAddData ('REFD001116')
                    let obj = {}
                    obj.skuCode = id,
                    obj.addCode = $this.addListItem.refDetailCode,
                    obj.addName = $this.addListItem.refDetailName,
                    obj.addValue = $this.startTime
                    $this.edit.skuAddInfoVoList.push(obj)
                }
            }
            this.$store.dispatch('archives/additionInfo', {
                poros: $this.edit,
                callBack: function (msg) {
                    if(msg.data.code == "success") {
                        $this.clear()
                        this.$store.dispatch('archives/getEditInfo', {
                            poros: {skuCode: id},
                            callBack: function (msg) {
                                if(msg.data.code == "success") {
                                    $this.$router.push({
                                        path: `/archives/addArchives/${id}`
                                    })
                                }
                            }
                        })
                    }
                }
            })            
        },
        getAddData: function (code) {
            const $this = this
            for(let i = 0,len = $this.addList.length; i < len; i++){
                if($this.addList[i].refDetailCode == code){
                    $this.addListItem = $this.addList[i]
                }
            }
        }
    }
};

</script>
<style lang="css" scope>
.modal-dialog {
    margin: 80px auto !important;
}

.el-tree {
    max-height: 300px;
    overflow-y: scroll;
}
</style>

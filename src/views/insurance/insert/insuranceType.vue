<template>
    <div class="row">
        <div class="col-md-12">
            <div class="col-md-6 pull-left">
                <b-table striped hover bordered show-empty :items="insuranceList" :fields="fields">
                    <template slot="index" slot-scope="data">{{data.index + 1}}</template>
                    <template slot="empty">暂无数据</template>
                </b-table>
            </div>
            <div class="col-md-6 pull-right">
                <b-table striped hover bordered show-empty :items="customList" :fields="customFields">
                    <template slot="index" slot-scope="data">{{data.index + 1}}</template>
                    <template slot="insuranceType" slot-scope="data">
                        <b-form-input placeholder="请输入险种名称" v-model="customList[data.index].insTypeName" />
                    </template>
                    <template slot="remove" slot-scope="value">
                        <b-button type="text" variant="danger" size="sm" @click="remove(value)">
                            删除
                        </b-button>
                    </template>
                    <template slot="empty">暂无数据</template>
                </b-table>
                <div class="row">
                    <div class="col-md-6">
                        <div style="display: inline-block;margin-left:10px;">
                            <i class="fa fa-plus fa-lg mt-4" @click="addRow"></i>
                        </div>
                    </div>
                    <div class="col-md-6 text-right">
                        <b-button type="button" @click="save()" variant="primary">保存</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { Message } from 'element-ui'
import api from 'common/api'
import { mapGetters } from 'vuex'
import config from 'common/config'

export default {
    data() {
        return {
            fields: {
                index: {
                    label: '序号'
                },
                refDetailName: {
                    label: '险种'
                }
            },
            insuranceList: [],
            customFields: {
                index: {
                    label: '序号'
                },
                insuranceType: {
                    label: '自定义险种'
                },
                remove: {
                    label: '操作'
                }
            },
            customList: [],
        }
    },
    computed: {
        ...mapGetters('insurance', [
            'coCode'
        ])
    },
    created() {
        this.getQueryInfo()
    },
    methods: {
        addRow() {
            let list = {
                insuranceType: '',
                insTypeCode: ''
            }
            this.getInsTypeCode(res => list.insTypeCode = res)
            this.customList.push(list)
        },
        save() {
            let params = []
            this.customList.forEach(item => {
                let obj = {
                    "coCode": this.coCode,
                    "insTypeCode": item.insTypeCode,
                    "insTypeName": item.insTypeName
                }
                params.push(obj)
            })

            api.insurance.insert(params).then(res => {
                if (res.data.code === 'success') {
                    Message({
                        type: 'success',
                        message: config.messInfo.success
                    });
                } else {
                    Message({
                        type: 'error',
                        message: config.messInfo.fail
                    });
                }
            })
        },
        remove(value) {
            this.customList.splice(value.index, 1);
        },
        getQueryInfo() {
            // let params = {
            //     coCode: this.coCode
            // }
            // api.insurance.query(params).then(res => {
            //     if (res.data.code === 'success') {
            //         let obj = res.data.obj;
            //         obj.forEach(item => {
            //             let data = item.insTypeName
            //             this.insuranceList.push(data)
            //         })
            //     }
            // })
            let params = {
                refCode: config.insurance.insuranceType
            }
            api.ref.queryDictionaryDetails(params).then(res => {
                if (res.data.code === 'success') {
                    this.insuranceList = res.data.obj.list;
                }
            })
        },
        // 获取自定义险种 code
        getInsTypeCode(callback) {
            let params = { serviceCode: config.insurance.getInsTypeCode };
            api.ordinalInfo.getSequence(params, res => {
                if (res.data.code === 'success') {
                    let obj = res.data.obj;
                    callback(obj)
                }
            })
        }

    }
}
</script>
<style>

</style>

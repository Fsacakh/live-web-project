<template>
    <div class="row">
        <div class="col-md-12">
            <div class="mb-2">
                <b-button variant="success" size="sm" v-b-modal.insType @click="add">新增</b-button>
            </div>
            <!-- tableList -->
            <div class="max-heigth">
                <b-table striped hover bordered show-empty :items="tableList" :fields="checkedFields">
                    <template slot="index" slot-scope="data">
                        {{data.index + 1}}
                    </template>
                    <template slot="remove" slot-scope="value">
                        <b-button type="text" variant="danger" size="sm" @click="remove(value)">
                            删除
                        </b-button>
                    </template>
                    <template slot="empty">
                        暂无数据
                    </template>
                </b-table>
            </div>
            <!-- b-modal -->
            <b-modal id="insType" ref="insType" title="险种" size="md" @ok="handleOk" ok-title="确定" cancel-title="取消">
                <div class="max-heigth">
                    <b-table striped hover bordered show-empty :items="insuranceList" :fields="fields">
                        <template slot="check" slot-scope="data">
                            <el-checkbox v-model="insuranceList[data.index].check" :disabled="insuranceList[data.index].disabled"></el-checkbox>
                        </template>
                        <template slot="index" slot-scope="data">
                            {{data.index + 1}}
                        </template>
                        <template slot="empty">
                            暂无数据
                        </template>
                    </b-table>
                </div>
            </b-modal>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Checkbox, MessageBox, Message } from 'element-ui'
Vue.use(Checkbox);
import api from 'common/api'
import config from 'common/config'
import { mapGetters } from 'vuex'
Vue.component(MessageBox.name, MessageBox)

export default {
    data() {
        return {
            fields: {
                check: {
                    label: '请勾选'
                },
                refDetailName: {
                    label: '险种'
                }
            },
            insuranceList: [], // modal
            checkedFields: {
                index: {
                    label: '序号'
                },
                insTypeName: {
                    label: '险种'
                },
                remove: {
                    label: '操作'
                }
            },
            checkedList: [],   // checked
            tableList: [],
            insertList: []
        }
    },
    created() {
        this.getQueryInfo()
        if(this.$route.params.id) {
            this.queryIsInsert()
        }
    },
    computed: {
        ...mapGetters('insurance', [
            'coCode'
        ])
    },
    methods: {
        // 获取基础险种列表
        getQueryInfo() {
            let params = {
                pageNums: config.insurance.pageNums,
                refCode: config.insurance.insuranceType,
                isDeleted: '0'
            }
            api.ref.queryDictionaryDetails(params).then(res => {
                if (res.data.code === 'success') {
                    this.insuranceList = res.data.obj.list;
                }
            })
        },
        // 修改页面保存已经选中的险种并改变check状态
        add() {
            if (this.$route.params.id) {
                this.tableList.forEach((item, index) => {
                    for (let i = 0; i < this.insuranceList.length; i++) {
                        if (item.insTypeName === this.insuranceList[i].refDetailName) {
                            this.insuranceList[i].check = true;
                            this.insuranceList[i].disabled = true;
                        }
                    }
                })
            }
        },
        // 确定保存
        handleOk() {
            this.checkedList = [];
            for (let i = 0; i < this.insuranceList.length; i++) {
                if (this.insuranceList[i].check) {
                    this.checkedList.push(this.insuranceList[i])
                }
            }
            let nums = this.checkedList.length - this.tableList.length;
            // 拿code列表
            if( nums === 0) {
                return;
            }
            this.getInsTypeRefDetailCode(nums, (res) => {
                let params = [], insertList = [];
                for (let i = 0; i < this.insuranceList.length; i++) {
                    if (this.insuranceList[i].check && !this.insuranceList[i].disabled) {
                        insertList.push(this.insuranceList[i])
                    }
                }
                // 拿到一个新数组( check为true 并且 disabled 不为true )
                insertList.forEach((item, index) => {
                    let obj = {
                        "insTypeRefDetailCode": item.refDetailCode,
                        "coCode": this.$route.params.id || this.coCode,             // 保险公司code
                        "insTypeCode": res[index],                                 // 保险险种code
                        "insTypeName": item.refDetailName                         // 险种名称
                    }
                    params.push(obj)
                })
                // 新增
                this.insert(params, res => {
                    this.queryIsInsert()
                    for (let i = 0; i < this.insuranceList.length; i++) {
                        if (this.insuranceList[i].check) {
                            this.insuranceList[i].disabled = true
                        }
                    }
                }, () => {

                })
            })
        },
        // 批量拿到险种 列表唯一 code
        getInsTypeRefDetailCode(nums, callback) {
            let params = {
                getNums: nums,
                serviceCode: config.insurance.insCompTypecode
            };
            api.ordinalInfo.getSequenceList(params, (res) => {
                if (res.data.code === 'success') {
                    let obj = res.data.obj;
                    callback(obj)
                }
            })
        },
        // 新增
        insert(params, success, error = () => null) {
            api.insurance.insert(params).then(res => {
                if (res.data.code === 'success') {
                    Message({
                        type: 'success',
                        message: config.messInfo.success
                    });
                    let obj = res.data.obj;
                    success(obj)
                } else {
                    error()
                    Message({
                        type: 'error',
                        message: config.messInfo.fail
                    });
                }
            })
        },
        // 查询并展示tableList
        queryIsInsert(callback = () => { }) {
            let params = { coCode: this.$route.params.id || this.coCode };
            api.insurance.query(params).then(res => {
                if (res.data.code === 'success') {
                    this.tableList = res.data.obj;
                    callback()
                }
            })
        },
        // 删除
        deleted(value) {
            let params = [];
            let obj = this.tableList[value.index];
            params.push(obj);
            params[0].isDeleted = '1';
            this.insert(params, res => {
                this.queryIsInsert()
            })
        },
        // 删除弹出提示框
        remove(value) {
            const createElement = this.$createElement;
            MessageBox({
                title: '提示',
                message: createElement('p', null, [
                    createElement('span', null, '是否确定删除 '),
                    createElement('span', null, value.item.insTypeName)
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        for (let i = 0; i < this.insuranceList.length; i++) {
                            if (this.insuranceList[i].refDetailName === value.item.insTypeName) {
                                this.insuranceList[i].disabled = false;
                                this.insuranceList[i].check = undefined;
                            }
                        }
                        this.deleted(value)
                        done()
                    } else {
                        done();
                        return
                    }
                }
            }).then(action => {
                Message({
                    type: 'success',
                    message: config.messInfo.success
                });
            }).catch(() => {})
        }
    }
}
</script>
<style lang="scss" scoped>
.max-heigth {
    max-height: 300px;
    overflow-y: scroll;
}
</style>



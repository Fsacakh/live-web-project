<template>
<div class="row">
    <div class="col-md-5">
        <div class="card-header clear-border">
            <strong>{{waitTitle}}</strong>
        </div>
        <div class="table-box">
            <b-table striped hover bordered show-empty :items="waitList" :fields="waitFields">
                <template slot="checked" slot-scope="data">
                    <el-checkbox v-model="waitList[data.index].checked"></el-checkbox>
                </template>
                <template slot="index" slot-scope="data">{{data.index + 1}}</template>
                <template slot="empty">暂无数据</template>
            </b-table>
        </div>
    </div>
    <div class="col-md-1 center">
        <div>
        <b-button class="margin-bottom" size="sm" variant="primary" @click="top">上</b-button>
        <b-button class="margin-bottom" size="sm" variant="primary" @click="right">右</b-button>
        <b-button class="margin-bottom" size="sm" variant="primary" @click="left">左</b-button>
        <b-button class="margin-bottom" size="sm" variant="primary" @click="bottom">下</b-button>
        </div>
    </div>
    <div class="col-md-5">
        <div class="card-header clear-border">
            <strong>{{alreadyTitle}}</strong>
        </div>
        <div class="table-box">
            <b-table striped hover bordered show-empty :items="alreadyList" :fields="alreadyFields">
                <template slot="checked" slot-scope="data">
                    <el-checkbox v-model="alreadyList[data.index].checked"></el-checkbox>
                </template>
                <template slot="index" slot-scope="data">{{data.index + 1}}</template>
                <template slot="empty">暂无数据</template>
            </b-table>
        </div>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
import {Checkbox} from 'element-ui'
Vue.use(Checkbox)
export default {
    props: {
        waitTitle: {
            type: String,
            default: '销售顾问'
        },
        alreadyTitle: {
            type: String,
            default: '值班销售顾问'
        },
        waitList: {
            type: Array,
            default() {
                return [
                    {checked: false, scName: '李小龙', mobilePhone: '13825567364'},
                    {checked: false, scName: '李小龙', mobilePhone: '13825567364'},
                    {checked: false, scName: '李小龙', mobilePhone: '13825567364'},
                    {checked: false, scName: '李小龙', mobilePhone: '13825567364'},
                    {checked: false, scName: '李小龙', mobilePhone: '13825567364'}
                ]
            }
        },
        alreadyList: {
            type: Array
        },
    },
    data() {
        return {
            waitFields: {
                checked: {
                    label: ''
                },
                index: {
                    label: '序号'
                },
                scName: {
                    label: '销售顾问'
                },
                mobilePhone: {
                    label: '电话号码'
                }
            },
            alreadyFields: {
                checked: {
                    label: ''
                },
                index: {
                    label: '序号'
                },
                scName: {
                    label: '销售顾问'
                },
                mobilePhone: {
                    label: '电话号码'
                }
            }
        }
    },
    methods: {
        top() {},
        right() {
            for(let i = 0; i<this.waitList.length; i++) {

            }
        },
        left() {},
        bottom() {}
    }
}
</script>
<style scoped>
.center {
    display: flex;
    align-items: center
}
.margin-bottom {
    margin-bottom: 6px;
}
.clear-border {
    border-top: 1px solid #c2cfd6;
    border-left: 1px solid #c2cfd6;
    border-right: 1px solid #c2cfd6;
    border-bottom: none !important;
}
/* 暂时无用 */
.padding-top-none > .card-body {
    padding-top: 0 !important;
    /* min-height: 300px;
    max-height: 300px; */
    height: 300px;
    overflow-y: scroll;
}
.table-box {
    border: 1px solid #c2cfd6;
    height: 330px;
    overflow-y: scroll;
}
</style>

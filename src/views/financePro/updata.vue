<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-md-12">
                <!-- <b-card class="mb-2">
            <div slot="header">
                <strong>主档信息</strong>
            </div>
            <div class="my-1 row">
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="产品编码" :label-cols="4" class="text-right">
                    <b-form-input />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="产品名称" :label-cols="4" class="text-right">
                    <b-form-input />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="金融机构" :label-cols="4" class="text-right">
                        <b-form-select  :options="typeOptions">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="产品类型" :label-cols="4" class="text-right">
                        <b-form-select  :options="typeOptions">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="产品有效时间" label-text-align="right" :label-cols="4">
                        <vue-date></vue-date>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="到" label-text-align="center" :label-cols="4">
                        <vue-date></vue-date>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6">
                    <b-form-fieldset horizontal label="贷款类型" :label-cols="4" class="text-right">
                        <b-form-select  :options="typeOptions">
                        </b-form-select>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 text-right">
                    <b-button size="sm" variant="primary" @click="setUpdata">编辑</b-button>
                    <router-link to="/financePro/financePro">
                        <b-button type="reset" size="sm">取消</b-button>
                    </router-link>
                </div>
            </div>
           </b-card>
           <b-card class="mb-2">
            <div slot="header">
                <strong>附加字段信息</strong>
            </div>
            <b-tabs pills>
                <b-tab title="使用范围" active></b-tab>
                <b-tab title="产品方案"></b-tab>            
            </b-tabs>
           </b-card>    -->

                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                <mtree></mtree>         
            </div>
        </div>
    </div>
</template>
<script>

import Vue from 'vue'
import VueDate from 'vue-date'
import { Tree } from 'element-ui'
import Mtree from './tree'
Vue.use(Tree)

export default {
    components: {
        VueDate,
        Mtree
    },
    data() {
        return {
            typeOptions: [
                {
                    value: 'a',
                    text: '集团金融'
                },
                {
                    value: 'b',
                    text: '厂家金融'
                },
                {
                    value: 'c',
                    text: '经销商金融'
                }
            ],

            data: [{
                label: '一级 1',
                children: [{
                    label: '二级 1-1',
                    children: [{
                        label: '三级 1-1-1'
                    }]
                }]
            }, {
                label: '一级 2',
                children: [{
                    label: '二级 2-1',
                    children: [{
                        label: '三级 2-1-1'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                }]
            }, {
                label: '一级 3',
                children: [{
                    label: '二级 3-1',
                    children: [{
                        label: '三级 3-1-1'
                    }]
                }, {
                    label: '二级 3-2',
                    children: [{
                        label: '三级 3-2-1'
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        setUpdata() {

        },
        handleNodeClick(data) {
            console.log(data);
        }
    }
}
</script>
<style>

</style>
<template>
    <div class="animated fadeIn">
        <b-tabs ref="tabs">
            <b-tab title="菜单" active>
                <b-card class="mb-2">
                    <b-form>
                        <b-form-group>
                            <b-form-fieldset horizontal label="菜单编号:" :label-cols="4" class="col-5 pull-left">
                                <b-form-input v-model="menu.menuCode" />
                            </b-form-fieldset>
                            <b-form-fieldset horizontal label="菜单名称:" :label-cols="4" class="col-5 pull-left">
                                <b-form-input v-model="menu.menuName" />
                            </b-form-fieldset>
                            <b-form-fieldset horizontal label="菜单路径：" :label-cols="4" class="col-5 pull-left">
                                <b-form-input v-model="menu.menuPath" />
                            </b-form-fieldset>
                            <b-form-fieldset horizontal label="备注：" :label-cols="4" class="col-5 pull-left">
                                <b-form-input v-model="menu.remark" />
                            </b-form-fieldset>
                        </b-form-group>
                    </b-form>
                    <div class="pull-right">
                        <b-button>重置</b-button>
                        <b-button variant="primary" @click="search">查询</b-button>
                    </div>
                </b-card>
                <b-card-body>
                    <b-button variant="primary" @click="setAddModal">新增菜单</b-button>
                    <b-table striped hover bordered :items="list" :fields="fields" style="margin-top: 10px">
                        <template slot="selectRow" slot-scope="data">
                            <input type="radio" name="selectRow" :value="data.index" v-model="selectedRow"/>
                        </template>
                        <template slot="name" slot-scope="data">
                            <a href="#" @click.prevent="_showUpdata(data.item.name)">{{data.item.name}}</a>
                        </template>
                        <template slot="operation" slot-scope="row">
                           <b-btn size="sm" variant="primary" @click.stop="details(row.item,row.index,$event.target)">
                             停用
                           </b-btn>
                        </template>
                    </b-table>
                    <div>
                        <span>{{ totals }}</span>
                    </div>
                    <b-modal v-model="showAddModal"
                       :no-fade="true"
                       :no-close-on-backdrop="true"
                       :hide-header-close="true"
                       class="modal-primary"
                       ref="modal1"
                       title="Live"
                       ok-title="是"
                       close-title="否"
                       @ok="setAddModal"
                       @cancel="setAddModal">
                       <i class="fa fa-warning fa-lg mt-6 pull-left" style="color: red; font-size: 48px"></i>
                       <h4>新增菜单</h4>
                    </b-modal>
                </b-card-body>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        data() {
            return {
                selectedRow: 0,
                menu: {
                    fatherMenuCode: '',
                    menuCode: '',
                    releationCodeList: '',
                    menuName: '',
                    menuPath: '',
                    needLogin: '0',
                    isDisplay: 1,
                    buttonType: '',
                    remark: '',
                    pageNums: 15,
                    pageStart: 1
                },
                items: [{
                        name: '中国银行(南京分行)',
                        type: '集团金融',
                        range: '全国',
                        lease: '是',
                        discount: '否',
                        cost: '是',
                        status: '启用',
                        operation: ''
                    },
                    {
                        name: '利星行金融',
                        type: '集团金融',
                        range: '全国',
                        lease: '是',
                        discount: '否',
                        cost: '是',
                        status: '启用',
                        operation: ''
                    },
                    {
                        name: '中国银行(南京分行)',
                        type: '集团金融',
                        range: '全国',
                        lease: '是',
                        discount: '否',
                        cost: '是',
                        status: '启用',
                        operation: ''
                    },
                    {
                        name: '大昌行金融',
                        type: '集团金融',
                        range: '全国',
                        lease: '是',
                        discount: '否',
                        cost: '是',
                        status: '启用',
                        operation: ''
                    },
                    {
                        name: '中国银行(南京分行)',
                        type: '集团金融',
                        range: '全国',
                        lease: '是',
                        discount: '否',
                        cost: '是',
                        status: '启用',
                        operation: ''
                    },
                    {
                        name: '这个行金融',
                        type: '集团金融',
                        range: '全国',
                        lease: '是',
                        discount: '否',
                        cost: '是',
                        status: '启用',
                        operation: ''
                    },
                    {
                        name: '中国银行(南京分行)',
                        type: '集团金融',
                        range: '全国',
                        lease: '是',
                        discount: '否',
                        cost: '是',
                        status: '启用',
                        operation: ''
                    },
                    {
                        name: '那个行金融',
                        type: '集团金融',
                        range: '全国',
                        lease: '是',
                        discount: '否',
                        cost: '是',
                        status: '启用',
                        operation: ''
                    }
                ],
                fields: {
                    selectRow: {
                        label: '选择'
                    },
                    menuCode: {
                        label: '菜单编号'
                    },
                    menuName: {
                        label: '菜单名称'
                    },
                    menuPath: {
                        label: '菜单路径'
                    },
                    needLogin: {
                        label: '是否需要登录'
                    },
                    isDisplay: {
                        label: '是否可见'
                    },
                    isDeleted: {
                        label: '是否可用'
                    },
                    remark: {
                        label: '备注'
                    }
                }
            }
        },
        computed: {
            ...mapState('menu', [
                'list',
                'showAddModal'
            ]),
            ...mapGetters('menu', [
                'totals'
            ])
        },
        methods: {
            search() {
                this.$store.dispatch('menu/getMenus', this.$data.menu)
            },
            ...mapActions('menu', [
                'setAddModal',
                'setUpdateModal'
            ]),
            handleOk() {
                // 确定操作
            },
            cancel() {
                // 取消操作
            }
        }
    }
</script>

<style>

</style>

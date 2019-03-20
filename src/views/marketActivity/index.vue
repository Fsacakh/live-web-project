<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="活动代码" label-text-align="right" :label-cols="4">
                        <b-form-input v-model="market.maCode" placeholder="" />
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="活动名称" label-text-align="right" :label-cols="4">
                        <b-form-input v-model="market.maName" placeholder="" />
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="区域" label-text-align="right" :label-cols="4">
                        <treepicker :clearButton="true" :options="options" placeholder="选择区域" @data-change="handleDataChange" @item-click="handleClose"></treepicker>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="经销商店" label-text-align="right" :label-cols="4">
                        <b-form-select :options="carOptions" pull-left/>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="活动类型" label-text-align="right" :label-cols="4">
                        <b-form-select :options="storeOptions" v-model="market.maType"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="开始时间" label-text-align="right" :label-cols="4">
                        <vue-date v-model="market.startTime"></vue-date>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-lg-6">
                    <b-form-fieldset horizontal label="结束时间" label-text-align="right" :label-cols="4">
                        <vue-date v-model="market.endTime" ref="trigger"></vue-date>
                    </b-form-fieldset>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="pull-right">
                        <b-button size="sm">重置</b-button>
                        <b-button size="sm" variant="primary" @click="search">查询</b-button>
                    </div>
                </div>
            </div>
        </b-card>
        <b-card class="mb-4">
            <div class="row mb-2">
                <div class="col-md-12">
                    <div class="pull-left">
                        <router-link to="/marketActivity/addMarketActivity">
                            <b-button size="sm" variant="success">新增</b-button>
                        </router-link>    
                    </div>
                </div>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered :items="list" :fields="fields">
                    <template slot="index" slot-scope="data">
                        {{ data.index + 1 }}
                    </template>
                    <template slot="maCode" slot-scope="data">
                        <router-link to="/jquery">{{ data.item.maCode }}</router-link>
                        <!-- {{ data.item.maCode }} -->
                    </template>
                    <template slot="onOffFlag" slot-scope="data">
                        {{ data.onOffFlag }}
                        <b-button v-if="data.item.onOffFlag === 0" variant="success" @click="showTips(data.item.maCode)">启用</b-button>
                        <b-button v-if="data.item.onOffFlag === 1" variant="danger" @click="showTips(data.item.maCode)">停用</b-button>
                    </template>    
                </b-table>
                
                <!-- <b-modal ref="makeSure"
                        class="modal-primary"
                        title="LIVE"
                        ok-title="确定"
                        cancel-title="取消"
                        @ok="handleOk"
                        @close="handleClose">
                    <i class="fa fa-warning fa-lg mt-6 pull-left icon-style"></i>
                    <h4>是否确认{{ isDeleted ? '启用' : '禁用' }} : {{ judgeName }}</h4>
                </b-modal> -->
            </div>
            <p v-if="!list.length">暂无数据...</p>
            <!-- <b-table>
                <tr v-if="!list.length">
                    <td>暂无数据...</td>
                </tr>
            </b-table> -->
            <div class="row mt-2">
               <div class="col-md-12">
                 <pagination class="pull-right" @page-change="pageChange" :page-no="pager.pageNo" :page-size="pager.pageSize" :total-result="pager.total">
                 </pagination>
               </div>
            </div>
        </b-card>
    </div>
</template>

<script>
    import Vue from 'vue'

    import config  from '../../common/config'

    import VueDate from 'vue-date'

    import pagination from '../../components/pagination/pagination'

    import treepicker from '../../components/treepicker/treepicker'
    // 按需引入element组件
    import { MessageBox, Message } from 'element-ui'

    import {
        mapState,
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        data() {
            return {
                pageOptions: [12354645654645, 321, 213],
                carOptions: ['东方奥迪', '海南奥迪', '重庆奥迪', '江苏奥迪', '北京奥迪', '华晨奥迪', '中华人民共和国奥迪'],
                storeOptions: ['厂家活动', '区域活动', '官方活动'],
                // isDeleted: '',
                judgeName: '',
                // 暂无数据参数
                hasData: true,
                // 请求数据参数
                market: {
                    maCode: '',
                    maName: '',
                    maType: '',
                    startTime: '',
                    endTime: '',
                    pageNums: config.pageNums,
                    pageStart: 1,
                    chinaAareaCodes: [],
                    salesAreaCodes: [],
                    storeCodes: []
                },
                //
                fields: {
                    index: {
                        label: '序号'
                    },
                    maCode: {
                        label: '活动编码'
                    },
                    maName: {
                        label: '活动名称'
                    },
                    maType: {
                        label: '活动类型'
                    },
                    activeBelong: {
                        label: '所属门店'
                    },
                    activeCar: {
                        label: '使用车系'
                    },
                    startTime: {
                        label: '开始时间'
                    },
                    endTime: {
                        label: '结束时间'
                    },
                    activeState: {
                        label: '活动状态'
                    },
                    onOffFlag: {
                        label: '操作'
                    }
                },
                // 区域和经销商店联动效果数据
                options: {
                    treeData: [],
                    treeProps: {
                       label: 'name',
                       children: 'zones'
                    },
                    loadNode: this.loadChildren
                },
                areaChoose: ''                                
            }
        },
        computed: {
           ...mapState('marketActivity', [
               'list',
               'pager',
               'listlength'
           ])
        },
        methods: {
            pageChange: function(num, pageSize) {
                this.$data.market.pageStart = num
                this.search()
            },
            search: function() {
            // 此处的this.$data可以把$data省略，加上$data只是更加严谨
                this.$store.dispatch('market/getMarkets', this.$data.market)
            },
            print() {
                // console.log(1)
            },
            // 显示模态框事件
            // showModal(obj) {
            //     this.$refs.makeSure.show()
            //     // console.log(obj)
            //     this.isDeleted = obj.isDeleted
            //     this.judgeName = obj.maName
            //     // console.log(this.isDeleted)
            // },
            triggerTime() {
                alert(1 )
            },
            // 区域和经销商店联动所需方法
            loadChildren(node, resolve) {
                if (node.level === 0) {
                    return resolve([{
                        name: '华南'
                    }, {
                        name: '华北'
                    }]);
                }
                if (node.level > 3) return resolve([]);
                var hasChild;
                if (node.data.name === '华南') {
                    hasChild = 1;
                } else if (node.data.name === '华北') {
                    hasChild = 2;
                } 
                // 此处判断感觉有逻辑问题 所以先注释掉
                // else {
                //     hasChild = Math.random() > 0.5;
                // }
                setTimeout(() => {
                    var data;
                    if (hasChild === 1) {
                        data = [{
                            name: '华南'+'一区'
                        }, {
                            name: '华南'+'二区'
                        }];
                    } else if(hasChild === 2){
                        data = [{
                            name: '华北'+'一区'
                        }, {
                            name: '华北'+'二区'
                        }];
                    } else {
                        data=[]
                    }
                    resolve(data);
                }, 0);
            },
            handleDataChange(data, checked, indeterminate) {
                // console.log( data + ' ' + checked + ' ' + indeterminate)
                // console.log(1)
                if(data.name === '华南一区') {
                    
                    this.carOptions = ['海南奥迪', '重庆奥迪', '江苏奥迪', '北京奥迪','中华人民共和国奥迪']
                }else if(data.name === '华南二区') {
                    this.carOptions = ['东方奥迪', '重庆奥迪',  '北京奥迪', '华晨奥迪', '中华人民共和国奥迪']
                }else if(data.name === '华北一区') {
                    this.carOptions = ['东方奥迪', '海南奥迪',  '江苏奥迪', '北京奥迪',  '中华人民共和国奥迪']
                }else if(data.name === '华北二区') {
                    this.carOptions = ['海南奥迪',  '江苏奥迪', '北京奥迪', '华晨奥迪', '中华人民共和国奥迪']
                }else if(data.name === '华南') {
                    this.carOptions = ['东方奥迪', '海南奥迪', '重庆奥迪', '江苏奥迪', '北京奥迪', '华晨奥迪', '中华人民共和国奥迪']
                }else if(data.name === '华北') {
                    this.carOptions = ['东方奥迪', '海南奥迪', '重庆奥迪', '江苏奥迪', '北京奥迪', '华晨奥迪', '中华人民共和国奥迪']
                }
                console.log(this.areaChoose)
            },
            handleClose() {
                this.close()
            },
            showTips(arg) {
                // console.log(arg)
                console.log(this.list.length)
                // 定义一个用于创建元素的h方法
                const h = this.$createElement;
                // MessageBox 和 Message 都是全局方法  所以直接调用
                MessageBox({
                    title: '提示',
                    // 具体消息提示是由定义的h方法 创建标签 添加进去的
                    message: h('p', null, [
                            h('span', null, '确定 '),
                            h('i', { style: 'color: teal' }, 'VNode')
                        ]),
                    // showCanceButton 值为false 取消不显示  值为true 取消显示
                    showCancelButton: true,
                    // 确定按钮的信息
                    confirmButtonText: '确定',
                    // 取消按钮的信息
                    cancelButtonText: '取消',
                    // 提示框关闭之前执行
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                // done方法不调用  提示框不消失
                                done();
                                setTimeout(() => {
                                instance.confirmButtonLoading = false;
                                }, 300);
                            }, 3000);
                        } else {
                            done();
                            return
                        }
                    }
                }).then(action => {// action方法是提示框关闭后的提示消息
                        // 直接调用Message 设置提示框操作完成后的提示消息
                    Message({
                        type: 'info',
                        message: '操作已完成'
                    });
                })
            }
        },
        watch: {
            'market.startTime': 'triggerTime'
        },
        components: {
            VueDate,
            pagination,
            treepicker
        }
    }
</script>

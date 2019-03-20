<template>
    <div class="animated fadeIn">
        <b-card header="查询">
            <div class="row">
                <div class="col-md-6" v-if="lei=='gp'">
                    <b-form-fieldset horizontal label="类型" label-text-align="right" :label-cols="4">
                        <b-form-select :options="types" v-model="query.gpDetailTypeCode"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6" v-if="lei!='gp'">
                    <b-form-fieldset horizontal label="类型" label-text-align="right" :label-cols="4">
                        <b-form-select :options="types" v-model="query.snpDetailTypeCode"/>
                    </b-form-fieldset>
                </div>
                <div class="col-md-6 text-right">
                    <b-button variant="primary" size="" type="button" @click="queryGPdetailInfo()">查询</b-button>
                </div>
            </div>
        </b-card>
        <b-card>
            <div class="row">
                <div class="col-md-6">
                        <b-button variant="success" size="sm" type="button" @click="showModal('add')">新增</b-button>
                        <b-button variant="primary" size="sm" type="button" @click="showModal('edit')">编辑</b-button>
                        <b-button variant="danger" size="sm" type="button" @click="deletedGP()">删除</b-button>
                </div>
                <div class="col-md-6">
                    <div class="pull-right">
                        <b-button size="sm" variant="warning" @click="initRedis">同步数据</b-button>
                    </div>
                </div>
            </div>
            <div class="table-scrollable">
                <b-table striped hover bordered show-empty :items="tableList" :fields="lei=='gp'?gpfields:snpfields">
                    <template slot="checkbox" slot-scope="data" class="text-center">
                        <input type="radio" name="models" v-model="optfor" :value="data.item">
                    </template>
                    <template slot="index" slot-scope="data">
                        {{ data.index + (pager.pageNo - 1)* pager.pageSize + 1 }}
                    </template>
                    <template slot="empty">
                            暂无数据...
                    </template>
                </b-table>
            </div>
            <pagination class="pull-right"
                        @page-change="pageChange"
                        :page-no="pager.pageNo"
                        :page-size="pager.pageSize"
                        :total-result="pager.total"
                        :total-pages="pager.totalPages">
            </pagination>
        </b-card>
        <b-modal id="setbelonging" ref="setbelonging" :title="'设置SNP归属'" ok-title="确定" cancel-title="取消" hide-footer>
            <div class="col-md-10">
                <b-form-fieldset horizontal label="明细" label-text-align="right" :label-cols="4">
                        <!-- <b-form-select :options="detailSelect" v-model="editdata.detailInfo"/> -->
                        <div v-if="type=='add'">
                            <select class="form-control" v-model="detailInfo">
                                <option v-for="(item, index) in selectInfo" :value="item" :key="index">{{item.text}}</option>
                            </select>
                        </div>
                        <div  v-if="type=='edit'">
                            <input class="form-control" type="text" :value="lei=='gp'?optfor.businessName:optfor.realBusinessName" readonly>
                        </div>
                </b-form-fieldset>
            </div>
            <div class="col-md-10">
                <b-form-fieldset horizontal :label="lei=='gp'?'GP归属':'SNP归属'" label-text-align="right" :label-cols="4">
                        <select class="form-control" v-model="GPInfo">
                            <option v-for="(item, index) in gpDetail" :value="item" :key="index">{{item.text}}</option>
                        </select>
                </b-form-fieldset>
            </div>
            <div class="col-md-12 mb-3 text-right">
                <b-button @click="hide">取消</b-button>
                <b-button variant="primary" @click="submit()">确定</b-button>
            </div>
        </b-modal>
    </div>
</template>
<script>
    import { mapState } from "vuex";
    import { MessageBox, Message } from 'element-ui'
    import config from 'common/config'
    import api from 'common/api'
    import Pagination from 'components/pagination/pagination'
    export default {
        components: {
            Pagination,
        },
        data() {
            return {
                lei: '',
                type: '',
                optfor: '',
                query: {
                    snpDetailTypeCode: config.gpType[0].value,
                    pageNums: config.pageNums,
                    pageStart: 1
                },
                types: config.gpType,
                tableList: [],
                selectInfo: [],
                detailInfo: '',
                GPInfo: '',
                gpfields: {
                    checkbox: {
                        label: '   '
                    },
                    index: {
                        label: '序号'
                    },
                    businessCode: {
                        label: '明细编码'
                    },
                    businessName: {
                        label: '明细名称'
                    },
                    remark: {
                        label: '明细备注'
                    },
                    gpConverName: {
                        label: 'GP归属'
                    }
                },
                snpfields: {
                    checkbox: {
                        label: '   '
                    },
                    index: {
                        label: '序号'
                    },
                    realBusinessCode: {
                        label: '明细编码'
                    },
                    realBusinessName: {
                        label: '明细名称'
                    },
                    remark: {
                        label: '明细备注'
                    },
                    snpConverName: {
                        label: 'SNP归属'
                    }
                },
                pager: {
                    pageNo: 1,
                    pageSize: 15,
                    total: 1,
                    totalPages: 1
                },
                // pathURL: location.pathname
            }
        },
        computed: {
            ...mapState("financing", [
                "gpDetail",
                "gpbelongingCode",
                'detailSelect'
            ]),
        },
        created() {
            this.getgptype()
            // this.queryGPdetailInfo()
        },
        mounted() {},
        methods: {
            getgptype: function () {
                let pathUrl = location.pathname
                var index = pathUrl .lastIndexOf("\/");
                pathUrl  = pathUrl .substring(index + 1, pathUrl.length)
                this.lei = pathUrl
            },
            initRedis() {
                api.SNPbelonging.initRedis((res) => {
                    if(res.data.code === 'success') {
                        Message({
                            type: 'success',
                            message: '数据同步成功'
                        })
                    }
                })
            },
            showModal: function (type) {
                const $this = this;
                $this.type = type
                if (type === 'edit') {
                    if(!$this.optfor) {
                        Message({
                            type: 'info',
                            message: config.messInfo.select
                        });
                    } else {
                        $this.getGPdetail()
                    }
                } else {
                    this.queryGPdetailInfo()
                    let refCode = $this.lei == 'gp'?$this.query.gpDetailTypeCode:$this.query.snpDetailTypeCode
                    let serviceCode = $this.lei == 'gp'?config.financing.gpbelonging:config.financing.snpbelonging
                    this.$store.dispatch('financing/getCode', {
                        poros: {serviceCode: serviceCode},
                        callBack: function(msg) {
                            if (msg.data.code == "success") {
                                $this.$store.dispatch("financing/getType", {
                                    poros: { refCode: refCode },
                                    callBack: function(msg) {
                                        if (msg.data.code == "success") {
                                            $this.selectInfo = [];
                                            let temp = [];
                                            let temp2 = [];
                                            $this.tableList.forEach(function(value, index) {
                                                if($this.lei == 'gp') {
                                                    temp[value.businessCode] = true;
                                                } else {
                                                    temp[value.realBusinessCode] = true;
                                                }
                                            });
                                            $this.detailSelect.forEach(function(value, index) {
                                                if(!temp[value.value]) {
                                                    $this.selectInfo.push(value)
                                                }
                                            })
                                            $this.getGPdetail()
                                        }
                                    }
                                });
                            }
                        }
                    })
                }
            },
            //查询GP配置明细
            queryGPdetailInfo: function() {
                const $this = this
                let url;

                url = api['SNPbelonging'].queryDetail
                url($this.query, (res) => {
                    if(res.data.code == "success") {
                        $this.tableList = res.data.obj.list
                        $this.pager.pageNo = res.data.obj.pageNum
                        $this.pager.totalPages = res.data.obj.pages
                        $this.pager.pageSize = res.data.obj.pageSize
                        $this.pager.total = res.data.obj.total
                    }
                })
            },
            //新增GP设置明细
            addgpbelonging: function () {
                const $this = this
                let url;
                let params;
                if(this.lei == 'gp') {
                    url = api['GPbelonging'].addDetail
                    params = {
                        gpConfigDetailCode: $this.gpbelongingCode,
                        gpConfigCode: 'GPCONFIGBASE',
                        gpDetailTypeCode: $this.query.gpDetailTypeCode,
                        businessCode: $this.detailInfo.value,
                        businessName: $this.detailInfo.text,
                        gpConverCode: $this.GPInfo.value,
                        gpConverName: $this.GPInfo.text
                    }
                } else {
                    url = api['SNPbelonging'].addDetail
                    params = {
                        snpConfigDetailCode: $this.gpbelongingCode,
                        snpConfigCode: 'SNPCONFIGBASE',
                        snpDetailTypeCode: $this.query.snpDetailTypeCode,
                        realBusinessCode: $this.detailInfo.value,
                        realBusinessName: $this.detailInfo.text,
                        snpConverCode: $this.GPInfo.value,
                        snpConverName: $this.GPInfo.text
                    }
                }
                if (!params.realBusinessCode) {
                    Message({
                        type: "info",
                        message: '明细不能为空'
                    });
                    return
                }
                if (!params.snpConverCode) {
                    Message({
                        type: "info",
                        message: 'SNP归属不能为空'
                    });
                    return
                }
                url(params, (res) => {
                    if(res.data.code == "success") {
                        $this.queryGPdetailInfo()
                        $this.detailInfo = ''
                        $this.GPInfo = ''
                        Message({
                            type: 'info',
                            message: config.messInfo.success
                        });
                        $this.$refs.setbelonging.hide()
                    }
                })
            },
            //编辑GP设置
            editgpdelonging: function (status) {
                const $this = this
                // let params = [];
                let params = JSON.parse(JSON.stringify($this.optfor));
                let url;
                if(status == 'edit') {
                    if ($this.lei == 'gp') {
                        url = api['GPbelonging'].editDetail
                        params.businessCode = this.detailInfo.value
                        params.businessName = this.detailInfo.text
                        params.gpConverCode = this.GPInfo.value
                        params.gpConverName = this.GPInfo.text
                        // params = params
                    } else {
                        url = api['SNPbelonging'].editDetail
                        params.realBusinessCode = this.detailInfo.value
                        params.realBusinessName = this.detailInfo.text
                        params.snpConverCode = this.GPInfo.value
                        params.snpConverName = this.GPInfo.text
                        // params.push(optfor)
                    }
                    // params.push(optfor)
                } else {
                    params.isDeleted = '1'
                    if($this.lei == 'gp') {
                        url = api['GPbelonging'].editDetail
                        // params = optfor
                    } else {
                        url = api['SNPbelonging'].editDetail
                        // params.push(optfor)
                    }
                }
                // if (!params.businessCode) {
                //     Message({
                //         type: "info",
                //         message: '明细不能为空'
                //     });
                //     return
                // }
                if (!params.snpConverCode) {
                    Message({
                        type: "info",
                        message: 'SNP归属不能为空'
                    });
                    return
                }
                url(params, (res) => {
                    if(res.data.code == "success") {
                        $this.detailInfo = ''
                        $this.GPInfo = ''
                        $this.queryGPdetailInfo()
                        Message({
                            type: 'info',
                            message: config.messInfo.success
                        });
                        $this.$refs.setbelonging.hide()
                    }
                })
            },
            deletedGP: function () {
                const $this =this
                MessageBox.confirm('确定删除所选内容', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            $this.editgpdelonging('deleted')
                            done();
                        } else {
                            done();
                            return
                        }
                    }
                })
            },
            //获取GP配置明细
            getGPdetail: function() {
                const $this = this
                let refCode = $this.lei=='gp'?config.financing.getGPdetail:config.financing.getSNPdetail
                $this.$store.dispatch("financing/getType", {
                        poros: { refCode: refCode },
                        callBack: function(msg) {
                            if (msg.data.code == "success") {
                                $this.$refs.setbelonging.show();
                            }
                        }
                    });

            },
            pageChange(page) {
                this.query.pageStart = page
                this.queryGPdetailInfo()
            },
            hide() {
                this.$refs.setbelonging.hide()
            },
            submit() {
                const $this = this
                if(this.type == 'add') {
                    $this.addgpbelonging()
                } else {
                    $this.editgpdelonging('edit')
                }
            },
        },
    }
</script>
<style lang="css">
</style>

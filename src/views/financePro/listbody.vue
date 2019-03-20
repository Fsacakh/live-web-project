<template>
<div>
<b-card>
    <div class="row">
    <div class="col-md-12">
        <b-button size="sm" variant="success" @click="addFinancrPro">新增金融产品</b-button>
    </div>
    </div>
    <div class="table-scrollable mb-2">
        <b-table striped hover bordered show-empty :items="obj.list" :fields="fields">
            <template slot="index" slot-scope="data">{{data.index + 1 + ((obj.pageNum - 1) * obj.pageSize)}}</template>
            <template slot="financeName" slot-scope="data">
                <a href="javascript:;" @click.prevent="editFinancePro(data.item.id)">{{data.item.financeName}}</a>
            </template>
            <template slot="orang" slot-scope="data">
                {{ (data.item.financeUseRangeInfos != null && data.item.financeUseRangeInfos.length > 0)  ? (data.item.financeUseRangeInfos[0].salesAreaName == null ? data.item.financeUseRangeInfos[0].storeName : data.item.financeUseRangeInfos[0].salesAreaName) : ''}}
            </template>     
            <template slot="onOffFlag" slot-scope="row">{{row.value ? '下架' : '上架'}}</template>
            <template slot="effectStarttime" slot-scope="row">{{ row.value | dateSlice }}</template>
            <template slot="effectEndtime" slot-scope="row">{{ row.value | dateSlice }}</template>
            <template slot="operation" slot-scope="data">
                <b-button type="text" :variant="data.item.onOffFlag ? 'success' : 'danger'" size="sm" @click="changeFalg(data.item)">
                    {{ data.item.onOffFlag ? '上架' : '下架' }}
                </b-button>
            </template>
            <template slot="empty">暂无数据</template>
        </b-table>
    </div>
    <div class="row mt-2">
        <div class="col-md-12">
            <pagination class="pull-right"
                @page-change="pageChange"
                :page-no="obj.pageNum"
                :page-size="obj.pageSize"
                :total-pages="obj.pages"
                :total-result="obj.total">
            </pagination>
        </div>
    </div>
</b-card>
</div>
</template>
<script>
import Vue from 'vue'
import Pagination from 'components/pagination/pagination'
import { MessageBox, Message } from 'element-ui'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import config from 'common/config'
import Api from 'common/api'

export default {
   components: {
     Pagination
   },
   props: {
      toListbody: [Object]
   },
   data() {
     return {
         fields: {
            index: {
            label: '序号'
            },
            financeCode: {
            label: '金融产品编码'
            },
            financeName: {
            label: '金融产品名称'
            },
            financeOrgCodeName: {
            label: '金融机构'
            },
            financeTypeName: {
            label: '产品类型'
            },
            orang: {
            label: '适用范围'
            },
            effectStarttime: {
            label: '生效日期'
            },
            effectEndtime: {
            label: '终止日期'
            },
            onOffFlag: {
            label: '产品状态'
            },
            operation: {
            label: '操作'
            }
         },
     }
   },
   computed: {
      ...mapGetters('financePro', [
          'obj'
      ])
   },
   methods: {
       addFinancrPro() {
           this.resetFinancePro()
           this.$router.push({
                path: `/financePro/add`
           })
       },
       editFinancePro(id) {
            this.$router.push({
                path: `/financePro/edit/${id}`
            })
       },
       // 查询的参数最好不要放在vuex中，分页需要修改pageStart，会报错
       // 解决方案：参数通过props和$emit来传递
       pageChange(start) {
            this.toListbody.pageStart = start
            this.getObj(this.toListbody)
       },
       _updata(flag, callBack) {
            this.modalDetails.onOffFlag = flag;
            let params = this.modalDetails;
            Api.financePro.insertOrUpdata(params).then( res => {
                // if(res.data.code === 'success') {
                    callBack()
                // }
            });
       },
       changeFalg(item) {
            this.modalDetails = item;
            this.modalDetails.orgInfo = `${item.financeOrgCode};${item.financeChannel};${item.leaseFlag};${item.interestSubsidyFlag}`;
            const createElement = this.$createElement;
            MessageBox({
                title: '提示',
                message: createElement('p', null, [
                        createElement('span', null, '是否确定'),
                        createElement('span', null, item.onOffFlag ? '上架' : '下架'),
                        createElement('span', null, item.financeName)
                    ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        if(item.onOffFlag == 0) {
                            this._updata('1', () => {
                                done();
                                instance.confirmButtonLoading = false;
                                this.getObj(this.toListbody)
                            })
                        }else if(item.onOffFlag == 1) {
                            this._updata('0', () => {
                                done();
                                instance.confirmButtonLoading = false;
                                this.getObj(this.toListbody)
                            })
                        }else {
                            done();
                            instance.confirmButtonLoading = false;
                        }

                    } else {
                        done();
                        return
                    }
                }
            }).then( action => {
                Message({
                    type: 'success',
                    message: config.messInfo.success
                });
            }).catch(() => {})
       },
       ...mapActions('financePro',[
           'getObj',
           'resetFinancePro'
       ])
   }
}
</script>
<style>

</style>

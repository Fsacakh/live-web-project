<template>
  <div>
    <div class="row">
      <div class="col-md-12" style="overflow: auto;">
        <table class="grossTable">
          <!-- 表头 -->
          <tr>
            <th></th>
            <th :colspan="stockManage.length + 2">库存管理</th>
            <th :colspan="funnelManage.length">漏斗管理</th>
            <th :colspan="carMaoRiManage.length">新车毛利管理</th>
            <th :colspan="businessManage.length">衍生业务管理</th>
            <th :colspan="comprehensiveMaoRi.length">综合毛利</th>
          </tr>
          <!-- 表头 -->
          <tr>
            <th rowspan="2">品牌</th>
            <th rowspan="2">车系</th>
            <th rowspan="2">车型</th>
            <th v-for="(item, index) in stockManage" rowspan="2" :key="index">
              <div>{{item.name}}</div>
            </th>
            <th v-for="(item,i) in funnelManage" :key="i + 'funnelManage'" rowspan="2">
              <div>{{item.name}}</div>
            </th>
            <th v-for="(item, i) in carMaoRiManage" rowspan="2" :key="i + 'carMaoRiManage'">
              <div>{{item.name}}</div>
            </th>
            <th v-for="(item, i) in businessManage" colspan="2" v-if="i%2==0" :key="i + 'businessManage'">
              {{item.name && item.name.substring(0,item.name.length - 4) }}
            </th>
            <th v-for="(item,i) in comprehensiveMaoRi" :key="i + 'comprehensiveMaoRi'" colspan="2" v-if="i%2==0">
              {{item.name && item.name.substring(0,item.name.length - 4) }}
            </th>
          </tr>
          <tr>
            <th v-for="(item,i) in businessManage" :key="i + 'businessManage1'">
              <span v-show="i%2 == 0">上月</span>
              <span v-if="i%2 !== 0">下月</span>
            </th>
            <th v-for="(item,i) in comprehensiveMaoRi" :key="i + 'comprehensiveMaoRi1'">
              <span v-if="i%2 == 0">上月</span>
              <span v-if="i%2 !== 0">下月</span>
            </th>
          </tr>
          <!--报表内容-->
          <!-- 品牌 -->
          <tr v-for="(item,index) in list" :key="index">
            <td :rowspan="lists.length + 2 +item.sumArr.length">{{ item.brandName}}</td>
          </tr>
          <!-- 车系 -->
          <tr v-for="(item,index) in lists" :key="index + 'lists'">
            <td>{{ item.seriesName}}</td>
            <td>{{ item.modelName}}</td>
            <td v-for="(em,index) in item.lists" :key="index + 'item.lists'">{{ em.addValue}}</td>
          </tr>
          <!-- 车型 -->
          <tr v-for="(item,index) in sumArr" :key="index + 'sumArr'">
            <td>{{ item.seriesName}}</td>
            <td>合计</td>
            <td v-for="(em,index) in item.list" :key="index + 'item.list'" v-if="em.addCode !== undefined">{{ em.addValue }}</td>
          </tr>
          <!-- 总计 -->
          <tr>
            <td colspan="2">总计</td>
            <td v-for="(item,index) in total" :key="index + 'total'"></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import config from "common/config";
  import common from "common/common";
  import { getType } from "common/com-api";
  import api from "common/api";
  import Pagination from "components/pagination/pagination";
  export default {
    data() {
      return {
        stockManage: [],    //库存管理
        funnelManage: [],   //漏斗管理
        carMaoRiManage: [], //新车毛利管理
        estimateData: [],
        businessManage: [],   //衍生业务管理
        comprehensiveMaoRi: [],  //综合毛利
        total: [],  //总计
        totalData: [], //总计数据
        list: [],
        lists: [],
        storeCode: '',
        sumArr: [],
      }
    },
    mounted() {
      this.queryList(); //调取查询报表数据方法
      this.MaoriStockManage();  //调取数据字典库存管理
      this.MaoriFunnelManage();  //调取漏斗管理
      this.MaoriNewCarManage();  //调取毛利管理方法
      this.MaoriDerivationManage();  //调取衍生业务管理
      this.MaoriSynthetical();   //调取综合毛利方法
    },
    created() {
      this.storeCode = JSON.parse(common.getSession('userInfo')).userAvailableInfo.storeInfoVo.storeCode
    },
    methods: {
      //查询报表数据
      queryList() {
        const option = {
          "brandCode": "CARB2000004",
          "dateVersion": "2018-08",
          "storeCode": "STORE2000080"
        }
        api.MaoriForecast.queryMaoriForecastInfo(option, res => {
          if (res.data.code == 'success') {
            const obj = res.data.obj;
            this.lists = res.data.obj
            const this_ = this;
            obj.forEach(item => {
              const index = this_.list.findIndex(em => em.brandCode == item.brandCode);
              if (index == -1) {
                this_.list.push({
                  brandCode: item.brandCode,
                  brandName: item.brandName,
                  list: [{ ...item
                  }],
                  sumArr: [],
                })
              } else {
                this_.list[index].list.push({ ...item
                })
              }
            })
            this.getItemValue();
            this.getCarSum(this.lists)
            this.addSeriesList();
            this.getSumValue(this.lists);
          }
        })
      },
      /*每行数据值分解*/
      getItemValue() {
        this.lists.forEach((item, inde) => {
          item.lists = []
          this.pForeach(this.stockManage, item, inde);
          this.pForeach(this.funnelManage, item, inde);
          this.pForeach(this.carMaoRiManage, item, inde);
          this.pForeach(this.businessManage, item, inde);
          this.pForeach(this.comprehensiveMaoRi, item, inde)
        })
      },
      //公共循环遍历方法
      pForeach(obj, item, inde) {
        const This = this;
        obj.forEach(em => {
          const index = item.list.findIndex(vo => vo.addCode == em.code);
          if (index !== -1) {
            item.lists.push({
              addCode: This.lists[inde].list[index].addCode,
              addName: This.lists[inde].list[index].addName,
              addValue: This.lists[inde].list[index].addValue,
              seriesCode: This.lists[inde].seriesCode,
              seriesName: This.lists[inde].seriesName,
            })
          }
        })
      },
      //车系合计
      getCarSum(obj) {
        const t = this;
        obj.forEach(item => {
          const index = t.sumArr.findIndex(comprehensiveMaoRi => comprehensiveMaoRi.seriesCode == item.seriesCode);
          if (index == -1) {
            t.sumArr.push({
              brandCode: item.brandCode,
              seriesCode: item.seriesCode,
              seriesName: item.seriesName,
              list: [],
            })
          }
        })
        this.sumArr.forEach((em, ind) => {
          /*初始化数据*/
          t.lists[0].lists.forEach(am => {
            em.list.push({
              ...am,
              addValue: 0,
            })
          })
          em.list.forEach((stockManage, ind) => {
            const arr = t.lists.filter(item => item.seriesCode == em.seriesCode);
            arr.forEach(t => {
              if (t.lists.length !== null) {
                if (t.lists[ind] && t.lists[ind].addValue && t.lists[ind].addValue !== null) {
                  stockManage.addValue += Number(t.lists[ind].addValue)
                }
              }
            })
            stockManage.addValue == 0 && (stockManage.addValue = '')
          })
        })
      },
      //总计单条计算This.sumArr.
      getSumValue(obj) {
        obj.forEach(em => {
          const index = this.sumArr.findIndex(v => v.seriesCode == em.seriesCode);
          if (index > 0) {
            this.sumArr[index].list.push({
              addCode: em.addCode,
              addName: em.addName,
              addValue: em.addValue,
            })
          }
        })
      },
      //车系总计添加到大的品牌list 中
      addSeriesList() {
        this.sumArr.forEach(item => {
          const index = this.list.findIndex(em => em.brandCode == item.brandCode);
          this.list[index].sumArr.push(item)
        })
      },
      //数据字典库存管理
      MaoriStockManage() {
        this.stockManage = [];
        getType('MaoriStockManage', res => {
          res.forEach(item => {
            this.stockManage.push({
              code: item.refDetailCode,
              name: item.refDetailName
            });
            this.total.push({
              code: item.refDetailCode,
              name: item.refDetailName
            })
          })
        })
      },
      //漏斗管理
      MaoriFunnelManage() {
        this.funnelManage = [];
        getType('MaoriFunnelManage', res => {
          res.forEach(item => {
            this.funnelManage.push({
              code: item.refDetailCode,
              name: item.refDetailName
            });
            this.total.push({
              code: item.refDetailCode,
              name: item.refDetailName
            })
          })
        })
      },
      //毛利管理
      MaoriNewCarManage() {
        this.carMaoRiManage = []
        getType('MaoriNewCarManage', res => {
          res.forEach(item => {
            this.carMaoRiManage.push({
              code: item.refDetailCode,
              name: item.refDetailName
            });
            this.total.push({
              code: item.refDetailCode,
              name: item.refDetailName
            })
          })
        })
      },
      //衍生业务管理
      MaoriDerivationManage() {
        this.businessManage = [];
        getType('MaoriDerivationManage', res => {
          res.forEach(item => {
            this.businessManage.push({
              code: item.refDetailCode,
              name: item.refDetailName
            });
            this.total.push({
              code: item.refDetailCode,
              name: item.refDetailName
            })
          })
        })
      },
      //综合毛利
      MaoriSynthetical() {
        this.comprehensiveMaoRi = [];
        getType('MaoriSynthetical', res => {
          res.forEach(item => {
            this.comprehensiveMaoRi.push({
              code: item.refDetailCode,
              name: item.refDetailName
            });
            this.total.push({
              code: item.refDetailCode,
              name: item.refDetailName
            })
          })
        })
      },
    },
    watch: {
      // 数组的监听
      sumArr: {
        handler(newVal,addVal) {
          if(newVal) {
            
          }
          console.log(newVal,11)
          console.log(addVal,22)
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss">
  .grossTable {
    background: #fff;
    td,
    th {
      text-align: center;
      min-width: 80px;
      border: 1px solid #c2cfd6;
      .subTh {
        width: 100px;
        span {
          border: 1px solid #c2cfd6;
          display: inline-block;
        }
      }
    }
    th {
      background: #EDF1F7;
    }
  }
</style>

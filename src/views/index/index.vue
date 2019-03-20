<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <b-card>
          <div slot="header">
            <strong>查询</strong>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-fieldset label="金融机构" :label-cols="3" :horizontal="true">
                <b-form-input type="email" v-model="email" placeholder="金融机构"></b-form-input>
                <b-form-input type="email" v-model="emailtest" placeholder="金融机构"></b-form-input>
              </b-form-fieldset>
            </div>
            <div class="col-md-6">
              <b-form-fieldset label="适用范围" :label-cols="3" :horizontal="true">
                <div class="row">
                  <div class="col-md-6">
                    <b-form-select v-model="selected" :options="options"></b-form-select>
                  </div>
                  <div class="col-md-6">
                    <b-form-select v-model="selected" :options="options"></b-form-select>
                  </div>
                </div>

              </b-form-fieldset>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-fieldset label="金融机构类型" :label-cols="3" :horizontal="true">
                <b-form-select v-model="selected" :options="options"></b-form-select>
              </b-form-fieldset>
            </div>
            <div class="col-md-6">
              <b-form-fieldset label="启用/停用" :label-cols="3" :horizontal="true">
                <b-form-select v-model="selected" :options="options"></b-form-select>
              </b-form-fieldset>
            </div>
            <!-- 222222222222222222 -->
            <div class="col-md-6">
              <b-form-fieldset label="选择经销商店" :label-cols="3" :horizontal="true">
                <areaqueryshop ref="area" :reset="hehe" :readonly="false" @sales-data="salesdata" @select-change="selectedfun"></areaqueryshop>
              </b-form-fieldset>
            </div>
            <!-- 222222222222222222 -->
          </div>
          <div class="row">
            <div class="col-md-12 text-right">
              <b-button type="reset" size="sm"  @click="alick" variant="default">重置</b-button>
              <b-button type="submit" size="sm" variant="primary">查询</b-button>
            </div>
          </div>
        </b-card>
      </div>
    </div>
    <b-card class="mb-4">
      <div class="row mb-2">
        <div class="col-md-12">
          <b-button type="button" size="sm" variant="primary">新增金融机构</b-button>
          <b-button type="button" size="sm" variant="success">编辑</b-button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <b-table striped hover bordered :items="list"></b-table>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <pagination class="pull-right" @page-change="pageChange" :page-no="pager.page_no" :page-size="pager.page_size" :total-result="pager.totalResult" :total-pages="pager.totalPages">
          </pagination>
        </div>
      </div>

    </b-card>
    <b-card class="mb-4">
      <suitscope   @shop-preserve="shopPreserve" :tab-data="tabdata" @sales-preserve="salesPreserve" @remove-tr="removetr"></suitscope>
    </b-card>
  </div>
</template>
<script>

import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex';

import pagination from '../../components/pagination/pagination'
import areaqueryshop from '../../components/iris-areaqueryshop/'
import suitscope from '../../components/iris-suitscope/'

export default {
  data: function() {
    return {
      currentPage: 1,
      hehe:false,
      selected: null,
      //email1:'',
      emailtest: '',
      options: [
        { value: null, text: 'Please select some item' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Default Selected Option' },
        { value: 'c', text: 'This is another option' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ],
      pager: {
        page_no: 1, // 当前第几页
        page_size: 15, // 每页多少条数据
        totalResult: 100, // 共有多少条数据
        totalPages: 7 // 共有多少页数据
      },
      tabdata:[{
        nationwide:"",
        sales:"云阳",
        shop:"全部",
        id:"1"
      },{
        nationwide:"",
        sales:"云阳",
        shop:"全部",
        id:"2"
      },{
        nationwide:"",
        sales:"云阳",
        shop:"全部",
        id:"3"
      },{
        nationwide:"",
        sales:"云阳",
        shop:"全部",
        id:"4"
      },{
        nationwide:"",
        sales:"云阳",
        shop:"全部",
        id:"5"
      },{
        nationwide:"",
        sales:"云阳",
        shop:"全部",
        id:"6"
      },{
        nationwide:"",
        sales:"云阳",
        shop:"全部",
        id:"7"
      },{
        nationwide:"",
        sales:"云阳",
        shop:"全部",
        id:"8"
      }]
    }
  },
  created() {

  },
  computed: {
    ...mapState('test', ['list']),
    email: {
      get: function() {
        return this.$store.state.test.email;
        return this.emailtest;
      },
      set: function() {
        this.triggerLogin();
        return this.email;
      }

    }
  },

  methods: {
    ...mapActions('test', ['test']),
    triggerLogin() {
      this.test(this.emailtest);

    },
    alick(){
      console.log(1)
      this.$refs.area.setselect(this.options,"a","fkjhdsfhkfdhsafklh")
    },
    pageChange: function() {
      console.info(this.$data);
      console.info(this.$store.state.test.list);
      console.info(this.items);
    },
    selectedfun(data,data2){
      //在这里可以获取到经销商店的选择数据
      // alert(1)
      console.log(data)
      console.log(data2)      
      // console.log("经销商店的code");
      // console.log(data2);
    },
    //销售区域点击保存的时候触发的事件
    salesPreserve(data){
      this.$store.dispatch('finance/setTabsAcative',['salestatus',true])//添加状态销售区域已经保存过了
      console.log(data)//用户选择的数据
    },
    //当tab删除的时候触发事件
    removetr(data){
      console.log(data)
    },
    //当经销商店保存的时候触发
    shopPreserve(data){
      console.log(data)
    },
  
  //当销售区域点击确定的时候返回选中的销售区域
    salesdata(data){
      console.log(data)
    }
  },
  watch: {
    emailtest: function() {
      console.info(1);
      this.email = this.emailtest;
      console.info('email:' + this.email);
    }
  },
  components: {
    pagination,
    areaqueryshop,
    suitscope
  }
}
</script>

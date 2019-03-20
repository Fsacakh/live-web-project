<template>
  <div class="searchContent" ref="select">
    <div :class="{'input-box' : showCheck}">
      <el-tooltip v-if="tooltip" class="item" effect="dark" :content="inputValue" placement="top-start">
        <input type="text" class="form-control" :value="inputValue" readonly @click="_showBox" />
      </el-tooltip>
      <input v-if="!tooltip" type="text" class="form-control" :value="inputValue" readonly @click="_showBox" />
    </div>
    <div class="dowm" v-show="!inputValue"></div>
    <div class="clear" v-show="inputValue && !disabled" @click="clearValue">x</div>
    <div ref="sel" class="oBox" v-show="showBox">
      <div class="searchBox" v-show="showSearch">
        <input type="text" class="form-control" v-model="oData" :placeholder="searchPlaceholder">
      </div>
      <div class="dataContent" @scroll="onScroll($event)" ref="oScroll">
        <ul>
          <li v-show="!dataList.length" class="nodata">无数据...</li>
          <!-- skuName  skuCode originalCode -->
          <li @click="itemClick(item)" v-for="(item,index) in dataList" :key="index" style="text-align: left">
            <div :title="titlewatch(item)">
              <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{itemwatch(item)}}</div>
              <!-- <div v-show="item.originalCode" style="border-bottom: 1px solid;">{{item.originalCode}}</div>
                <div v-show="item.skuName" style="border-bottom: 1px solid;">{{item.skuName}}</div> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   *    date : 2017-08-06 
   * @author : NS-5
   *  @prop :  dataList( 下拉框展示的数据列表 ), 
   *           option( 参数类型名称key ), 
   *           disabled( 默认false ), 
   *           hasCheck( 校验非空 默认false ),
   *           checkText( 自定义校验内容 ),
   *           showSearch( 是否需要搜索功能 默认true)
   * 
   * @event :  dataChange( 搜索框中的值发生变化触发的事件 ),
   *           itemValue( 点击列表中的一条数据触发事件 ),   
   *           clickShowBack( 下拉搜索展示时, 触发事件抛出传入的 option, 也就是说你可以在点击弹出的时候去请求第一组数据),
   *           comScroll( 滚动事件, 返回boolean值 => true 表示滚动到底部了 ),
   *           setValue( 调用此方法默认是清空操作, 也可以传name值 ) 用法: 组件上绑定 ref = 'demo' 属性  this.$refs.demo.setValue()
   *           clearValue( 外部清空事件 => 真实的清空 code)
   */
  import vue from "vue";
  import {
    Tooltip
  } from "element-ui";
  vue.use(Tooltip)
  export default {
    props: {
      dataList: {
        type: [Array],
        default: function() {
          return []
        }
      },
      tooltip: {
        type: [Boolean],
        default: false
      },
      option: {
        type: [String],
        default: "brandName"
      },
      disabled: {
        type: [Boolean],
        default: false
      },
      hasCheck: {
        type: [Boolean],
        default: false
      },
      showSearch: {
        type: [Boolean],
        default: true
      },
      propName: {
        type: String,
        default: ''
      },
      searchPlaceholder: {
        type: String,
        default: 'Search'
      },
      // checkText: {
      //   type: [String],
      //   default: '必填项'
      // },
      valueObj: {
        type: [Object],
        default: function() {
          return {
            codeName: '',
            code: ''
          }
        }
      }
    },
    computed: {
      showCheck() {
        //  return this.hasCheck && !this.inputValue
        return this.hasCheck
      },
    },
    data() {
      return {
        oData: "",
        showBox: false,
        optionName: this.option,
        items: [],
        inputValue: ''
      };
    },
    mounted() {},
    methods: {
      itemwatch(item) {
        let originalCode = item.originalCode
        if (originalCode == null) {
          originalCode = '无'
        }
        let title = item.skuCode + '/' + originalCode + '/' + item.skuName
        return title
      },
      titlewatch(item) {
        let originalCode = item.originalCode
        if (originalCode == null) {
          originalCode = '无'
        }
        let title = item.skuCode + '/' + originalCode + '/' + item.skuName
        return title
      },
      _showBox() {
        if (!this.disabled) {
          this.showBox = !this.showBox;
        }
        //add by wjl
        if (this.showBox) {
          this.oData = ''
          this.$emit("clickShowBack", this.option);
        }
      },
      itemClick(item) {
        // let skuName = item.skuName!=null?item.skuName:'无'
        // let skuCode = item.skuCode!=null?item.skuCode:'无'
        let originalCode = item.originalCode
        if (originalCode == null) {
          originalCode = '无'
        }
        this.inputValue = item.skuCode + ' / ' + originalCode + ' / ' + item.skuName
        this.showBox = false
        this.$emit("itemValue", item);
      },
      onScroll(event) {
        let _scrollTop = event.target.scrollTop + 0.41; // 有兼容问题， 个别电脑的 scrollTop值存在差异
        let _offsetHeight = event.target.offsetHeight;
        let _scrollHeight = event.target.scrollHeight;
        if (_scrollTop + _offsetHeight >= _scrollHeight) {
          this.$emit("comScroll", true);
        } else {
          this.$emit("comScroll", false);
        }
      },
      setValue(val = '') {
        this.$nextTick(() => {
          this.inputValue = val;
        })
      },
      clearValue() {
        this.setValue()
        this.$emit('clearValue')
      }
    },
    watch: {
      oData(data) {
        this.$emit("dataChange", this.oData);
        this.$refs.oScroll.scrollTop = 0;
      },
      showBox(val) {
        /*document.addEventListener("click", e => {
          if (!this.$el.contains(e.target)) this.showBox = false;
        });*/
        document.addEventListener('click', (e) => {
          let _select = this.$refs.select;
          if (_select && !_select.contains(e.target)) this.showBox = false
        })
        let modal = document.getElementsByClassName('modal-content')[1]
        if (modal) {
          modal.onclick = (e) => {
            let _select = this.$refs.select;
            if (_select && !_select.contains(e.target)) {
              this.showBox = false
            }
          }
        }
      },
      // 组件外传 valueObj, 一个是code值, 一个是这个code的name
      // 前提是组件不是用户点击再加载的 
      // => 注: (想了一下 这种方法还是行不通的, datalist里面的数据并不是全部数据,只有默认的十条,所以并不能准确的找到对应code的name值)
      valueObj(val) {
        if (val) {
          for (let i = 0; i < this.dataList.length; i++) {
            if (val.code === this.dataList[i][val.codeName]) {
              this.inputValue = this.dataList[i][this.optionName];
            }
          }
        }
      }
    }
  };
</script>

<style scoped>
  .searchContent {
    /* position: relative; 不能加工单会有bug */
  }
  .oBox {
    position: absolute;
    border: 1px solid #e3e3e3;
    background-color: #fff;
    z-index: 10000;
    margin-top: 6px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    border-radius: 5px !important;
    /* width: 90%; */
    min-width: 200px;
  }
  .searchBox {
    padding: 6px 10px 6px 10px;
  }
  .searchBox input {
    border-radius: 5px !important;
    outline: 0;
    border-color: #66afe9 !important;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  }
  .oBox div ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 10px;
  }
  .oBox div ul li {
    padding: 5px 10px;
    margin-left: 10px;
  }
  .oBox div ul li:hover {
    background-color: rgba(102, 175, 233, 0.6);
  }
  .dowm {
    position: absolute;
    top: 14px;
    right: 22px;
    width: 6px;
    height: 6px;
    border-top: 6px solid #666;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 6px solid transparent;
  }
  .dataContent {
    max-height: 260px;
    overflow-y: scroll;
  }
  .clear {
    position: absolute;
    top: 8px;
    right: 14px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    color: #ccc;
    /* background-color: rgba(102, 175, 233, 0.6); */
    text-align: center;
    line-height: 16px;
    cursor: pointer;
  }
  .input-box input {
    border: 1px solid #f86c6b;
  }
  .input-box p {
    margin-top: .25rem;
    font-size: .875rem;
    color: #f86c6b;
  }
  .oBox .dataContent ul .nodata {
    text-align: left !important;
  }
</style>

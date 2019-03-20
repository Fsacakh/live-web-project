<template>
  <div class="treepicker">
    <input ref="tf" class="form-control treepicker-input" :class="{'with-reset-button': clearButton}" type="text" v-model="value" :placeholder="placeholder" :style="{width:width}" @click="inputClick" readonly />
    <div class="treepicker-popup" ref="con" @click='stopBubble' v-show="displayTreeView">
      <div class="treepicker-inner">
        <button type="button" class="close pull-right" @click="close()">
            <i class="fa fa-close fa-md"></i>
        </button>
        <div class="treepicker-body text-left">
          <Tree ref="treeView" style="border: none;" :show-checkbox="true" :check-strictly="true" :expand-on-click-node="false" :highlight-current="true" :props="props" :load="loadNodeSales" lazy empty-text="暂无数据" node-key='value' @check-change="handleCheckChange">
          </Tree>
        </div>
        <button type="button" class="pull-right mt-3 mr-3 mb-3 br-50%" @click="sureAndClose()">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../../common/config'
  import conmon from '../../common/common'
  import {
    Tree
  } from 'element-ui'
  export default {
    name: 'TreePicker',
    props: {
      width: {
        type: String,
        default: '100%'
      },
      clearButton: {
        type: Boolean,
        default: true
      },
      placeholder: {
        type: String,
        default: ''
      },
      options: {
        type: Object,
        default: function() {
          return {}
        }
      },
      readonly: {
        type: Boolean,
        default: function() {
          return false;
        }
      },
      load: {
        type: Function,
        default: function() {
          return function() {};
        }
      },
      data: {
          type: Array,
          default: function() {
              return []
          } 
      },
      pitchon: {
        type: String,
        default: ""
      },
      reset: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        displayTreeView: false,
        datas: [],
        value: this.pitchon,
        props: {
          label: 'name',
          children: 'zones'
        },
        show:false,
      }
    },
    methods: {
      close(event) {
        this.displayTreeView = false;
        setTimeout(() => {
          this.getcoordinate()
        }, 100)
      },
      sureAndClose() {
        this.renovateValue()
        this.displayTreeView = false
        setTimeout(() => {
          this.getcoordinate()
        }, 100)
        this.$emit('ok-click', this.datas)
      },
      inputClick(e) {
        if (!this.readonly) {
          this.displayTreeView = !this.displayTreeView
          setTimeout(() => {
            this.getcoordinate()
          }, 100)
        }
        this.stopBubble(e);
      },
      handleCheckChange(data, checked, indeterminate) {
        //判断datas里面有没有当前点击的节点没有就加进去有就删除掉code是唯一标识符
        for (var i = 0; i < this.datas.length; i++) {
          if (this.datas[i].code == data.code) {
            //相等说明有重复的就需要删除掉
            this.datas.splice(i, 1)
            //删除过后这个函数的目的到达了
            return;
          }
        }
        //上面的for执行完以后就说明需要添加进去
        this.datas.push(data);
        //调用方法刷新字符串 input框的值
        this.$emit('data-change', data, checked, indeterminate)
      },
      renovateValue() {
        //因为唯一标识符是code name可能会出现重复所以value需要在datas变化的时候重新计算一遍
        this.value = ""
        for (var i = 0; i < this.datas.length; i++) {
          this.value += this.datas[i].name + " "
        }
      },
      loadNodeSales(node, resolve) {
        this.load(node, resolve)
      },
      closeModal(dom, onoff, displaystr) {
        document.addEventListener('click', (event) => {
          this.close(event)
        })
      },
      stopBubble(e) {
        if (e && e.stopPropagation) {
          e.stopPropagation(); //w3c
        } else {
          window.event.cancelBubble = true; //IE
        }
      },
      getcoordinate(e) {
        //获取元素的横坐标 
        var el = document.getElementsByClassName("treepicker-popup")[0]
        function getLeft(e) {
          var offset = e.offsetLeft;
          if (e.offsetParent != null) offset += getLeft(e.offsetParent);
          return offset;
        }
        if (el) {
          if (document.body.offsetWidth - (getLeft(el) + el.offsetWidth) < 20) {
            el.style.right = 0
            el.style.left = ""
          } else {
            el.style.left = 0
            el.style.right = ""
          }
        }
      }
    },
    watch: {
      displayTreeView: {
        handler(val) {
          let _this = this
          if (val === true) {}
        }
      },
      watch: {
        reset:function(){
          if(this.reset){
              this.datas = [];
              this.renovateValue()
          }
        }
      },
      pitchon: {
        handler(val) {
          let _this = this
          _this.value = val
          if (val == '') {
            let arr = []
            this.$refs.treeView.setCheckedKeys(arr)
          }
        },
        deep: true
      }
    },
    components: {
      Tree
    },
    mounted() {
      this.$nextTick(function() {
        this.closeModal()
      })
    }
  }
</script>

<style>
  .treepicker {
    width: 100%;
    position: relative;
    display: inline-block;
  }
  /* input.treepicker-input.with-reset-button {
                          padding-right: 50px;
                        } */
  .treepicker>button.close {
    position: absolute;
    top: 12px;
    right: -10px;
    outline: none;
    z-index: 2;
    display: inline-block;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    vertical-align: middle;
  }
  .treepicker>button.close:focus {
    opacity: .2;
  }
  .treepicker-popup {
    width: 100% !important;
    position: absolute;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #fff;
    margin-top: 2px;
    z-index: 1000;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  }
  .treepicker-inner {
    width: 100% !important;
    height: 200px;
  }
  .treepicker-inner .close {
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 2px;
    font-size: 18px;
  }
  .treepicker-body {
    padding: 10px 25px;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    overflow-y: auto;
  }
  .treepicker-ctrl p,
  .treepicker-ctrl span,
  .treepicker-body span {
    display: inline-block;
    /*width: 28px;
                            line-height: 28px;
                            height: 28px; */
    border-radius: 4px;
  }
  .treepicker-ctrl p {
    width: 65%;
  }
  .treepicker-ctrl span {
    position: absolute;
  }
  .treepicker-body span {
    text-align: center;
  }
</style>

<template>
    <div class="treepicker">
        <input ref="tf" class="form-control treepicker-input" :class="{'with-reset-button': clearButton}" type="text" v-model="inputValue" :placeholder="placeholder" :style="{width:width}" @click="inputClick" readonly />
        <div class="treepicker-popup" ref="con" @click='stopBubble' v-show="displayTreeView">
            <div class="treepicker-inner">
                <button type="button" class="close pull-right" @click="close()">
                    <i class="fa fa-close fa-md"></i>
                </button>
                <div class="treepicker-body  text-left">
                    <Tree :data="data" style="border: none;" lazy accordion check-strictly :default-expanded-keys="[0]" :expand-on-click-node="false" empty-text="暂无数据" node-key='value' :props="props" :load="loadNodeSales" @node-click="handleNodeClick">
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
            data: {
                type: Array,
                default: function() {
                    return []
                } 
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
            name: {
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
                inputValue: this.name,
                props: {
                    label: 'name',
                    children: 'zones'
                },
                show: false
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
                this.displayTreeView = false
                setTimeout(() => {
                    this.getcoordinate()
                }, 100)
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
            handleNodeClick(data) {
                this.inputValue = data.name
                this.$emit('node-click', data)
            },
            renovateValue() {
                this.inputValue = ""
                this.$emit('input', '')
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
            name: {
                handler(val) {
                    this.inputValue = val
                }
            },
            displayTreeView: {
                handler(val) {
                    let _this = this
                    if (val === true) {}
                }
            },
            watch: {
                reset: function() {
                    if (this.reset) {
                        this.renovateValue()
                    }
                }
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
    display: block;
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
    width: 100%;
    position: absolute;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #fff;
    margin-top: 2px;
    z-index: 1000;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  }
  .treepicker-inner {
    width: 100%;
    height: 250px;
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

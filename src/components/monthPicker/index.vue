<template>
    <div class="monthpicker">
        <input ref="tf" class="form-control" :class="{'with-reset-button': clearButton}" type="text" v-model="inputValue" :placeholder="placeholder" :style="{width:width}" @click="inputClick" readonly />
        <div class="monthpicker-popup" ref="con" v-show="displayTreeView">
            <div class="monthpicker-inner">
                <button type="button" class="close pull-right" @click="close">
                <i class="fa fa-close fa-md"></i>
            </button>
                <div class="monthpicker-body">
                    <ul class="month-list">
                        <li  v-for="(month, index) in months" :key="index">
                            <input type="checkbox" :id="'month' + index" :value="month" v-model="checkedMonth">
                            <label :for="'month' + index">{{month}}</label>
                        </li>
                    </ul>
                </div>
                <button type="button" class="pull-right mt-3 mr-3 mb-3 br-50%" @click="sureAndClose">确定</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'MonthPicker',
        props: {
            value: {
                type: Array,
                default: function() {
                    return []
                }
            },
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
                months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                checkedMonth: [],
                displayTreeView: false,
                inputValue: '',
            }
        },
        methods: {
            inputClick: function() {
                let _this = this
                if (!_this.readonly) {
                    _this.displayTreeView = !_this.displayTreeView
                }
            },
            close: function() {
                let _this = this
                _this.displayTreeView = false
            },
            sureAndClose: function() {
                 let _this = this
                 let text = ''
                 _this.displayTreeView = false
                 _this.$data.checkedMonth.forEach((elem) => {
                    text = text + ' ' + elem
                 })
                 _this.$data.inputValue = text
                 _this.$emit('input', _this.$data.checkedMonth)
            }
        },
        watch: {
            value: {
                handler(val) {
                    let _this = this
                    let text = ''
                    _this.$data.checkedMonth = val
                    _this.$data.checkedMonth.forEach((elem) => {
                        text = text + ' ' + elem
                    })
                    _this.$data.inputValue = text
                }
            }
        },
        components: {}
    }
</script>
<style lang="scss" @scope>
    .monthpicker {
        width: 100%;
        position: relative;
        display: inline-block;
    }
    .monthpicker>button.close {
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
    .monthpicker>button.close:focus {
        opacity: .2;
    }
    .monthpicker-popup {
        width: 100%;
        position: absolute;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: #fff;
        margin-top: 2px;
        z-index: 1000;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    }
    .monthpicker-inner {
        width: 100%;
        height: 250px;
    }
    .monthpicker-inner .close {
        margin-right: 10px;
        margin-top: 5px;
        margin-bottom: 2px;
        font-size: 18px;
    }
    .monthpicker-body {
        width: 100%;
        height: 100%;
        overflow-x: auto;
        overflow-y: auto;
    }
    .monthpicker-ctrl p,
    .monthpicker-ctrl span,
    .monthpicker-body span {
        display: inline-block;
        border-radius: 4px;
    }
    .monthpicker-ctrl p {
        width: 65%;
    }
    .monthpicker-ctrl span {
        position: absolute;
    }
    .monthpicker-body span {
        text-align: center;
    }
    .month-list {
        list-style-type: none;
    }
</style>


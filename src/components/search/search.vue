<template>
    <div class="searchContent">
        <div :class="{'input-box' : showCheck}">
            <input type="text" class="form-control" :value="inputValue" readonly @click="_showBox" :disabled="isDisabled" />
            <p v-if="showCheck">{{checkText}}</p>
        </div>
        <div class="dowm" v-show="!inputValue"></div>
        <div v-show="hiddenMistake">
             <div class="clear" v-show="inputValue" @click="clearValue">x</div>
        </div>
        <div ref="sel" class="oBox" v-show="showBox">
            <div class="searchBox">
                <input type="text" class="form-control" v-model="oData" placeholder="Search">
            </div>
            <div class="dataContent" @scroll="onScroll($event)" ref="oScroll">
                <ul>
                    <li v-show="!dataList.length">无数据...</li>
                    <li @click="itemClick(item)" v-for="item in dataList">{{ item[valueName] }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            isDisabled: {
                type: Boolean,
                default: false
            },
            value: {
                type: String,
                default: ''
            },
            dataList: {
                type: Array,
                default: []
            },
            keyName: {
                type: String,
                default: "brandName" 
            },
            valueName: {
                type: String,
                default: "brandName"
            },
            searchValue: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            hasCheck: {
                type: Boolean,
                default: false
            },
            checkText: {
                type: String,
                default: '必填项'
            },
            default: {
                type: Object,
                default: function() {
                    return {
                    }
                }
            }
        },
        computed: {
            showCheck() {
                //  return this.hasCheck && !this.inputValue
                return this.hasCheck
            },
            hiddenMistake() {
                return this.isDisabled ? false : true
            }
        },
        data() {
            return {
                oData: "",
                showBox: false,
                optionName: this.valueName,
                optionKey: this.keyName,
                items: [],
                inputValue: ''
            }
        },
        methods: {
            _showBox() {
                if (!this.disabled) {
                    this.showBox = !this.showBox
                }
                if (this.showBox) {
                    this.$emit("clickShowBack")
                }
            },
            itemClick(item) {
                this.$emit('input', item[this.optionKey])
                this.$emit('getOptionName', item[this.optionName])
                this.inputValue = item[this.optionName]
                this.showBox = false
            },
            onScroll(event) {
                let _scrollTop = event.target.scrollTop
                let _offsetHeight = event.target.offsetHeight
                let _scrollHeight = event.target.scrollHeight
                if (_scrollTop + _offsetHeight >= _scrollHeight) {
                    this.$emit("comScroll")
                } 
            },
            clearValue() {
                this.inputValue = ''
                this.$emit('input', '')
            }
        },
        watch: {
            oData(data) {
                this.$emit("dataChange", this.oData)
                this.$refs.oScroll.scrollTop = 0
            },
            searchValue: {
                handler(value) {
                    let _this = this
                    if(value != '') {
                        _this.oData = value
                    }
                }
            },
            showBox(val) {
                document.addEventListener("click", e => {
                    if (!this.$el.contains(e.target)) this.showBox = false
                })
            },
            value: {
                handler(val) {
                    let _this = this
                    if(val != '' && _this.dataList.length > 0) {
                        let index = _this.dataList.findIndex((item) => {
                            return item[_this.optionKey] == val
                        })
                        if(index != -1) {
                            _this.inputValue = _this.dataList[index][_this.optionName]
                        }
                    } else {
                        _this.inputValue = ''
                    }
                }
            },
            dataList: {
                handler(val) {
                    let _this = this
                    if(_this.value != '' && _this.dataList.length > 0) {
                        let index = _this.dataList.findIndex((item) => {
                            return item[_this.optionKey] == _this.value
                        })
                        if(index != -1) {
                            _this.inputValue = _this.dataList[index][_this.optionName]
                        }
                    }
                } 
            }
        }
    }
</script>

<style scoped>
    .oBox {
        position: absolute;
        border: 1px solid #e3e3e3;
        background-color: #fff;
        z-index: 10000;
        margin-top: 6px;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
        border-radius: 5px !important;
        width: 100%;
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
        color: #fff;
        /* background-color: rgba(102, 175, 233, 0.6); */
        text-align: center;
        line-height: 18px;
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
</style>
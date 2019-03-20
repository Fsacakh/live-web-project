<template>
    <div class="animated fadeIn col-md-12">
        <div>
            <b-button v-if="addBtn" class="pl-3 pr-3 pt-2 pb-2 mr-2 mb-2" variant="success" @click="getWordsCode">
                新增
            </b-button>
        </div>
        <div class="tableScorll">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr class="text-center">
                        <th class="text-center" v-for="(item, num) in dataThead" :key="num">{{item}}</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="(item, index) in lists" :key="index">
                        <th class="text-center">{{index+1}}</th>
                        <th class="text-center"><input class="form-control" type="text" :maxlength="15" v-model="item.wordsName"></th>
                        <th class="text-center"><textarea class="form-control" type="text" :maxlength="240"  rows="2"  v-model="item.wordsValue"></textarea></th>
                        <th class="text-center">
                            <b-button v-if="addBtn" class="pl-3 pr-3 pt-2 pb-2" variant="danger" @click="remove(index, item)">
                                删除
                            </b-button>
                        </th>
                    </tr>
                    <tr v-if="!lists.length">
                        <td colspan='13' class="text-left">暂无数据...</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <b-button v-if="addBtn" class="pl-3 pr-3 pt-2 pb-2 mt-2 pull-right" variant="primary" @click="saveSubmit">
                保存
            </b-button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState, mapActions } from 'vuex'
    import {MessageBox,Message} from 'element-ui'
    import api from '../../common/api.js'
    import apiUrls from 'common/api-url'
    import { hasBtn } from 'common/com-api'
    import config from '../../common/config.js'
    Vue.component(MessageBox.name, MessageBox)
    export default {
        data() {
            return {
                dataThead: ['序号', '话术名称', '话术内容', '操作'],
                interestTab: 0,
                lists:[]
            }
        },
        computed: {
            addBtn() {
                return hasBtn(apiUrls.marketActivity.addActivityWords)
            },
            ...mapState('marketActivity', [
                'addActivityWords',       //新增话术
                'getSequence',
                'maCode',
                'wordsCode',
                'addWordsData'
            ])
        },
        created() {
        //    this.getMacode() 
        },
        methods: {
            ...mapActions('marketActivity', [
                'addWords'
            ]),
            queryWords: function() {
                const $this = this
                api.marketActivity.queryActivityInfo({maCode: this.maCode}, (res) => {
                    if (res.data.code == "success") {
                        let data = res.data.obj
                        $this.lists = [];
                        data.forEach(function(item, index) {
                            let obj = {}
                            obj.id = item.id;
                            obj.maCode = item.maCode;
                            obj.wordsCode = item.wordsCode;
                            obj.wordsName = item.wordsName;
                            obj.wordsValue = item.wordsValue;
                            $this.lists.push(obj)
                        });
                    }
                }) 
            },
            getWordsCode: function () {
                const _this = this;
                this.$store.dispatch('marketActivity/getSequence', {
                    poros: {"serviceCode": config.market.getWordsCode},
                    callBack: function (msg) {
                        let obj = {};
                        // obj.maCode = _this.maCode;
                        obj.wordsCode = msg.data.obj;
                        obj.wordsName = "";
                        obj.wordsValue = "";
                        _this.lists.push(obj)
                        // _this.addWords(_this.lists)
                    }

                })
            },
            
            remove: function (num, item) {
                const _this = this
                MessageBox.confirm(config.messInfo.deleteInfo, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            let len = _this.lists.length
                            if (item.id != undefined) {
                                let params = []
                                let obj = {}
                                    obj.id = item.id
                                    obj.maCode = item.maCode
                                    obj.wordsCode = item.wordsCode
                                    obj.wordsName = item.wordsName
                                    obj.isDeleted = "1"
                                    params.push(obj)
                                _this.$store.dispatch('marketActivity/addActivityWords', {
                                    poros: params,
                                    callBack: function (msg) {
                                        if (msg.data.code == "success") {
                                            _this.lists.splice(num, 1);
                                            if (len-1 == _this.lists.length) {
                                                done();
                                            } 
                                        }
                                        
                                    }
                                })

                            } else {
                                _this.lists.splice(num, 1);
                                if (len-1 == _this.lists.length) {
                                    done();
                                } 
                                _this.saveSubmit()
                            }
                        } else {
                            done();
                            return
                        }
                    },
                    callBack: function () {
                        if (!_this.lists[num]) {
                            Message({
                                type: 'info',
                                message: config.messInfo.success
                            });
                        }  
                    }
                })
            },
            //保存话术信息到后台
            saveSubmit: function () {
                const _this = this;
                _this.lists.forEach(item => {
                    item.maCode = this.maCode;
                })
                console.log(_this.lists)
                this.$store.dispatch('marketActivity/addActivityWords', {
                    poros: _this.lists,
                    callBack: function (msg) {
                        if (msg.data.code == "success") {
                            Message({
                                type: 'info',
                                message: config.messInfo.success
                            });
                            console.log(_this.lists)
                            let info =  msg.data.obj
                            console.log(info)
                            
                            if(info.length != 0) {
                                for(let i = 0; i<info.length; i++) {
                                    let judgeRepeat = false
                                    for(let j = 0; j<_this.lists.length ; j++) {
                                        if(_this.lists[j].wordsCode === info[i].wordsCode) {
                                            judgeRepeat = true
                                        }
                                    }
                                    if(!judgeRepeat) {
                                        _this.lists.push(info[i])
                                    }
                                }
                                // _this.lists = info
                            }
                            
                        } else {
                            Message({
                                type: 'warning',
                                message: config.messInfo.fail
                            });
                        }
                        
                    }
                })
            },
        },
    }
</script>
<style>
    .tableScorll {
        height: 200px;
        overflow: auto;
        overflow-x: hidden
    }
</style>
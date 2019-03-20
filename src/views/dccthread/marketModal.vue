<template>
    <b-modal ref="market" title="查看市场活动" hide-footer no-close-on-backdrop no-close-on-esc size="lg">
        <div class="row">
            <div class="col-md-12 com-lg-12">
                <div class="showImg">
                    <img :src="filePath" alt="暂无图片" @onerror='noFind'>
                </div>
            </div>    
        </div>
        <div class="row">
            <div class="col-md-12 com-lg-12">
                <div class="table-scrollable limit-height">
                    <b-table striped hover bordered show-empty :fields="fields" :items="items">
                        <template slot="empty">
                            暂无数据...
                        </template>
                    </b-table>
                </div>
            </div>    
        </div>
    </b-modal>     
</template>

<script>
    import api from '../../common/api'
    import config from '../../common/config'
    export default {
        data() {
            return {
                fields: {
                    wordsName: {
                        label: '话术'
                    },
                    wordsValue: {
                        label: '话术内容'
                    }
                },
                items: [],
                filePath: '/assets/img/no-resources.png'  
            }
        },
        methods: {
            showModal: function(marketCode) {
                let _this = this
                api.marketActivity.queryActivityInfo({maCode: marketCode}, (res) => {
                    if (res.data.code == "success") {
                        let data = res.data.obj
                        _this.items = [];
                        data.forEach(function(item, index) {
                            let obj = {}
                            obj.id = item.id;
                            obj.maCode = item.maCode;
                            obj.wordsCode = item.wordsCode;
                            obj.wordsName = item.wordsName;
                            obj.wordsValue = item.wordsValue;
                            _this.items.push(obj)
                        });
                    }
                }) 
                api.market.getFileInfo({relationCode: marketCode, businessType: 'haibao'}, res => {
                    if(res.data.code == 'success') {
                        let fileInfo = res.data.obj[0]
                        _this.filePath = fileInfo.filePath
                    }
                })
                _this.$refs.market.show()
            },
            noFind: function(event) {
                let _this = this
                let img = event.srcElement
                img.src = '/assets/img/no-resources.png'
                img.onerror = null
            }
        },
        components: {

        }
    } 
</script>

<style lang="scss" scoped>
    .showImg {
        width: 80%;
        height: auto;
        overflow: hidden;
        margin: 0 auto;
    }
    .showImg img {
        width: 100%;
        height: auto;
    }
    .limit-height {
        max-height: 500px !important;
        overflow-y: scroll;
    }
</style>
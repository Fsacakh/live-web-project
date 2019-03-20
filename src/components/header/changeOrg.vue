<template>
    <b-modal ref="modal1" :title="title" :size="size">
        <div class="row">
            <div class="col-md-6" v-for="(item, index) in options" :key="index"><label @click="_change(item.value)"><input type="radio" :value="item.value" name="radio" />&nbsp;&nbsp;{{item.text}}</label></div>
        </div>
        <div slot="modal-footer" class="w-100">
            <div class="float-right">
                <b-button variant="primary" @click="handleOk">确认</b-button>
                <b-button @click="closeModal">取消</b-button>
            </div>
        </div>
    </b-modal>
</template>
<script>
    import Api from '../../common/api.js'
    import common from '../../common/common.js'
    import config from '../../common/config.js'
    import {mapState, mapGetters, mapActions} from 'vuex';
    import { Message } from 'element-ui';
    export default {
        data(){
          return{
            name: '',
            names: [],
            options:[],
            radioValue:'',
            selected: ''
          }

        },
        // props:['title','size'],
        props: {
            userInfo: {
                type: Object,
                default: {}
            },
            title: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: ''
            }
        },
        components:{
            Message
        },
        updated(){
            //console.info(33);
        },
        methods: {
            // ...mapActions('login', ['getUserInfo']),
            clearName() {              
                this.name = '';
            },
            closeModal(){
                this.$refs.modal1.hide();
            },
            handleOk(e) {
                var _this = this;
                if(!this.radioValue)return;
                Api.toLogin.changeLoginInfo({'orgCode':this.radioValue}).then(function(res){        
                    if(res.data.code == 'success'){                  
                        Message({
                          showClose: true,
                          message: config.messInfo.success,
                          type: 'success'
                        });
                        _this.hideModal();
                        window.location.reload()   
                    }
                });

            },
            handleSubmit() {
                this.names.push(this.name);
                this.clearName();
                this.$refs.modal1.hide()
            },
            showModal() {
                this.$refs.modal1.show();
            },
            hideModal() {
                this.$refs.modal1.hide();
            },
            _change(value){                
                this.radioValue = value;    

            }
        },
        mounted(){


        },
        created() {
            // console.log('----------2获取模态框拿到的东西2-----------')
            // console.log(this.userInfo)
            const _this = this
            let option = {}
            Api.toLogin.getOrg(option).then(function(res){
                // console.log(res)
                if(res.data.code === 'success') {
                    let tempArray = res.data.obj
                    tempArray.forEach(element => {
                        _this.options.push({text: element.orgName, value:element.orgCode})
                    })
                }
            })
        },
        watch:{
            userInfo:{
                handler:function(value){
                    this.selected = value.inCharegOrgVo.orgCode
                },
                deep: true
            }
        }
    }
</script>
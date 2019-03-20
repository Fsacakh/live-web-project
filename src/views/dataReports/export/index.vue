<template>
    <div>
      <b-card>
          <div class="row">
           <div class="col-md-6"  v-show="isShow">
                <b-form-fieldset horizontal label="选择经销商店*" label-text-align="right" :label-cols="4">
                    <areaqueryshop @select-change="selectStores" :storeAll='true'></areaqueryshop >
                </b-form-fieldset>
            </div>
            <div class="col-md-6">
                <b-button size="sm" variant="btn btn-success" @click="exportTab">导出</b-button>
            </div>
        </div>
      </b-card>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import areaqueryshop from "./iris-areaqueryshop";
import { Message } from "element-ui";
import api from 'common/api'
export default {
    data () {
        return {
            isShow: true,  //如果是集团账号就显示出查询列表
            storeCode:'',   //选择门店的code
            JurisdictionCode: ''
        }
    },
    mounted(){
        this.getJurisdictionShow()
    },
    methods:{
        // 获取权限
        getJurisdictionShow(){
            var str = sessionStorage.userInfo;
            var obj = JSON.parse(str);
            if(obj.userAvailableInfo.availableType && obj.userAvailableInfo.availableType==0){
                this.isShow = false
            }
        },
        exportTab(){
            // if (this.checkStore()) {             //判断选择框是否有选择的值
            let _this = this;
            console.log(_this.storeCode);
            _this.exportCarModelExl({'storeCode':_this.storeCode});   //调用接口,选择框中值的code入参
    //   }
        },
        //获取选择框中的值
        selectStores: function(sales, stores) {
            let _this = this;
            if (stores.hasOwnProperty("value")) {
            _this.storeCode = stores.value === 0 ? '' : stores.value;
            }else{
                _this.storeCode = '';
            }
        },
        // checkStore: function() {
        //     if (this.$data.storeCode !== "") {
        //         return true;
        //     } else {
        //         Message.closeAll();
        //         Message({
        //         type: "warning",
        //         message: "请选择门店"
        //         });
        //         return false;
        //     }
        //  },
    ...mapActions("exportCarModel", ["exportCarModelExl"])
    },
    components: {
        areaqueryshop
    }
}
</script>
<style lang="scss" scoped>
  
</style>



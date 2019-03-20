<template>
    <b-modal @show="showBefore" id="update" ref="update" @shown="showmodal" title="编辑商品产地" size="lg" @ok="handleOk" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-12">
                <b-form-fieldset horizontal label="商品产地名" :label-cols="4" class="text-right">
                    <b-form-input v-model="skuAreaName" :state="judgeState"/>
                </b-form-fieldset>
                <b-form-fieldset horizontal label="备注" :label-cols="4" class="text-right">
                    <b-form-input v-model="remark"/>
                </b-form-fieldset>
            </div>
        </div>
    </b-modal>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import api from "../../../common/api";
import common from "../../../common/common";
export default {
  components: {},
  props: {
    updateBirthPlace: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      skuAreaName: "",
      remark: "",
      judgeState: null
    };
  },
  methods: {
    showBefore() {
      this.skuAreaName = this.updateBirthPlace.skuAreaName;
      this.remark = this.updateBirthPlace.remark;
    },
    handleOk(e) {
      const _this = this;
      if (_this.skuAreaName === "") {
        _this.judgeState = false;
        e.cancel();
      } else {
        _this.judgeState = null;
        api.product.commodityBirthplace.updataCommodityBirthplace(
          [
            {
              id: this.updateBirthPlace.id,
              skuAreaName: this.skuAreaName,
              skuAreaCode: this.updateBirthPlace.skuAreaCode,
              remark: this.remark
            }
          ],
          msg => {
            if (msg.data.message == "success") {
              this.$emit("reQuery");
              common.alertInfo("success");
            } else {
              common.alertInfo("warning");
            }
          }
        );
      }
    },
    showmodal() {
      const _this = this;
      _this.judgeState = null;
      if (!this.updateBirthPlace.skuAreaName) {
        this.$refs.update.hide();
      }
    }
  }
};
</script>
<style>
.modal-dialog {
  margin: 80px auto !important;
}
</style>
<template>
    <b-modal @show="showBefore" id="update" ref="update" @shown="showmodal" title="编辑商品包装" size="lg" @ok="handleOk" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-12">
                <b-form-fieldset horizontal label="商品包装" :label-cols="4" class="text-right">
                    <b-form-input id="input-value" :state="judgeState" type="text" v-model="packName"/>
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
  props: {
    updatePack: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      packName: "",
      remark: "",
      judgeState: null
    };
  },
  methods: {
    showBefore() {
      this.packName = this.updatePack.packName;
      this.remark = this.updatePack.remark;
    },
    handleOk(e) {
      const _this = this;
      if (_this.packName === "") {
        _this.judgeState = false;
        e.cancel();
      } else {
        _this.judgeState = null;
        api.product.commodityPack.updataCommodityPack(
          [
            {
              id: this.updatePack.id,
              packName: this.packName,
              packCode: this.updatePack.packCode,
              remark: this.remark
            }
          ],
          msg => {
            if (msg.data.message == "success") {
              _this.$emit("reQuery");
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
      if (!this.updatePack.packName) {
        this.$refs.update.hide();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-dialog {
  margin: 80px auto !important;
}
</style>
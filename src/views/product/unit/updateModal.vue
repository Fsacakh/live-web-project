<template>
    <b-modal @show="showbefore" id="update" ref="update" @shown="showmodal" title="编辑商品单位" size="lg" @ok="handleOk" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-12">
                <b-form-fieldset horizontal label="商品单位名称" :label-cols="4" class="text-right">
                    <b-form-input @input="datachang" :state="unitNameState" v-model="unitName" />
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
    updateUnit: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      unitName: "",
      unitNameState: null
    };
  },
  methods: {
    showbefore() {
      this.unitNameState = "";
      this.unitName = this.updateUnit.unitName;
    },
    handleOk(evt) {
      if (this.unitName) {
        api.product.commodityUnit.updataCommodityUnit(
          [
            {
              id: this.updateUnit.id,
              unitName: this.unitName,
              unitCode: this.updateUnit.unitCode
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
      } else {
        this.unitNameState = "invalid";
        evt.cancel();
      }
    },
    showmodal() {
      if (!this.updateUnit.unitName) {
        this.$refs.update.hide();
      }
    },
    datachang() {
      this.unitNameState = null;
    }
  }
};
</script>
<style>
.modal-dialog {
  margin: 80px auto !important;
}
</style>
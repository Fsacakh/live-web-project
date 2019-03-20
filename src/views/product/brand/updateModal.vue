<template>
    <b-modal @show="showbefor" id="update" ref="update" @shown="showmodal" title="编辑商品品牌" size="lg" @ok="handleOk" ok-title="确定" cancel-title="取消">
        <div class="row">
            <div class="col-md-12">
                <b-form-fieldset horizontal label="商品品牌名称" :label-cols="4" class="text-right">
                    <!-- <b-form-input v-model="brandName" /> -->
                    <b-form-input @input="datachang" :state="brandNameState" v-model="brandName" />
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
    updateBrand: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      brandName: "",
      brandNameState: null
    };
  },
  methods: {
    showbefor() {
      this.brandName = this.updateBrand.brandName;
      this.brandNameState = "";
    },
    handleOk(evt) {
      if (this.brandName) {
        api.product.commodityBrand.updataCommodityBrand(
          [
            {
              id: this.updateBrand.id,
              brandName: this.brandName,
              brandCode: this.updateBrand.brandCode
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
        this.brandNameState = "invalid";
        evt.cancel();
      }
    },
    showmodal() {
      if (!this.updateBrand.brandName) {
        this.$refs.update.hide();
      }
    },
    datachang() {
      this.brandNameState = null;
    }
  },
  mounted() {
    this.brandNameState = null;
  }
};
</script>
<style>
.modal-dialog {
  margin: 80px auto !important;
}
</style>

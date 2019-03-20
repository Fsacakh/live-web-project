<template>
    <div class="PD_modal">
        <el-dialog :visible.sync="dialogVisible" width="30%">
            <div>
                <h4>提示</h4>
                <table v-html="refDetailRemark">
                    {{ refDetailRemark }}
                    <!-- 配置请复制一下代码块 -->
                    <!-- <tr>
                        <td>零售达成率</td>
                        <td>零售销售额 / 零售销售额目标</td>
                    </tr>
                    <tr>
                        <td>零售达成率</td>
                        <td>零售销售额 / 零售销售额目标</td>
                    </tr>
                    <tr>
                        <td>零售达成率</td>
                        <td>零售销售额 / 零售销售额目标</td>
                    </tr>
                    <tr>
                        <td>零售达成率</td>
                        <td>零售销售额 / 零售销售额目标</td>
                    </tr> -->
                </table>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Vue from 'vue'
import { Dialog } from 'element-ui';
Vue.use(Dialog);
export default {
  data() {
    return {
        dialogVisible: false
    };
  },
   props:['refDetailRemark'],
  methods: {
    //模态框相关方法
    showModal() {
      this.dialogVisible = true;
    },
    hideModal() {
      this.dialogVisible = false;
    },
  }
};
</script>
<style lang="scss" scoped>
.PD_modal {
    & /deep/ .el-dialog__body{
        h4 {
            font-size: 20px;
        }
        width: 100%;
        table {
            width: 100%;
            tr {
                width: 100%;
                &:nth-child(2n){
                    background: #F2FFFE;
                }
                td:first-child{
                    width: 200px;
                }
            }
        }
    }
}

    

</style>



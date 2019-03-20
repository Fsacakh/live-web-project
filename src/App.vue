<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'app',
}
</script>
<style lang="scss">
   @import './assets/css/main';
  .el-loading-spinner .el-loading-text {
    color: #fff;
    font-size: 18px;
  }
  .el-loading-mask {
    background-color: rgba(0, 0, 0, 0.2)
  }
  .el-loading-spinner .path {
    stroke: #fff !important;
    stroke-width: 5px;
  }
  .el-input__inner {
    min-width: 125px;
  }
  .container-fluid .el-button--primary {
    background-color: #577eb9;
    border-color: #577eb9;
  }
  .container-fluid .el-button--success {
    background-color: #5eb870;
    border-color: #5eb870;
  }
  .container-fluid .el-button--danger {
    background-color: #ff5335;
    border-color: #ff5335;
  }
  .container-fluid .el-button--warning {
    background-color: #ff9a00;
    border-color: #ff9a00;
  }
  .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
    background-color: #eef1f6 !important;
    border-color: #eef1f6 !important;
  }
  .el-input.is-disabled .el-input__inner {
    color: #3e515b !important;
    background: #EDF1F7 !important;
  }
</style>

<template>
  <footer class="app-footer" v-html="footTitle"></footer>
</template>
<script>
export default {
  // name: 'footer'
  mounted() {
    let _this = this
    _this.$data.footTitle = window.footTitle
  },
  data: function() {
    return {
      footTitle: ''
    }
  },

}
</script>

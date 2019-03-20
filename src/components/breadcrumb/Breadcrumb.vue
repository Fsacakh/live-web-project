<template>
  <ol class="breadcrumb">
    <li class="breadcrumb-item" v-for="(item, index) in list" :key="index">
      <span class="active" v-if="isLast(index)">{{ showName(item) }}</span>
      <a :href="location" v-else-if="index == 0">{{ showName(item) }}</a>
      <router-link :to="getPath(index, item.path)" v-else>{{ showName(item) }}</router-link>  
    </li>
  </ol>
</template>

<script>
import api from '../../common/api.js'
import common from '../../common/common.js'
export default {
  data(){
    return {
      location: ''
    }
  },
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  created() {
      api.ref.queryRefDetail({refDetailCode: 'HomeFlag'},res=>{
        if (res.data.code === 'success') {
          if (res.data.obj.refDetailValue == 0) {
           this.location = `${location.origin}/livepro/index`
          } else if (res.data.obj.refDetailValue == 1) {
           this.location = `${location.origin}/livecs/dashboard`
          } else if (res.data.obj.refDetailValue == null) {
           this.location = `${location.origin}/livepro/index`
          }
        }
      })
    },
  methods: {
    ifFirst (index) {
      return index === 0
    },
    isLast (index) {
      return index === this.list.length - 1
    },
    getPath (index, path) {
        if(index === 0) {
           return '/'
        } else {
           return path
        }
    },
    showName (item) {
      if (item.meta && item.meta.text && item.meta.label && this.$route.params.code) {
        name = item.meta.text;
      }
      if (item.meta && item.meta.code) {
        let menuList = JSON.parse(common.getSession('menuList'))
        name = menuList.find((menu) => {
          return menu.resourceCode == item.meta.code
        }).resourceName
      } else if (item.meta && item.meta.label) {
        name = item.meta && item.meta.label
      }
      return name
    }
  }
}
</script>

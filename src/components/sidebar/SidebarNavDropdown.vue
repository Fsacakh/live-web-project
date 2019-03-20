<template>
  <router-link tag="li" class="nav-item nav-dropdown" :class="opened" :to="url" disabled>
    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
      <i class="SidebarNavDropdown" :class="icon"></i> {{name}}
    </div>
    <ul class="nav-dropdown-items">
      <slot></slot>
    </ul>
  </router-link>
</template>

<script>
export default {
  props: {
    opened: {
      type: String,
      defalult: ''
    },
    name: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleClick(e) {
      e.preventDefault()
      if(e.target.parentElement.classList.contains('open')) {
        e.target.parentElement.classList.toggle('open')
      } else {
        
        const firstMenu = document.getElementsByClassName('first-menu')
        const secondMenu = document.getElementsByClassName('second-menu')
        const classList = e.target.parentElement.classList

        classList.contains('first-menu') && this.toggleClass(firstMenu, classList)
        classList.contains('second-menu') && this.toggleClass(secondMenu, classList)
        this.$emit('handleSecondMenu')
      }        
    },
    toggleClass(ele, classList) {
      for (let i = 0; i < ele.length; i++) {
        ele[i].classList.remove('open')
      }
      setTimeout(() => {
        classList.toggle('open')
      }, 200)
    }
  }
};
</script>
<style scoped>
.SidebarNavDropdown {
  color: aliceblue !important;
}
.second-menu > div.nav-link{
  padding-left: 40px !important;
}
</style>

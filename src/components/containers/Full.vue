<template>
  <div class="app" id="app">
    <app-header></app-header>
    <div class="app-body">
      <Sidebar :navItems="nav" />
      <main class="main">
        <breadcrumb :list="list" />
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
  import AppHeader from '../header/Header.vue'
  import Sidebar from '../sidebar/Sidebar.vue'
  import AppAside from '../aside/Aside.vue'
  import AppFooter from '../footer/Footer.vue'
  import Breadcrumb from '../breadcrumb/Breadcrumb.vue'
  import nav from '../../views/_nav'
  export default {
    name: 'app',
    data: function() {
      return {
        nav: nav.items
      }
    },
    methods: {},
    updated(){
      // console.info(this.list);
    },
    components: {
      AppHeader,
      Sidebar,
      AppAside,
      AppFooter,
      Breadcrumb
    },
    mounted(){
         console.info(this.list);
    },
    computed: {
      name() {
        return this.$route.name
      },
      list() {
        return this.$route.matched
      }
    }
  }
</script>


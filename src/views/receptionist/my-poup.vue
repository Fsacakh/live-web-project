<template>
  <transition name="fade">
    <div class="poup-container" v-show="showPoup" ref="poup">
        <div class="poup-warpper" >
            <b-button size="sm" variant="primary" @click="btn1Click">{{btnText1}}</b-button>
            <b-button size="sm" variant="success" class="btn2" @click="btn2Click">{{btnText2}}</b-button>
        </div>
    </div>
  </transition>
</template>
<script>
export default {
    props: {
        btnText1: {
            type: String,
            default: '今日接待'
        },
        btnText2: {
            type: String,
            default: '开始接待'
        },
        event: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            showPoup: false
        }
    },
    methods: {
        btn1Click() {},
        btn2Click() {},
        show() {
            this.showPoup = true
        },
        hide() {
            this.showPoup = false
        },
        toggle() { 
            // console.log(this)
            // console.log(this.event.clientX, this.event.clientY)
            // this.$refs.poup.style.top = `${this.event.clientY - 160}px`
            // this.$refs.poup.style.left = `${this.event.clientX - 180}px`
            // this.$refs.poup.style.top = `106px`
            // this.$refs.poup.style.left = `244px`
            this.showPoup = !this.showPoup
        }
    }
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
    opacity: 1;
    transition: .1s ease-out;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
.poup-container {
    position: absolute;
    /* top: 80px;
    left: 220px; */
    top: 0;
    left: 0;
    z-index: 100;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.poup-warpper {
    position: relative;
    padding: 15px;
    border: 1px solid #ccc;
    width: 108px;
    background: #fff;
        
}
.poup-warpper::before {
    position: absolute;
    top: 50%;
    left: -6px;
    margin-top: -5px;
    display: block;
    content: "";
    width: 10px;
    height: 10px;
    background: #fff;
    transform: rotate(45deg);
    border: 1px solid #ccc;
    border-top-color: #fff;
    border-right-color: #fff;
}
.btn2 {
    margin-top: 10px;
}
</style>



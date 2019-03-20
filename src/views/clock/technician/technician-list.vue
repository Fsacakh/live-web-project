<template>
<div class="tc-list-container clearfix">
   <div class="tc-item-box pull-left" v-for="(item, i) in list" :key="i" @click="itemClick(item)">
       <div class="header-bg"></div>
       <div class="img-box">
           <!-- <div class="img"></div> -->
           <img class="img" :src="item.img" alt="">
       </div>
       <p>{{item.technicianName}}</p>
       <div class="item-bottom">{{item.workType}}</div>
   </div>
</div>
</template>
<script>

export default {
    props: {
       list: [Array]
    },
    methods: {
        itemClick(item) {
            this.$emit('itemClick', item)
        }
    }
}
</script>
<style scoped>
.tc-list-container {
    padding-top: 25px;
    padding-left: 25px; 
}
.tc-item-box {
    position: relative;
    width: 200px;
    height: 240px;
    background: #FFFFFF;
    border-radius: 2px;
    margin-right: 25px;
    margin-bottom: 40px;
    border: 1px solid #E9EFF3;
}
.tc-item-box:hover {
    border: 2px solid #44C0FF;
}
.header-bg {
    height: 80px;
    background: #E9EFF3;
}
.img-box {
    position: absolute;
    top: 20px;
    left: 50%;
    margin-left: -50px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #fff;
}
.img-box .img {
    position: absolute;
    top: 5px;
    left: 50%;
    margin-left: -45px;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #E9EFF3;
}
.tc-item-box p {
    margin: 50px auto;
    font-size: 18px;
    color: #323C47;
    text-align: center;
}
.item-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 55px;
    text-align: center;
    line-height: 55px;
    background-color: #fff;
    font-size: 14px;
    color: #989DA3;
    border-top: 1px solid #E9EFF3;
}
</style>

<template>
<div class="st-list-container clearfix">
   <div class="st-item-box pull-left" v-for="(item, i) in list" :key="i" @click="itemClick(item)">
       <div class="img-box">
           <!-- <div class="img"></div> -->
           <img class="img" src="../img/station-icon.png" alt="">
       </div>
       <p>{{item.stationName}}</p>
       <div class="item-bottom">{{item.number}}</div>
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
.st-list-container {
    padding-top: 25px;
    padding-left: 25px; 
}
.st-item-box {
    position: relative;
    /* width: 242px;
    height: 282px; */
     width: 200px;
    height: 240px;
    background: #FFFFFF;
    border: 1px solid #E9EFF3;
    border-radius: 2px;
    margin-right: 25px;
    margin-bottom: 40px;
    cursor: pointer;
}
.st-item-box:hover {
    border: 2px solid #44C0FF;
}
.active {
    border: 2px solid #44C0FF;
}
.img-box {
    padding: 40px 0;
}
.img-box .img {
    display: block;
    margin: 0 auto;    
    width: 122px;
    height: 67px;
    /* background-color: #B2BEC6; */
}
.st-item-box p {
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
    background-color: #E9EFF3;
    font-size: 14px;
    color: #67737B;
}
</style>

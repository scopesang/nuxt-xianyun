<template>
  <div class="main">
    <el-row v-for="(item,index) in $store.state.hotel.Citydata.data" :key="index">
        <el-col :span="8">
            <div class="hotelimg">
                <nuxt-link :to="`/hotel/hotelDetails?id=${item.id}`">
                    <img :src="item.photos" alt="">
                </nuxt-link>
            </div>
        </el-col>

        <el-col :span="11">
            <div>
                <nuxt-link :to="`/hotel/hotelDetails?id=${item.id}`">
                    <h2 class="hotelName">{{item.name}}</h2>
                </nuxt-link>
                <div class="pinyin">{{item.alias}}</div>
                <div class="score">
                    <strong>
                    <el-rate v-model="item.stars" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
                    </strong><span><strong>分</strong></span>
                    <span><strong>{{ Math.floor(Math.random()*101) }}</strong>条评价</span>
                    <span><strong>{{ Math.floor(Math.random()*101) }}</strong>篇游记</span>
                </div>
                <div class="address"><i class="iconfont iconshouye"></i> 位于: {{item.address}}</div>
            </div>
        </el-col>

        <el-col :span="5">
        
            <div class="appprice" v-for="(item1,index1) in item.products" :key="index1">
                <span>{{item1.name}}</span><span><i>￥{{item1.price}}</i>起 〉</span>
            </div>
        
        </el-col>
    </el-row>
    </div>
</template>

<script>
export default {
    
    data(){
        return{
            
        }
    },
}
</script>

<style scoped lang="less">
.main{
    width: 1000px;
    height: 210px;
}

//酒店每一项
/deep/.el-row{
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #eee;
}

//封面图
.hotelimg{
    width: 320px;
    height: 210px;
    overflow: hidden;
    margin-right: 50px;
    img{
        width: 100%;
        height: 100%;
    }
}


//酒店名字
.hotelName{
    font-weight: 500;
    font-size: 28px;
    margin-bottom: 2px;
}

//拼音
.pinyin{
    margin-bottom: 10px;
    font-size: 18px;
    color: #999;
}

/deep/.el-rate{
    display: inline-block;
    position: relative;
    bottom: 2px;
    span{
        font-size: 20px;
    }
}


//评分
.score{
    margin-bottom: 10px;
    font-size: 18px;
    span{
        margin-right: 20px;
    }
    strong{
        font-weight: 400;
        color: #f90;
        margin-right: 5px;
    }
}

//地址
.address{
    color: #606266;
}

//携程这些所有价格
.appprice{
    width: 235px;
    line-height: 60px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    i{
        color: #f90;
        font-size: 20px;
    }
}


</style>
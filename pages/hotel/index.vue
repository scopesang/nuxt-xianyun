<template>
  <div class="main">
  <h3 class="title">酒店<span>></span>{{$store.state.hotel.city.name}}酒店预订</h3>

  <el-row>
    <!-- 筛选城市插件 -->
    <CityFilter @getCitydata="getCitydata(data)" />
  </el-row>

  <el-row class="content">
    <!-- 区域均价部分 -->
    <el-col :span="15" >
        <el-row class="area">
          <el-col :span="3">区域：</el-col>
          <el-col :span="21" >
          <div class="area-item" v-for="(item,index) in $store.state.hotel.city.scenics" 
          :key="index"><nuxt-link to="#">{{item.name}}</nuxt-link></div>
          </el-col>
        </el-row>

        <el-row class="average-price">
          <el-col :span="3">均价<el-tooltip class="item" effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top-start">
          <el-button class="wenhao1"><div class="wenhao">?</div></el-button>
          </el-tooltip>
         :</el-col>
          <el-col :span="21">
            <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top-start">
                <span class="average-price-item"><b>♔ ♔ ♔</b>¥332</span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top-start">
                <span class="average-price-item"><b>♔ ♔ ♔ ♔</b>¥521</span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top-start">
                <span class="average-price-item"><b>♔ ♔ ♔ ♔ ♔</b>¥768</span>
            </el-tooltip>
          </el-col>
        </el-row>

    </el-col>

    <!-- 地图部分 -->
    <el-col :span="9">
      <!-- 地图插件 -->
      <Map/>
    </el-col>

  </el-row>

    <el-row>
    <!-- 酒店选项 -->
    <HotelFilter  />
    </el-row>

    <el-row>
    <!-- 酒店列表 -->
    <HotelList />
    </el-row>

    <!-- 分页功能 -->
    <div class="fenye">
    <!-- size-change : 切换条数时触发的事件 -->
    <!-- current-change：切换页数时候触发的事件 -->
    <!-- current-page：当前页数 -->
    <!-- page-size：当前页的条数 -->
    <!-- total总条数 -->
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageIndex"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="form._limit"
    layout="total, prev, pager, next "
    :total="$store.state.hotel.Citydata.total">
    </el-pagination>
    </div>

  </div>
</template>

<script>
//地图
import Map from "@/components/hotel/map"
//城市筛选
import CityFilter from "@/components/hotel/cityFilter"
//酒店筛选
import HotelFilter from "@/components/hotel/hotelFilter"
//酒店列表
import HotelList from "@/components/hotel/hotelList"

export default {
  name: "hotel",
  data(){
    return{
      // citydata:""
      pageIndex:1,  //当前页数 
      form : {
      _start:0,   //从第几条 开始
      _limit:10,  //拿多少条数据
      },
    }
  },

  components:{
    Map,
    CityFilter,
    HotelFilter,
    HotelList
  },
  methods: {
    //选择条数触发的   每页有多少条
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        // this.form._limit = val
        
      },

      //选择页数触发的   第几页
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        // console.log(this.$route.query);   得到 {city: "197", hotelasset: "3", "": null}
        // var query = JSON.stringify(this.$route.query);
        // 把路由的参数 用 this.$route.query 得到一个对象 {city: "197", hotelasset: "3", "": null}
        // 作为params的参数 就可以实现筛选之后 又能分页了
        this.form = this.$route.query 
        //再把分页的参数 通过点语法的形式  加进去给form
        this.form._start = ( val - 1 ) * 10 
        // console.log(this.form._start);
        // console.log(this.form);
        this.$axios({
          url:"/hotels",
          params:this.form
        }).then(res=>{
          // console.log(res);
          //把获得的酒店列表数据 传给store  store就会传给酒店列表的组件了
          this.$store.commit("hotel/setCitydata",res.data)
        })
      }
    },

}
</script>

<style scoped lang="less">
//版心
.main{
  width:1000px;
  margin:0 auto;
}
//中间区域 地图部分
.content{
  margin-bottom: 20px;
}
// 酒店预订头部
.title{
  font-weight: 400;
  font-size: 16px;
  margin: 15px 0;
  span{
    color: #999;
    margin: 0 5px;
  }
}

// 均价问号提示
.wenhao1{
  padding: 0;
  border: 0;
  margin: 0 2px; 
}
.wenhao{
  width: 12px;
  height: 12px;
  background-color: #999;
  border-radius: 50px;
  border: 0
}

// 区域
.area{
  padding: 0 30px 20px 0;
}

.area-item{
  display: flex;
  // flex-wrap: wrap;
  display: inline;
  margin-right: 15px;
  color: #606266;
}

a:hover{
  text-decoration:underline;
  color: #409eff;
}

//均价
.average-price-item{
  margin-right: 20px;
  b{
  color: #f90;
  margin-right: 5px;
  }
}

.fenye {
  display: flex;
  padding: 60px 20px 20px 450px;
  
}

</style>
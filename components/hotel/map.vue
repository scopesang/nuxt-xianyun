<template>
  <div>
    <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=a81acf020eb40d8181a22a6dd326c4e8&plugin=AMap.Driving&plugin=AMap.Autocomplete&plugin=AMap.CitySearch"></script>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      map: "",            // 地图对象
      longitude:113.324590,
      latitude:23.106680,
    }
  },
mounted(){
    this.getMap();
    this.getCityName()
},
methods:{ 
  getMap(){
    var map = new AMap.Map('container', {
        zoom:11,//级别
        // center: [this.longitude, this.latitude],//中心点坐标
        resizeEnable: true
    });
    map.getCenter()
  },

     //定位当前城市提示信息
    getCityName(){
        //获取用户所在城市信息
        //实例化城市查询类
        var citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity((status, result)=>{
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    var cityinfo = result.city;
                    var citybounds = result.bounds;
                    //地图显示当前城市
                    // this.map.setBounds(citybounds);
                    if(cityinfo){
                    this.$alert(`您当前所在的城市是 :  ${cityinfo}`, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                      });
                    }
                }
            } 
        })
    }
},


}
</script>

<style scoped lang="less">
#container {
    width:425px; 
    height: 265px; 
    } 
</style>
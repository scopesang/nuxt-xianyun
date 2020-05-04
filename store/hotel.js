
export const state = ()=>({
    //城市区域的数据
    city:{
        scenics:[]
    },
    //根据城市id获取的酒店详情数据
    Citydata:{
        data:[]
    },
    //城市地图 
    CityMap:"",
    //筛选的酒店数组 已转成字符串
    hotelarr:""
})

export const mutations = {
    //城市区域的数据
    setCity(state,data){
        state.city = data;
    },
    //根据城市id获取的酒店详情数据
    setCitydata(state,data){
        state.Citydata = data;
        state.CityMap = data
    },
    //筛选的酒店数组
    sethotelarr(state,data){
        state.hotelarr = data;
    },
    // 用来获取酒店地图
    setCityMap(state,data){
        state.CityMap = data
    },
}


export const actions = {
    gethotel(store,data){
            this.$axios({
                url:`/hotels`,
                params:data
            }).then(res=>{
                // console.log(res);  //酒店的信息
                // 把获取的酒店列表数据给setCitydata
                store.commit("setCitydata",res.data);

                //切换城市时 就切换地图
                var {longitude,latitude} = res.data.data[0].location
                console.log(latitude);
                  this.longitude = longitude
                  this.latitude = latitude
                var map = new AMap.Map('container', {
                    zoom:11,//级别
                    center: [this.longitude, this.latitude],//中心点坐标
                    resizeEnable: true
                });
                map.getCenter()
                var marker
                for(var i = 0; i < res.data.data.length; i++){
                    marker = new AMap.Marker({
    					position: [res.data.data[i].location.longitude , res.data.data[i].location.latitude ] ,
    					title: res.data.data[i].name,
    					map: map
    				});
                }
                // map.push(marker)
            })
            this.$router.push({
                path:`/hotel?city=${data.city}`,
            })



    },







    gethotelFilter(store,data){
        if(data.length>0){
            // console.log(this.$router);
            // console.log(this.$router.app.$route.query);
            
            this.$axios({
                url:`/hotels?city=${this.$router.app.$route.query.city}&${data}`,
            }).then(res=>{
                //console.log(res);  //酒店的信息
                store.commit("setCitydata",res.data);
                // this.$emit("getCitydata",res.data)
            })
            this.$router.push({
                path:`/hotel?city=${this.$router.app.$route.query.city}&${data}`,
            })
        }
        if(!data){
            this.$axios({
                url:`/hotels?city=${this.$router.app.$route.query.city}`,
            }).then(res=>{
                //console.log(res);  //酒店的信息
                store.commit("setCitydata",res.data);
                // this.$emit("getCitydata",res.data)
            })
            this.$router.push({
                path:`/hotel?city=${this.$router.app.$route.query.city}`,
            })
        }
    },

}



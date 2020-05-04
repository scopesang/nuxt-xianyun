
export const state = ()=>({
    //城市区域的数据
    city:{
        scenics:[]
    },
    //根据城市id获取的酒店详情数据
    Citydata:{
        
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
    }
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
                // this.$emit("getCitydata",res.data)
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



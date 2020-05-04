<template>
  <div class="hoteloptions">
    <el-row class="hotelform">
        <!-- 价格 -->
        <el-col :span="8" class="el-col">
            <span class="demonstration">价格</span><span>0-4000</span>
            <el-slider v-model="price_in" class="pricechanges" :max="4000" show-input :show-input-controls="false"></el-slider>
        </el-col>

        <!-- 住宿等级 -->
        <el-col :span="4" class="el-col">
            <div class="el-col-top">住宿等级</div>
            <el-dropdown>
            <span class="el-dropdown-link">
                <div class="el-col-bottom"><span>{{hotellevel.length==0?"不限":`已选${hotellevel.length}项`}}</span><span>∨</span></div>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-checkbox-group v-model="hotellevel" v-for="(item,index) in hoteldata.levels" :key="index">
                    <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-dropdown-menu>
            </el-dropdown>
        </el-col>

        <!-- 住宿类型 -->
        <el-col :span="4" class="el-col">
            <div class="el-col-top">住宿类型</div>
            <el-dropdown>
            <span class="el-dropdown-link">
                <div class="el-col-bottom"><span>{{hoteltype.length==0?"不限": `已选${hoteltype.length}项` }}</span><span>∨</span></div>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-checkbox-group v-model="hoteltype" v-for="(item,index) in hoteldata.types" :key="index">
                    <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-dropdown-menu>
            </el-dropdown>
        </el-col>

        <!-- 酒店设施 -->
        <el-col :span="4" class="el-col">
            <div class="el-col-top">酒店设施</div>
            <el-dropdown>
            <span class="el-dropdown-link">
                <div class="el-col-bottom"><span>{{hotelasset.length==0?"不限":`已选${hotelasset.length}项`}}</span><span>∨</span></div>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-checkbox-group v-model="hotelasset" v-for="(item,index) in hoteldata.assets" :key="index">
                    <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-dropdown-menu>
            </el-dropdown>
        </el-col>

        <!-- 酒店品牌 -->
        <el-col :span="4" class="el-col">
            <div class="el-col-top">酒店品牌</div>
            <el-dropdown>
            <span class="el-dropdown-link">
                <div class="el-col-bottom"><span>{{hotelbrand.length==0?"不限":`已选${hotelbrand.length}项`}}</span><span>∨</span></div>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-checkbox-group v-model="hotelbrand" v-for="(item,index) in hoteldata.brands" :key="index">
                    <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
    {{hotelStrAll}}
  </div>
</template>

<script>
export default {
data(){
    return{
        hoteldata:"",    //存放一开始获取的星级 类型 设施 品牌 给上面遍历
        price_in:4000 ,     //价格
        hotellevel:[],   //酒店星级
        hoteltype:[],    //酒店类型
        hotelasset:[],   //酒店设施
        hotelbrand:[],   //酒店品牌
        hotelarr:[],

        hotelprice:0,
        hotellevelstr:"",
        hoteltypestr:"",
        hotelassetstr:"",
        hotelbrandstr:"",
    }
},
watch:{
    // 监听价格变化 把价格变成 price_lt=4000  的形式 方便参数使用
    price_in(){
        this.hotelprice = `price_lt=${this.price_in}`
        // console.log(this.hotelprice);
    },
    // 监听 酒店等级 变化 把酒店等级变成 hotellevel=3  的形式 方便参数使用
    hotellevel(){
        // console.log(this.hotellevel); 是一个[1，2，3，4，5 ...]的数组  选中一三五星等级 数组就是[1,3,5] 取消也会随之变化
        if(this.hotellevel){
            // 声明一个常量接收
            var hotellevel;
            // 把数组for循环
            for(let i=0;i<this.hotellevel.length;i++){
                hotellevel += `hotellevel=${this.hotellevel[i]}&`
            }
            // 因为刚开始没选择是空的时候 第一个会是undefined  所以先变成字符串 再用替换的方法 消除掉 undefined
            // 就获取一个字符串的参数 hotellevel=3&hotellevel=3&
            this.hotellevelstr =  this.hotelarr.concat(hotellevel).join("").replace("undefined","")
            // console.log(this.hotellevelstr);
        }
    },
    // 监听 住宿类型 变化 把住宿类型变成 hotellevel=3  的形式 方便参数使用
    hoteltype(){
        // console.log(this.hoteltype); 是一个[1，2，3，4，5 ...]的数组  选中一三五星等级 数组就是[1,3,5] 取消也会随之变化
        if(this.hoteltype){
            var hoteltype;
            for(let i=0;i<this.hoteltype.length;i++){
                hoteltype += `hoteltype=${this.hoteltype[i]}&`
            }
            this.hoteltypestr =  this.hotelarr.concat(hoteltype).join("").replace("undefined","")
            // console.log(this.hoteltypestr);
        }
    },
    // 监听 酒店设施 变化 把酒店设施变成 hotellevel=3  的形式 方便参数使用
    hotelasset(){
        // console.log(this.hotelasset); 是一个[1，2，3，4，5 ...]的数组  选中一三五星等级 数组就是[1,3,5] 取消也会随之变化
        if(this.hotelasset){
            var hotelasset;
            for(let i=0;i<this.hotelasset.length;i++){
                hotelasset += `hotelasset=${this.hotelasset[i]}&`
            }
            this.hotelassetstr =  this.hotelarr.concat(hotelasset).join("").replace("undefined","")
            // console.log(this.hotelassetstr);
        }
    },
    // 监听 酒店品牌 变化 把酒店品牌变成 hotellevel=3  的形式 方便参数使用
    hotelbrand(){
        // console.log(this.hotelbrand);  是一个[1，2，3，4，5 ...]的数组  选中一三五星等级 数组就是[1,3,5] 取消也会随之变化
        if(this.hotelbrand){
            var hotelbrand;
            for(let i=0;i<this.hotelbrand.length;i++){
                hotelbrand += `hotelbrand=${this.hotelbrand[i]}&`
            }
            this.hotelbrandstr =  this.hotelarr.concat(hotelbrand).join("").replace("undefined","")
            // console.log(this.hotelbrandstr);
        }
    },
},
computed:{
    hotelStrAll(){
        const filterArray = [
            { filter: this.hotellevelstr },
            { filter: this.hoteltypestr  },
            { filter: this.hotelassetstr },
            { filter: this.hotelbrandstr },      
            { filter: this.hotelprice },      
        ];
        // 通过filter方法 把 有选择 就有值 的对象筛选出来 
        let checks =  filterArray.filter(item => item.filter);
        var checksRes
        if(checks.filter !== ""){
        checks.forEach(item=>{
            //声明一个常量来拼接 数组每一项的对象 把字符串都合在一起
            checksRes +=  item.filter
        })
        }
        // 再把它变成字符串 才能用replace方法
        checksRes = `${checksRes}`
            // 因为刚开始没选择是空的时候 第一个会是undefined  所以先变成字符串 再用替换的方法 消除掉 undefined
            // 就获取一个字符串的参数 hotellevel=3&hotellevel=3&
        var checksRes1 = checksRes.replace(undefined,"")
        // console.log(checksRes1);
        // 再把最终拼接的参数 传给store的actions去请求数据
        this.$store.dispatch("hotel/gethotelFilter",checksRes1)
        return ''
    }
},
mounted(){
    //请求酒店选项
        this.$axios({
            url:"/hotels/options",
        }).then(res=>{
            // console.log(res);
            this.hoteldata = res.data.data;
        })
},
methods: {
    


    formatTooltip(val) {
        return val / 100;
    }

},


}
</script>

<style scoped lang="less">
.hoteloptions {
    padding: 10px 0;
    border: 1px solid #eee;
    width: 1000px;
    height: 75px;
    margin-bottom: 20px;
    // box-sizing: border-box;
}

/deep/.el-row{
    height: 75px;
}

//价格条
.pricechanges{
    margin: 0;
    padding: 0;
    width: 370px;
    margin-top: 5px;
}
//价格条上面的文字
.demonstration{
    margin-right: 10px;
    color: #606266;
}

//筛选列表的每一项
.el-col {
    border-right: 0.1px solid #eee;
    height: 100%;
    width: 185px;
    padding: 0 20px;
}
//第一个
.el-col:nth-child(1){
    width: 250px;
}
//最后一个
.el-col:last-child{
    border-right: 0
}

// 每一项里面 上面的文字
.el-col-top{
    // margin-right: 80px;
    width: 100%;
    margin-bottom: 12px;
}

// 每一项里面 下面的文字
/deep/.el-col-bottom{
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.el-dropdown {
    width: 100%;
    // height: 100%;
}

//弹出的下拉菜单
.el-dropdown-menu {
    width: 180px;
    height: 250px;
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0 0 20px;
    margin: 5px 0;
    background-color: #FFF;
    border: 1px solid #EBEEF5;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    overflow-y: scroll;
    // box-sizing: border-box;
}


//下拉菜单的弹出框
/deep/.el-checkbox{
    width: 100%;
    height: 100%;
}

//下拉菜单里面的文字
/deep/.el-checkbox__label {
    display: inline-block;
    padding-left: 10px;
    margin-left: 10px;
    font-size: 18px;
    line-height: 40px;
}
//下拉菜单里面的多选框
/deep/.el-checkbox__inner{
    border-radius: 50px;
    border: 1px #606266 solid;
}
/deep/.el-input{
    position: absolute;
    bottom: 3px;
    right: 150px;
    width: 80px;
}



</style>
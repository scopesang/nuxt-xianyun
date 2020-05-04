<template>
  <div class="filter">
      <!-- 切换城市 -->
    <el-autocomplete
      class="inline-input"
      v-model="cityName"
      :fetch-suggestions="querySearch"
      placeholder="切换城市"
      :trigger-on-focus="false"
      @select="handleSelect"
       @blur="handleCityBlur"
    ></el-autocomplete>

    <!-- 入住 离店 日期 -->
    <el-date-picker
      class="date"
      v-model="date"
      type="daterange"
      range-separator="一"
      start-placeholder="入住日期"
      value-format="yyyy-MM-dd"
      end-placeholder="离店日期"
      @change="handleDate(date)">
    </el-date-picker>


    <!-- 人数 -->
    <el-popover
    placement="bottom"
    width="250"
    hight="120"
    v-model="visible">
    <span>每间： </span>
    <!-- 成人 -->
    <el-dropdown trigger="click" @command="handleCommandPeople">
        <span class="el-dropdown-link">
            {{people?people:2}}成人<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">1</el-dropdown-item>
            <el-dropdown-item command="2">2</el-dropdown-item>
            <el-dropdown-item command="3">3</el-dropdown-item>
            <el-dropdown-item command="4">4</el-dropdown-item>
            <el-dropdown-item command="5">5</el-dropdown-item>
            <el-dropdown-item command="6">6</el-dropdown-item>
            <el-dropdown-item command="7">7</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
    <!-- 儿童 -->
    <el-dropdown trigger="click" @command="handleCommandChild">
        <span class="el-dropdown-link">
            {{child?child:0}}儿童<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">0</el-dropdown-item>
            <el-dropdown-item command="1">1</el-dropdown-item>
            <el-dropdown-item command="2">2</el-dropdown-item>
            <el-dropdown-item command="3">3</el-dropdown-item>
            <el-dropdown-item command="4">4</el-dropdown-item>
            <el-dropdown-item command="5">5</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>

    <div style="text-align: right; margin: 0">
        <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
    </div>
    <el-input slot="reference" placeholder="人数未定" class="people"
    suffix-icon="el-icon-user" v-model="allPeople" readonly="readonly"></el-input>
    </el-popover>


    <!-- 查看价格按钮 -->
    <el-button type="primary" @click="handlesearch">查看价格</el-button>




  </div>
</template>

<script>
export default {
    data(){
        return{
            visible: false, //是否确定选择人数

            
            Cities:[],// 城市下拉列表的数据
            cityName:"",//城市名称
            form:{
                city:"",            //城市id
                enterTime: "",     //入店日期
                leftTime:""  ,     //离店日期
            },
            date:"",        //入住日期    
            people:"",      //入住成人
            child:"",       //入住儿童
        }
    },

    computed:{
        //入住总人数
        allPeople(){ 
            let people = "";
            let child = "";
        if(this.people){
            people = `${this.people}成人`
        }
        if(this.child){
            child = `  ${this.child}儿童`
        }
        return  people + child
        }
    },
    methods:{

        //封装请求城市
        getCity(value){
            // 请求和value相关的文字
            return this.$axios({
                url:"/cities",
                params:{
                    name:value
                }
            }).then(res=>{
                // console.log(res);
                const {data} = res.data;
                // 因为cb里面的每个对象里面必须要有value 所以要map添加
                // map必须要retur；！！！！！！！
                const newData = data.map(v=>{
                    v.value = v.name
                    return v;
                });
                return newData;
            })
        },
        // 监听  切换城市  输入框的变化，一旦输入框的文字发生了变化，就会触发该这个事件
        // value是输入框的值 cb是函数必须要调用的
        //cb接收的参数有个固定的格式，参数必须是一个数组，且数组里面每一项都必须是 对象，每个对象必须要有value
        querySearch(value, cb){
            if(!value){
                cb([])
                return
                }
            this.getCity(value,cb).then(newData=>{
            // 保存到data中，给blur事件使用，失去焦点选择第一个
            this.Cities = newData
            // cb是函数必须要调用的
            cb(newData);
            })
      },

      //下拉选择时触发
      handleSelect(item) {
        this.$store.commit("hotel/setCity",item);
       // console.log(item); //城市详细信息
        this.form.city = item.id;
        // console.log(this.date);
        // console.log(this.form.enterTime);
        // console.log(this.form.leftTime);
        this.$store.dispatch("hotel/gethotel",this.form)
      },

    //查看价格
    handlesearch(){
        this.$store.dispatch("hotel/gethotel",this.form)
    },


    //选择入住成人触发的
      handleCommandPeople(command) {
        // console.log(command);
        this.people = +command;
      },

        handleCommandChild(command) {
        // console.log(command);
        this.child = +command;
        },
        //选择城市输入框失去焦点
        handleCityBlur(){
            if(this.Cities.length>0){
                //选择获得的城市的数组的第一个
                this.cityName = this.Cities[0].value;
                // 同时调用 下拉选择时触发 的函数 并把选择的城市传给他
                this.handleSelect(this.Cities[0])
            }
        },
        // 获取入店 离店 日期参数
        handleDate(date){
            this.form.enterTime=date[0];
            this.form.leftTime=date[1];
        },

    }
}
</script>

<style scoped lang="less">
.filter{
    margin: 5px 0 30px 5px;
}

//切换城市输入框
.inline-input{
    width: 220px;
    height: 40px;
    margin-right: 15px;
}

//入住 离店 日期 
.date{
    width: 380px;
    height: 40px;
    margin-right: 10px;
}

//确定人数
.people {
    width: 220px;
    height: 40px;
    margin-right: 15px;
}

.el-dropdown-menu{
    width: 100px;
    text-align: center
}

//下拉菜单里面的文字
/deep/.el-radio__label{
    display: inline-block;
    // padding-left: 10px;
    margin-left: 5px;
    font-size: 18px;
    line-height: 30px;
}

/deep/.el-dropdown-link{
    padding: 0 5px;
    display: inline-block;
    width: 75px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #999;
    border-radius: 5px;
    margin: 0 5px 20px 0;
    letter-spacing: 5px; //字间距
}

</style>
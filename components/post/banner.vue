<template>
  <div>
    <el-row>
      <div id="banner">
        <el-col :span="10" :offset="7" class="search">
          <div class="search-input">
            <i class="el-icon-search"></i>
            <el-input
              v-model="input"
              placeholder="请输入想去的地方,比如 ‘广州’"
              :span="10"
              @keyup.enter.native="search(input)"
            ></el-input>
          </div>
          <p>
            搜索记录
            <span
              v-for="(item,index) in this.$store.state.post.searchHistory "
              :key="index"
              class="spanhover"
            >
              <a @click="search(item)">{{item}}</a>
              <i class="el-icon-close" @click="delSearchHistory(index)"></i>
            </span>
          </p>
        </el-col>
        <el-col :span="3" class="cities">
          <ul>
            <li
              v-for="(item,index) in cities"
              :key="index"
              @mouseenter="showCityChild(item.children)"
            >
              {{item.type}}
              <i class="el-icon-arrow-right"></i>

              <div class="childCities">
                <div v-for="(item,index) in itemChild" :key="index" @click="search(item.city)">
                  <p>
                    {{index+1}}
                    <i>{{item.city}}</i>
                  </p>
                  <span>{{item.desc}}</span>
                </div>
              </div>
            </li>
          </ul>
        </el-col>
        <!-- <el-col :span="4" class="citiesChild" v-if="hidden">
          <ul>
            <li v-for="(item,index) in itemChild" :key="index">
              <h3>{{item.city}}</h3>
              <span>{{item.desc}}</span>
            </li>
          </ul>
        </el-col>-->
      </div>
    </el-row>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      input: "",
      cities: "",
      itemChild: ""
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      console.log(res.data.data);

      this.cities = res.data.data;
    });
  },

  methods: {
    search(value) {
      if (value.trim() == "") {
        this.$message({
          message: "内容不能为空",
          type: "warning"
        });
        return;
      }
      this.$router.push({
        path: "/post",
        query: {
          city: value
        }
      });
      this.$store.commit("post/setSearchHistory", this.input);
    },
    delSearchHistory(index) {
      this.$store.commit("post/delSearchHistory", index);
    },
    showCityChild(itemChild) {
      this.itemChild = itemChild;
    }
  }
};
</script>

<style lang="less" scoped>
.spanhover {
  transition: all 1s ease;
}
.spanhover:hover {
  background-color: black;
  color: #ffffff;
  padding: 0px 10px;
  border-radius: 20px;
  cursor: pointer;
}
#banner {
  height: 300px;
  background-image: url(../../assets/images/th.jpg);
  background-size: cover;
  position: relative;
  .cities {
    position: absolute;
    bottom: 0;
    ul {
      list-style: none;
      position: relative;

      li:hover {
        color: #ffa500;
        border-right: none;
      }
      li:hover .childCities {
        display: block;
      }
      li {
        box-sizing: border-box;
        padding: 0px 20px;
        line-height: 40px;
        background-color: white;
        display: flex;
        justify-content: space-between;
        text-align: left;
        align-items: center;
        border: 1px solid #f2f2f2;

        .childCities {
          display: none;
          position: absolute;
          right: -120%;
          top: 0;
          width: 120%;

          div {
            box-sizing: border-box;
            padding: 0px 10px;
            background-color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            cursor: pointer;

            p {
              width: 40%;
              font-weight: 500;
              font-size: 18px;
            }
            p:hover i {
              text-decoration: underline;
            }
            span {
              width: 60%;
              display: block;
              color: #999999;
              display: block;
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            span:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

  p {
    margin-top: 10px;
  }
  /deep/ .search {
    position: absolute;
    bottom: -50px;
    .search-input {
      position: relative;
      z-index: 99;
      i {
        position: absolute;
        left: 10px;
        top: 10px;
        color: #aeaeae;
        display: block;
        font-size: 40px;
        z-index: 99;
      }
      input {
        height: 60px;
        padding-left: 80px;
        font-size: 20px;
        box-shadow: 0px 10px 10px #c1c1c1;
      }
      input:focus {
        border: 2px solid #409eff;
      }
    }
  }
}
</style>
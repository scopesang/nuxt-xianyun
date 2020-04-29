<template>
  <main id="post">
    <el-row>
      <div id="banner">
        <el-col :span="10" :offset="7" class="search">
          <div class="search-input">
            <i class="el-icon-search"></i>
            <el-input v-model="input" placeholder="请输入想去的地方,比如 ‘广州’" :span="10"></el-input>
          </div>
        </el-col>
      </div>
    </el-row>

    <el-row class="post-list">
      <div class="post-list-item">
        <el-col :span="14">
          <div class="list-item-title">
            <h2>小蛮腰广州塔，怎么玩才不遗憾？</h2>
            <div id="learn-more">
              <div class="learn-more">查看原文</div>
            </div>

            <div class="item-info">
              <div class="user">
                <p>
                  <i class="el-icon-location-outline">广州市</i>
                </p>
                <div>
                  <i class="user-pic">头像</i>
                  <span class="user-name">by:地球发动机</span>
                </div>
              </div>
              <div class="handleIcon">
                <i class="el-icon-view">300</i>
                <i class="el-icon-star-off">3000</i>
                <i class="el-icon-edit-outline">1000</i>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="item-img">
            <div class="list-item-content">
              <p>大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或最</p>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>

    <el-row class="post-list">
      <div class="post-list-item">
        <el-col :span="10" class="left-img">
          <div class="item-img"></div>
        </el-col>
        <el-col :span="14">
          <div class="list-item-title">
            <h2>小蛮腰广州塔，怎么玩才不遗憾？</h2>
            <div id="learn-more">
              <div class="learn-more">查看原文</div>
            </div>

            <div class="item-info">
              <div class="user">
                <p>
                  <i class="el-icon-location-outline">广州市</i>
                </p>
                <div>
                  <i class="user-pic">头像</i>
                  <span class="user-name">by:地球发动机</span>
                </div>
              </div>
              <div class="handleIcon">
                <i class="el-icon-view">300</i>
                <i class="el-icon-star-off">3000</i>
                <i class="el-icon-edit-outline">1000</i>
              </div>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
  </main>
</template>

<script>
export default {
  data() {
    return {
      input: ""
    };
  }
};
</script>

<style lang="less" scoped>
#post {
  #banner {
    height: 300px;
    background-image: url(../../assets/images/th.jpg);
    background-size: cover;
    position: relative;
    /deep/ .search {
      position: absolute;
      bottom: -30px;
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

  .post-list {
    margin-top: 100px;

    .post-list-item {
      .left-img {
        position: relative;
      }
      margin-bottom: 10px;
      .list-item-title {
        color: ivory;
        letter-spacing: 2px;
        box-sizing: border-box;
        height: 400px;
        padding: 100px 80px 100px 50px;
        background-image: url(../../assets/images/th.jpg);
        background-size: contain;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;

        h2 {
          letter-spacing: 3px;
          font-size: 40px;
        }
        .item-info {
          width: 100%;
          p {
            padding-bottom: 20px;
            i {
              font-size: 25px;
            }
            i::before {
              padding-right: 10px;
            }
          }
          .handleIcon {
            display: flex;
            justify-content: flex-end;

            i {
              font-size: 25px;
              margin-left: 30px;
            }
          }
        }
        #learn-more {
          width: 100%;
          display: flex;
          justify-content: flex-end;

          .learn-more {
            border: 3px solid #ffffff;
            font-size: 20px;
            padding: 10px 50px;
            margin-top: 30px;
            cursor: pointer;
          }
          .learn-more:hover {
            background-color: black;
          }
        }
      }

      .item-img {
        position: relative;
        height: 400px;
        background-image: url(../../assets/images/th.jpg);
        background-size: cover;
        .list-item-content {
          box-sizing: border-box;
          position: absolute;
          left: -50px;
          bottom: 0;
          min-width: 500px;
          max-width: 600px;
          background-color: #f2f2f2;
          height: 300px;
          padding: 20px 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            background-color: #ffffff;
            font-size: 20px;
            font-weight: 600px;
            line-height: 2;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="post">
    <el-row class="post-title" type="flex">
      <el-col :span="8" :offset="4" class="border">
        <nuxt-link to="/post">
          <h2>
            推荐攻略
            <span>>{{$route.query.city}}</span>
          </h2>
        </nuxt-link>
      </el-col>
      <el-col :span="8" class="border" style="text-align:right">
        <nuxt-link to="/post/article">
          <el-button type="primary" icon="el-icon-edit">写周游</el-button>
        </nuxt-link>
      </el-col>
    </el-row>

    <div>
      <div v-if="data.length==0">
        <el-row>
          <el-col :span="10" :offset="4">暂无数据</el-col>
        </el-row>
      </div>
      <div v-if="!data" v-loading="true">
        <el-row>
          <el-col :span="16" :offset="4" class="loading"></el-col>
        </el-row>
      </div>
      <div v-for="(item,index) in items" :key="index">
        <el-row class="post-list" v-if="item.images.length>2">
          <div class="post-list-item">
            <el-col :span="10" :offset="4">
              <div class="list-item-title" :style="`background-image:url(${item.images[0]})`">
                <div class="zezhao">
                  <nuxt-link :to="`/post/detail?id=${item.id}`">
                    <h2>{{item.title}}</h2>
                    <div id="learn-more">
                      <div class="learn-more">查看原文</div>
                    </div>
                  </nuxt-link>

                  <div class="item-info">
                    <div class="user">
                      <p>
                        <i class="el-icon-location-outline">{{item.cityName}}</i>
                      </p>

                      <div class="userInfo">
                        <img
                          :src="`${$axios.defaults.baseURL +item.account.defaultAvatar}`"
                          alt
                          width="30PX"
                        />

                        <span class="user-name">by:{{item.account.nickname}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="handleIcon">
                    <i class="el-icon-view">{{item.watch>999? `999+` : item.watch}}</i>
                    <i class="el-icon-star-off">{{item.like}}</i>
                    <i class="el-icon-edit-outline">1000</i>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="item-img" :style="`background-image:url(${item.images[1]})`">
                <div class="list-item-content" :style="`background-image:url(${item.images[2]})`">
                  <p>{{item.summary}}</p>
                </div>
              </div>
            </el-col>
          </div>
        </el-row>

        <el-row class="post-list" v-else-if="item.images.length==1">
          <el-col
            :offset="4"
            :span="6"
            class="left-imga"
            :style="`background-image:url(${item.images[0]})`"
          ></el-col>
          <el-col :offset="4" :span="6" class="left"></el-col>

          <div class="post-list-item">
            <el-col :span="10">
              <div class="list-item-title" id="typeTwo">
                <nuxt-link :to="`/post/detail?id=${item.id}`">
                  <h2>{{item.title}}</h2>
                  <p class="summary">{{item.summary}}</p>

                  <div id="learn-more">
                    <div class="learn-more">查看原文</div>
                  </div>
                </nuxt-link>

                <div class="item-info">
                  <div class="user">
                    <p>
                      <i class="el-icon-location-outline">{{item.cityName}}</i>
                    </p>
                    <div class="userInfo">
                      <img
                        :src="`${$axios.defaults.baseURL +item.account.defaultAvatar}`"
                        alt
                        width="30PX"
                      />
                      <span class="user-name">by:{{item.account.nickname}}</span>
                    </div>
                  </div>
                  <div class="handleIcon">
                    <i class="el-icon-view">{{item.watch>999? `999+` : item.watch}}</i>
                    <i class="el-icon-star-off">{{item.like}}</i>
                    <i class="el-icon-edit-outline">1000</i>
                  </div>
                </div>
              </div>
            </el-col>
          </div>
        </el-row>

        <el-row class="post-list" v-else-if="item.images.length==0">
          <div class="post-list-item">
            <el-col :span="16" :offset="4">
              <div class="list-item-title" id="typeThree">
                <nuxt-link :to="`/post/detail?id=${item.id}`">
                  <h2>{{item.title}}</h2>
                  <p class="summary">{{item.summary}}</p>
                </nuxt-link>
                <div id="learn-more">
                  <div class="learn-more">查看原文</div>
                </div>

                <div class="item-info">
                  <div>
                    <p>
                      <i class="el-icon-location-outline">{{item.cityName}}</i>
                    </p>
                    <div class="userInfo">
                      <img
                        :src="`${$axios.defaults.baseURL +item.account.defaultAvatar}`"
                        alt
                        width="30PX"
                      />
                      <span class="user-name">by:{{item.account.nickname}}</span>
                    </div>
                  </div>
                  <div class="handleIcon">
                    <i class="el-icon-view">{{item.watch>999? `999+` : item.watch}}</i>
                    <i class="el-icon-star-off">{{item.like}}</i>
                    <i class="el-icon-edit-outline">1000</i>
                  </div>
                </div>
              </div>
            </el-col>
          </div>
        </el-row>
      </div>
    </div>

    <el-row type="flex" justify="center">
      <el-col :span="16">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="data.length"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemList: this.data,
      currentPage: 1,
      pageSize: 5
    };
  },
  props: ["data"],
  mounted() {},
  computed: {
    items: function() {
      if (this.data) {
        return this.data.slice(
          this.pageSize * (this.currentPage - 1),
          this.pageSize * this.currentPage
        );
      }
    }
  },
  methods: {
    showList() {
      console.log(
        this.data.slice(
          this.pageSize * (this.currentPage - 1),
          this.pageSize * this.currentPage
        )
      );
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.showList();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.left {
  height: 400/2378 * 100vw;
  background-color: rgb(51, 51, 51);
}
.loading {
  height: 400/2378 * 100vw;
  background-color: #f2f2f2;
}
.userInfo {
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
  }

  span {
    margin-left: 10/2378 * 100vw;
  }
}
.border {
  border-bottom: 1px solid #c9c9c9;
}
.summary {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.post {
  margin-top: 100/2378 * 100vw;
  .post-title {
    h2 {
      color: #ffa500;
      padding-bottom: 10/2378 * 100vw;
      border-bottom: 3px solid #ffa500;
      span {
        color: #ffa500;
        font-weight: 500;
      }
    }
  }
}
/deep/ .el-pagination {
  margin-top: 20/2378 * 100vw;
  text-align: center;
}
.post-list {
  position: relative;
  margin-top: 10/2378 * 100vw;
  .left-imga {
    position: absolute;
    background-size: cover;
    height: 100%;
    left: 0;
    transform: scale(1.1, 1.3) perspective(1.5em) rotateX(1.2deg);
    transform-origin: bottom left;
  }

  .post-list-item {
    margin-bottom: 10px;
    .list-item-title:hover {
      background-size: 1000/2378 * 100vw 500/2378 * 100vw;
    }
    .zezhao {
      box-sizing: border-box;
      padding: 100/2378 * 100vw 80/2378 * 100vw 100/2378 * 100vw 50/2378 * 100vw !important;
      background-color: #000000a6;
      width: 100%;
      height: inherit;
      .handleIcon {
        display: flex;
        justify-content: flex-end;

        i {
          font-size: 25/2378 * 100vw;
          margin-left: 30/2378 * 100vw;
        }
      }
    }
    #typeTwo {
      padding: 20/2378 * 100vw 80/2378 * 100vw 20/2378 * 100vw 80/2378 * 100vw !important;
      background-color: #333333 !important;
    }
    #typeThree {
      background-color: #333333 !important;
      background-image: none;
      padding: 80/2378 * 100vw 80/2378 * 100vw 50/2378 * 100vw 80/2378 * 100vw !important;
    }
    .list-item-title {
      -webkit-transition: all 2s; /* Safari and Chrome */
      transition: all 2s;
      color: ivory;
      letter-spacing: 2px;
      box-sizing: border-box;
      height: 400/2378 * 100vw;
      background-size: 880/2378 * 100vw 400/2378 * 100vw;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;

      h2 {
        letter-spacing: 3px;
        font-size: 40/2378 * 100vw;
        cursor: pointer;
      }
      h2:hover {
        color: #ffa500;
      }
      .item-info {
        width: 100%;
        p {
          padding-bottom: 20/2378 * 100vw;
          i {
            font-size: 25/2378 * 100vw;
          }
          i::before {
            padding-right: 10/2378 * 100vw;
          }
        }
        .handleIcon {
          display: flex;
          justify-content: flex-end;

          i {
            font-size: 25/2378 * 100vw;
            margin-left: 30/2378 * 100vw;
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
          padding: 10/2378 * 100vw 50/2378 * 100vw;
          margin-top: 20/2378 * 100vw;
          cursor: pointer;
        }
        .learn-more:hover {
          background-color: black;
        }
      }
    }

    .item-img {
      position: relative;
      height: 400/2378 * 100vw;
      background-size: contain;
      .list-item-content {
        box-sizing: border-box;
        position: absolute;

        bottom: 0;
        right: 0;
        width: 100%;
        background-size: contain;
        height: 300/2378 * 100vw;
        padding: 20/2378 * 100vw 30/2378 * 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          background-color: #0000008c;
          padding: 20/2378 * 100vw 20/2378 * 100vw;
          width: 100%;
          height: 150/2378 * 100vw;
          color: #ffffff;
          font-size: 20/2378 * 100vw;
          font-weight: 600;
          line-height: 2;
        }
      }
    }
  }
}
</style>
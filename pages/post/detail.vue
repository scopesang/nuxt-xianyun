<template>
  <div class="container clearfix">
    <div class="content">
      <div class="header">
        <span @click="$router.push('/post')" style="cursor:pointer;">旅游攻略</span>
        <i>/</i>攻略详情
        <h1>{{detail.title}}</h1>
      </div>
      <div class="main">
        <div class="post-info clearfix">
          <span>攻略：{{moment(detail.account.created_at).format('YYYY-MM-DD')}} 阅读：{{detail.watch}}</span>
        </div>
        <div class="post-content" ref="post_content"></div>
        <div class="icon">
          <div class="icon-item">
            <i class="iconfont iconpinglun"></i>
            <p>评论({{comments.length}})</p>
          </div>
          <div class="icon-item">
            <i class="iconfont iconfenxiang"></i>
            <p>分享</p>
          </div>
        </div>
      </div>
      <div class="comment">
        <div class="post-title">评论</div>
        <div
          ref="reply"
          class="reply"
          style="margin-bottom:10px;display:inline-block;background:#ddd;padding:5px 10px;border-radius:50px;font-size:14px;position:relative;display:none;"
        >
          回复:{{nickname}}
          <i
            style="position:absolute;padding:2px 5px;border-radius:50%;background:red;font-size:10px;top:-3px;right:-7px;color:white;cursor:pointer"
            @click="clearReply"
          >X</i>
        </div>
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="textarea"
          style="resize:none;"
        ></el-input>
        <div class="upload clearfix">
          <div class="pic">
            <el-upload
              name="files"
              action="http://157.122.54.189:9095/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
          <div class="submit" @click="onSubmit">提交</div>
        </div>
        <div class="cm-list">
          <div class="parent clearfix" v-for="(item,index) in comments" :key="index">
            <div class="user">
              <img :src="`http://157.122.54.189:9095`+item.account.defaultAvatar" alt />
              {{item.account.nickname}}
              <span>{{moment(item.created_at).format('YYYY-MM-DD')}}</span>
            </div>
            <div class="parent-content">
              <sonComponent :data="item.parent" v-if="item.parent" @reply="handleReply"></sonComponent>
              <div class="cmt-message">{{item.content}}</div>
              <div>
                <img
                  v-for="(item,index) in item.pics"
                  :key="index"
                  :src="`http://157.122.54.189:9095`+item.url"
                  alt
                  style="width:80px;height:80px;padding-right:5px"
                />
              </div>
            </div>
            <div class="cmt-ctrl">
              <a href="javascript:;" @click="handleReply(item)" ref="pubReply">回复</a>
            </div>
          </div>
        </div>
      </div>
      <div class="Pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <div class="aside">
      <div class="aside-title">相关攻略</div>
      <div v-for="(item,index) in asideArticle" :key="index">
        <post1 v-if="item.images.length==0" :data="item"></post1>
        <post2 v-if="item.images.length==1" :data="item"></post2>
        <post3 v-if="item.images.length>1 && item.images.length<=3" :data="item"></post3>
      </div>
    </div>
  </div>
</template>

<script>
import post1 from "@/components/post/postItem1";
import post2 from "@/components/post/postItem2";
import post3 from "@/components/post/postItem3";
import sonComponent from "@/components/post/sonComponent";
import moment from "moment";
export default {
  mounted() {
    const { id } = this.$route.query;
    this.postId = id;
    //获取文章
    this.$axios({
      url: "/posts",
      params: {
        id
      }
    }).then(res => {
      this.detail = res.data.data[0];
      this.$refs.post_content.innerHTML = this.detail.content;
    });
    //获取侧边栏文章
    this.$axios({
      url: "/posts/recommend",
      params: {
        id
      }
    }).then(res => {
      const { data } = res.data;
      this.asideArticle = data;
    });
    //获取文章评论
    this.getComments();
  },
  watch: {
    $route() {
      this.$router.go(0);
    }
  },
  data() {
    return {
      moment,
      dialogImageUrl: "",
      dialogVisible: false,
      textarea: "",
      detail: {
        account: {}
      },
      asideArticle: [],
      comments: [],
      fileList: [],
      postId: "",
      replyId: "",
      nickname: "",
      currentPage: 1,
      start: 0,
      total: 0,
      pageSize: 5
    };
  },
  components: {
    post1,
    post2,
    post3,
    sonComponent
  },
  methods: {
    //封装渲染评论
    getComments() {
      this.$axios({
        method: "get",
        url: "/posts/comments",
        params: {
          post: this.postId,
          _start: this.start,
          _limit: this.pageSize
        }
      }).then(res => {
        const { total } = res.data;
        const { data } = res.data;
        this.total = total;
        this.comments = data;
      });
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file, fileList) {
      this.fileList = fileList;
    },
    //提交事件
    onSubmit() {
      const files = this.fileList.map(v => {
        return v.response[0];
      });
      if (this.replyId) {
        this.$axios({
          method: "post",
          url: "/comments",
          headers: {
            Authorization: `Bearer ` + this.$store.state.user.userInfo.token
          },
          data: {
            content: this.textarea,
            follow: this.replyId,
            post: this.postId,
            pics: files
          }
        }).then(res => {
          this.$message.success(res.data.message);
          this.fileList = [];
          this.textarea = "";
          this.replyId = "";
          this.$refs.reply.style.display = "none";
          this.nickname = "";
          this.getComments();
        });
      } else {
        this.$axios({
          method: "post",
          url: "/comments",
          headers: {
            Authorization: `Bearer ` + this.$store.state.user.userInfo.token
          },
          data: {
            content: this.textarea,
            pics: files,
            post: this.postId
          }
        }).then(res => {
          this.$message.success(res.data.message);
          this.fileList = [];
          this.textarea = "";
          this.$refs.reply.style.display = "none";
          this.nickname = "";
          this.getComments();
        });
      }
    },
    //获取组件传过来的id
    handleReply(item) {
      const { nickname } = item.account;
      const { id } = item;
      this.replyId = id;
      this.nickname = nickname;
      this.$refs.reply.style.display = "inline-block";
      document.documentElement.scrollTop = 1900;
    },
    //清空回复人
    clearReply() {
      this.replyId = "";
      this.nickname = "";
      this.$refs.reply.style.display = "none";
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getComments();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.start = (val - 1) * this.pageSize;
      this.getComments();
    }
  }
};
</script>
<style lang="less" scoped>
.clearfix::after {
  content: "";
  height: 0;
  clear: both;
  display: block;
  visibility: hidden;
}
.container {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  .content {
    width: 700px;
    margin-right: 20px;
    float: left;
    .header {
      font-size: 14px;
      i {
        margin: 0px 10px;
      }
      span {
        font-weight: bold;
      }
      h1 {
        padding: 20px 0;
        font-size: 32px;
        border-bottom: 1px solid #dddddd;
      }
    }
    .main {
      .post-info {
        padding: 20px 20px 20px 0;
        span {
          float: right;
          color: #9999b3;
        }
      }
      .icon {
        padding: 60px 0 30px 0;
        text-align: center;
        .icon-item {
          i {
            font-size: 30px;
            color: orange;
          }
          margin: 0 15px;
          display: inline-block;
        }
      }
    }
    .comment {
      .post-title {
        font-size: 18px;
        margin-bottom: 20px;
      }
      .upload {
        margin-top: 5px;
        margin-bottom: 30px;
        .pic {
          float: left;
        }
        .submit {
          cursor: pointer;
          float: right;
          font-size: 12px;
          padding: 7px 15px;
          color: white;
          background: #409eff;
        }
      }
      .cm-list {
        border: 1px solid #dddddd;
        margin-bottom: 20px;
        padding: 20px 20px 5px 20px;
        .parent {
          .user {
            margin-top: 3px;
            margin-bottom: 10px;
            img {
              vertical-align: middle;
              width: 16px;
              height: 16px;
              margin: 0;
              border-radius: 50%;
              margin-right: 5px;
            }
            span {
              font-size: 12px;
              color: #99a6c4;
            }
          }
          .parent-content {
            .son {
              border: 1px solid #ddd;
              padding: 3px;
              .user {
                img {
                  vertical-align: middle;
                  width: 16px;
                  height: 16px;
                  margin: 0;
                  border-radius: 50%;
                  margin-right: 5px;
                }
                span {
                  font-size: 12px;
                  color: #99a6c4;
                }
              }
              .son-content {
                margin-top: 10px;
                word-wrap: break-word;
              }
              .cmt-ctrl {
                float: right;
                padding-right: 10px;
                display: none;
              }
            }
            padding-left: 30px;
            margin-top: 10px;
          }
          .cmt-message {
            margin: 10px 0px;
            word-wrap: break-word;
          }
          .cmt-ctrl {
            float: right;
            padding-right: 10px;
          }
        }
        .parent > .cmt-ctrl {
          font-size: 14px;
          visibility: hidden;
        }
        .parent:hover > .cmt-ctrl {
          visibility: initial;
        }
      }
    }
    .Pagination {
      padding-bottom: 20px;
    }
  }
  .aside {
    width: 280px;
    float: left;
    .aside-title {
      font-size: 18px;
      padding-bottom: 10px;
      border-bottom: 1px solid #dddddd;
    }
  }
}
/deep/ .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
/deep/ .el-textarea__inner {
  resize: none;
}
/deep/ .post-content {
  p {
    line-height: 26px;
  }
  img {
    max-width: 100%;
    margin: 10px 0;
  }
}
</style>
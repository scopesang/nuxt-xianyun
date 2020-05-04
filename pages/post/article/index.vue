<template>
  <div class="article">
    <div class="article-left">
      <h2>发表新攻略</h2>
      <div class="share">分享你的个人游记，让更多的人看到哦！</div>
      <form action="publish_article">
        <input type="text" class="input" placeholder="请输入标题" />
        <div class="fuwenben">
          <editor
            api-key="no-api-key"
            :init="{
         height: 500,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }"
          />
        </div>
        <div class="uploadimg">
          <span>请上传封面</span>
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
        <div class="city">
          选择城市
          <input type="text" class="city_input" placeholder="请搜索游玩城市" />
        </div>
        <div class="publish">
          <button>
            <span>发布</span>
          </button>
          <span>或者</span>
          <a href="javascript:;">
            <span>保存到草稿</span>
          </a>
        </div>
      </form>
    </div>
    <div class="article-right">
      <span>草稿箱（草稿的数量）</span>
      <a href="javascript:;">
        草稿箱
        <i class="el-icon-edit"></i>
        <p>时间</p>
      </a>
    </div>
  </div>
</template>
<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  },
  components: {
    editor: Editor
  }
};
</script>

<style lang="less" scoped>
.article {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 1000/1350 * 100vw;
  .article-left {
    width: 750/1350 * 100vw;
    .share {
      font-size: 12px;
      color: #999;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .input {
      margin-bottom: 20px;
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      padding-left: 10px;
      color: #606266;
      box-sizing: border-box;
      width: 100%;
      line-height: 40px;
      font-size: 14px;
    }
    .city {
      margin-top: 20px;
      .city_input {
        margin-left: 20px;
        border: 1px solid #dcdfe6;
        border-radius: 5px;
        padding-left: 10px;
        color: #606266;
        box-sizing: border-box;
        line-height: 40px;
        font-size: 14px;
      }
    }
    .publish {
      margin-top: 20px;
      margin-bottom: 20px;
      button {
        border: 1px solid #409eff;
        border-radius: 5px;
        background-color: #409eff;
        height: 30px;
        width: 50px;
      }
      a {
        color: chocolate;
      }
    }
  }
  .article-right {
    margin-top: 20px;
    box-sizing: border-box;
    display: block;
    border: 1px solid #dcdfe6;
    width: 200/1350 * 100vw;
    padding: 10px;
    height: 100px;
  }
  .article-right a:hover {
    color: chocolate;
  }
}

h2 {
  margin-top: 20px;
  font-size: 22px;
  font-weight: 500;
}

.uploadimg {
  display: flex;
  margin-top: 20px;
  span {
    margin-right: 20px;
  }
  /deep/ .el-upload--picture-card {
    width: 100px;
    height: 100px;
    display: flex;
    .el-icon-plus {
      position: relative;
      left: 36px;
      top: 36px;
    }
  }
}
</style>
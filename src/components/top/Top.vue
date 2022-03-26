<template>
    <div class="home">
        <div class="con">
            <span class="title">东软颐养中心</span>
            <el-badge :value="200" :max="99" class="item">
                <el-button size="small" icon="el-icon-bell" circle></el-button>
            </el-badge>

            <el-dropdown class="main" placement="bottom" @command="handleCommand">
                <span>
                    <span class="user">{{user.username}}</span>
                    <el-avatar :size="40" src="https://i.loli.net/2021/08/16/gGprTMUKAbBn9lz.jpg"></el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-edit" command="alter">修改密码</el-dropdown-item>
                    <el-dropdown-item icon=" el-icon-upload" command="upload">上传头像</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-switch-button" command="exit">退出系统</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <el-dialog
                title="上传头像"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
            <span style="text-align: center">
               <el-upload
                       class="avatar-uploader"
                       action=""
                       :show-file-list="false"
                       :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload"
                        ref="upload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="determine">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                value: 100,
                max: 99,
                imageUrl:'',
                centerDialogVisible: false
            }
        },
        created() {
            // let user = sessionStorage.getItem("user");
            // console.log(user);
            // this.userInfo = JSON.parse(user);
        },
        computed: {
            //使用对象展开运算符将getters混入computed对象中
            ...mapGetters([
                'user'
            ]),
        },
        methods: {
            handleCommand(command) {
                switch (command) {
                    case "exit":
                        this.exit();
                        break;
                    case "alter":
                        break;
                    case "upload":
                        this.centerDialogVisible = true;
                }
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            cancel() {
                this.centerDialogVisible = false;
                this.$refs.upload.clearFiles();
            },
            determine() {
                this.centerDialogVisible = false;
                this.$refs.upload.clearFiles();
            },
            exit() {
                localStorage.setItem("token","");
                this.$store.dispatch("setUser",{});
                this.$router.push('/login');
            },
        }
    }
</script>

<style >

    .el-avatar--circle {
        border-radius: 50%;
    }

    .main {
        position: absolute;
        right: 75px;
        margin-top: 15px;
    }

    .user {
        color: #fff;
        position: absolute;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        right: 45px;
        top: 10px;
    }

    .con .title {
        font-weight: bold;
        font-size: 1.5em;
        line-height: 60px;
        color: #fff;
    }

    .item {
        position: absolute;
        margin-top: 20px;
        right: 30px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>
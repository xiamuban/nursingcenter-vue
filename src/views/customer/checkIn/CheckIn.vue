<template>
    <div>
        <el-card class="box-card">
            <div class="header">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/main/checkIn_list' }">入住管理</el-breadcrumb-item>
                    <el-breadcrumb-item>登记</el-breadcrumb-item>
                </el-breadcrumb>
                <h4 style="text-align:center;color: gray;margin-bottom: 20px">入住登记</h4>
            </div>
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="客户名称" prop="customerName">
                        <el-input v-model="ruleForm.customerName" placeholder="请输入客户名称"></el-input>
                    </el-form-item>
                    <el-form-item label="老人类型" prop="industry">
                        <el-select v-model="ruleForm.elderType" placeholder="请选择老人类型">
                            <el-option label="老年人" value="1"></el-option>
                            <el-option label="自理老人" value="2"></el-option>
                            <el-option label="介助老人" value="3"></el-option>
                            <el-option label="介护老人" value="4"></el-option>
                            <el-option label="失能老人" value="5"></el-option>
                            <el-option label="失智症老人" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio v-model="ruleForm.customerSex" label="1">男</el-radio>
                        <el-radio v-model="ruleForm.customerSex" label="2">女</el-radio>
                    </el-form-item>
                    <el-form-item label="年龄" prop="customerAge">
                        <el-input v-model="ruleForm.customerAge" placeholder="请输入年龄"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="contactTel">
                        <el-input v-model="ruleForm.contactTel" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证" prop="idcard">
                        <el-input v-model="ruleForm.idcard" placeholder="请输入身份证号"></el-input>
                    </el-form-item>
                    <el-form-item label="到期时间" prop="expirationDate">
                        <el-date-picker
                                v-model="ruleForm.expirationDate"
                                type="date"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="入住床位" prop="bedId">
                        <el-select v-model="ruleForm.bedId" placeholder="请选择床位">
                            <el-option v-for="item in bedOpts" :key="item.id"
                                       :label="item.id"
                                       :value="item.id"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="照片" prop="filepath">
                        <!--                        <img v-if="ruleForm.photo" :src="`http://localhost:8000/${ruleForm.photo}`" class="avatar">-->
                        <el-upload
                                class="upload-demo"
                                action="http://localhost:8000/common/upload"
                                multiple
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                :show-file-list="true">
                            <div class="wrap">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip tip">只能上传jpg/png文件，且不超过10M</div>
                            </div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="注意事项" prop="description">
                        <el-input type="textarea" rows="6" v-model="ruleForm.attention"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">确认入住</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </el-card>
    </div>
</template>

<script>
    import axios from 'axios';
    import ElOption from "element-ui/packages/select/src/option";

    export default {
        components: {ElOption},
        data() {
            return {
                ruleForm: {
                    customerName: '',//客户姓名
                    customerSex: '1',//客户性别
                    customerAge: '', //客户年龄
                    expirationDate: '',//到期时间
                    contactTel: '',   //联系电话
                    bedId: '',        //床号
                    filepath: '',    //照片
                    attention: '', //注意事项
                },
                checkIn: false,
                bedOpts: [],
                rules: {
                    customerName: [
                        {required: true, message: '请输入客户名称', trigger: 'blur'},
                    ],
                    idcard: [
                        {required: true, message: '请输入身份证号', trigger: 'blur'}
                    ],
                    customerAge: [
                        {required: true, message: '请输入年龄', trigger: 'blur'},
                        {pattern: /^[0-9]*$/, message: '请输入数字'}
                    ],
                    contactTel: [
                        {required: true, message: '请输入联系电话', trigger: 'blur'},
                        {pattern: /^[0-9]*$/, message: '请输入数字'}
                    ],
                }
            }
        },
        created() {
            this.getBeds();
        },
        methods: {
            getBeds() {
                axios.get('/bed/idleAll').then(res => {
                    this.bedOpts = res.data;
                })
            },
            submitForm() {
                axios.post("/bed/checkIn/" + this.ruleForm.bedId).then(res => {
                    if(res.data.status === 200){
                        this.checkIn = true;
                    }
                });
                axios.post('/customer/add', this.ruleForm).then(res => {
                    if (res.data.status === 200 && this.checkIn) {
                        this.$message({
                            message: '入住成功',
                            type: 'success'
                        });
                    }
                })
            },
            //上传成功回调的方法
            handleAvatarSuccess(res) {
                console.log(res);
                this.ruleForm.filepath = res;
            },
            //图片上传之前触发的方法
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/webp' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 10;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG、WEBP、PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 10MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 100%;
        height: 880px;
        margin: 0 auto;
        padding: 0;
    }

    .header {
        margin-bottom: 10px;
    }

    .wrap {
        display: flex;;
        align-items: center;
    }

    .tip {
        margin-left: 10px;
        color: #C0C4CC;
    }
</style>
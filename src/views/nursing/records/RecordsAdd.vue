<template>
    <div>
        <el-card class="box-card">
            <div class="header">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/main/record_list' }">护理记录</el-breadcrumb-item>
                    <el-breadcrumb-item>添加</el-breadcrumb-item>
                </el-breadcrumb>
                <h4 style="text-align:center;color: gray;margin-bottom: 20px">记录添加</h4>
            </div>
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="客户" prop="custId">
                        <el-select v-model="ruleForm.custId" placeholder="请选择客户">
                            <el-option v-for="item in customerOpts" :key="item.id"
                                       :label="item.customerName"
                                       :value="item.id"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="护理等级" prop="level">
                        <el-select v-model="level" placeholder="请选择等级" @change="getNewContents">
                            <el-option v-for="item in levelOpts" :key="item.id"
                                       :label="item.levelName"
                                       :value="item.id"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="护理项目" prop="nursingContent">
                        <el-select v-model="ruleForm.nursingContent" placeholder="请选择护理项目">
                            <el-option v-for="item in contentOpts" :key="item.id"
                                       :label="item.name"
                                       :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="护工人员" prop="nurseId">
                        <el-select v-model="ruleForm.nurseId" placeholder="请选择护工">
                            <el-option v-for="item in userOpts" :key="item.id"
                                       :label="item.username"
                                       :value="item.id"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="护理时间" prop="nursingTime">
                        <el-date-picker
                                v-model="ruleForm.nursingTime"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </el-card>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "CompanyAdd",
        data(){
            return {
                level:'',
                ruleForm: {
                    custId:'',
                    nursingContent:'',
                    nurseId:'',
                    nursingTime:'',
                },
                contentOpts:[],
                customerOpts:[],
                levelOpts:[],
                userOpts:[],
                rules: {
                    custId: [
                        { required: true, message: '请选择客户', trigger: 'change' }
                    ],
                    nursingContent: [
                        { required: true, message: '请选择服务项目', trigger: 'change' }
                    ],
                    nurseId: [
                        { required: true, message: '请选择护工', trigger: 'change' }
                    ],
                    nursingTime: [
                        { required: true, message: '请选择护理时间', trigger: 'change' }
                    ],
                }
            }
        },
        created(){
            this.getCustomers();
            this.getLevels();
            this.getContents();
            this.getUsers();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let path = '/nursingRecords/add';
                        axios.post(path,this.ruleForm).then(res=>{
                            if(res.data.status === 200){
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                            }
                        })
                    }
                });
            },
            getNewContents(id){
                axios.get('/nursingContent/getContents/' + id).then(res => {
                    this.contentOpts = res.data;
                })
            },
            getCustomers(){
                axios.get('/customer/getAll').then(res => {
                    this.customerOpts = res.data;
                })
            },
            getContents(){
                axios.get('/nursingContent/getAll').then(res => {
                    this.contentOpts = res.data;
                })
            },
            getLevels(){
                axios.get('/nursingLevel/getAll').then(res => {
                    this.levelOpts = res.data;
                })
            },
            getUsers(){
                axios.get('/user/getAll/' + 3).then(res => {
                    this.userOpts = res.data;
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
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
</style>
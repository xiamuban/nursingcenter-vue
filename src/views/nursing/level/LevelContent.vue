<template>
    <div>
        <el-card class="box-card">
            <div class="header">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/main/level_list' }">等级管理</el-breadcrumb-item>
                    <el-breadcrumb-item>修改</el-breadcrumb-item>
                </el-breadcrumb>
                <h4 style="text-align: center;color: gray;margin-bottom: 20px">添加服务</h4>
            </div>
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="护理等级" prop="levelId">
                        <el-input v-model="ruleForm.levelId" disabled placeholder="公司名称"></el-input>
                    </el-form-item>
                    <el-form-item label="服务名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="服务名称"></el-input>
                    </el-form-item>
                    <el-form-item label="服务价格" prop="price">
                        <el-input v-model="ruleForm.price" placeholder="价格"></el-input>
                    </el-form-item>
                    <el-form-item label="服务内容" prop="description">
                        <el-input type="textarea" style="resize: none" rows="5" v-model="ruleForm.description" placeholder="服务内容"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">确认添加</el-button>
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
        data(){
            return {
                ruleForm: {
                    levelId:'',         //等级Id
                    name: '',           //名称
                    price: '',          //资金
                    description: '',    //内容
                },
                rules: {
                    name: [
                        { required: true, message: '请输入服务名称', trigger: 'blur' },
                    ],
                    price: [
                        { required: true, message: '请输入服务价格', trigger: 'blur' },
                        { pattern: /^[0-9]*$/, message: '请输入数字' }
                    ],
                    description: [
                        { required: true, message: '请填写服务内容', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            this.ruleForm.levelId = this.$route.params.id;
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let path = '/nursingContent/add';
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }
</script>

<style scoped>

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
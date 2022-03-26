<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h4 style="text-align: center;color: gray">级别列表</h4>
            </div>
            <el-container>
                <el-header>
                    <el-form :inline="true" :model="formInline" class="form-inline">
                        <el-row :gutter="20">
                            <el-col :span="5" style="margin-left: 45px">
                                <el-form-item label="名称">
                                    <el-input clearable v-model="formInline.levelName" placeholder="名称"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2">
                                <el-form-item>
                                    <el-button icon="el-icon-search" class="search" size="medium" type="primary" @click="onSubmit">查询</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" style="margin-top: 2px">
                                <el-button size="medium" type="primary" @click="dialogFormVisible = true">新增</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-header>
                <el-divider class="inline"></el-divider>
                <el-main>
                    <el-table
                            :data="pageInfo.list"
                            v-loading="loading"
                            style="width: 100%;text-align: center">
                        <el-table-column
                                prop="id"
                                label="ID">
                        </el-table-column>
                        <el-table-column
                                prop="levelName"
                                label="名称">
                        </el-table-column>
                        <el-table-column
                                prop="contentNum"
                                label="服务项目数量">
                        </el-table-column>
                        <el-table-column label="是否启用">
                            <template slot-scope="scope">
                                <el-switch
                                        v-model="scope.row.levelStatus"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                        active-value="1"
                                        inactive-value="0"
                                        @change="handleChange(scope.row)">
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建时间">
                            <template slot-scope="scope">
                                {{scope.row.addDate|convertDate}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="150">
                            <template slot-scope="scope">
                                <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                                <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                                <el-button  @click="handleShowPost(scope.row.id)" type="text" size="small">服务信息</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
                <el-footer>
                    <div style="text-align: right">
                        <el-pagination
                                background
                                layout="total,prev, pager, next"
                                :total="pageInfo.total"
                                :page-size="pageInfo.pageSize"
                                @current-change="handleCurrentChange">
                        </el-pagination>
                    </div>
                </el-footer>
            </el-container>

            <el-dialog title="护理等级添加" :visible.sync="dialogFormVisible" center width="500px">
                <el-form :model="form" label-width="100px">
                    <el-form-item label="等级名称">
                        <el-input type="text" v-model="form.levelName"></el-input>
                    </el-form-item>
                    <el-form-item label="是否启用">
                        <el-radio v-model="form.levelStatus" label="0">启用</el-radio>
                        <el-radio v-model="form.levelStatus" label="2">禁用</el-radio>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitAdd">确认添加</el-button>
                </div>
            </el-dialog>

        </el-card>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    export default {
        data() {
            return {
                dialogFormVisible: false,
                loading: false,//数据加载
                currPage: 1,
                pageInfo: {},
                formInline: {
                    levelName: '',
                },
                form: {
                    levelName: '',
                    levelStatus:'0'
                },
            }
        },
        created() {
            this.getData()
        },
        methods: {
            //等级添加
            submitAdd(){
                this.dialogFormVisible = false;
                let path = '/nursingLevel/add';
                axios.post(path,this.form).then(res=>{
                    if(res.data === 200){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    }
                });
                this.getData();
            },
            getData() {
                // axios方式实现跨域获取数据
                this.loading = true;
                axios.post("/nursingLevel/queryAll/" + this.currPage,this.formInline).then(res => {
                    this.pageInfo = res.data;
                    this.loading = false;
                    console.log(this.pageInfo);
                })
            },
            onSubmit() {//搜索
                this.currPage = 1;
                this.getData();
            },
            handleEdit(row) {//编辑修改
                this.$router.push(`/main/level_content/${row.id}`)
            },

            handleDelete(row) {//删除
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post("/nursingLevel/delete/" + row.id).then(res => {
                        console.log(res.data);
                        if(res.data.status === 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getData();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleChange(row){//信息修改
                let path = '/nursingLevel/update';
                axios.post(path,row).then(res=>{
                    console.log(res);
                })
            },
            handleCurrentChange(val) {
                this.currPage = val;
                this.getData()
            },
            handleShowPost(id){
                this.$router.push(`/main/nursingInfo/${id}`)
            }
        },
        filters:{
            //格式化日期
            convertDate(val){
                let date = new Date(val);
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            }
        }
    }
</script>

<style scoped>
    .box-card {
        width: 100%;
        height: 880px;
        margin: 0 auto;
        padding: 0;
    }
    .inline{
        margin: 0;
    }
    .form-inline{
        margin-top: 0;
    }
    .el-input{
        width: 260px;
    }
    .el-select{
        width: 260px;
    }
    .search{
        margin-left: 0;
    }
</style>
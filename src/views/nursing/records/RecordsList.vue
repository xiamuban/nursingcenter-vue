<template>
    <div>
        <el-card class="box-card">
            <el-scrollbar class="flow">
                <el-container>
                    <el-header>
                        <el-form :inline="true" :model="formInline" class="form-inline">
                            <el-row :gutter="20">
                                <el-col :span="5" style="margin-left: 45px">
                                    <el-form-item label="客户">
                                        <el-select v-model="formInline.custId" placeholder="请选择客户">
                                            <el-option v-for="item in customerOpts" :key="item.id"
                                                       :label="item.customerName"
                                                       :value="item.id"
                                            />
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="5">
                                    <el-form-item label="护工">
                                        <el-select v-model="formInline.nurseId" placeholder="请选择护工">
                                            <el-option v-for="item in userOpts" :key="item.id"
                                                       :label="item.username"
                                                       :value="item.id"
                                            />
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="5">
                                    <el-form-item label="服务" prop="nursingContent">
                                        <el-select v-model="formInline.nursingContent" placeholder="请选择护理项目">
                                            <el-option v-for="item in contentOpts" :key="item.id"
                                                       :label="item.name"
                                                       :value="item.id"
                                            />
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="2">
                                    <el-form-item>
                                        <el-button icon="el-icon-search" class="search" size="medium" type="primary"
                                                   @click="onSubmit">查询
                                        </el-button>
                                    </el-form-item>
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
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="table-expand">
                                        <el-form-item label="注意事项：">
                                            <span>{{ props.row.customer.attention }}</span>
                                        </el-form-item>
                                        <el-form-item label="服务价格：">
                                            <span>{{ props.row.content.price }}</span>
                                        </el-form-item>
                                        <el-form-item label="服务内容：">
                                            <span>{{ props.row.content.description }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    prop="photo"
                                    label="照片"
                                    width="100">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.customer.filepath">
                                        <el-avatar shape="square" size="large"
                                                   :src="`http://localhost:8000/${scope.row.customer.filepath}`"></el-avatar>
                                    </div>
                                    <div v-else>
                                        暂无
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="customer.customerName"
                                    label="客户名称">
                            </el-table-column>
                            <el-table-column
                                    prop="customer.customerAge"
                                    label="客户年龄">
                            </el-table-column>
                            <el-table-column label="客户性别">
                                <template slot-scope="scope">
                                    {{scope.row.customerSex|formatSex}}
                                </template>
                            </el-table-column>

                            <el-table-column
                                    prop="content.name"
                                    label="服务名称">
                            </el-table-column>

                            <el-table-column
                                    prop="user.username"
                                    label="护工">
                            </el-table-column>

                            <el-table-column label="添加时间">
                                <template slot-scope="scope">
                                    {{scope.row.addDate|convertDate}}
                                </template>
                            </el-table-column>

                            <el-table-column label="护理时间">
                                <template slot-scope="scope">
                                    {{scope.row.nursingTime|convertDate}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="150">
                                <template slot-scope="scope">
                                    <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                                    <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
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
            </el-scrollbar>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';

    export default {
        data() {
            return {
                loading: false,//数据加载
                currPage: 1,
                pageInfo: {},
                userOpts:[],
                contentOpts:[],
                customerOpts:[],
                formInline: {
                    custId: '',
                    nurseId:'',
                    nursingContent:'',
                },
            }
        },
        created() {
            this.getData();
            this.getCustomers();
            this.getContents();
            this.getUsers();
        },
        methods: {
            getData() {
                // axios方式实现跨域获取数据
                this.loading = true;
                axios.post("/nursingRecords/queryAll/" + this.currPage, this.formInline).then(res => {
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
                    axios.post("/nursingRecords/delete/" + row.id).then(res => {
                        console.log(res.data);
                        if (res.data.status === 200) {
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
            getUsers(){
                axios.get('/user/getAll/' + 3).then(res => {
                    this.userOpts = res.data;
                })
            },
            handleCurrentChange(val) {
                this.currPage = val;
                this.getData()
            },
        },
        filters: {
            //格式化性别
            formatSex(val) {
                return val === 1 ? '男' : '女';
            },
            //格式化日期
            convertDate(val) {
                let date = new Date(val);
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            }
        }
    }
</script>

<style>
    .flow{
        height: 880px;
        overflow-x: hidden;
    }
    .box-card {
        width: 100%;
        height: 880px;
        margin: 0 auto;
        padding: 0;
    }

    .inline {
        margin: 0;
    }

    .form-inline {
        margin-top: 0;
    }

    .el-input {
        width: 260px;
    }

    .el-select {
        width: 260px;
    }

    .search {
        margin-left: 0;
    }
</style>
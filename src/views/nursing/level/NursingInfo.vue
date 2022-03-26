<template>
    <div>
        <el-card class="box-card">
            <div slot="header" style="text-align: center">
                <div style="float: left">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/main/level_list' }">等级管理</el-breadcrumb-item>
                        <el-breadcrumb-item>服务列表</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <br/>
                <h3>{{nursingLevel.levelName}}级护理</h3>
            </div>
            <el-scrollbar class="flow">
                <el-table
                        :data="nursingLevel.contentList"
                        style="width: 100%"
                        :default-sort="{prop: 'date', order: 'descending'}">
                    <el-table-column
                            prop="id"
                            label="编号"
                            sortable
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="名称"
                            sortable
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="价格"
                            sortable
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            label="服务内容">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="150">
                        <template slot-scope="scope">
                            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
                nursingLevel: {
                    id: ''
                }
            }
        },
        created() {
            this.nursingLevel.id = this.$route.params.id;
            this.getnursingLevel()
        },
        methods: {
            getnursingLevel() {
                let path = `/nursingLevel/loadById/${this.nursingLevel.id}`;
                axios.get(path).then(res => {
                    this.nursingLevel = res.data;
                    console.log(this.nursingLevel)
                })
            },
            handleDelete(row) {//删除
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post("/nursingContent/delete/" + row.id).then(res => {
                        console.log(res.data);
                        if(res.data.status === 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getnursingLevel();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        },
        filters: { //过滤器
            //格式化日期
            convertDate(val) {
                let date = new Date(val);
                let time = moment(date).format("YYYY-MM-DD");
                return time
            }
        }
    }
</script>

<style>
    .flow {
        height: 880px;
        overflow-x: hidden;
    }

    .box-card {
        width: 100%;
        height: 880px;
        margin: 0 auto;
        overflow: hidden;
        padding: 0;
    }
</style>
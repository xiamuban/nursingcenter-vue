<template>
    <div>
        <el-card class="box-card">
            <el-scrollbar class="flow">
                <el-container>
                    <el-header>
                        <el-form :inline="true" :model="formInline" class="form-inline">
                            <el-row :gutter="0">
                                <el-col :span="5" style="margin-left: 45px">
                                    <el-form-item label="名称">
                                        <el-input clearable v-model="formInline.customerName" placeholder="客户名称"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="5">
                                    <el-form-item label="性别">
                                        <el-select v-model="formInline.customerSex" placeholder="请选择性别">
                                            <el-option label="男" value="1"></el-option>
                                            <el-option label="女" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="5">
                                    <el-form-item label="床号">
                                        <el-select v-model="formInline.bedId" placeholder="请选择床号">
                                            <el-option v-for="item in bedOpts" :key="item.id"
                                                       :label="item.id"
                                                       :value="item.id"
                                            />
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6">
                                    <el-form-item label="老人类型">
                                        <el-select v-model="formInline.elderType" placeholder="请选择老人类型">
                                            <el-option label="老年人" value="1"></el-option>
                                            <el-option label="自理老人" value="2"></el-option>
                                            <el-option label="介助老人" value="3"></el-option>
                                            <el-option label="介护老人" value="4"></el-option>
                                            <el-option label="失能老人" value="5"></el-option>
                                            <el-option label="失智症老人" value="6"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="2">
                                    <el-form-item>
                                        <el-button icon="el-icon-search" class="search" size="medium" type="primary" @click="onSubmit">查询</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-header>

                    <el-divider class="inline"></el-divider>

                    <el-main>
                        <el-table
                                v-loading="loading"
                                :data="pageInfo.list"
                                :stripe=stripe
                                :border=border
                                style="width: 100%"
                                class="tab">
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="table-expand">
                                        <el-form-item label="身高：">
                                            <span>{{ props.row.height }}</span>
                                        </el-form-item>
                                        <el-form-item label="体重：">
                                            <span>{{ props.row.weight }}</span>
                                        </el-form-item>
                                        <el-form-item label="血型：">
                                            <span>{{ props.row.bloodType }}</span>
                                        </el-form-item>
                                        <el-form-item label="身份证：">
                                            <span>{{ props.row.idcard }}</span>
                                        </el-form-item>
                                        <el-form-item label="身心状况：">
                                            <span>{{ props.row.psychosomaticState | formatStatus}}</span>
                                        </el-form-item>
                                        <el-form-item label="注意事项：">
                                            <span>{{ props.row.attention }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    prop="photo"
                                    label="照片"
                                    width="100">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.filepath">
                                        <el-avatar shape="square"  size="large" :src="`http://localhost:8000/${scope.row.filepath}`"></el-avatar>
                                    </div>
                                    <div v-else>
                                        暂无
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="customerName"
                                    label="客户名称"
                                    width="140">
                            </el-table-column>
                            <el-table-column
                                    prop="customerAge"
                                    label="年龄"
                                    width="120">
                            </el-table-column>
                            <el-table-column label="性别" width="100">
                                <template slot-scope="scope">
                                    {{scope.row.customerSex|formatSex}}
                                </template>
                            </el-table-column>

                            <el-table-column
                                    prop="roomNumber"
                                    label="房间号"
                                    width="100">
                            </el-table-column>

                            <el-table-column
                                    prop="bedId"
                                    label="床号"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="contactTel"
                                    label="联系电话"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    label="老人类型"
                                    width="120">
                                <template slot-scope="scope">
                                    {{scope.row.elderType|formatElderType}}
                                </template>
                            </el-table-column>
                            <el-table-column label="是否已婚" width="110">
                                <template slot-scope="scope">
                                    <el-switch
                                            v-model="scope.row.maritalStatus"
                                            active-color="#13ce66"
                                            inactive-color="#ff4949"
                                            active-value="1"
                                            inactive-value="0"
                                            @change="handleChange(scope.row)">
                                    </el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column label="入住时间">
                                <template slot-scope="scope">
                                    {{scope.row.checkinDate|convertDate}}
                                </template>
                            </el-table-column>

                            <el-table-column label="到期时间">
                                <template slot-scope="scope">
                                    {{scope.row.expirationDate|convertDate}}
                                </template>
                            </el-table-column>

                            <el-table-column
                                    fixed="right"
                                    label="操作">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.isDeleted === 0">
                                        <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                                        <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                                        <el-button @click="handleWithdraw(scope.row)" type="text" size="small">退住</el-button>
                                    </div>
                                    <div style="text-align: center" v-else>
                                        <span style="margin-left: -40px;color: #909399">已退住</span>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-main>
                    <el-footer>
                        <div style="text-align: right">
                            <el-pagination
                                    background
                                    layout="total, prev, pager, next"
                                    :total="pageInfo.total"
                                    :page-size="pageInfo.pageSize"
                                    @current-change="handleCurrentChange">
                            </el-pagination>
                        </div>
                    </el-footer>
                </el-container>
            </el-scrollbar>
        </el-card>


        <el-dialog title="退住申请" :visible.sync="dialogFormVisible" center width="800px">
            <el-form :model="form" label-width="100px">
                <el-form-item label="客户ID">
                    <el-input type="text" disabled v-model="form.customerId"></el-input>
                </el-form-item>
                <el-form-item label="退住原因">
                    <el-input type="textarea" rows="6" v-model="form.retreatReason"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitApply">提交申请</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';

    export default {
        name: "post",
        data() {
            return {
                dialogFormVisible: false,
                loadings: false,
                stripe: true,
                border: false,
                loading: false,//数据加载
                currPage: 1,
                pageInfo: {},
                formInline: {
                    customerName: '',
                    customerSex: '',
                    bedId: '',
                    elderType: ''
                },
                bedOpts:[],
                form: {
                    customerId: '',
                    retreatReason: '',
                    auditStatus: '1',
                },
            }
        },
        created() {
            this.getData();
            this.getBeds();
        },
        methods: {
            getBeds(){
                axios.get('/bed/all').then(res=>{
                    this.bedOpts = res.data;
                })
            },
            handleWithdraw(row) {//退住申请
                this.dialogFormVisible = true;
                this.form.customerId = row.id;
            },
            withdraw(id){
                axios.post("/bed/withdraw/" + id).then(res => {
                    console.log(res.data)
                });
            },
            //提交退住审核
            submitApply(){
                this.dialogFormVisible = false;
                let path = '/retreat/add';
                axios.post(path,this.form).then(res=>{
                    if(res.data.status === 200){
                        this.$message({
                            message: '申请成功,等待审核',
                            type: 'success'
                        });
                    }
                })
            },
            getData() {
                // axios方式实现跨域获取数据
                this.loading = true;
                axios.post("/customer/queryAll/" + this.currPage,this.formInline).then(res => {
                    this.pageInfo = res.data;
                    console.log(res.data);
                    this.loading = false;
                })
            },
            onSubmit() {//搜索
                this.currPage = 1;
                this.getData();
            },
            handleEdit(row) {//编辑修改
                this.$router.push(`/main/checkIn_update/${row.id}`)
            },

            handleDelete(row) {//删除
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post("/customer/delete/" + row.id).then(res => {
                        if(res.data.status === 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.withdraw(row.bedId);
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
            handleCurrentChange(val) {
                this.currPage = val;
                this.getData()
            },
            handleChange(row){//信息修改
                let path = '/customer/update';
                axios.post(path,row).then(res=>{
                    console.log(res);
                })
            },
        },

        filters: { //过滤器
            //格式化性别
            formatSex(val){
                return val === 1 ?'男':'女';
            },

            formatElderType(val){
                let status;
                switch (val) {
                    case  '1':
                        status = '老年人';
                        break;
                    case '2':
                        status = '自理老人';
                        break;
                    case '3':
                        status = '介助老人';
                        break;
                    case '4':
                        status = '介护老人';
                        break;
                    case '5':
                        status = '失能老人';
                        break;
                    case '6':
                        status = '失智症老人';
                        break;
                }
                return status;
            },

            formatStatus(val){
                let status;
                switch (val) {
                    case  '0':
                        status = '很差';
                        break;
                    case '1':
                        status = '良好';
                        break;
                    case '2':
                        status = '健康';
                        break;
                }
                return status;
            },
            //格式化日期
            convertDate(val){
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
        overflow: hidden;
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
    .table-expand label {
        color: #99a9bf;
    }
    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
        overflow-y: auto;
    }
    .el-select-dropdown .el-scrollbar .el-scrollbar__wrap
    {
        overflow: scroll!important;
    }
</style>
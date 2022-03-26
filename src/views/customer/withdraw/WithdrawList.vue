<template>
    <div>
        <el-card class="box-card">
            <el-scrollbar class="flow">

                <div slot="header" class="clearfix">
                    <h4 style="text-align: center;color: gray">退住列表</h4>
                </div>
                <el-container>
                    <el-header>
                        <el-form :inline="true" :model="formInline" class="form-inline">
                            <el-row :gutter="0">
                                <el-col :span="5" style="margin-left: 25px">
                                    <el-form-item label="名称">
                                        <el-input clearable v-model="formInline.customer.customerName" placeholder="客户名称"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6">
                                    <el-form-item label="审核状态">
                                        <el-select v-model="formInline.auditStatus" placeholder="请选择">
                                            <el-option label="未通过" value="0"></el-option>
                                            <el-option label="未审核" value="1"></el-option>
                                            <el-option label="已通过" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="5">
                                    <el-form-item label="床号">
                                        <el-select v-model="formInline.customer.bedId" placeholder="请选择床号">
                                            <el-option v-for="item in bedOpts" :key="item.id"
                                                       :label="item.id"
                                                       :value="item.id"
                                            />
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="6">
                                    <el-form-item label="老人类型">
                                        <el-select v-model="formInline.customer.elderType" placeholder="请选择老人类型">
                                            <el-option label="老年人" value="1"></el-option>
                                            <el-option label="自理老人" value="2"></el-option>
                                            <el-option label="介助老人" value="3"></el-option>
                                            <el-option label="介护老人" value="4"></el-option>
                                            <el-option label="失能老人" value="5"></el-option>
                                            <el-option label="失智症老人" value="6"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="1">
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
                                            <span>{{ props.row.customer.height }}</span>
                                        </el-form-item>
                                        <el-form-item label="体重：">
                                            <span>{{ props.row.customer.weight }}</span>
                                        </el-form-item>
                                        <el-form-item label="血型：">
                                            <span>{{ props.row.customer.bloodType }}</span>
                                        </el-form-item>
                                        <el-form-item label="身份证：">
                                            <span>{{ props.row.customer.idcard }}</span>
                                        </el-form-item>
                                        <el-form-item label="身心状况：">
                                            <span>{{ props.row.customer.psychosomaticState | formatStatus}}</span>
                                        </el-form-item>
                                        <el-form-item label="注意事项：">
                                            <span>{{ props.row.customer.attention }}</span>
                                        </el-form-item>
                                        <el-form-item label="退住原因：">
                                            <span>{{ props.row.retreatReason }}</span>
                                        </el-form-item>
                                        <el-form-item label="申请时间：">
                                            <span>{{ props.row.createTime | convertDate}}</span>
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
                                        <el-avatar shape="square"  size="large" :src="`http://localhost:8000/${scope.row.customer.filepath}`"></el-avatar>
                                    </div>
                                    <div v-else>
                                        暂无
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="customer.customerName"
                                    label="客户名称"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="customer.customerAge"
                                    label="年龄"
                                    width="100">
                            </el-table-column>
                            <el-table-column label="性别" width="100">
                                <template slot-scope="scope">
                                    {{scope.row.customer.customerSex|formatSex}}
                                </template>
                            </el-table-column>

                            <el-table-column
                                    prop="customer.roomNumber"
                                    label="房间号"
                                    width="100">
                            </el-table-column>

                            <el-table-column
                                    prop="customer.bedId"
                                    label="床号"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="customer.contactTel"
                                    label="联系电话"
                                    width="160">
                            </el-table-column>
                            <el-table-column
                                    label="老人类型"
                                    width="120">
                                <template slot-scope="scope">
                                    {{scope.row.customer.elderType|formatElderType}}
                                </template>
                            </el-table-column>
                            <el-table-column label="入住时间" width="180">
                                <template slot-scope="scope">
                                    {{scope.row.customer.checkinDate|convertDate}}
                                </template>
                            </el-table-column>

                            <el-table-column label="到期时间" width="180">
                                <template slot-scope="scope">
                                    {{scope.row.customer.expirationDate|convertDate}}
                                </template>
                            </el-table-column>

                            <el-table-column label="审核状态">
                                <template slot-scope="scope">
                                    {{scope.row.auditStatus|formatVerify}}
                                </template>
                            </el-table-column>

                            <el-table-column
                                    fixed="right"
                                    label="操作">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.auditStatus === '1'">
                                        <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                                        <el-button @click="handleVerify(scope.row)" type="text" size="small">审核</el-button>
                                    </div>
                                    <div v-else>
                                        <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                                        <el-button @click="handleDetail(scope.row)" type="text" size="small">审核详情</el-button>
                                    </div>
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

        <el-dialog title="职位审核" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="审核人ID" v-show="false">
                    <el-input type="text" disabled v-model="form.userId"></el-input>
                </el-form-item>

                <el-form-item label="审核人" v-show="true" :label-width="formLabelWidth">
                    <el-input type="text" disabled v-model="user.username"></el-input>
                </el-form-item>

                <el-form-item label="审核结果" :label-width="formLabelWidth">
                    <el-radio v-model="form.status" label="0">不通过</el-radio>
                    <el-radio v-model="form.status" label="2">通过</el-radio>
                </el-form-item>
                <el-form-item label="审核意见" :label-width="formLabelWidth">
                    <el-input type="textarea" rows="5" v-model="form.idea"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitVerify">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                formLabelWidth: '120px',
                dialogFormVisible: false,
                stripe: true,
                border: false,
                loading: false,//数据加载
                currPage: 1,
                pageInfo: {},
                formInline: {
                    auditStatus: '',
                    customer: {
                        customerName: '',
                        elderType:'',
                        bedId:''
                    }
                },
                bedId:'',
                customerId:'',
                bedOpts:[],
                form: {
                    conId: '',
                    idea: '',
                    status: '0',
                    userId: '',
                    type: 1
                },
            }
        },
        created() {
            this.getData();
            this.getBeds();
        },
        computed: {
            //使用对象展开运算符将getters混入computed对象中
            ...mapGetters([
                'user'
            ]),
        },
        methods: {
            getBeds(){
                axios.get('/bed/all').then(res=>{
                    this.bedOpts = res.data;
                })
            },
            getData() {
                // axios方式实现跨域获取数据
                this.loading = true;
                axios.post("/retreat/queryAll/" + this.currPage,this.formInline).then(res => {
                    this.pageInfo = res.data;
                    this.loading = false;
                })
            },
            onSubmit() {//搜索
                this.currPage = 1;
                this.getData();
            },
            handleVerify(row) {//审核
                this.dialogFormVisible = true;
                this.form.conId = row.id;
                this.form.userId = this.user.id;
                this.bedId = row.customer.bedId;
                this.customerId = row.customer.id;
            },
            handleDelete(row) {//删除
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post("/retreat/delete/" + row.id).then(res => {
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

            handleDetail(row){
                this.$router.push(`/main/verify_detail/${row.id}`)
            },

            withdraw(id){//退房
                axios.post("/bed/withdraw/" + id).then(res => {
                    console.log(res.data)
                });
            },
            custWithdraw(id){
                axios.post("/customer/withdraw/" + id).then(res => {
                    console.log(res.data)
                });
            },
            //提交审核
            submitVerify(){
                this.dialogFormVisible = false;
                if(this.form.status === '2'){
                    this.custWithdraw(this.customerId);
                    this.withdraw(this.bedId);
                }
                let path = '/verify/add';
                axios.post(path,this.form).then(res=>{
                    if(res.data === 200){
                        this.$message({
                            message: '审核成功',
                            type: 'success'
                        });
                    }
                    this.currPage = 1;
                    this.getData()
                })
            },

            handleCurrentChange(val) {
                this.currPage = val;
                this.getData()
            },
        },
        filters: { //过滤器
            //格式化性别
            formatSex(val){
                return val === '0'?'男':'女'
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
            formatVerify(val){
                let status = '';
                switch (val) {
                    case '0':
                        status = '未通过';
                        break;
                    case '1':
                        status = '未审核';
                        break;
                    case '2':
                        status = '已通过';
                        break;
                }
                return status;
            },
            //格式化日期
            convertDate(val){
                let date = new Date(val);
                let time = moment(date).format("YYYY-MM-DD HH:mm:ss");
                return time
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
</style>
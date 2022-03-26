<template>
    <div>
        <el-card class="box-card">
            <el-container>
                <el-header>
                    <el-form :inline="true" :model="formInline" class="form-inline">
                        <el-row :gutter="20">
                            <el-col :span="5" style="margin-left: 45px">
                                <el-form-item label="名称">
                                    <el-input clearable v-model="formInline.name" placeholder="名称"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="5">
                                <el-form-item label="类别">
                                    <el-select v-model="formInline.category" placeholder="请选择类别">
                                        <el-option label="大荤" value="1"></el-option>
                                        <el-option label="小荤" value="2"></el-option>
                                        <el-option label="素菜" value="3"></el-option>
                                        <el-option label="甜点" value="4"></el-option>
                                        <el-option label="水果" value="5"></el-option>
                                        <el-option label="套餐" value="6"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="5">
                                <el-form-item label="标签">
                                    <el-select v-model="formInline.label" placeholder="请选择标签">
                                        <el-option label="多糖" value="1"></el-option>
                                        <el-option label="少糖" value="2"></el-option>
                                        <el-option label="多脂肪" value="3"></el-option>
                                        <el-option label="少脂肪" value="4"></el-option>
                                        <el-option label="多盐" value="5"></el-option>
                                        <el-option label="少盐" value="6"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="2">
                                <el-form-item>
                                    <el-button icon="el-icon-search" class="search" size="medium" type="primary" @click="onSubmit">查询</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" style="margin-top: 2px">
                                <el-button size="medium" type="primary" @click="add">新增</el-button>
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
                                prop="photo"
                                label="图片">
                            <template slot-scope="scope">
                                <div v-if="scope.row.photo">
                                    <el-avatar shape="square" :fit="fit" :size="size" :src="`http://localhost:8000/${scope.row.photo}`"></el-avatar>
                                </div>
                                <div v-else>
                                    暂无
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="名称">
                        </el-table-column>
                        <el-table-column label="类别">
                            <template slot-scope="scope">
                                {{scope.row.category|formatCategory}}
                            </template>
                        </el-table-column>
                        <el-table-column label="标签">
                            <template slot-scope="scope">
                                <el-tag>{{scope.row.label|formatLabel}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="price"
                                label="价格">
                        </el-table-column>
                        <el-table-column label="是否清真">
                            <template slot-scope="scope">
                                <el-switch
                                        v-model="scope.row.momalFlag"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                        active-value="1"
                                        inactive-value="0"
                                        @change="handleChange(scope.row)">
                                </el-switch>
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

            <el-dialog :title="title" :visible.sync="dialogFormVisible" center width="800px">
                <el-form :model="form" :rules="rules" label-width="100px">
                    <el-form-item label="膳食名称" prop="name">
                        <el-input type="text" v-model="form.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="是否清真">
                        <el-radio v-model="form.momalFlag" label="1">是</el-radio>
                        <el-radio v-model="form.momalFlag" label="0">否</el-radio>
                    </el-form-item>

                    <el-form-item label="类别">
                        <el-select v-model="form.category" placeholder="请选择类别">
                            <el-option label="大荤" value="1"></el-option>
                            <el-option label="小荤" value="2"></el-option>
                            <el-option label="素菜" value="3"></el-option>
                            <el-option label="甜点" value="4"></el-option>
                            <el-option label="水果" value="5"></el-option>
                            <el-option label="套餐" value="6"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="标签">
                        <el-select v-model="form.label" placeholder="请选择标签">
                            <el-option label="多糖" value="1"></el-option>
                            <el-option label="少糖" value="2"></el-option>
                            <el-option label="多脂肪" value="3"></el-option>
                            <el-option label="少脂肪" value="4"></el-option>
                            <el-option label="多盐" value="5"></el-option>
                            <el-option label="少盐" value="6"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="图片" prop="photo">
                        <el-upload
                                class="upload-demo"
                                action="http://localhost:8000/common/upload"
                                multiple
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                :show-file-list="true"
                                ref="upload">
                            <div class="wrap">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip tip">只能上传jpg/png文件，且不超过10M</div>
                            </div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="价格" prop="price">
                        <el-input type="text" v-model="form.price" placeholder="请输入价格"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <div v-if="action === 'add'">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitAdd">确认添加</el-button>
                    </div>
                    <div v-else>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitUpdate">确认修改</el-button>
                    </div>
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
                action:'add',
                title:'膳食添加',
                currPage: 1,
                size:50,
                fit: 'fill',
                pageInfo: {},
                formInline: {
                    name: '',
                    category:'',
                    label:'',
                },
                form: {
                    name: '',
                    momalFlag:'0',
                    category:'',
                    label:'',
                    photo:'',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    price: [
                        {required: true, message: '请输入价格', trigger: 'blur'},
                        {pattern: /^[0-9]*$/, message: '请输入数字'}
                    ],
                }
            }
        },
        created() {
            this.getData()
        },
        methods: {
            add(){
                this.dialogFormVisible = true;
                this.action = 'add';
                this.title = '膳食添加';
            },
            //膳食添加
            submitAdd(){
                this.dialogFormVisible = false;
                let path = '/food/add';
                axios.post(path,this.form).then(res=>{
                    if(res.data === 200){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    }
                });
                this.getData();
                this.$refs.upload.clearFiles();
            },
            submitUpdate() {
                this.dialogFormVisible = false;
                axios.post('/food/update', this.form).then(res => {
                    if (res.data.status === 200) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    }
                    this.getData();
                });
            },
            getData() {
                // axios方式实现跨域获取数据
                this.loading = true;
                axios.post("/food/queryAll/" + this.currPage,this.formInline).then(res => {
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
                this.form.id = row.id;
                this.dialogFormVisible = true;
                this.title = '膳食修改';
                this.action = 'update';
                axios.get('/food/get/' + row.id).then(res=>{
                    this.form = res.data;
                })
            },

            handleDelete(row) {//删除
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post("/food/delete/" + row.id).then(res => {
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
                let path = '/food/update';
                axios.post(path,row).then(res=>{
                    console.log(res);
                })
            },
            handleCurrentChange(val) {
                this.currPage = val;
                this.getData()
            },
            //上传成功回调的方法
            handleAvatarSuccess(res) {
                console.log(res);
                this.form.photo = res;
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
        },
        filters:{
            formatCategory(val){
              let category = ['','大荤','小荤','素菜','甜点','水果','套餐'];
              return category[val];
            },
            formatLabel(val){
                let label = ['','多糖','少糖','多脂肪','少脂肪','多盐','少盐'];
                return label[val];
            },
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
    .wrap {
        display: flex;;
        align-items: center;
    }
    .tip {
        margin-left: 10px;
        color: #C0C4CC;
    }
</style>
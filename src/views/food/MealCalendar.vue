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
                                        <el-select v-model="formInline.custFood.custId" placeholder="请选择客户">
                                            <el-option v-for="item in customerOpts" :key="item.id"
                                                       :label="item.customerName"
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

                                <el-col :span="4" style="margin-top: 2px">
                                    <el-button size="medium" type="primary" @click="dialogFormVisible = true">膳食安排
                                    </el-button>
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
<!--                            <el-table-column label="时间" width="80">-->
<!--                                <template slot-scope="scope">-->
<!--                                    {{scope.row.supplyType|formatSupplyType}}-->
<!--                                </template>-->
<!--                            </el-table-column>-->

                            <el-table-column prop="custFood.foodWeek" label="周一">
                                <template slot-scope="scope">
                                    <el-card class="card" :body-style="{ padding: '0px' }"
                                             v-if="scope.row.custFood.foodWeek === 1">
                                        <img v-if="scope.row.custFood.food.photo" class="image"
                                             :src="`http://localhost:8000/${scope.row.custFood.food.photo}`">
                                        <img v-else :src="img" class="image">
                                        <div class="remark">
                                            <span>{{scope.row.supplyType|formatSupplyType}}</span> |
                                            <span class="title">{{scope.row.custFood.food.name}}</span>
                                            <strong class="price">{{scope.row.custFood.food.price}}元/份</strong>
                                        </div>
                                    </el-card>
                                </template>
                            </el-table-column>
                            <el-table-column label="周二">
                                <template slot-scope="scope">
                                    <el-card class="card" :body-style="{ padding: '0px' }"
                                             v-if="scope.row.custFood.foodWeek === 2">
                                        <img v-if="scope.row.custFood.food.photo" class="image"
                                             :src="`http://localhost:8000/${scope.row.custFood.food.photo}`">
                                        <img v-else :src="img" class="image">
                                        <div class="remark">
                                            <span>{{scope.row.supplyType|formatSupplyType}}</span> |
                                            <span class="title">{{scope.row.custFood.food.name}}</span>
                                            <strong class="price">{{scope.row.custFood.food.price}}元/份</strong>
                                        </div>
                                    </el-card>
                                </template>
                            </el-table-column>
                            <el-table-column label="周三">
                                <template slot-scope="scope">
                                    <el-card class="card" :body-style="{ padding: '0px' }"
                                             v-if="scope.row.custFood.foodWeek === 3">
                                        <img v-if="scope.row.custFood.food.photo" class="image"
                                             :src="`http://localhost:8000/${scope.row.custFood.food.photo}`">
                                        <img v-else :src="img" class="image">
                                        <div class="remark">
                                            <span>{{scope.row.supplyType|formatSupplyType}}</span> |
                                            <span class="title">{{scope.row.custFood.food.name}}</span>
                                            <strong class="price">{{scope.row.custFood.food.price}}元/份</strong>
                                        </div>
                                    </el-card>
                                </template>
                            </el-table-column>
                            <el-table-column label="周四">
                                <template slot-scope="scope">
                                    <el-card class="card" :body-style="{ padding: '0px' }"
                                             v-if="scope.row.custFood.foodWeek === 4">
                                        <img v-if="scope.row.custFood.food.photo" class="image"
                                             :src="`http://localhost:8000/${scope.row.custFood.food.photo}`">
                                        <img v-else :src="img" class="image">
                                        <div class="remark">
                                            <span>{{scope.row.supplyType|formatSupplyType}}</span> |
                                            <span class="title">{{scope.row.custFood.food.name}}</span>
                                            <strong class="price">{{scope.row.custFood.food.price}}元/份</strong>
                                        </div>
                                    </el-card>
                                </template>
                            </el-table-column>
                            <el-table-column label="周五">
                                <template slot-scope="scope">
                                    <el-card class="card" :body-style="{ padding: '0px' }"
                                             v-if="scope.row.custFood.foodWeek === 5">
                                        <img v-if="scope.row.custFood.food.photo" class="image"
                                             :src="`http://localhost:8000/${scope.row.custFood.food.photo}`">
                                        <img v-else :src="img" class="image">
                                        <div class="remark">
                                            <span>{{scope.row.supplyType|formatSupplyType}}</span> |
                                            <span class="title">{{scope.row.custFood.food.name}}</span>
                                            <strong class="price">{{scope.row.custFood.food.price}}元/份</strong>
                                        </div>
                                    </el-card>
                                </template>
                            </el-table-column>
                            <el-table-column label="周六">
                                <template slot-scope="scope">
                                    <el-card class="card" :body-style="{ padding: '0px' }"
                                             v-if="scope.row.custFood.foodWeek === 6">
                                        <img v-if="scope.row.custFood.food.photo" class="image"
                                             :src="`http://localhost:8000/${scope.row.custFood.food.photo}`">
                                        <img v-else :src="img" class="image">
                                        <div class="remark">
                                            <span>{{scope.row.supplyType|formatSupplyType}}</span> |
                                            <span class="title">{{scope.row.custFood.food.name}}</span>
                                            <strong class="price">{{scope.row.custFood.food.price}}元/份</strong>
                                        </div>
                                    </el-card>
                                </template>
                            </el-table-column>
                            <el-table-column label="周日">
                                <template slot-scope="scope">
                                    <el-card class="card" :body-style="{ padding: '0px' }"
                                             v-if="scope.row.custFood.foodWeek === 7">
                                        <img v-if="scope.row.custFood.food.photo" class="image"
                                             :src="`http://localhost:8000/${scope.row.custFood.food.photo}`">
                                        <img v-else :src="img" class="image">
                                        <div class="remark">
                                            <span>{{scope.row.supplyType|formatSupplyType}}</span> |
                                            <span class="title">{{scope.row.custFood.food.name}}</span>
                                            <strong class="price">{{scope.row.custFood.food.price}}元/份</strong>
                                        </div>
                                    </el-card>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-main>
                </el-container>

                <el-dialog title="客户膳食安排" :visible.sync="dialogFormVisible" center width="800px">

                    <el-form :model="form" label-width="100px">
                        <el-form-item label="客户">
                            <el-select v-model="form.custFood.custId" placeholder="请选择客户">
                                <el-option v-for="item in customerOpts" :key="item.id"
                                           :label="item.customerName"
                                           :value="item.id"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="膳食">
                            <el-select v-model="form.custFood.foodId" placeholder="请选择膳食">
                                <el-option v-for="item in foodOpts" :key="item.id"
                                           :label="item.name"
                                           :value="item.id"
                                />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="星期">
                            <el-select v-model="form.custFood.foodWeek" placeholder="星期">
                                <el-option label="周一" value="1"></el-option>
                                <el-option label="周二" value="2"></el-option>
                                <el-option label="周三" value="3"></el-option>
                                <el-option label="周四" value="4"></el-option>
                                <el-option label="周五" value="5"></el-option>
                                <el-option label="周六" value="6"></el-option>
                                <el-option label="周日" value="7"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="供餐类型">
                            <el-select v-model="form.supplyType" placeholder="请选择类型">
                                <el-option label="早餐" value="1"></el-option>
                                <el-option label="午餐" value="2"></el-option>
                                <el-option label="晚餐" value="3"></el-option>
                            </el-select>
                        </el-form-item>

                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitAdd">确认安排</el-button>
                    </div>
                </el-dialog>
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
                dialogFormVisible: false,
                loading: false,//数据加载
                currPage: 1,
                size: 50,
                fit: 'fill',
                img: require("./no.png"),
                pageInfo: {},
                customerOpts: [],
                foodOpts:[],
                formInline: {
                    custFood: {
                        custId: '1',
                    }
                },
                form: {
                    supplyType:'',
                    custFood: {
                        custId:'',
                        foodWeek:'',
                        foodId:'',
                    }
                },
            }
        },
        created() {
            this.getCustomers();
            this.getFoods();
            this.getData();
        },
        methods: {
            //膳食安排
            submitAdd() {
                this.dialogFormVisible = false;
                let path = '/calendar/add';
                axios.post(path, this.form).then(res => {
                    if (res.data === 200) {
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
                axios.post("/calendar/queryAll/" + this.currPage, this.formInline).then(res => {
                    this.pageInfo = res.data;
                    console.log(res.data);
                    this.loading = false;
                })
            },
            getCustomers() {
                axios.get('/customer/getAll').then(res => {
                    this.customerOpts = res.data;
                })
            },
            getFoods() {
                axios.get('/food/getAll').then(res => {
                    this.foodOpts = res.data;
                })
            },
            onSubmit() {//搜索
                this.currPage = 1;
                this.getData();
            },
        },
        filters: {
            formatSupplyType(val) {
                let type = ['', '早餐', '午餐', '晚餐'];
                return type[val];
            },
            formatCategory(val) {
                let category = ['', '大荤', '小荤', '素菜', '甜点', '水果', '套餐'];
                return category[val];
            },
            formatLabel(val) {
                let label = ['', '多糖', '少糖', '多脂肪', '少脂肪', '多盐', '少盐'];
                return label[val];
            },
            //格式化日期
            convertDate(val) {
                let date = new Date(val);
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            }
        }
    }
</script>

<style scoped>
    .flow {
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

    .wrap {
        display: flex;;
        align-items: center;
    }

    .tip {
        margin-left: 10px;
        color: #C0C4CC;
    }

    .content {
        margin-top: 10px;
    }

    .card {
        width: 160px;
        height: 190px;
    }

    .image {
        width: 160px;
        height: 150px;
        display: block;
    }

    .remark {
        text-align: left;
        padding: 10px;
    }

    .remark .title {
        font-weight: bold;
        font-size: 15px;
        color: #666;
        white-space: nowrap; /* 不换行*/
        overflow: hidden; /* 超出不显示*/
        text-overflow: ellipsis; /* 加省略号显示*/
    }

    .remark .price {
        margin-left: 10px;
        font-size: 14px;
        color: #E4393C;
    }

    .pagination {
        margin: 20px 0;
        text-align: center;
    }
</style>
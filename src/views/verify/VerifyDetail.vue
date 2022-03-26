<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix" v-if="retreat.customer !== null && retreat.customer !== undefined">
                <h2><span class="title">{{retreat.customer.customerName}}</span></h2>
                <span>{{retreat.customer.customerSex | formatSex}}  |  {{retreat.customer.customerAge}} | {{retreat.customer.elderType | formatElderType}}</span>
                <br/>
                <span>申请类型：退住</span>
                <br/>
                <span>申请日期：{{retreat.createTime | convertDate}}</span>
                <div class="remark">
                    {{retreat.customer.attention}}
                </div>
            </div>
            <div>
                <h3>审批记录</h3>
                <div v-if="retreat.verifyList !== undefined && retreat.verifyList.length > 0">
                    <ul>
                        <li class="header">
                            <span>审批人</span> <span>审批意见</span> <span>审批时间</span> <span>审批结果</span>
                        </li>

                        <li v-for="item in retreat.verifyList" :key="item.id">
                            <span>{{item.user.username}}</span>
                            <span v-if="item.idea !== ''">{{item.idea}}</span>
                            <span v-else>未填写意见</span>
                            <span>{{item.addDate|convertDate}}</span>
                            <el-tag class="tag" :type="formatTag(item.status)">{{item.status|formatVerify}}</el-tag>
                        </li>
                    </ul>
                </div>
                <div v-else>
                    暂无审核记录
                </div>

            </div>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';

    export default {
        data() {
            return {
                retreat: {
                    id: ''
                }
            }
        },
        created() {
            this.retreat.id = this.$route.params.id;
            this.getRetreat()
        },
        methods: {
            getRetreat() {
                let path = `/retreat/loadById/${this.retreat.id}`;
                axios.get(path).then(res => {
                    this.retreat = res.data;
                    console.log(res.data)
                })
            },
            formatTag(val) {
                let tag = '';
                switch (val) {
                    case '0':
                        tag = 'danger';
                        break;
                    case '1':
                        tag = '';
                        break;
                    case '2':
                        tag = 'success';
                        break;
                }
                return tag;
            },
        },
        filters: { //过滤器
            //格式化性别
            formatSex(val) {
                let sex = '';
                switch (val) {
                    case 1:
                        sex = '男';
                        break;
                    case 2:
                        sex = '女';
                        break;
                }
                return sex;
            },
            formatType(val) {
                return val === 1 ? '退住' : '外出';
            },
            formatVerify(val) {
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
            formatElderType(val) {
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
            //格式化日期
            convertDate(val) {
                let date = new Date(val);
                let time = moment(date).format("YYYY-MM-DD HH:mm:ss");
                return time
            }
        }
    }
</script>

<style scoped>
    h2 {
        margin-bottom: 10px;
    }

    .remark {
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #dbdbdb;
        font-size: 14px;
        color: #666;
    }

    h3 {
        margin-bottom: 10px;
    }

    ul {
        list-style: none;
    }

    li {
        height: 50px;
        line-height: 50px;
        font-size: 14px;
    }

    li span {
        display: inline-block;
        width: 18%;
    }

    .tag {
        width: 60px;
    }

    .title {
        font-size: 20px;
        color: #666;
    }

    .header {
        font-weight: bold;
    }

</style>
<template>
    <div>
        <el-card :body-style="{ padding: '0px' }" class="home">
        <el-row :gutter="4">
            <el-col :span="12"><div class="grid-content bg-purple-light">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <div class="chart" ref="myChart"></div>
                    </div>
                </el-card>
            </div></el-col>
        </el-row>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';

    export default {
        data(){
            return {
                year: 2021,
                records: [],
                //饼状图需要显示(1-12月),name:月份 value:值(数量),默认是0
                seriesData: [
                    {name:1,value:0},{name:2,value:0},{name:3,value:0},{name:4,value:0},
                    {name:5,value:0},{name:6,value:0},{name:7,value:0},{name:8,value:0},
                    {name:9,value:0},{name:10,value:0},{name:11,value:0},{name:12,value:0}
                ],
                //饼状图图例
                legendData: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                //饼状图中图例对应的数据是否显示
                selected: {
                }
            }
        },
        mounted(){
            this.drawPie();
        },
        methods: {
            drawPie(){
                let echarts = require('echarts');
                let myChart = echarts.init(this.$refs.myChart);
                this.drawPieChart(myChart);
                myChart.showLoading();
                let path = `/customer/queryMonthNum/${this.year}`;
                axios.post(path,this.form).then(res=>{
                    this.records = res.data;
                    myChart.hideLoading();
                    this.records.forEach(item=>{
                        //更新有数据的月份
                        this.seriesData.forEach(i=>{
                            if(i.name === parseInt(item.cMonth)){
                                i.value = item.num
                            }
                        })
                    });
                    this.seriesData.forEach(item=>{
                        item.name = item.name + '月';
                        //构造是否显示每月的数据的JSON对象，显示是true,不显示是false
                        this.selected[item.name] = item.value > 0
                    });
                    //填入数据
                    myChart.setOption({
                        legend: { //图例
                            data: this.legendData,
                            selected: this.selected
                        },
                        series: [{ //数据
                            data: this.seriesData
                        }]
                    })
                })
            },
            drawPieChart(myChart){
                let option = {
                    title : {
                        text: `${this.year}年客户统计`,
                        textStyle: {
                            fontSize: 18,
                            fontWeight: 'bolder',
                            color: '#6495ed'          // 主标题文字颜色
                        },
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                        bottom: 20,
                    },
                    series : [
                        {

                            name: '数量',
                            type: 'pie',
                            radius : '55%',
                            center: ['40%', '50%'],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                myChart.setOption(option);
            },
        },
        filters: { //过滤器
            //格式化日期
            convertDate(val){
                let date = new Date(val);
                return moment(date).format("YYYY-MM-DD HH:mm:ss")
            }
        }
    }
</script>

<style scoped>
    .home {
        width: 100%;
        height: 880px;
    }
    h2 {
        margin-bottom: 10px;
    }
    h3 {
        margin-bottom: 10px;
    }
    ul {
        list-style: none;
    }
    li {
        display: flex;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        justify-content: space-around;
    }

    li span {
        display: inline-block;
        width: 25%;
    }

    .header{
        font-weight: bold;
    }
    .box-card{
        width: 100%;height: 400px;
    }

    .chart {
        padding: 5px;
        height: 375px;
    }

</style>
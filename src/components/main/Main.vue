<template>
    <div>
        <el-container>
            <el-header style="background-color: #79BBFF">
                <v-top />
            </el-header>
            <el-container>
                <v-menu />
                <el-container>

                    <el-scrollbar>

                    </el-scrollbar>
                    <el-main style="padding: 2px;overflow-x: hidden;">

                        <router-view></router-view>

                    </el-main>

<!--                    <el-footer>Footer</el-footer>-->
                </el-container>

            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Menu from "@/components/menu/Menu";
    import Top from "@/components/top/Top"
    export default {
        name: "MainView",
        data(){
            return{
            }
        },
        components:{//挂载组件
            'v-menu':Menu,//自定义标签
            'v-top':Top
        },

    }
</script>

<style scoped>
    .el-container{
        min-height: 887px;
    }

    /*.el-header, .el-footer {*/
    /*    background-color: #B3C0D1;*/
    /*    color: #333;*/
    /*    line-height: 60px;*/
    /*}*/

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
</style>
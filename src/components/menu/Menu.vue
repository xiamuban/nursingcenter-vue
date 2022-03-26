<template>
    <div>
        <el-scrollbar class="scroll">
            <el-menu default-active="activeIndex" :default-openeds="openeds" class="el-menu"
                     @select="handleSelect"
                     style="min-width: 240px;min-height: 887px">

                <el-menu-item index="0">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>

                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-s-custom"></i>
                        <span slot="title">客户管理</span>
                    </template>
                    <el-submenu index="1-1">
                        <template slot="title">
                            <i class="el-icon-office-building"></i>
                            <span slot="title">入住管理</span>
                        </template>
                        <el-menu-item index="1-1-1">入住列表</el-menu-item>
                        <el-menu-item index="1-1-2">入住登记</el-menu-item>
                    </el-submenu>
                    <el-submenu index="1-2">
                        <template slot="title">
                            <i class="el-icon-school"></i>
                            <span slot="title">退住管理</span>
                        </template>
                        <el-menu-item index="1-2-1">退住列表</el-menu-item>
                        <!--                        <el-menu-item index="1-2-2">退住登记</el-menu-item>-->
                    </el-submenu>
<!--                    <el-submenu index="1-3">-->
<!--                        <template slot="title">-->
<!--                            <i class="el-icon-guide"></i>-->
<!--                            <span slot="title">外出管理</span>-->
<!--                        </template>-->
<!--                        <el-menu-item index="1-3-1">外出列表</el-menu-item>-->
<!--                        <el-menu-item index="1-3-2">外出登记</el-menu-item>-->
<!--                    </el-submenu>-->
                </el-submenu>
<!--                <el-submenu index="2">-->
<!--                    <template slot="title">-->
<!--                        <i class="el-icon-menu"></i>-->
<!--                        <span slot="title">床位管理</span>-->
<!--                    </template>-->
<!--                    <el-menu-item index="2-1">床位列表</el-menu-item>-->
<!--                    <el-menu-item index="2-1">床位添加</el-menu-item>-->
<!--                </el-submenu>-->

                <el-submenu index="3" unique-opened="true">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span slot="title">护理管理</span>
                    </template>
                    <el-submenu index="3-1">
                        <template slot="title">
                            <i class="el-icon-s-data"></i>
                            <span slot="title">护理级别</span>
                        </template>
                        <el-menu-item index="3-1-1">级别列表</el-menu-item>
                        <!--                        <el-menu-item index="3-1-2">级别添加</el-menu-item>-->
                    </el-submenu>
                    <el-submenu index="3-2">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span slot="title">护理记录</span>
                        </template>
                        <el-menu-item index="3-2-1">记录列表</el-menu-item>
                        <el-menu-item index="3-2-2">记录添加</el-menu-item>
                    </el-submenu>
                </el-submenu>

                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-food"></i>
                        <span slot="title">膳食管理</span>
                    </template>

                    <el-menu-item index="4-1">
                        <i class="el-icon-fork-spoon"></i>
                        <span slot="title">膳食列表</span>
                    </el-menu-item>

                    <el-menu-item index="4-2">
                        <i class="el-icon-date"></i>
                        <span slot="title">膳食日历</span>
                    </el-menu-item>

                </el-submenu>
<!--                <el-submenu index="5">-->
<!--                    <template slot="title">-->
<!--                        <i class="el-icon-user-solid"></i>-->
<!--                        <span slot="title">用户管理</span>-->
<!--                    </template>-->

<!--                    <el-menu-item index="5-1">-->
<!--                        <i class="el-icon-user"></i>-->
<!--                        <span slot="title">用户列表</span>-->
<!--                    </el-menu-item>-->
<!--                    <el-menu-item index="5-2">-->
<!--                        <i class="el-icon-circle-plus-outline"></i>-->
<!--                        <span slot="title">用户添加</span>-->
<!--                    </el-menu-item>-->
<!--                </el-submenu>-->

            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                openeds: ['1','3','4'],
                activeIndex: '0',
            };
        },
        methods: {
            handleSelect(key) {
                this.activeIndex = key;
                switch (key) {
                    case '0': //首页
                        this.$router.push('/main');
                        break;
                    case "1-1-1":
                        this.$router.push('/main/checkIn_list');
                        break;
                    case "1-1-2":
                        this.$router.push('/main/check_in');
                        break;
                    case "1-2-1":
                        this.$router.push('/main/withdraw_list');
                        break;
                    case "3-1-1":
                        this.$router.push('/main/level_list');
                        break;
                    case "3-2-1":
                        this.$router.push('/main/record_list');
                        break;
                    case "3-2-2":
                        this.$router.push('/main/record_add');
                        break;
                    case "4-1":
                        this.$router.push('/main/food_list');
                        break;
                    case "4-2":
                        this.$router.push('/main/meal_calendar');
                        break;
                    default:
                        this.$router.push('/main');
                        break;
                }
            },
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    .scroll {
        height: 880px;
        overflow-x: hidden;
    }

    /* 解决自定义滚动条 x 轴显示问题 */
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }


</style>
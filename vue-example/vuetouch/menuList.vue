<template>
    <div class="components-mobile-menu">
        <div :class="ifshowMenu ? 'mobile-menu ' : 'mobile-menu swipeleft'">
            <div class="mask" @click="documentClick"></div>
            <div  class="menu-content"
                  v-swipeleft="{fn:vuetouch,name:'左滑'}"
            >
                <div class="merchant-top">
                    <span class="icon-logo"></span>
                </div>
                <div class="menu-list">
                    <a
                        href="javascript:;"
                        v-for="(item,index) in items"
                        :class="{current:isCurrent === (index+1)}"
                        v-if="item.link"
                        @click="changeStyle(item,index)">
                        <i :class="item.icon"></i>
                        <!--<router-link  :to="item.link.name">{{item.text}}</router-link>-->
                        <span>{{item.text}}-{{index}} - {{isCurrent===index+1}}-{{isCurrent}}</span>
                    </a>
                    <!--@click="isCurrent = index"-->
                    <!--:href="item.path"-->
                    <!--<a href="javascript:;" class="current">-->
                        <!--<i class="order"></i>-->
                        <!--<span>订单管理</span>-->
                    <!--</a>-->
                    <!--<a href="javascript:;">-->
                        <!--<i class="lending"></i>-->
                        <!--<span>放款管理</span>-->
                    <!--</a>-->
                </div>
                <!--退出登录-->
                <div class="loginout" @click="loginoutFun">
                    退出登录
                </div>
                <!--退出登录-end-->
            </div>
        </div>
        <!--layer-->
        <div v-if="isShowLayBtn">
            <div class="mask"></div>
            <div class="confirm-layer">
                <div class="text">
                    是否退出当前登录账号？
                </div>
                <div class="btnbox">
                    <a href="javascript:;" @click="cancel">取消</a>
                    <a href="javascript:;" class="sure" @click="sure">确定</a>
                </div>
            </div>
        </div>
        <!--layer-end-->
    </div>

</template>

<script>
    import "utils/touch";
    import { mapState, mapActions } from "vuex";

    export default {
        props:[

        ],
        data() {
            return {
                ifshowMenu: false,
                isShowLayBtn: false,
                items:[
                    {
                        name:"mobile-order",
                        text:"订单管理",
                        icon:"order",
                        link:{
                            name:""
                        }
                    },
                    {
                        name:"mobile-Loan",
                        text:"放款管理",
                        icon:"lending",
                        link:{
                            name:""
                        }
                    }
                ]
            }
        },

        computed: {
            ...mapState(["isCurrent"])
        },

        methods:{
            ...mapActions(["logout"]),

            //滑动
            vuetouch:function(s,e){
                this.ifshowMenu = !this.ifshowMenu;
                //console.log(s)
            },

            //点击空白区域关闭
            documentClick() {
                this.ifshowMenu = false;
            },

            //退出登录
            loginoutFun() {
                this.isShowLayBtn = true;
                this.ifshowMenu = false;
            },

            //取消退出
            cancel() {
                this.isShowLayBtn = false;
            },

            //确定退出
            sure() {
                this.isShowLayBtn = false;
                //跳转登录页：
                this.logout();
                //end
            },

            //
            changeStyle(item, index) {
                this.$store.commit("isCurrent", (index+1));
                this.ifshowMenu = false;

                switch (item.name){
                    case "mobile-order":
                        console.log("订单管理");
                        this.$router.push({name:'订单管理'});
                        break;
                    case "mobile-Loan":
                        console.log("放款管理");
                        this.$router.push({name:'放款管理'});
                        break;
                }
            }

        },

        mounted(){
            //menue
            //this.$store.commit("isCurrent", "0");
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    /*@import "../../assets/css/common";*/
div.components-mobile-menu{
    .mobile-menu{
        position: absolute;
        left: 0px;
        top:0px;
        z-index: 9999;
        width: 100%;
        height: 100%;
        transition: all 0.3s linear;
        -webkit-transition: all 0.3s linear;
        &.swipeleft {
            transform: translateX(-100%);
            -webkit-transform: translateX(-100%);
        }
    }
    .mask{
        position: absolute;
        left: 0px;
        top:0px;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.4);
    }
    .menu-content{
        position: absolute;
        left: 0px;
        top:0px;
        width: 5.2rem;
        height: 100%;
        background-color: #fff;
        .merchant-top{
            width: 5.2rem;
            height: 2.82rem;
            background: url("../../assets/images/mobile/nav-bg.png") no-repeat left top;
            background-size: 5.2rem 2.82rem;
            @include clearfix;
            .icon-logo{
                display: block;
                float: left;
                width: 2.65rem;
                height: 0.75rem;
                margin:0.95rem 0px 0px 0.4rem;
                background: url("../../assets/images/mobile/logo.png") no-repeat left top;
                background-size: 2.65rem 0.75rem;
            }
        }
        .menu-list{
            &>a,&>p{
                display:block;
                height: 1.04rem;
                line-height: 1.04rem;
                @include clearfix;
                &>i{
                    display: block;
                    float: left;
                    width: 0.4rem;
                    height: 0.4rem;
                    margin: 0.32rem 0px 0px 0.4rem;
                    background-color: red;
                }
                &>span,&>a{
                    display: block;
                    padding-left: 1.04rem;
                    font-size: 0.30rem;
                    color: #3E5065;
                }
            }
            .order{
                background: url("../../assets/images/mobile/icon-order-management-off.png") no-repeat left top;
                background-size: 0.4rem;
            }
            .lending{
                background: url("../../assets/images/mobile/icon-lending-management-off.png") no-repeat left top;
                background-size: 0.4rem;
            }
            .current{
                &>span,&>a{
                    color: #00CA9D;
                }
                .order{
                    background: url("../../assets/images/mobile/icon-order-management-on.png") no-repeat left top;
                    background-size: 0.4rem;
                }
                .lending{
                    background: url("../../assets/images/mobile/icon-lending-management-on.png") no-repeat left top;
                    background-size: 0.4rem;
                }
            }
        }
    }

    .loginout{
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 5.2rem;
        height: 1.04rem;
        line-height: 1.04rem;
        font-size: 0.30rem;
        color: #878DA0;
        border-top:0.01rem solid #E4E7EF;
        cursor: pointer;
        text-align: center;
    }
    .confirm-layer{
        position: absolute;
        left: 0px;
        top:0px;
        bottom:0px;
        right:0px;
        width: 5.4rem;
        height: 2.94rem;
        margin:auto;
        background-color: #fff;
        border-radius: 0.20rem;
        .text{
            height: 2.06rem;
            line-height: 2.06rem;
            font-size: 0.30rem;
            color: #3E5065;
            text-align: center;
        }
    }
    .btnbox{
        height: 0.87rem;
        border-top:0.01rem solid #B2B2B2;
        @include clearfix;
        &>a{
            display: block;
            float: left;
            width: 2.7rem;
            height: 0.87rem;
            line-height: 0.87rem;
            font-size: 0.30rem;
            color: #3E5065;
            text-align: center;
            &.sure{
                width: 2.69rem;
                color: #00CA9D;
                border-left:0.01rem solid #B2B2B2;
            }
        }
    }
}
</style>



















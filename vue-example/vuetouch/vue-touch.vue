<template>
    <div>
        <div  class="menu-content"
              v-swipeleft="{fn:vuetouch,name:'左滑'}"
        >
        </div>
    </div>
</template>

<script>
    export default {
        name: "vue-touch",
        method: {
            //滑动
            vuetouch: function (s, e) {
                //this.ifshowMenu = !this.ifshowMenu;

            }
        }
    }
</script>

<style scoped>

</style>
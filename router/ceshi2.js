const User = {
    template:`
        <div>
        <div>user-----</div>
        <router-view></router-view>
        </div>


        `
};
const Bar = {
    template:"<div>--吃梨的人--</div>"
}

const routes = [
    {
        path:"/user",
        component:User,
        children:[
            {
                path:"bar",
                component:Bar,
                meta:{requiresAuth: true}
            }
        ]
    }
];


const router = new VueRouter({
    routes
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!auth.loggedIn()) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // 确保一定要调用 next()
    }
})
const app = new Vue({
    el:"#app",
    router
});

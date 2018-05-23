const User = {
    props:["query"],
    template:"<div>--user--{{query}}</div>"
};
const routes = [
    {
        path:"/search",
        component:User,
        props: (route) => ({ query: route.query.q })
    }
];
const router = new VueRouter({
    routes
});



const app = new Vue({
    el:"#app",
    router
});

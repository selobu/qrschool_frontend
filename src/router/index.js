import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        name: "index",
        component: () => import("../views/Index.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/logout",
        name: "logout",
        component: () => import("../views/Logout.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/Register.vue"),
    },
    {
        path: "/recover",
        name: "recover",
        component: () => import("../views/Recover.vue"),
    },
    {
        path: "/about",
        name: "about",
        component: () => import("../views/About.vue"),
    },
    {
        path: "/config",
        name: "config",
        component: () => import("../views/Config.vue"),
    },
    {
        path: "/modulo",
        name: "modulos",
        component: () => import("../views/Modulos.vue"),
        children: [
            {
                path: "/asistencia/",
                name: "asitencia",
                component: () => import("../views/Asistencia.vue"),
            },
            {
                path: "/matricula/",
                name: "matricula",
                component: () => import("../views/Matricula.vue"),
            },
            {
                path: "/grado/",
                name: "grado",
                component: () => import("../views/Grado.vue"),
            },
            {
                path: "/qr",
                name: "qr",
                component: () => import("../views/Qr.vue"),
                children:[
                    {
                        path: "/mostrarmiqr",
                        name: "mostrarmiqr",
                        component: () => import("../views/MostrarMiQr.vue"),
                    },
                    {
                        path: "/leerqrs",
                        name: "leerqrs",
                        component: () => import("../views/LeerQrs.vue"),
                    },
                ]
            },
            {
                path: "/usuarios",
                name: "usuarios",
                component: () => import("../views/UsuariosGestion.vue"),
            },

        ]
    },
    {
        path: "/dashboard/",
        name: "dashboard",
        component: () => import("../views/Dashboard.vue"),
    },
    {
        path: "/ausencia/registro/:grado",
        name: "ausenciaregistro",
        component: () => import("../views/AusenciaRegistro.vue"),
    },
];

const router = createRouter({
  mode: "hash", 
  history: createWebHistory(),   
  routes,
});

//base: process.env.BASE_URL


export default router;
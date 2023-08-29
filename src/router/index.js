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
        path: "/register",
        name: "register",
        component: () => import("../views/Register.vue"),
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
        path: "/modulos",
        name: "modulos",
        component: () => import("../views/Modulos.vue"),
        children: [
            {
                path: "/modulos/",
                name: "modulosindex",
                component: () => import("../views/ModIndex.vue"),
            },
            {
                path: "/modulos/asistencia/",
                name: "asitencia",
                component: () => import("../views/Asistencia.vue"),
            },
            {
                path: "/modulos/matricula/",
                name: "matricula",
                component: () => import("../views/Matricula.vue"),
            },
            {
                path: "/modulos/grado/",
                name: "grado",
                component: () => import("../views/Grado.vue"),
            },
            {
                path: "/modulos/qr",
                name: "qr",
                component: () => import("../views/Qr.vue"),
                children:[
                    {
                        path: "/modulos/qr/mostrarmiqr",
                        name: "mostrarmiqr",
                        component: () => import("../views/MostrarMiQr.vue"),
                    },
                    {
                        path: "/modulos/qr/leerqrs",
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
        path: "/ausencia",
        name: "ausencia",
        component: () => import("../views/Ausencia.vue"),
    },
    {
        path: "/ausencia/registro/:grado",
        name: "ausenciaregistro",
        component: () => import("../views/AusenciaRegistro.vue"),
    },
    {
        path: "/soporte",
        name: "soporte",
        component: () => import("../views/Soporte.vue"),
    },
];

const router = createRouter({
  mode: "hash", 
  history: createWebHistory(),   
  routes,
});

//base: process.env.BASE_URL


export default router;
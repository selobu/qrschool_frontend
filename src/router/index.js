import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: "/",
        name: "index",
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/home",
        name: "home",
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/Auth/Login.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/Auth/Register.vue"),
    },
    {
        path: "/logout",
        name: "logout",
        component: () => import("../views/Auth/Logout.vue"),
    },
    {
        path: "/recover",
        name: "recover",
        component: () => import("../views/Auth/Recover.vue"),
    },
    {
        path: "/about",
        name: "about",
        component: () => import("../views/Help/About.vue"),
    },
    {
        path: "/modulos",
        name: "modulos",
        component: () => import("../views/Modulos.vue"),
        children: [
            {
                path: "/modulos/asistencia/",
                name: "asistencia",
                component: () => import("../views/Asistencia/Asistencia.vue"),
                children:[
                    {
                        path: "/modulos/asistencia/registrar/",
                        name: "registrarasistencia",
                        component: () => import("../views/Asistencia/Registrar.vue"),
                    },
                    {
                        path: "/modulos/asistencia/ausencia/",
                        name: "registrarausencia",
                        component: () => import("../views/Asistencia/Ausencia.vue"),
                    },
                ]
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
                component: () => import("../views/Qr/Qr.vue"),
                children:[
                    {
                        path: "/modulos/qr/mostrarmiqr",
                        name: "mostrarmiqr",
                        component: () => import("../views/Qr/MostrarMiQr.vue"),
                    },
                    {
                        path: "/modulos/qr/nuevoqr",
                        name: "nuevoqr",
                        component: () => import("../views/Qr/NuevoQrs.vue"),
                    },
                    {
                        path: "/modulos/qr/leerqrs",
                        name: "leerqrs",
                        component: () => import("../views/Qr/LeerQrs.vue"),
                    },
                ]
            },
            {
                path: "/modulos/usuarios",
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
        component: () => import("../views/Asistencia/AusenciaRegistro.vue"),
    },
    {
        path: "/soporte",
        name: "soporte",
        component: () => import("../views/Help/Soporte.vue"),
    },
    
];

const router = createRouter({
  history: createWebHistory(),  
  routes,
});

// base: process.env.BASE_URL
// base: import.meta.env.VITE_BASE_URL,  

export default router;
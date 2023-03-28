import { Navlink_Type } from "@/components/types";



export const NavLinks: Navlink_Type[] = [
    {
        id:'quiz-regular',
        href:'/quiz-regular',
        title:'Quiz Regular',
        active:false,

    },
    {
        id:'blog',
        href:'/blog',
        title:'Blog',
        active:false,

    },
    {
        id:'quiz-test',
        href:'/quiz-test',
        title:'Quiz Test',
        active:false,
        dropdown:[

            {
                href:'/quiz-test/javascript',
                title:'Javascript',
                id:'javascript'
            },
            {
                href:'quiz-test/typescript',
                title:'Typescript',
                id:'typescript'
            },
            {
                href:'quiz-test/css',
                title:'Css',
                id:'css'
            },
            {
                href:'/quiz-test/react',
                title:'React',
                id:'react'
            },
        ]
    },
    {
        id:'discussion',
        href:'/discussion',
        title:'Discussion',
        active:false,

    },
    {
        id:'quiz',
        href:'/quiz',
        title:'Quiz',
        active:false,

    },

]


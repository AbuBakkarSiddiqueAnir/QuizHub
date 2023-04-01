import { Navlink_Type } from "@/components/types";



export const NavLinks: Navlink_Type[] = [
    {
        id:'regular-quiz',
        href:'/regular-quiz',
        title:'Regular Quiz',
        active:false,

    },
    {
        id:'blog',
        href:'/blog',
        title:'Blog',
        active:false,

    },
    {
        id:'discussion',
        href:'/discussion',
        title:'Discussion',
        active:false,

    },
    {
        id:'challenges',
        href:'/challenges',
        title:'Challenges',
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


]


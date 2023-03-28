export type Navlink_Type = {
    id:string,
    href:string,
    title:string,
    active:boolean,
    dropdown?:{
        href:string,
        title:string,
        id:string
    }[]
}

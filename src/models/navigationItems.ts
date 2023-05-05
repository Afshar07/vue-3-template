export interface navItems {
    title:string,
    link?:string,
    icon:string,
    hasChildren?:Boolean,
    hasAccess?:boolean|string[],
    children?:Object[]|[]
}
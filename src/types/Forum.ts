export interface Forum {
    id: string,
    name: string,
    description: string,
    categoryId: string,
    threads: string[],
    createdAt: Date;
    updatedAt: Date;
}
export interface Foren {
    [key:string]:Forum
}


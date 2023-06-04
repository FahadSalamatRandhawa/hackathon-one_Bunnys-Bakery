import { defineField, defineType } from "sanity";

export const ProductVariants=defineType({
    name:'ProductVariants',
    title:'Product Variations',
    type:'document',
    fields:[defineField({name:'name',type:'string',title:'Product Variant',validation:(Rule:any)=>Rule.max(20)},)]
})
import { type } from "os";
import { defineField, defineType, validation } from "sanity";
import { Rule } from "sanity";

export default {
    name:'Product',
    type:'document',
    title:'Product Data',
    fields:[
        {
            name:'name',
            type:'string',
            title:'Name',
            validation: (Rule:any) => Rule.required()
        },
        {
            name:'description',
            type:'string',
            title:'Description'
        },
        {
            name:'CoverImage',
            type:'image',
            title:'Cover Image',
            validation: (Rule:any) => Rule.required()
        },{
            name:'variants',
            type:'array',
            of:[{type:'string'}]
        },
        {
            name:'extraImages',
            type:'array',
            title:'Side Images',
            of:[{
                type:'image',
                title:'string'
            }],
            validation: (Rule:any) => Rule.unique().min(1)
        },
        {
            name:'price',
            type:'number',
            title:'Price',
            initialValue:0,
            validation: (Rule:any) => Rule.required().positive()
        },
        {
            name:'details',
            type:'array',
            title:'Details',
            of:[
               { name:'detail',type:'document',title:'Detail',fields:[{name:'detailTitle',title:'Title',type:'string',validation:(Rule:any)=>Rule.max(60)},{name:'detailDescription',title:'Description',type:'array',of:[{type:'block'}]}]}
            ]
        },{
            name:'stock',
            type:'number',
            title:'Stock',
            validation:(Rule:any)=>Rule.integer().positive().required()
        }
    ]
}
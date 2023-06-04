import Product from "./Product"
import NavBar from "./NavBar"
import { type } from "os";
import { defineField, defineType, validation } from "sanity";
import { Rule } from "sanity";

export default {
    name:'BunnyBakery',
    type:'document',
    title:"Bunny' Bakery",
    fields:[
                {
                    name:'categories',
                    type:'array',
                    of:[
                        {
                            name:'Catgory',
                            type:'object',
                            title:'Category',
                            fields:[
                                {name:'categoryName',type:'string',title:'Category Name'},
                                {
                                    name:'Products',
                                    type:'array',
                                    title:'Products',
                                    of:[{
                                        name:'Product',
                                        type:'Product',
                                        title:'Product'
                                    }]
                                }
                            ]
                        }
                    ]
                },{
                name:'NavBar',
                type:'NavBar',
                title:'Navigation Bar',
                validation:(Rule:any)=>Rule.required()
            }
    ]
}
import { validation } from "sanity";
import { Rule } from "sanity";
import socialMedia from './logo'

export default{
    name:'NavBar',
    type:'document',
    title:'NavBar',
    fields:[
        {name:'companyName',type:'string',title:'Company Name'},
        {name:'companyDescription',type:'string',title:'Company Description'},
        {name:'socialIcons',type:'array',title:'Social Media Icons',of:[{type:'socialMedia'}]},
        {name:'companyLinks',type:'array',title:'Company Links',of:[{name:'LinkType',type:'document',title:'LinkType',fields:[{name:'linkTitle',type:'string',title:'Link Title'},
        {name:'LinkArrays',type:'array',title:'Links Array',of:[{name:'links',type:'object',title:'Links',fields:[{name:'linkName',type:'string',title:'Link Name'},{name:'linkURL',type:'url',title:'Link URL'}]}
    ]}
    ]}]}
    ]
}

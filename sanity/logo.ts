export default{
    name:'socialMedia',
    type:'document',
    title:'Social Media',
    fields:[
        {name:'SocialName',title:'Name',type:'string'},
        {name:'CoverImage',
        type:'image',
        title:'Cover Image',
        validation: (Rule:any) => Rule.required()}
    ]
}
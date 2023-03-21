export const COLUMNS=[
{
    field: 'id',
   headerName: 'Id',
    
    width:60
},
{
    field: 'first_name',
   headerName: 'First Name',
    
    width:100
},
{field:'last_name',
   headerName: 'Last Name',
    
    width:100
},
{field:'email',
   headerName: 'Email',
    
    width:150
},
{
    field:'gender',
   headerName: 'Gender',
    
    width:100,
    type:'singleSelect',
    valueOptions:['Male','Female'], 
    editable:true
},
{ field:'date_of_birth',
   headerName: 'Date of Birth',
   
    width:100
},

{
    field:'contry',
   headerName: 'Contry',
    
    width:100
},
{
    field:'age',
   headerName: 'Age',
    
    width:50
},
{
    field:'phone',
   headerName: 'Phone',
    
    width:200
}



]

let ob={};
const createBus=function(){
    
    for(let i=1;i<=20;++i){
     ob[i]=false
    }
    return(ob)
}



const upDateBus=function(seatNo){
    console.log(ob)
ob[seatNo]=true
return(ob)
}

module.exports={createBus,upDateBus}
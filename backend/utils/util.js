
let ob={};
const createBus=function(){
    
    for(let i=1;i<=20;++i){
     ob[i]=false
    }
    return(ob)
}


const upDateBus=function(seatNo){
return(ob[seatNo]=true)
}

module.exports={createBus,upDateBus}
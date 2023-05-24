module.exports=truncate;

function truncate(string, limit){
if(string.length<=limit){
    return string;
}
else{
    return string.slice(0,limit)+" ...";
}
}
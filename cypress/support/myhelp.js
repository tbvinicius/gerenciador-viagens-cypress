function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  let algo = getRndInteger(2, 10);

generate00(algo);

function generateCompleteDate(num){
    let complete = '';
   
}
function generate00(num){
    let numberString = '';
    
    if(num<10){
        numberString = "0" + num;
        return numberString
    }
    else{
        return num
    }   

}
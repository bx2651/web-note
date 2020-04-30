var isPalindrome = function(s) {
  let reg = /[a-z0-9]/gi
  if(!reg.test(s)) {
    console.log(true)
    return
  }

  
  var result = s.match(reg).join("").toLowerCase()
  for(let i = 0 ; i < result.length/2 ; i++){
      if(result[i] != result[result.length-1-i]){
        console.log(false)
      }
  }
  console.log(true)
};

isPalindrome("abc")
// let reg = /[a-z0-9]/gi
// console.log(reg.test(" "))
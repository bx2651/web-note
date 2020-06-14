


//   var lengthOfLongestSubstring = function(s) {
//     let map=new Map();
//     let res=0
//     for(let i=0,j=0;j<s.length;j++){
//         if(map.has(s[j])){//如果Map中有这个字符
//             i=Math.max(map.get(s[j])+1,i)//获取重复字符串后面一个字符赋值给i
//             // i = Math.max(1,i)// i = 1  j==2
//         }
//         map.set(s[j],j);//如果Map中没有这个字符，则将字符放进Map中
//         res=Math.max(res,j-i+1);//0,2
//     }
//     return res
// };
// lengthOfLongestSubstring("dvdf")
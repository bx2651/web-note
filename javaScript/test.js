let timeTool = (function() {
  let _instance = null;
  
  function init() {
    //私有变量
    let now = new Date();
    //公用属性和方法
    this.name = '处理时间工具库',
    this.getISODate = function() {
      return now.toISOString();
    }
    this.getUTCDate = function() {
      return now.toUTCString();
    }
  }
  
  return function() {
    if(!_instance) {
      _instance = new init();
    }
    return _instance;
  }
})()

console.log(timeTool().getISODate())
//2020-08-02T14:49:50.864Z
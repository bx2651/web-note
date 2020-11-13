class Water{

}
class Animal{
  public age:number;
  public name:string;
  public water:Water;//类的依赖关系在代码中表示是属性关系，这就是依赖关系

  public eat(){}
  public drink(){}
}

//接口是行为的抽象
interface Eggs{
  layEggs():number;
}

//泛化关系
class Bird extends Animal implements Eggs{
  public swing:number;
  public fly(){}

  //实现接口
  layEggs(){
    return 2
  }
}

//关联关系
class TangFather{}
class TangFriends{}

class TangBird extends Bird{
  public father:TangFather;
  public friends:Array<TangFriends>
}
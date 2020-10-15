class Cooker{
  cook(){}
}
class Person{
  private cooker:Cooker
  cook(){
    this.cooker.cook()
  }
}
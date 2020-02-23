```
func login(_ info:[String:String]){
    let username:String
    if let tmp = info["username"]{
        username = tmp
    }else{
        print("请输入用户名")
        return
    }
    
    let password:String
    if let tmp = info["password"]{
        password = tmp
    }else{
        print("请输入密码")
        return
    }
    
    print("用户名：\(username),密码：\(password)")
}

login(["username":"jack","password":"123456"])
```

## guard语句

```
func login(_ info:[String:String]){
    guard let username = info["username"] else{
        print("请输入用户名")
        return
    }
    guard let password = info["password"] else{
        print("请输入密码")
        return
    }
    print("用户名：\(username),密码：\(password)")
}

login(["username":"baixue","password":"123456"])
```
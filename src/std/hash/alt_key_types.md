# Alternate/custom key types

`Eq`와 `Hash` 트레이트를 구현하는 어떤 타입이든 `HashMap` 내에서 Key로 사용될 수 있습니다. 여기엔 다음과 같은 것들이 포함됩니다.

- `bool` (오직 두 개의 값만 존재해서 실용성이 없긴 합니다.)
- `int`, `uint`, 그 외의 여러 `int` 종류들
- `String`과 `&str` (`String`을 Key로 사용하는 HashMap과 `&str`로 `.get()`를 호출할 수 있습니다.)

`f32`와 `f64`는 해쉬를 구현할 수 없음을 기억하세요. [부동소수점 에러](https://en.wikipedia.org/wiki/Floating_point#Accuracy_problems)로 인해, 해쉬맵 키로 사용되는 경우 오류가 발생하기 쉽기 때문입니다.

컬렉션 유형의 경우, 포함된 유형이 각각 `Eq`와 `Hash`를 구현하는 경우, 마찬가지로 `Eq`와 `Hash`를 구현합니다. 예를 들어, `Vec<T>`는 `T`가 `Hash`를 구현한다면 마찬가지로 `Hash`를 구현합니다.

`#[derive(PartialEq, Eq, Hash)]`를 사용한다면 커스텀 타입에 대한 `Eq`와 `Hash`를 쉽게 구현할 수 있습니다.

컴파일러가 나머지 부분들을 처리합니다. 만약, 좀더 구체적인 사항에 대한 구현을 원한다면, `Eq` 또는 `Hash`를 직접 구현할 수 있습니다. 여기서는 `Hash` 구현에 대한 자세한 내용은 다루지 않겠습니다.

`HashMap`에서 `struct`를 사용해보기 위해, 매우 간단한 로그온 시스템을 구현해봅시다.

```rust
use std::collections::HashMap;

// Eq를 사용하려면 타입에 대한 PartialEq를 파생해야 합니다.
#[derive(PartialEq, Eq, Hash)]
struct Account<'a>{
    username: &'a str,
    password: &'a str,
}

struct AccountInfo<'a>{
    name: &'a str,
    email: &'a str,
}

type Accounts<'a> = HashMap<Account<'a>, AccountInfo<'a>>;

fn try_logon<'a>(accounts: &Accounts<'a>,
        username: &'a str, password: &'a str){
    println!("Username: {}", username);
    println!("Password: {}", password);
    println!("Attempting logon...");

    let logon = Account {
        username,
        password,
    };

    match accounts.get(&logon) {
        Some(account_info) => {
            println!("Successful logon!");
            println!("Name: {}", account_info.name);
            println!("Email: {}", account_info.email);
        },
        _ => println!("Login failed!"),
    }
}

fn main(){
    let mut accounts: Accounts = HashMap::new();

    let account = Account {
        username: "j.everyman",
        password: "password123",
    };

    let account_info = AccountInfo {
        name: "John Everyman",
        email: "j.everyman@email.com",
    };

    accounts.insert(account, account_info);

    try_logon(&accounts, "j.everyman", "psasword123");

    try_logon(&accounts, "j.everyman", "password123");
}
```

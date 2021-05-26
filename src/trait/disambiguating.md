# Disambiguating overlapping traits

하나의 타입에는 여러 트레이트를 구현할 수 있습니다. 만약, 동일한 이름을 요구하는 두 개의 트레이트가 있다면 어떨까요? 예를 들어, 많은 트레이트들이 `get()`이라는 이름의 메서드를 가질 수 있을겁니다. 이들은 심지어 각자 다 다른 반환 타입을 가질겁니다.

*좋은 소식* : 각각의 트레이트 구현은 고유한 `impl` 블럭을 갖기 때문에, 어떤 트레이트의 `get` 메서드에 구현하려고 하는지에 대해 분명합니다.

이들 메서드를 호출해야 하는 경우에는 어떨까요? 이들 간의 애매함을 없애려면, 정규화된 구문(Fully Qualified Syntax)을 사용해야 합니다.

```rust,editable
trait UsernameWidget {
    // 해당 위젯에서 선택된 사용자 이름을 가져옵니다.
    fn get(&self) -> String;
}

trait AgeWidget {
    // 해당 위젯에서 선택된 나이를 가져옵니다.
    fn get(&self) -> u8;
}

// `UsernameWidget`과 `AgeWidget`에 대한 폼(Form)입니다.
struct Form {
    username: String,
    age: u8,
}

impl UsernameWidget for Form {
    fn get(&self) -> String {
        self.username.clone()
    }
}

impl AgeWidget for Form {
    fn get(&self) -> u8 {
        self.age
    }
}

fn main() {
    let form = Form{
        username: "rustacean".to_owned(),
        age: 28,
    };

    // ERROR : `Form`에는 여러 트레이트에 대해 구현된
    // `get` 메서드들이 존재하므로, `form.get()`은 모호합니다.
    // 따라서 아래는 "multiple `get` found" 에러가 발생합니다.
    println!("{}", form.get());

    // 조금 성가시더라도, 아래와 같이 호출되어야 합니다.
    let username = <Form as UsernameWidget>::get(&form);
    assert_eq!("rustacean".to_owned(), username);
    let age = <Form as AgeWidget>::get(&form);
    assert_eq!(28, age);
}
```
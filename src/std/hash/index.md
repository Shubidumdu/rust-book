# HashMap

벡터가 정수 인덱스에 의해 저장되는 반면, 해쉬맵(`HashMap`)은 값을 `key`에 기반하여 저장합니다. `HashMap` 키로는 boolean, 정수, 문자열, 그외에 `Eq`와 `Hash` 트레이트를 구현하는 어떤 타입이든 사용할 수 있습니다. 이에 대해선 다음 섹션에서 살펴보겠습니다.

벡터와 유사하게, `HashMap`은 가변 길이를 갖고 있습니다. 반면 `HashMap`은 너무 많은 공간을 차지하는 경우 자체적으로 축소될 수 있습니다. 해쉬맵은 `HashMap::with_capacity(uint)`을 사용하여 최초 용량을 지정한 채로 생성될 수 있습니다. 또는 `HashMap::new()`를 사용하여 기본 최초 용량으로 해쉬맵을 생성할 수 있습니다. (후자를 추천합니다.)

```rust,editable
use std::collections::HashMap;

fn call(number: &str) -> &str {
    match number {
        "798-1364" => "We're sorry, the call cannot be completed as dialed. 
            Please hang up and try again.",
        "645-7689" => "Hello, this is Mr. Awesome's Pizza. My name is Fred.
            What can I get for you today?",
        _ => "Hi! Who is this again?"
    }
}

fn main() { 
    let mut contacts = HashMap::new();

    contacts.insert("Daniel", "798-1364");
    contacts.insert("Ashley", "645-7689");
    contacts.insert("Katie", "435-8291");
    contacts.insert("Robert", "956-1745");

    // 참조를 받아 `Option<&V>`를 반환합니다.
    match contacts.get(&"Daniel") {
        Some(&number) => println!("Calling Daniel: {}", call(number)),
        _ => println!("Don't have Daniel's number."),
    }

    // `HashMap::insert()`는 만약 삽입된 값이 
    // 새로운 값인 경우 `None`을 반환하고,
    // 그렇지 않은 경우 `Some(value)`를 반환합니다.
    contacts.insert("Daniel", "164-6743");

    match contacts.get(&"Ashley") {
        Some(&number) => println!("Calling Ashley: {}", call(number)),
        _ => println!("Don't have Ashley's number."),
    }

    contacts.remove(&"Ashley"); 

    // `HashMap::iter()`는 임의의 순서로
    // (&'a key, &'a value) 쌍을 생성하는 반복기를 반환합니다.
    for (contact, &number) in contacts.iter() {
        println!("Calling {}: {}", contact, call(number)); 
    }
}
```

해시 및 해시 맵(해시 테이블이라고도 합니다)의 작동 방식에 대한 자세한 내용은 [여기](https://en.wikipedia.org/wiki/Hash_table)를 참조하세요.
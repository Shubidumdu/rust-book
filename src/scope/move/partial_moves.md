# Partial moves

패턴 바인딩은 해체(destructuring)에서 사용되는 `by-move`와 `by-reference` 바인딩을 동시에 가질 수 있습니다. 이러한 패턴은 변수를 부분적으로 이동시키며, 이로 인해 변수의 일부만 이동되고, 나머지는 유지됩니다. 이 경우, 부모 변수는 나중에 완전한 형태로는 사용할 수 없습니다. 그러나, 참조를 이용하여 이동되지 않은 부분들은 여전히 사용할 수 있습니다.

```rust
fn main() {
    #[derive(Debug)]
    struct Person {
        name: String,
        age: u8,
    }

    let person = Person {
        name: String::from("Alice"),
        age: 20,
    };

    // `name`은 person으로부터 이동됩니다.
    // 반면, `age`는 단순히 참조합니다.
    let Person { name, ref age } = person;

    println!("The person's age is {}", age);

    println!("The person's name is {}", name);

    // ERROR : 부분적으로 이동한 값이 존재합니다.
    // 따라서 `person`은 완전한 형태로 사용될 수 없습니다.
    println!("The person struct is {:?}", person);

    // `person`은 사용될 수 없으나,
    // `person.age`는 이동하지 않았기 때문에 사용할 수 있습니다.
    println!("The person's age from person struct is {}", person.age);
}
```
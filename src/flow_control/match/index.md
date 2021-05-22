# match

Rust에서는 `match` 키워드로 패턴을 시킬 수 있습니다. 이는 C에서의 `switch`와 유사합니다. match 내에서 첫번째로 일치하는 패턴에 따라 내요이 처리되며, match는 발생할 수 있는 패턴에 대해 처리할 수 있어야 합니다.

```rust,editable
fn main() {
    let number = 13;

    println!("Tell me about {}", number);
    match number {
        // 하나의 값에 대한 매칭
        1 => println!("One!"),
        // 여러 값에 대해 매칭
        2 | 3 | 5 | 7 | 11 | 13=> println!("This is a prime"),
        // 범위에 대해 매칭
        14..=19 => println!("A teen"),
        // 발생할 수 있는 나머지 부분에 대해 처리
        _ => println!("Ain't special"),
    }

    let boolean = true;
    // match도 Expression 입니다.
    let binary = match boolean {
        // 발생할 수 있는 모든 경우에 대해 처리합니다.
        false => 0,
        true => 1,
    };

    println!("{} -> {}", boolean, binary);
}

```
# Mutability

변수 바인딩은 기본적으로 immutable 합니다. 그러나, `mut` 수식어를 덧붙여 오버라이딩이 가능하도록 할 수 있습니다.

```rust
fn main() {
    let _immutable_binding = 1;
    let mut mutable_binding = 1;

    println!("Before mutation: {}", mutable_binding);

    // `mut`을 덧붙였기에 값을 변경할 수 있습니다.
    mutable_binding += 1;

    println!("After mutation: {}", mutable_binding);

    // 기본적으로 바인딩은 immutable 합니다.
    // 따라서 아래는 에러가 발생합니다.
    _immutable_binding += 1;
}
```
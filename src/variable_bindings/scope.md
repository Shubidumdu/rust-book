# Scope and Shadowing

변수 바인딩은 스코프를 가지며, 하나의 블록 영역 내에서만 사용됩니다. 블록은 `{}` 괄호로 둘러싸인 statement의 컬렉션입니다.

```rust,editable
fn main() {
    // 아래 바인딩은 `main` 함수에 종속됩니다.
    let long_lived_binding = 1;

    // 블록을 통해 직접 스코프를 만들 수 있습니다.
    {
        // 따라서 아래 바인딩은 해당 스코프에서만 유효합니다.
        let short_lived_binding = 2;

        println!("inner short: {}", short_lived_binding);
    }

    // 위의 블록 내에서 선언한 바인딩은 바깥에서는 유효하지 않습니다.
    // 따라서 아래의 코드는 에러가 발생합니다.
    println!("outer short: {}", short_lived_binding);

    // 아래는 유효한 범위 내에 있으므로 정상적으로 출력됩니다.
    println!("outer long: {}", long_lived_binding);
}
```

Variable Shadowing도 가능합니다. 

```rust,editable
fn main() {
    let shadowed_binding = 1;

    {
        println!("before being shadowed: {}", shadowed_binding);

        // 바깥의 바인딩을 Shadowing합니다.
        let shadowed_binding = "abc";

        println!("shadowed in inner block: {}", shadowed_binding);
    }
    println!("outside inner block: {}", shadowed_binding);

    // 최상단의 바인딩에 대해 Shadowing합니다.
    let shadowed_binding = 2;
    println!("shadowed in outer block: {}", shadowed_binding);
}
```
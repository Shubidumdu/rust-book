# Declare first

변수 바인딩을 먼저 선언만 하고, 추후에 초기화(할당)하는 것도 가능합니다. 허나, 이러한 방식은 초기화되지 않은 변수를 의도치않게 사용할 수도 있기 떄문에 거의 활용되지 않습니다.

```rust,editable
fn main() {
    // 변수 바인딩을 선언'만' 합니다.
    let a_binding;

    {
        let x = 2;

        // 이후 초기화합니다.
        a_binding = x * x;
    }

    println!("a binding: {}", a_binding);

    let another_binding;

    // ERROR : 초기화되지 않은 바인딩을 사용했습니다.
    println!("another binding: {}", another_binding);

    another_binding = 1;

    println!("another binding: {}", another_binding);
}
```

의도치 않은 동작을 방지하기 위해, 컴파일러 자체적으로도 초기화되지 않은 변수들에 대한 사용을 막고 있습니다.
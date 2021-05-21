# Variable Bindings

Rust는 정적 타이핑을 통해 안정성을 보장합니다. 변수 바인딩은 선언 시에 타입이 지정될 수 있습니다. 그러나, 대부분의 경우 컴파일러는 컨텍스트를 통해 변수의 타입을 추측할 수 있으므로, 일일이 정적 타이핑을 해주는 것에 대한 부담이 줄어듭니다.

리터럴 등을 통해 생성해내는 값들은 변수에 바인딩될 수 있으며, 이 때는 `let` 바인딩을 사용합니다.

```rust,editable
fn main() {
    let an_integer = 1u32;
    let a_boolean = true;
    let unit = ();

    // an_integer를 copied_integer에 복사합니다.
    let copied_integer = an_integer;

    println!("An integer: {:?}", copied_integer);
    println!("A boolean: {:?}", a_boolean);
    println!("Meet the unit value: {:?}", unit);

    // 컴파일러는 사용되지 않은 변수에 대해서는 경고합니다.
    // 이 경우, 변수명 앞에 `_`를 붙여 막을 수 있습니다.
    let _unused_variable = 3u32;
}
```
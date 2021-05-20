# Literals and operators

앞서 말한 스칼라 타입의 값에 해당하는 값들은 리터럴(literal)을 통해 표현할 수 있습니다.

정수는 16진수(`0x`), 8진수(`0o`), 2진수(`0b`)로 표현될 수 있습니다.

밑줄(`_`)은 숫자 리터럴에 있어 가독성을 향상시켜주기 위해 사용합니다. (ex. `1_000 == 1000`, `0.000_001 == 0.000001`)

리터럴을 사용하려면 컴파일러에게 어떤 타입의 리터럴을 사용하는지에 대해 알려주어야 합니다. 지금부터는 unsigned 32-bit integer를 나타내기 위해 `u32` suffix를 사용하겠습니다.

Rust에서 사용할 수 있는 연산자와 이들 간의 우선순위는 다른 C형 언어들과 유사합니다. ([참조](https://doc.rust-lang.org/reference/expressions.html#expression-precedence))

```rust,editable
fn main() {
    // 정수 덧셈
    println!("1 + 2 = {}", 1u32 + 2);

    // 정수 뺄셈
    println!("1 - 2 = {}", 1i32 - 2);

    // Boolean 로직에 대한 Short-circuiting 
    println!("true AND false is {}", true && false);
    println!("true OR false is {}", true || false);
    println!("NOT true is {}", !true);

    // Bitwise operations
    println!("0011 AND 0101 is {:04b}", 0b0011u32 & 0b0101);
    println!("0011 OR 0101 is {:04b}", 0b0011u32 | 0b0101);
    println!("0011 XOR 0101 is {:04b}", 0b0011u32 ^ 0b0101);
    println!("1 << 5 is {}", 1u32 << 5);
    println!("0x80 >> 2 is 0x{:x}", 0x80u32 >> 2);

    // 가독성 향상을 위해 밑줄을 사용
    println!("One million is written as {}", 1_000_000u32);
}
```
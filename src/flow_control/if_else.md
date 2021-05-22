# if/else

`if`-`else`를 다루는 것은 다른 언어에서와 유사합니다. 대신 다른 언어에서와 달리, Boolean 조건은 괄호로 둘러싸일 필요가 없으며, 각각의 조건문은 블록으로 감싸져야 합니다. `if`-`else` 조건문 역시 Expression이며, 모든 분기점들은 반드시 동일한 타입을 반환해야 합니다.

```rust,editable
fn main() {
    let n = 5;

    if n < 0 {
        print!("{} is negative", n);
    } else if n > 0 {
        print!("{} is positive", n);
    } else {
        print!("{} is zero", n);
    }

    let big_n =
        if n < 10 && n > -10 {
            println!(", and is a small number, increase ten-fold");
            
            // 해당 `if` 문은 `i32` 타입을 반환합니다.
            10 * n
        } else {
            println!(", and is a big number, halve the number");

            // 따라서 `else` 조건문 역시 `i32` 타입을 반환해야 합니다.
            n / 2
        };
    //   ^ 여기에 세미콜론을 사용하는 것을 잊지 마세요!
    // 모든 `let` 바인딩이 그런 것처럼요.

    println!("{} -> {}", n, big_n);
}
```
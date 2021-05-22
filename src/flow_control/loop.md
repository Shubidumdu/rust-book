# Loop

Rust는 무한 루프를 나타내는 `loop` 키워드를 제공합니다.

`break` 문은 루프의 진행 중 어느 때라도 빠져나갈 수 있게 해줍니다. `continue` 문은 현재 반복 중 남은 부분들을 무시하고 다음 반복으로 넘어갈 수 있게 해줍니다.

```rust
fn main() {
    let mut count = 0u32;

    println!("Let's count until infinity!");

    // 무한 루프
    loop {
        count += 1;

        if count == 3 {
            println!("three");

            // 현재 반복의 나머지 부분들을 무시합니다.
            continue;
        }

        println!("{}", count);

        if count == 5 {
            println!("OK, that's enough");

            // 루프에서 빠져나갑니다.
            break;
        }
    }
}
```
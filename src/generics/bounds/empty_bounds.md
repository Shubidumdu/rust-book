# Testcase: empty bounds

바운드가 동작하는 방식의 결과로, 트레이트는 어떤 기능을 포함하지 않더라도, 여전히 바운드로 사용할 수 있습니다. `Eq`와 `Copy`는 `std` 라이브러리에서 제공되는 트레이트의 예시입니다.

```rust
struct Cardinal;
struct BlueJay;
struct Turkey;

trait Red {}
trait Blue {}

impl Red for Cardinal {}
impl Blue for BlueJay {}

// 아래 함수들은 트레이트들을 구현한 타입에 대해서만 유효합니다.
// 반면, 트레이트가 비어있다는 사실 자체는 무관합니다.
fn red<T: Red>(_: &T)   -> &'static str { "red" }
fn blue<T: Blue>(_: &T) -> &'static str { "blue" }

fn main() {
    let cardinal = Cardinal;
    let blue_jay = BlueJay;
    let _turkey   = Turkey;

    // `red()`는 blu_jay에는 동작하지 않습니다.
    // 그 반대도 마찬가지이며, 이는 바운드 때문입니다.
    println!("A cardinal is {}", red(&cardinal));
    println!("A blue jay is {}", blue(&blue_jay));

    // ERROR : `red()`는 blu_jay에는 동작하지 않습니다.
    // 그 반대도 마찬가지이며, 이는 바운드 때문입니다.
    println!("A turkey is {}", red(&_turkey));
}
```
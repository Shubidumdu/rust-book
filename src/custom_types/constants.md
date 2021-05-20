# constants

Rust는 두 가지 타입의 상수(constants)를 갖고 있습니다. 상수는 글로벌 스코프를 포함하여 어디에서는 선언될 수 있으며, 두 타입 모두 명시적으로 타입을 지정할 수 있습니다.

- `const` : 바뀌지 않는 값 (일반적으로는 이를 사용합니다.)
- `static` : `'static` 라이프타임을 가진, 필요에 따라 mutable로 지정할 수 있는 변수입니다. static 라이프타임은 유추될 수 있기 때문에 직접 지정할 필요는 없습니다. 해당 값에 접근하거나 수정하는 것은 안전하지 않은 것으로 간주됩니다.

```rust,editable
// 글로벌 변수들을 선언, 할당합니다.
static LANGUAGE: &str = "Rust";
const THRESHOLD: i32 = 10;

fn is_big(n: i32) -> bool {
    // THRESHOLD는 글로벌 변수이므로 해당 함수에서 접근 가능합니다.
    n > THRESHOLD
}

fn main() {
    let n = 16;

    // 메인 쓰레드에서 상수에 접근합니다. 
    println!("This is {}", LANGUAGE);
    println!("The threshold is {}", THRESHOLD);
    println!("{} is {}", n, if is_big(n) { "big" } else { "small" });

    // ERROR! : `const`로 지정한 변수는 변경할 수 없습니다.
    THRESHOLD = 5;
}
```
# Aliasing

`type` 문은 기존 타입에 새로운 이름을 부여할 수 있습니다. 타입은 반드시 `UpperCamelCase`로 쓰여야 하고, 그렇지 않으면 경고를 출력합니다. 원시 타입의 경우는 예외입니다. (`usize`, `f32` 등)

```rust,editable
// `NanoSecond`는 `u64`의 새로운 타입명입니다.
type NanoSecond = u64;
type Inch = u64;

// camel case로 작성하지 않으면 경고가 출력됩니다.
// 다만 아래에서는 어트리뷰트를 통해 이를 무시합니다.
#[allow(non_camel_case_types)]
type u64_t = u64;

fn main() {
    // `NanoSecond` = `Inch` = `u64_t` = `u64`.
    let nanoseconds: NanoSecond = 5 as u64_t;
    let inches: Inch = 2 as u64_t;

    // 결국, 타입 별칭은 추가로 타입 안정성을 제공하는 기능이 아닙니다.
    // 별칭은 새로운 타입이 아닙니다.
    println!("{} nanoseconds + {} inches = {} unit?",
             nanoseconds,
             inches,
             nanoseconds + inches);
}
```

타입 별칭의 주된 사용은 보일러플레이트를 줄이기 위함입니다. 예를 들어, `Result<T, IoError>`의 별칭으로 `IoResult<T>` 타입을 사용할 수 있습니다.
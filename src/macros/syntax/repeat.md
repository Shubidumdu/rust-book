# Repeat

매크로는 인수 리스트에서 `+`를 사용해 인수가 한번 이상 반복될 수 있음을 나타내거나, `*`을 사용하여 인수가 0번 이상 반복될 수 있음을 나타낼 수 있습니다.

아래 예시에서, `$(...),+`는 `,`로 구분된 하나 이상의 Expression과 매치될 것입니다. `;`의 사용은 마지막 케이스의 경우, 선택 사항임에 주의하세요.

```rust,editable
// `find_min!`은 여러 인수들 중 최소값을 계산합니다.
macro_rules! find_min {
    // 기본 케이스
    ($x:expr) => ($x);
    // `$x`에는 적어도 하나의 `$y,`가 뒤따라옵니다.
    ($x:expr, $($y:expr),+) => (
        // 뒤의 `$y`에 `find_min!`을 호출합니다.
        std::cmp::min($x, find_min!($($y),+))
    )
}

fn main() {
    println!("{}", find_min!(1u32));
    println!("{}", find_min!(1u32 + 2, 2u32));
    println!("{}", find_min!(5u32, 2u32 * 3, 4u32));
}
```
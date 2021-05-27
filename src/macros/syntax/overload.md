# Overload

매크로는 여러 조합의 인수들을 받기 위해 오버로딩될 수 있습니다. 이를 통해, `macro_rules!`는 `match` 블럭과 유사하게 동작할 수 있습니다.

```rust,editable
// `test!`는 어떻게 호출하느냐에 따라 다른 방식으로
// `$left`와 `$right`를 비교합니다.
macro_rules! test {
    // 인수는 `,`로 구분되지 않아도 됩니다.
    // 모든 형식을 사용할 수 있습니다!
    ($left:expr; and $right:expr) => {
        println!("{:?} and {:?} is {:?}",
                 stringify!($left),
                 stringify!($right),
                 $left && $right)
    };
    // 각 분기는 `;`로 끝나야 합니다.
    ($left:expr; or $right:expr) => {
        println!("{:?} or {:?} is {:?}",
                 stringify!($left),
                 stringify!($right),
                 $left || $right)
    };
}

fn main() {
    test!(1i32 + 1 == 2i32; and 2i32 * 2 == 4i32);
    test!(true; or false);
}
```
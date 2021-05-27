# Option

종종 `panic!` 호출 대신 프로그램의 일부에 대한 실패를 잡아내는 것이 더 이상적인 경우도 있습니다. 이런 경우 `Option` enum을 사용할 수 있습니다.

`Option<T>` enum은 다음의 두가지 변형을 갖습니다.

- `None` : 실패 또는 값의 부재를 나타냅니다.
- `Some(value)` : `T` 타입을 가진 `value`을 감싸는 튜플 구조

```rust,editable
// `panic!`을 사용하지 않는 정수 나눗셈
fn checked_division(dividend: i32, divisor: i32) -> Option<i32> {
    if divisor == 0 {
        // 작업이 실패한 경우 `None` 변형을 반환합니다.
        None
    } else {
        // 결과는 `Some` 변형으로 감싸집니다.
        Some(dividend / divisor)
    }
}

// 아래 함수는 성공하지 못한 나눗셈을 처리합니다.
fn try_division(dividend: i32, divisor: i32) {
    // `Option` 값은 다른 enum들과 동일하게 `match`를 사용할 수 있습니다.
    match checked_division(dividend, divisor) {
        None => println!("{} / {} failed!", dividend, divisor),
        Some(quotient) => {
            println!("{} / {} = {}", dividend, divisor, quotient)
        },
    }
}

fn main() {
    try_division(4, 2);
    try_division(1, 0);

    // 변수에 `None`을 바인딩하기 위해서는 타입이 지정되어야 합니다.
    let none: Option<i32> = None;
    let _equivalent_none = None::<i32>;

    let optional_float = Some(0f32);

    // `unwrap`은 래핑 처리된 값을 추출해냅니다.
    println!("{:?} unwraps to {:?}", optional_float, optional_float.unwrap());

    // `None` 변형에 대한 `unwrap`의 사용은 `panic!`을 유발합니다.
    println!("{:?} unwraps to {:?}", none, none.unwrap());
}
```
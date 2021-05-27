# map for Result

이전 예제의 `multiply`에서 `panic`이 발생한다고 해서 더 튼튼한 코드가 작성되지는 않습니다. 일반적으로, 우리는 에러에 대한 올바른 대처를 결정하기 위해 호출자에게 에러를 반환하고자 합니다.

먼저 알아야 할 것은 다루어야 하는 에러 타입이 어떤 종류인지에 대해서입니다. `Err`타입을 결정하기 위해선 `parse()`를 살펴봐야 하는데, 이는 `i32`에 대한 `FromStr` 트레이트로 구현되어 있습니다. 따라서, `Err` 타입은 `ParseIntError`로 지정됩니다.

아래 예시에서, 간단한 `match`문은 전반적으로 더 번거로운 코드로 이어지게 됩니다.

```rust,editable
use std::num::ParseIntError;

// 재작성된 반환타입을 통해, 우리는 `unwrap()`없이 패턴 매칭을 합니다.
fn multiply(first_number_str: &str, second_number_str: &str) -> Result<i32, ParseIntError> {
    match first_number_str.parse::<i32>() {
        Ok(first_number)  => {
            match second_number_str.parse::<i32>() {
                Ok(second_number)  => {
                    Ok(first_number * second_number)
                },
                Err(e) => Err(e),
            }
        },
        Err(e) => Err(e),
    }
}

fn print(result: Result<i32, ParseIntError>) {
    match result {
        Ok(n)  => println!("n is {}", n),
        Err(e) => println!("Error: {}", e),
    }
}

fn main() {
    // 이는 유효한 답입니다.
    let twenty = multiply("10", "2");
    print(twenty);

    // 아래는 좀 더 도움이 되는 에러 메시지를 제공합니다.
    let tt = multiply("t", "2");
    print(tt);
}
```

다행히도, `Option`의 `map`, `and_then`, 그리고 그 외의 다른 컴비네이터(combinator)들은 `Result`에 대해서도 구현될 수 있습니다. [여기](https://doc.rust-lang.org/std/result/enum.Result.html)에서 완전한 목록을 확인할 수 있습니다.

```rust,editable
use std::num::ParseIntError;

// `Option`과 마찬가지로, `map()`과 같은 컴비네이터를 사용할 수 있습니다.
// 아래 함수는 위의 기능과 동일합니다.
// 만약 값이 유효하다면 `n`을 수정하고,
// 그렇지 않다면 에러를 전달합니다.
fn multiply(first_number_str: &str, second_number_str: &str) -> Result<i32, ParseIntError> {
    first_number_str.parse::<i32>().and_then(|first_number| {
        second_number_str.parse::<i32>().map(|second_number| first_number * second_number)
    })
}

fn print(result: Result<i32, ParseIntError>) {
    match result {
        Ok(n)  => println!("n is {}", n),
        Err(e) => println!("Error: {}", e),
    }
}

fn main() {
    let twenty = multiply("10", "2");
    print(twenty);

    let tt = multiply("t", "2");
    print(tt);
}
```
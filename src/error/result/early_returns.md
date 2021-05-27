# Early returns

이전 예시에서, 우리는 컴비네이터(combinator)를 사용해 에러를 명시적으로 핸들링했습니다. 이를 다루는 또다른 방법은 `match`문과 *조기 반환(early returns)*의 조합을 사용하는 것입니다.

즉, 우리는 단순히 함수의 실행을 멈추고 발생한 에러를 바로 반환할 수 있습니다. 어떤 사람들에게는, 이런 형태의 코드가 더 읽고 쓰기에 쉽게 느껴질 수 있습니다. 이전 예시들을 "조기 반환"을 통해 다시 작성해보겠습니다.

```rust,editable
use std::num::ParseIntError;

fn multiply(first_number_str: &str, second_number_str: &str) -> Result<i32, ParseIntError> {
    let first_number = match first_number_str.parse::<i32>() {
        Ok(first_number)  => first_number,
        Err(e) => return Err(e),
    };

    let second_number = match second_number_str.parse::<i32>() {
        Ok(second_number)  => second_number,
        Err(e) => return Err(e),
    };

    Ok(first_number * second_number)
}

fn print(result: Result<i32, ParseIntError>) {
    match result {
        Ok(n)  => println!("n is {}", n),
        Err(e) => println!("Error: {}", e),
    }
}

fn main() {
    print(multiply("10", "2"));
    print(multiply("t", "2"));
}
```

이 시점에서, 우리는 컴비네이터와 조기 반환을 사용해 오류를 명시적으로 처리하는 방법을 배웠습니다. 다만, 이런 식으로 모든 에러를 명시적으로 핸들링 하는 것은 제법 번거로운 일입니다.

다음 섹션에서, `panic`을 사용하지 않고 단순히 `unwrap`을 통해 해결할 수 있는 `?`에 대해 소개하겠습니다.
# aliases for Result

구체적인 `Result` 타입을 여러번 재사용하고 싶다면 어떻게 해야할까요? Rust가 우리에게 **Alias** 기능을 제공했던 것을 기억해보세요! 편리하게도, 우리는 문제의 특정 결과에 대한 Alias를 정의할 수 있습니다.

모듈 수준에서 Alias를 만드는 것이 특히 유용할 겁니다. 구체적인 모듈 내에서 발견된 에러들은 대체로 동일한 `Err` 타입을 가지며, 따라서 하나의 별칭으로 관련된 모든 `Result`를 간결하게 정의할 수 있습니다. 이는 `std` 라이브러리가 별도로 `io::Result`를 제공할 정도로 유용합니다! :)

아래에서 간단한 예시를 살펴봅시다.

```rust,editable
use std::num::ParseIntError;

// `ParseIntError`로 `Result`에 대한 제네릭 별칭을 정의합니다.
type AliasedResult<T> = Result<T, ParseIntError>;

// 위의 별칭을 사용해 구체적인 `Result` 타입을 참조합니다.
fn multiply(first_number_str: &str, second_number_str: &str) -> AliasedResult<i32> {
    first_number_str.parse::<i32>().and_then(|first_number| {
        second_number_str.parse::<i32>().map(|second_number| first_number * second_number)
    })
}

// 별칭 덕분에 코드를 간결하게 작성할 수 있습니다.
fn print(result: AliasedResult<i32>) {
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
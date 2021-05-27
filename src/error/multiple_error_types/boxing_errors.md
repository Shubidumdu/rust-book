# Boxing errors

기존 에러를 보존하면서도 간단한 코드를 작성하는 방법은 이들을 `Box`하는 것입니다. 이 경우의 단점은 기존 에러 타입이 런타임에서만 발견되며, 정적으로 결정될 수 없다는 것입니다.

`std` 라이브러리는 `Error` 트레이트를 구현하는 어떤 타입이든 `From`을 통해 `Box<Error>` 트레이트 객체로 변환하도록 구현된 `Box` 트레이트를 갖고 있어, 에러들을 포장(box)하는 것을 도와줍니다.

```rust,editable
use std::error;
use std::fmt;

// 별칭을 `Box<error::Error>`로 변경합니다.
type Result<T> = std::result::Result<T, Box<dyn error::Error>>;

#[derive(Debug, Clone)]
struct EmptyVec;

impl fmt::Display for EmptyVec {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "invalid first item to double")
    }
}

impl error::Error for EmptyVec {}

fn double_first(vec: Vec<&str>) -> Result<i32> {
    vec.first()
        .ok_or_else(|| EmptyVec.into()) // Box로 변환
        .and_then(|s| {
            s.parse::<i32>()
                .map_err(|e| e.into()) // Box로 변환
                .map(|i| 2 * i)
        })
}

fn print(result: Result<i32>) {
    match result {
        Ok(n) => println!("The first doubled is {}", n),
        Err(e) => println!("Error: {}", e),
    }
}

fn main() {
    let numbers = vec!["42", "93", "18"];
    let empty = vec![];
    let strings = vec!["tofu", "93", "18"];

    print(double_first(numbers));
    print(double_first(empty));
    print(double_first(strings));
}
```
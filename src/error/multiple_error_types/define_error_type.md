# Defining an error type

때로는 코드를 단순화하여, 하나의 에러 타입으로 여러 종류의 에러들을 모두 처리하는 경우도 있습니다. 이는 커스텀 에러 타입을 통해 이루어집니다.

Rust는 임의의 에러 타입을 정의할 수 있게 해줍니다. 일반적으로, *좋은* 에러 타입은 다음 특징을 갖습니다.

- 동일한 타입으로 다른 에러를 처리할 수 있습니다.
- 이용자들에게 좋은 에러 메시지를 제공합니다.
- 다른 타입과 비교하기에 용이합니다.
  - Good : `Err(EmptyVec)`
  - Bad : `Err("Please use a vector with at least one element".to_owned())`
- 에러에 대한 정보를 담을 수 있습니다.
  - Good : `Err(BadChar(c, position))`
  - Bad : `Err("+ cannot be used here".to_owned())`
- 다른 에러들과 잘 합성(compose)될 수 있습니다.

```rust
use std::fmt;

type Result<T> = std::result::Result<T, DoubleError>;

// 임의의 에러타입을 정의합니다.
// 이는 우리의 에러 핸들링 사례에 따라 커스터마이징될 수 있습니다.
#[derive(Debug, Clone)]
struct DoubleError;

// 에러의 생성은 그것이 어떻게 출력되느냐와는 완전히 별개의 문제입니다.
// 출력 시에 복잡한 논리에 대해 걱정할 필요는 없습니다.
// 에러에 대한 어떤 추가적인 정보도 저장하지 않음을 명심하세요.
// 즉, 타입을 수정하지 않고서는 정보 전달을 위해 에러의 구체적인 사항을 보관할 수 없습니다. 
impl fmt::Display for DoubleError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "invalid first item to double")
    }
}

fn double_first(vec: Vec<&str>) -> Result<i32> {
    vec.first()
        // 새로운 에러 타입으로 에러를 변경합니다.
        .ok_or(DoubleError)
        .and_then(|s| {
            s.parse::<i32>()
                // 여기에서도 새로운 에러 타입으로 변경합니다.
                .map_err(|_| DoubleError)
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
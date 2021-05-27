# Wrapping errors

에러를 Box 처리하는 대신에 이를 커스텀 에러 타입으로 감쌀 수 있습니다.

```rust,editable
use std::error;
use std::error::Error as _;
use std::num::ParseIntError;
use std::fmt;

type Result<T> = std::result::Result<T, DoubleError>;

#[derive(Debug)]
enum DoubleError {
    EmptyVec,
    // 파싱 에러에 대해서는 파싱 에러에 대한 구현으로 넘기겠습니다.
    // 추가 정보를 제공하려면 타입에 더 많은 데이터를 추가해야 합니다.
    Parse(ParseIntError),
}

impl fmt::Display for DoubleError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match *self {
            DoubleError::EmptyVec =>
                write!(f, "please use a vector with at least one element"),
            // 포장된 에러에는 추가적인 정보가 포함되어 있으며,
            // `source()` 메서드를 통해 사용할 수 있습니다.
            DoubleError::Parse(..) =>
                write!(f, "the provided string could not be parsed as int"),
        }
    }
}

impl error::Error for DoubleError {
    fn source(&self) -> Option<&(dyn error::Error + 'static)> {
        match *self {
            DoubleError::EmptyVec => None,
            // 원인은 기본적인 구현 에러 타입입니다.
            // 특성 객체 `&error:Error`에 암시적으로 캐스팅됩니다.
            // 이는 기본 유형이 이미 `Error` 트레이트를 구현하기 때문입니다.
            DoubleError::Parse(ref e) => Some(e),
        }
    }
}

// `ParseIntError`에서 `DoubleError`로의 변환을 구현합니다.
// `ParseIntError`가 `DoubleError`로 변환되어야 할 경우에
// 이는 `?`를 통해 자동으로 호출됩니다. 
impl From<ParseIntError> for DoubleError {
    fn from(err: ParseIntError) -> DoubleError {
        DoubleError::Parse(err)
    }
}

fn double_first(vec: Vec<&str>) -> Result<i32> {
    let first = vec.first().ok_or(DoubleError::EmptyVec)?;
    // 여기서는 `DoubleError`를 생성하기 위해서
    // `From`의 `ParseIntError` 구현(위에서 정의)을 암시적으로 사용합니다.
    let parsed = first.parse::<i32>()?;

    Ok(2 * parsed)
}

fn print(result: Result<i32>) {
    match result {
        Ok(n)  => println!("The first doubled is {}", n),
        Err(e) => {
            println!("Error: {}", e);
            if let Some(source) = e.source() {
                println!("  Caused by: {}", source);
            }
        },
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

이렇게 하면 에러를 처리하기 위한 보일러플레이트가 약간 더 추가되며, 일부 애플리케이션에는 이것이 필요하지 않을 수 있습니다. 보일러플레이트를 대신 해결해주는 몇몇 라이브러리들이 존재합니다.
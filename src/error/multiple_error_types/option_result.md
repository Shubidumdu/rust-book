# Pulling Results out of Options

복합적인 에러 타입들을 다루기 위한 가장 기본적인 방법은 그들 서로를 끼워넣는 것입니다.

```rust,editable
use std::num::ParseIntError;

fn double_first(vec: Vec<&str>) -> Option<Result<i32, ParseIntError>> {
    vec.first().map(|first| {
        first.parse::<i32>().map(|n| 2 * n)
    })
}

fn main() {
    let numbers = vec!["42", "93", "18"];
    let empty = vec![];
    let strings = vec!["tofu", "93", "18"];

    println!("The first doubled is {:?}", double_first(numbers));

    println!("The first doubled is {:?}", double_first(empty));
    // Error 1: 입력 벡터가 비어있습니다.

    println!("The first doubled is {:?}", double_first(strings));
    // Error 2: 수로 파싱할 수 없는 String이 포함되어 있습니다.
}
```

`Option`이 `None`일 때, 에러 처리를 중지하고(`?` 이용과 같이), 계속해서 진행해야 하는 경우가 있습니다. 일부 컴비네이터는 `Result`와 `Option`을 서로 교환하는 데에 유용합니다.

```rust,editable
use std::num::ParseIntError;

fn double_first(vec: Vec<&str>) -> Result<Option<i32>, ParseIntError> {
    let opt = vec.first().map(|first| {
        first.parse::<i32>().map(|n| 2 * n)
    });

    opt.map_or(Ok(None), |r| r.map(Some))
}

fn main() {
    let numbers = vec!["42", "93", "18"];
    let empty = vec![];
    let strings = vec!["tofu", "93", "18"];

    println!("The first doubled is {:?}", double_first(numbers));
    println!("The first doubled is {:?}", double_first(empty));
    println!("The first doubled is {:?}", double_first(strings));
}
```
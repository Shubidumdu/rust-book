# Multiple error types

이전 예시들은 매번 편리해질 수 있었습니다. `Result`들은 다른 `Result`들과 상호작용하고, `Option`들은 다른 `Option`들과 상호작용했습니다.

때때로 `Option`은 `Result`와 상호작용해야 합니다. 또는, `Result<T, Error1>`이 `Result<T, Error2>`와 상호작용할지도 모릅니다. 이러한 경우, 우리는 서로 다른 오류 유형을 더 복합적이고 쉽게 상호작용할 수 있는 형태로 관리하고자 합니다.

아래 코드에서, `unwrap`의 두 예시들은 다른 에러 타입들을 만들어냅니다. `Vec::first`는 `Option`을 반환하는 반면, `parse::<i32>`는 `Result<i32, ParseIntError>`를 반환합니다.

```rust
fn double_first(vec: Vec<&str>) -> i32 {
    let first = vec.first().unwrap(); // Error 1 생성
    2 * first.parse::<i32>().unwrap() // Error 2 생성
}

fn main() {
    let numbers = vec!["42", "93", "18"];
    let empty = vec![];
    let strings = vec!["tofu", "93", "18"];

    println!("The first doubled is {}", double_first(numbers));

    println!("The first doubled is {}", double_first(empty));
    // Error 1 : 입력 벡터가 비어있습니다.

    println!("The first doubled is {}", double_first(strings));
    // Error 2: 수로 파싱할 수 없는 String이 포함되어 있습니다.
}
```

이후의 섹션들을 통해, 이러한 종류의 문제를 다루기 위한 몇가지 전략에 대해 살펴보겠습니다.
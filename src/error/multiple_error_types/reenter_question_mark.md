# Other uses of ?

이전 챕터에서는 `parse` 호출에 대한 즉각적인 반응으로 라이브러리 에러를 Box 처리된 에러로 `map`하였습니다.

```rust
.and_then(|s| s.parse::<i32>()
    .map_err(|e| e.into())
```

이는 간단하고 일반적인 작업이기 때문에, 생략될 수 있다면 더 편해질 것 같습니다. 아뿔싸, `and_then`은 그렇게까지 유연하지 않기 때문에, 그럴 수 없겠네요. 하지만, `?`를 사용한다면 어떨까요?

`?`는 이전에 `unwrap` 또는 `return Err(err)`를 처리해준다고 설명했습니다. 이는 거의 맞는 말이지만, 사실 이는 `unwrap` 또는 `return Err(From::from(err))`를 의미합니다. `From::from`은 다른 타입들 간의 변환 유틸리티이므로, 이는 만약 `?`를 반환 타입으로 변환될 수 있는 에러에 사용한다면, 자동으로 변환된다는 것을 의미힙니다.

자, 이전 예시를 `?`를 통해 다시 작성해봅시다. `From::from`이 우리의 커스텀 에러 타입에 대해 구현된다면 `map_err`는 필요가 없어집니다.

```rust,editable
use std::error;
use std::fmt;

// `Box<dyn error::Error>`로 별칭을 변경합니다.
type Result<T> = std::result::Result<T, Box<dyn error::Error>>;

#[derive(Debug)]
struct EmptyVec;

impl fmt::Display for EmptyVec {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "invalid first item to double")
    }
}

impl error::Error for EmptyVec {}

// 이전과 동일한 구조이지만, `Results`와 `Options`에 따른 체이닝 대신에
// `?`를 사용해 내부 값을 즉각적으로 얻어옵니다.
fn double_first(vec: Vec<&str>) -> Result<i32> {
    let first = vec.first().ok_or(EmptyVec)?;
    let parsed = first.parse::<i32>()?;
    Ok(2 * parsed)
}

fn print(result: Result<i32>) {
    match result {
        Ok(n)  => println!("The first doubled is {}", n),
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

이제 상당히 깔끔해졌습니다. 기존의 `panic`과 비교했을 때, `?`로 `unwrap` 호출을 대체한 것과 유사하지만, 반환 타입이 `Result`라는 점에 차이가 있습니다. 따라서, 이는 상위 레벨에서 다시 분해(destructure)되어야 합니다.
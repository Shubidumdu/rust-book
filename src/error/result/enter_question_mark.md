# Introducing ?

때때로 우리는 `panic`의 가능성 없이 간단히 `unwrap`을 사용하길 원합니다. 지금까지, `unwrap`은 지금껏 우리가 원하는 값을 얻기 위해서는 계속해서 `{}` 괄호와 함께 더 깊은 코드를 작성해야 했습니다. 이는 정확히 `?`을 사용하는 목적입니다.

`Err`을 발견하면, 취할 수 있는 두가지 유효한 행동이 있습니다.

1. `panic!`은 가능하다면 미리 피하려는 결정입니다.
2. `return`은 통제될 수 없는 에러를 반환하는 것입니다.

`?`는 `Err`에 `panic`을 유발하지 않고, `return`값들을 `unwrap`하는 것과 거의 정확히 동일합니다. 이전에 컴비네이터를 통해 해결했던 예시를 어떻게 단순화할 수 있는지 살펴봅시다.

```rust,editable
use std::num::ParseIntError;

fn multiply(first_number_str: &str, second_number_str: &str) -> Result<i32, ParseIntError> {
    let first_number = first_number_str.parse::<i32>()?;
    let second_number = second_number_str.parse::<i32>()?;

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

## `try!` 매크로

`?` 이전에, `try!` 매크로를 통해서도 똑같은 기능을 수행할 수 있습니다. `?`가 현 시점에서 더 추천되기는 하지만, 여전히 오래된 코드에서는 `try!`를 볼 수 있을 겁니다. 위와 동일한 예시를 `try!`로 처리해보겠습니다.

```rust,editable
// 아래 예시를 에러 없이 컴파일하고 실행하기 위해서는,
// Rust의 `edition`을 `2015`로 수정해주어야 합니다!

use std::num::ParseIntError;

fn multiply(first_number_str: &str, second_number_str: &str) -> Result<i32, ParseIntError> {
    let first_number = try!(first_number_str.parse::<i32>());
    let second_number = try!(second_number_str.parse::<i32>());

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
# Result

`Result`는 있을 수 있는 값의 부재(absence) 대신에 있을 수 있는 에러(error)에 대해 설명하는, `Option`보다 더 풍부한 버전의 타입입니다.

다시 말해, `Result<T, E>`는 두 결과 중 하나를 가질 수 있습니다.

- `Ok(T)` : `T` 요소가 발견됨
- `Err(E)` : `E` 요소에서 발견된 에러

관례 상, 예측된 결과는 `Ok`이며, 예상치 못한 결과는 `Err`이 됩니다.

`Option`과 유사하게, `Result`는 이와 관련된 여러 메서드들을 갖고 있습니다. 예를 들어, `unwrap()`은 요소 `T`나 `panic`을 반환합니다. 이를 다루기 위해, `Result`와 `Option` 사이에는 서로 겹치는 많은 컴비네이터(combinator)가 존재합니다.

Rust로 작업을 할 때, `parse()` 와 같이, 종종 `Result` 타입을 반환하는 메서드를 마주칠 수 있습니다. String을 다른 타입으로 파싱하는 것은 항상 가능한 일이 아니기 때문에, 이에 발생할지도 모르는 에러를 대비하기 위해 `parse()` 역시 `Result`를 반환합니다.

`parse()`가 성공했을 때와, 그렇지 않았을 때의 상황을 각각 살펴봅시다.

```rust,editable
fn multiply(first_number_str: &str, second_number_str: &str) -> i32 {
    let first_number = first_number_str.parse::<i32>().unwrap();
    let second_number = second_number_str.parse::<i32>().unwrap();
    first_number * second_number
}

fn main() {
    let twenty = multiply("10", "2");
    println!("double is {}", twenty);

    let tt = multiply("t", "2");
    println!("double is {}", tt);
}
```

성공하지 못한 경우에, `parse()`는 `unwrap()`에 대해 에러를 남기고 `panic`으로 넘어갑니다. 여기에 더해, `panic`은 프로그램을 종료하고 에러 메시지를 출력합니다.

에러 메시지의 퀄리티를 높이기 위해서는, 반환 타입에 대해 더 구체적으로 작성하고, 명시적으로 에러를 다루도록 고려해야 합니다.

## Using `Result` in `main`

명시적으로 지정된 경우, `Result` 타입은 마찬가지로 `main` 함수의 반환 타입이 될 수 있습니다. 지금껏 봐왔던 `main`는 이런 형태일 겁니다.

```rust
fn main() {
    println!("Hello World!");
}
```

그런데 `main`도 `Result` 타입의 반환을 가질 수 있습니다. 만약 `main` 함수 내에서 에러가 발생한다면, 이는 에러 코드를 반환하고 에러를 나타내는 디버깅 메시지를 출력할 것입니다(`Debug` 트레이트를 이용해서).

```rust,editable
use std::num::ParseIntError;

fn main() -> Result<(), ParseIntError> {
    let number_str = "10";
    let number = match number_str.parse::<i32>() {
        Ok(number)  => number,
        Err(e) => return Err(e),
    };
    println!("{}", number);
    Ok(())
}
```
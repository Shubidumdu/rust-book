# Iterating over Results

`Iter::map` 명령은 실패할 수도 있습니다. 예를 들면 :

```rust,editable
fn main() {
    let strings = vec!["tofu", "93", "18"];
    let numbers: Vec<_> = strings
        .into_iter()
        .map(|s| s.parse::<i32>())
        .collect();
    println!("Results: {:?}", numbers);
}
```

여러 전략들을 통해 이를 다루어보겠습니다.

## `filter_map()`으로 실패한 항목들을 무시하기

`filter_map`은 함수를 호출하고, `None` 결과는 걸러냅니다.

```rust,editable
fn main() {
    let strings = vec!["tofu", "93", "18"];
    let numbers: Vec<_> = strings
        .into_iter()
        .filter_map(|s| s.parse::<i32>().ok())
        .collect();
    println!("Results: {:?}", numbers);
}
```

## `collect()`로 전체 작업들을 실패시키기

`Result`는 `FromIter`를 구현하며, 따라서 결과를 가진 벡터(`Vec<Result<T, E>>`)는 벡터를 가진 결과(`Result<Vec<T>, E>`)로 변환될 수 있습니다. 한번 `Result::Err`이 발견되는 순간, 순환은 종료될 것입니다.

```rust,editable
fn main() {
    let strings = vec!["tofu", "93", "18"];
    let numbers: Result<Vec<_>, _> = strings
        .into_iter()
        .map(|s| s.parse::<i32>())
        .collect();
    println!("Results: {:?}", numbers);
}
```

이는 `Option`을 사용한 것과 동일한 테크닉입니다.

## `partition()`으로 모든 유효한 값과 실패(failures)를 수집하기

```rust,editable
fn main() {
    let strings = vec!["tofu", "93", "18"];
    let (numbers, errors): (Vec<_>, Vec<_>) = strings
        .into_iter()
        .map(|s| s.parse::<i32>())
        .partition(Result::is_ok);
    println!("Numbers: {:?}", numbers);
    println!("Errors: {:?}", errors);
}
```

이 경우, 결과들이 여전히 `Result`로 감싸진 것을 확인할 수 있습니다. 이를 해결하기 위해서는 약간의 보일러플레이트가 더 요구됩니다. 

```rust,editable
fn main() {
    let strings = vec!["tofu", "93", "18"];
    let (numbers, errors): (Vec<_>, Vec<_>) = strings
        .into_iter()
        .map(|s| s.parse::<i32>())
        .partition(Result::is_ok);
    let numbers: Vec<_> = numbers.into_iter().map(Result::unwrap).collect();
    let errors: Vec<_> = errors.into_iter().map(Result::unwrap_err).collect();
    println!("Numbers: {:?}", numbers);
    println!("Errors: {:?}", errors);
}
```
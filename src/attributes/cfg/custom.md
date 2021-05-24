# Custom
# Custom

`target_os`와 같은 일부 조건들은 `rustc`에 의해 내부적으로 제공됩니다. 그러나 커스텀 조건들은 `rustc`에 `--cfg` 플래그를 사용하여 전달되어야 합니다.

```rust
// 아래 함수는 some_condition 조건이 없으면 컴파일되지 않습니다.
#[cfg(some_condition)]
fn conditional_function() {
    println!("condition met!");
}

fn main() {
    conditional_function();
}
```

커스텀 `cfg` 플래그 없이 위의 파일에 대해 컴파일을 시도하면 에러가 발생할 것입니다.

따라서 다음과 같이 `cfg` 플래그를 사용해야 합니다.

```
$ rustc --cfg some_condition custom.rs && ./custom
condition met!
```
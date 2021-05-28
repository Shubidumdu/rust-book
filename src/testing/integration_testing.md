# Integration testing

유닛 테스트는 격리된 상태에서 한번에 하나의 모듈을 테스트합니다. 이들은 작으며, private 코드도 테스트할 수 있습니다. **통합 테스트(Integration test)**는 크레이트의 외부에 위치하여, 다른 코드와 동일한 형태로 해당 크레이트의 공용 인터페이스만을 사용할 수 있습니다. 이들의 목적은 라이브러리의 많은 부분들이 함께 올바르게 동작하는지를 테스트하기 위함입니다.

Cargo는 통합테스트를 `tests` 디렉토리에서 찾습니다.

`src/lib.rs` 파일은 다음과 같습니다.

```rust
// `adder`라는 크레이트를 정의합니다.
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

`tests/integration_test.rs`로 테스트합니다.

```rust
#[test]
fn test_add() {
    assert_eq!(adder::add(3, 2), 5);
}
```

`cargo test` 명령으로 테스트한 결과는 다음과 같습니다.

```
$ cargo test
running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out

     Running target/debug/deps/integration_test-bcd60824f5fbfe19

running 1 test
test test_add ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out

   Doc-tests adder

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

`tests` 디렉토리 내의 각 Rust 소스 파일들은 별도의 크레이트로 컴파일됩니다. 통합 테스트들 간에 코드를 공유하는 하나의 방법은 모듈을 공용(public) 함수로 만들고, 이를 가져와 테스트에서 사용하는 것입니다.

`tests/common.rs` 파일은 다음과 같습니다.

```rs
pub fn setup() {
    // 요구되는 파일/디렉토리를 만들고 서버를 시작하는 등
    // 셋업 코드들을 실행합니다.
}
```

`tests/integration_test.rs`로 테스트합니다.

```rust
// importing common module.
mod common;

#[test]
fn test_add() {
    // using common code.
    common::setup();
    assert_eq!(adder::add(3, 2), 5);
}
```

공통 코드를 가진 모듈들은 일반적인 모듈 규칙을 따르므로, `tests/common/mod.rs`로 공통 모듈을 만들어도 괜찮습니다.
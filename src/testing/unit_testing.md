# Unit testing

`test`는 테스트하지 않은 코드가 예상된 방식으로 동작하는지에 대해 확인하는 Rust 함수입니다. 테스트 함수의 body는 일반적으로 일부 세팅을 수행하고, 코드를 테스트하며, 결과가 예상했던 방식인지 아닌지 확인합니다.

대부분의 유닛 테스트들은 `#[cfg(test)]` 어트리뷰트를 통해 `tests` 모듈로 넘겨집니다. 테스트 함수는 `#[test]` 어트리뷰트로 표시됩니다.

테스트는 테스트 함수 내에 `panic`을 유발하는 무엇인가가 있을때 실패합니다. 이를 돕는 몇가지 헬퍼 매크로들이 있습니다.

- `assert!(expression)` - Expression이 `false`로 평가될 경우 panic을 유발합니다.
- `assert_eq!(left, right)`와 `assert_ne!(left, right)` - 좌우측의 Expression이 각각 동일한지 / 동일하지 않은지에 대해 테스트합니다.

```rust,editable
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

// 아래는 일부러 테스트에 실패하기 위해 만든 함수입니다.
#[allow(dead_code)]
fn bad_add(a: i32, b: i32) -> i32 {
    a - b
}

#[cfg(test)]
mod tests {
    // 유용한 팁 : (모듈 테스트를 위한)외부 스코프로부터 이름을 가져오세요.
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(1, 2), 3);
    }

    #[test]
    fn test_bad_add() {
        // 아래 assert은 실패할 것입니다.
        // private 함수들도 테스트될 수 있다는 것을 기억하세요!
        assert_eq!(bad_add(1, 2), 3);
    }
}
```

테스트는 `cargo test`로 실행될 수 있습니다.

```
$ cargo test

running 2 tests
test tests::test_bad_add ... FAILED
test tests::test_add ... ok

failures:

---- tests::test_bad_add stdout ----
        thread 'tests::test_bad_add' panicked at 'assertion failed: `(left == right)`
  left: `-1`,
 right: `3`', src/lib.rs:21:8
note: Run with `RUST_BACKTRACE=1` for a backtrace.


failures:
    tests::test_bad_add

test result: FAILED. 1 passed; 1 failed; 0 ignored; 0 measured; 0 filtered out
```

## Tests and `?`

기존의 유닛 테스트 예제들에는 반환 타입이 존재하는 경우가 없었습니다. 그러나 Rust 2018에서는, 유닛테스트가 `Result<()>`를 반환할 수 있습니다. 다시 말해, `?`를 사용할 수 있다는 뜻입니다. 덕분에 코드가 훨씬 더 간결해질 수 있습니다.

```rust,editable
fn sqrt(number: f64) -> Result<f64, String> {
    if number >= 0.0 {
        Ok(number.powf(0.5))
    } else {
        Err("negative floats don't have square roots".to_owned())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sqrt() -> Result<(), String> {
        let x = 4.0;
        assert_eq!(sqrt(x)?.powf(2.0), x);
        Ok(())
    }
}
```

## Testing panics

특정 환경에서 `panic`이 되야 하는 함수를 확인해보기 위해서는 `#[should_panic]` 어트리뷰트를 사용하세요. 해당 어트리뷰트는 패닉 메시지의 텍스트가 있는 `expected = ` 매개변수를 전달받을 수 있습니다. (선택사항 입니다.) 이는 함수가 여러 방법을 통해 `panic`이 될 수 있다면, 테스트가 올바른 패닉 상태를 테스트하는지를 확인하는 데 도움이 됩니다.

```rust,editable
pub fn divide_non_zero_result(a: u32, b: u32) -> u32 {
    if b == 0 {
        panic!("Divide-by-zero error");
    } else if a < b {
        panic!("Divide result is zero");
    }
    a / b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_divide() {
        assert_eq!(divide_non_zero_result(10, 2), 5);
    }

    #[test]
    #[should_panic]
    fn test_any_panic() {
        divide_non_zero_result(1, 0);
    }

    #[test]
    #[should_panic(expected = "Divide result is zero")]
    fn test_specific_panic() {
        divide_non_zero_result(1, 10);
    }
}
```

테스트 결과는 아래와 같습니다.

```
$ cargo test

running 3 tests
test tests::test_any_panic ... ok
test tests::test_divide ... ok
test tests::test_specific_panic ... ok

test result: ok. 3 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out

   Doc-tests tmp-test-should-panic

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

## Running specific tests

구체적인 일부 테스트만을 수행하고자 하는 경우에는, 테스트 이름을 `cargo test` 명령에 함께 전달하면 됩니다.

```
$ cargo test test_any_panic
running 1 test
test tests::test_any_panic ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 2 filtered out

   Doc-tests tmp-test-should-panic

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

이름이 매칭되는 여러 테스트들이 한꺼번에 수행됩니다.

```
$ cargo test panic
running 2 tests
test tests::test_any_panic ... ok
test tests::test_specific_panic ... ok

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 1 filtered out

   Doc-tests tmp-test-should-panic

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

## Ignoring tests

일부 테스트들을 제외하고자 하는 경우, `#[ignore]` 어트리뷰트를 사용하면 됩니다. 이후, 거꾸로 해당 어트리뷰트가 표시된 테스트들만을 수행하고자 하는 경우 `cargo test -- --ignored` 명령을 실행하세요.

```
#![allow(unused)]
fn main() {
  pub fn add(a: i32, b: i32) -> i32 {
      a + b
  }

  #[cfg(test)]
  mod tests {
      use super::*;

      #[test]
      fn test_add() {
          assert_eq!(add(2, 2), 4);
      }

      #[test]
      fn test_add_hundred() {
          assert_eq!(add(100, 2), 102);
          assert_eq!(add(2, 100), 102);
      }

      #[test]
      #[ignore]
      fn ignored_test() {
          assert_eq!(add(0, 0), 0);
      }
  }
}
```

```
$ cargo test
running 3 tests
test tests::ignored_test ... ignored
test tests::test_add ... ok
test tests::test_add_hundred ... ok

test result: ok. 2 passed; 0 failed; 1 ignored; 0 measured; 0 filtered out

   Doc-tests tmp-ignore

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out

$ cargo test -- --ignored
running 1 test
test tests::ignored_test ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out

   Doc-tests tmp-ignore

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```
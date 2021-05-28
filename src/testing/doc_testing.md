# Documentation testing

Rust 프로젝트를 문서화 하는 주된 방법은 소스 코드에 주석을 다는 것입니다. 문서 코멘트(Documentation comment)들은 마크다운 및 지원 코드블럭을 통해 작성됩니다. Rust는 정확성에 신경을 쓰기 때문에, 이러한 코드블럭들 역시 컴파일하여 테스트로 사용됩니다.

```rust,editable
/// 첫 줄은 함수에 대한 짧은 요약 설명이 들어갑니다.
///
/// 이 후의 줄에서는 상세한 설명이 들어갑니다.
/// 코드 블럭은 3개의 backtick(```)으로 작성할 수 있으며,
/// 이는 암시적으로 `fn main()`과 `extern crate <cratename>`을 갖습니다.
/// 만약, `doccomments` 크레이트를 테스트하려고 한다면 :
///
/// ```
/// let result = doccomments::add(2, 3);
/// assert_eq!(result, 5);
/// ```
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}


/// 종종 doc 코멘트들은 `예시`, `Panics`와 `Failures`같은 섹션을 가질 수도 있습니다.
///
/// The next function divides two numbers.
///
/// # Examples
///
/// ```
/// let result = doccomments::div(10, 2);
/// assert_eq!(result, 5);
/// ```
///
/// # Panics
///
/// The function panics if the second argument is zero.
///
/// ```rust,should_panic
/// // panics on division by zero
/// doccomments::div(10, 0);
/// ```
pub fn div(a: i32, b: i32) -> i32 {
    if b == 0 {
        panic!("Divide-by-zero error");
    }

    a / b
}
```

테스트는 마찬가지로 `cargo test`로 진행할 수 있습니다.

```
$ cargo test
running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out

   Doc-tests doccomments

running 3 tests
test src/lib.rs - add (line 7) ... ok
test src/lib.rs - div (line 21) ... ok
test src/lib.rs - div (line 31) ... ok

test result: ok. 3 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

## Motivation behind documentation tests

문서 테스트(Documentation test)의 주된 목적은 기능을 선보이는 예시들을 제공하여 하나의 중요한 가이드라인으로 활용하기 위해서입니다. 이는 문서를 통해 완전한 코드 조각(snippet)을 제공함으로써, 예시들을 사용해보게끔 합니다. 그러나 `?`를 사용하게 되면 `main`이 `unit`을 반환하기 때문에 컴파일에 실패합니다. 문서로부터 작성된 소스 코드들을 숨기기 위해서는 `fn try_main() -> Result<(), ErrorType>`을 작성하고, 이를 숨겨진 `main`에서 `unwrap`합니다. 복잡하게 들릴테니 예시를 봅시다.

```rust,editable
/// 문서 테스트에서 숨겨진 `try_main`을 써봅시다.
///
/// ```
/// # // 숨겨진 줄은 `#` 문자로 시작하지만, 여전히 컴파일 가능합니다.
/// # fn try_main() -> Result<(), String> { // 문서에 표시된 본문을 감싸는 줄입니다.
/// let res = try::try_div(10, 2)?;
/// # Ok(()) // try_main으로부터 반환됩니다.
/// # }
/// # fn main() { // unwrap()을 수행할 main() 함수의 시작입니다.
/// #    try_main().unwrap(); // try_main을 호출하고 unwrap합니다.
/// #                         // 덕분에 테스트는 에러 발생 시 panic합니다.
/// # }
/// ```
pub fn try_div(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err(String::from("Divide-by-zero"))
    } else {
        Ok(a / b)
    }
}
```
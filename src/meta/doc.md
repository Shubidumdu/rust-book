# Documentation

`cargo doc`을 사용하면 `target/doc` 내에 문서를 빌드합니다.

`cargo test`는 (문서 테스트를 포함한) 모든 테스트를 수행하며, `cargo test --doc`은 오직 문서 테스트만을 수행합니다.

이들 명령은 필요한 경우에 `rustdoc` (또는 `rustc`)를 적절하게 호출합니다.

## Doc comments

문서 코멘트는 문서가 요구되는 거대한 프로젝트에서 굉장히 유용합니다. `rustdoc`을 실행할 때, 문서 코멘트들이 문서로 컴파일됩니다. 이는 `///`로 구분되며, 마크다운 형식을 지원합니다.

```rust
#![crate_name = "doc"]

/// A human being is represented here
pub struct Person {
    /// A person must have a name, no matter how much Juliet may hate it
    name: String,
}

impl Person {
    /// Returns a person with the name given them
    ///
    /// # Arguments
    ///
    /// * `name` - A string slice that holds the name of the person
    ///
    /// # Examples
    ///
    /// ```
    /// // You can have rust code between fences inside the comments
    /// // If you pass --test to `rustdoc`, it will even test it for you!
    /// use doc::Person;
    /// let person = Person::new("name");
    /// ```
    pub fn new(name: &str) -> Person {
        Person {
            name: name.to_string(),
        }
    }

    /// Gives a friendly hello!
    ///
    /// Says "Hello, [name]" to the `Person` it is called on.
    pub fn hello(& self) {
        println!("Hello, {}!", self.name);
    }
}

fn main() {
    let john = Person::new("John");

    john.hello();
}
```

테스트를 실행하기 위해서는 먼저 코드를 라이브러리로 빌드해야합니다. 이후, `rustdoc`에게 각 문서 테스트 프로그램에 라이브러리를 연결할 수 있도록 라이브러리의 위치를 알려줍니다.

```
$ rustc doc.rs --crate-type lib
$ rustdoc --test --extern doc="libdoc.rlib" doc.rs
```

## Doc attributes

아래는 `rustdoc`과 사용되는 가장 일반적인 `#[doc]` 속성의 몇가지 예시입니다.

### inline
별도의 페이지로 연결하는 대신, 인라인 문서를 사용합니다.

```rs
#[doc(inline)]
pub use bar::Bar;

/// bar docs
mod bar {
    /// the docs for Bar
    pub struct Bar;
}
```

### no_inline

별도의 페이지나 다른 장소에 연결하지 못하게끔 합니다.

```rust
// Example from libcore/prelude
#[doc(no_inline)]
pub use crate::mem::drop;
```

### hidden

`rustdoc`에게 다음에 오는 내용을 문서에 포함하지 않는다고 전달합니다.

```rust
// Example from the futures-rs library
#[doc(hidden)]
pub use self::async_await::*;
```

문서를 위해, `rustdoc`은 커뮤니티 상에서 많이 사용됩니다. [std 라이브러리의 문서](https://doc.rust-lang.org/std/)도 이를 통해 만들어졌습니다!
# Raw identifiers

많은 프로그래밍 언어와 동일하게, Rust는 "키워드"의 개념을 갖습니다. 이들 식별자들은 언어 상 무엇인가를 의미하고 있으며, 따라서 이를 변수명, 함수명 등으로 사용할 수는 없습니다. Raw identifier는 일반적으로는 허용되지 않는 키워드를 사용할 수 있도록 해줍니다. 이는 구버전 Rust를 사용하는 라이브러리가 Rust의 새로운 버전에서 소개된 키워드와 동일한 변수/함수명을 보유하고 있을 때 특히 유용합니다.

예를 들어, `foo` 크레이트가 Rust 2015로 컴파일되고, `try`라는 이름의 함수를 내보낸다고 생각해봅시다. 해당 키워드는 Rust 2018에서 새로운 기능으로 사용됩니다. 이 경우 Raw identifier 없이는 해당 함수에 접근할 방법이 없습니다.

```rs
extern crate foo;

fn main() {
    foo::try();
}
```

다음 에러를 얻게 될 것입니다.

```
error: expected identifier, found keyword `try`
 --> src/main.rs:4:4
  |
4 | foo::try();
  |      ^^^ expected identifier, found keyword
```

따라서 Raw identifier를 작성할 수 있습니다.

```rs
extern crate foo;

fn main() {
    foo::r#try();
}

```
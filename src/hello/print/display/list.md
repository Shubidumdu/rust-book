# Testcase: List

각각의 요소들이 다루어져야 하는 구조에 있어서 `fmt::Display`를 구현하는 것은 까다롭습니다. `write!` 매크로는 기본적으로 `fmt::Result`를 만들어내기 때문에, 모든 결과들을 한번에 처리하여 반환해야 한다는 문제가 있습니다. Rust는 이런 경우를 위해 `?` 연산자를 제공합니다.

아래와 같은 형태로 `?` 연산자를 사용할 수 있습니다. 아래의 코드는 `write!`를 시도하고, 에러가 발생한다면 에러를 반환하고, 그렇지 않다면 계속 진행한다는 것을 의미합니다.

```rust,ignore
write!(f, "{}", value)?;
```

이것을 사용하면, `Vec` 구조에 대한 `fmt::Display`도 직관적으로 구현할 수 있습니다.

```rust,editable
use std::fmt;

// Vec를 갖는 List란 이름의 구조를 정의
struct List(Vec<i32>);

impl fmt::Display for List {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    // 튜플 인덱싱을 통해 값을 가져옵니다.
    // 이후 `vec`이라는 이름으로 참조를 만듭니다.
    let vec = &self.0;

    write!(f, "[")?;

    // `vec` 의 요소들에 대해 인덱스(`index`)와 값(`v`)을 순회합니다.
    for (index, v) in vec.iter().enumerate() {
      // 첫번째 요소가 아닌 경우(`index != 0`) `,`를 제외합니다.
      // `?` 연산자를 통해 계속 진행합니다.
      if index != 0 { write!(f, ", ")?; }
      write!(f, "{}", v)?;
    }

    // 열려있던 괄호를 닫고 `fmt::Result` 값을 반환합니다.
    write!(f, "]")
  }
}

fn main() {
  let v = List(vec![1, 2, 3]);
  println!("{}", v);
}
```
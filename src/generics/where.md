# Where clauses

바운드는 `{`로 블럭을 열기 전에 `where`문을 사용하여 표현될 수도 있습니다. 추가적으로, `where` 문은 타입 매개변수 뿐만 아니라 임의의 타입에 바운드를 적용할 수 있습니다.

`where` 문이 유용한 몇가지 상황은 다음과 같습니다.

- 제네릭 타입과 바운드를 명확하게 정의하는 것이 더 깔끔한 경우 :

```rust
impl <A: TraitB + TraitC, D: TraitE + TraitF> MyTrait<A, D> for YourType {}

// `where` 문으로 바운드를 표현
impl <A, D> MyTrait<A, D> for YourType where
    A: TraitB + TraitC,
    D: TraitE + TraitF {}
```

- `where`문을 사용하는 것이 일반 구문보다 더 명확한 경우. 아래 예시에서 `impl`은 `where`문 없이는 직접 표현될 수 없습니다.

```rust,editable
use std::fmt::Debug;

trait PrintInOption {
    fn print_in_option(self);
}

// 아래는 `where` 문이 요구됩니다.
// 그렇지 않다면, `T: Debug`에 대해 표현하거나,
// 간접적인 접근을 위한 또 다른 메서드를 사용해야 합니다.
impl<T> PrintInOption for T where
    Option<T>: Debug {
    // 우리는 `Option<T>: Debug`가 바운드로서 필요합니다.
    // 아래 메서드에서 출력이 가능해야 하기 때문입니다.
    fn print_in_option(self) {
        println!("{:?}", Some(self));
    }
}

fn main() {
    let vec = vec![1, 2, 3];

    vec.print_in_option();
}
```
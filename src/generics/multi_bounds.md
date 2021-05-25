# Multiple bounds

다중 바운드(Multiple bounds)는 `+`로 적용할 수 있습니다. 여러 타입에 대해서는 `,`로 구분합니다.

```rust
use std::fmt::{Debug, Display};

fn compare_prints<T: Debug + Display>(t: &T) {
    println!("Debug: `{:?}`", t);
    println!("Display: `{}`", t);
}

fn compare_types<T: Debug, U: Debug>(t: &T, u: &U) {
    println!("t: `{:?}`", t);
    println!("u: `{:?}`", u);
}

fn main() {
    let string = "words";
    let array = [1, 2, 3];
    let vec = vec![1, 2, 3];

    compare_prints(&string);
    // ERROR : array에는 `Display`에 구현되어 있지 않습니다.
    compare_prints(&array);

    compare_types(&array, &vec);
}
```
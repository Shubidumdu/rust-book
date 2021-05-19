# Debug

트페이트를 포매팅하는 `std::fmt`를 사용하고자 하는 모든 타입들은 **출력 가능해야** 합니다. `std` 라이브러리에서와 같은 타입들에 대해서만 이 부분이 자동적으로 구현되어 있습니다. 

```rust,editable
fn main() {
  println!("{:?} months in a year.", 12);
  println!("{1:?} {0:?} is the {actor:?} name.",
            "Slater",
            "Christian",
            actor="actor's");
}
```

그 외의 다른 타입들은 **반드시** 수동으로 이를 수행해주어야 합니다.

`fmt::Debug` 트레이트는 이 과정을 상당히 직관적으로 만들어줍니다. 모든 타입들이 `fmt::Debug` 구현을 `derive` (자동 생성) 할 수 있습니다. 이는 반드시 수동적으로 구현해주어야 하는 `fmt::Display`에 대해서는 적용되지 않습니다.

아래의 `structure`는 현재로선 출력에 대해 구현하지 않았기 때문에 `fmt::Display` 혹은 `fmt::Debug`로 출력할 수 없습니다.

```rust,editable
struct UnPrintable(i32);

fn main() {
  println!("{:?} would not print!", Structure(3));
}
```

`derive` 어트리뷰트를 사용하면 `fmt::Debug`로 해당 `struct`를 출력가능하도록 자동으로 구현할 수 있습니다.

```rust,editable
#[derive(Debug)]
struct DebugPrintable(i32);

fn main() {
  println!("Now {:?} will printed!", DebugPrintable(3));
}
```

여러 스트럭쳐들을 겹쳐 사용하는 경우에도 가능합니다.

```rust,editable
#[derive(Debug)]
struct Structure(i32);

#[derive(Debug)]
struct Deep(Structure);

fn main() {
  println!("Now {:?} will print!", Deep(Structure(7)));
}
```

위에서 본 것처럼, `fmt::Debug`는 분명 스트럭처를 인쇄 가능하도록 만들어주긴 하지만 썩 보기 좋은 형태는 아닙니다. 따라서 Rust는 `{:#?}`을 통해 "이쁘게 출력"하는 기능을 제공합니다.

```rust,editable
#[derive(Debug)]
struct Person<'a> {
    name: &'a str,
    age: u8
}

fn main() {
    let name = "Peter";
    let age = 27;
    let peter = Person { name, age };

    // Pretty print
    println!("{:#?}", peter);
}
```

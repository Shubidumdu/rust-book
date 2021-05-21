# From and Into

`From` 과 `Into` 트레이트는 상속적으로 연결되어 있으며, 실제로도 implementation의 일부입니다. 만약 A 타입에서 B 타입으로 변환을 할 수 있다면, B 타입에서 A타입으로 변환하는 것도 가능해야 합니다.

## From
`From` 트레이트는 다른 타입으로부터 스스로의 타입을 정의할 수 있게끔 합니다. 따라서 여러 타입 간에 변환을 위한 간단한 매커니즘을 제공합니다. 원시 및 공통 타입의 변환을 위해 내장 라이브러리 내에도 수많은 `From` 트레이트의 구현이 존재합니다.

예를 들어, `str`는 간단하게 `String` 타입으로 변환할 수 있습니다.

```rust,editable
#![allow(unused)]
fn main() {
  let my_str = "hello";
  let my_string = String::from(my_str);
}
```

커스텀 타입에 대해서도 변환을 정의할 수 있습니다.

```rust,editable
use std::convert::From;

#[derive(Debug)]
struct Number {
    value: i32,
}

// i32 정수로부터 Number 구조로의 변환을 구현합니다.
impl From<i32> for Number {
    fn from(item: i32) -> Self {
        Number { value: item }
    }
}

fn main() {
    let num = Number::from(30);
    println!("My number is {:?}", num);
}
```

## Into

`Into` 트레이트는 단순히 `From` 트레이트의 역수입니다. 다시 말해, 타입 내에 `From` 트레이트가 구현되어 있다면, `Into`는 그것을 필요할 때 실행합니다.

일반적으로 `Into` 트레이트를 사용하려면 변환할 대상 타입의 구체적인 지정이 필요합니다. 대부분의 컴파일러가 이를 결정하는 것이 불가능하기 때문입니다. 하지만 해당 기능이 가져다주는 편의성을 생각할 때 이는 작은 절충입니다.

```rust,editable
use std::convert::From;

#[derive(Debug)]
struct Number {
    value: i32,
}

impl From<i32> for Number {
    fn from(item: i32) -> Self {
        Number { value: item }
    }
}

fn main() {
    let int = 5;
    // 아래에서 `Number` 타입 지정이 없다면 에러가 발생합니다.
    let num: Number = int.into();
    println!("My number is {:?}", num);
}
```
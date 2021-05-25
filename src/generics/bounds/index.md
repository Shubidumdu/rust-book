# Bounds

제네릭으로 작업을 진행할 때, 종종 타입 파라미터는 타입을 구현하는 기능을 명시하기 위해 트레이트를 **바운드(bounds)**로 사용해야 합니다. 예를 들어, 아래 예시에서는 출력을 위해 `Display` 트레이트를 사용하며, 따라서 `Display`에 의해 바운드 되기 위해 `T`가 요구됩니다. 다시 말해, `T`는 반드시 `Display`를 구현해야 합니다.

```rust
// `Display` 트레이트를 반드시 구현해야 하는
// 제네릭 타입 `T`를 받는 `printer` 함수입니다.
fn printer<T: Display>(t: T) {
    println!("{}", t);
}
```

바운딩은 제네릭을 바운드를 만족하는 타입으로 제한합니다. 예를 들어 다음과 같습니다.

```rust
struct S<T: Display>(T);

// ERROR : `Vec<T>`는 `Display`를 구현하지 않았습니다.
let s = S(vec![1]);
```

바운딩의 또 다른 효과는 제네릭 인스턴스가 바운드 내에 정의된 트레이트의 메서드에 접근할 수 있게끔 해준다는 것입니다. 예를 들자면 다음과 같습니다.

```rust,editable
// `{:?}` 출력 마커에 대해 구현하는 트레이트입니다.
use std::fmt::Debug;

trait HasArea {
    fn area(&self) -> f64;
}

impl HasArea for Rectangle {
    fn area(&self) -> f64 { self.length * self.height }
}

#[derive(Debug)]
struct Rectangle { length: f64, height: f64 }
#[allow(dead_code)]
struct Triangle  { length: f64, height: f64 }

// `T` 제네릭은 반드시 `Debug`를 구현해야 합니다.
// 타입과 무관하게, 아래는 제대로 동작할 것입니다.
fn print_debug<T: Debug>(t: &T) {
    println!("{:?}", t);
}

// `T`는 반드시 `HasArea`를 구현해야 합니다.
// 해당 바운드를 만족하는 어떤 타입이든
// `HasArea`의 함수인 `area`에 접근할 수 있습니다.
fn area<T: HasArea>(t: &T) -> f64 { t.area() }

fn main() {
    let rectangle = Rectangle { length: 3.0, height: 4.0 };
    let _triangle = Triangle  { length: 3.0, height: 4.0 };

    print_debug(&rectangle);
    println!("Area: {}", area(&rectangle));

    // ERROR : `Triangle`에는 `Debug`나 `HasArea`가 구현되어 있지 않습니다.
    // 따라서 아래는 에러가 발생합니다.
    print_debug(&_triangle);
    println!("Area: {}", area(&_triangle));
}
```

추가적으로, 경우에 따라 바운드를 적용하기 위해 `where` 문이 사용될 수도 있습니다.
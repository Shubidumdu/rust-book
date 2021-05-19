# Display

`fmt::Debug`는 간결하고 깔끔한 것과는 거리가 멉니다. 따라서 일반적으로는 직접 출력의 형태를 커스터마이징 해주는 것이 좋습니다. 이는 `fmt::Display`를 통해서 직접 구현될 수 있습니다. `{}` 마커에 대한 출력을 구현하고자 하는 경우, 아래와 같이 작성될 수 있습니다.

```rust
// `use`를 통해 `fmt` 모듈을 가져옵니다.
use std::fmt;

// `fmt::Display`가 구현될 스트럭처를 정의합니다.
// 이는 `i32` 타입을 갖는 `Structure` 라는 이름의 튜플입니다.
struct Structure(i32);

// `{}` 마커를 사용하려면, 타입에 대한 
// `fmt::Display` 트레이트가 수동으로 구현되어야 합니다.

impl fmt::Display for Structure {
  // 아래 트레이트를 사용하려면 `fmt` 모듈이 필요합니다.
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    // 첫번째 인자가 되는 `f`는 output stream입니다.
    // 반환 결과는 `fmt::Result`로 작업이 수행되었는지 아닌지를 나타냅니다.
    // `write!` 매크로는 `println!`의 사용과 매우 유사합니다!
    write!(f, "{}", self.0)
  }
}
```

`fmt::Display`는 `fmt::Debug`보다 깔끔한 출력이 가능합니다. 하지만 `std` 라이브러리와 관련해서 몇가지 문제가 있습니다. 만약 "애매한" 타입들에 대한 출력을 처리하려면 어떻게 해야할까요? 예를 들어, `std` 라이브러리가 `Vec<T>`를 통한 단일 스타일로 타입 출력을 전부 처리한다면, 아래 중에 하나의 형태로 출력되는걸까요?

- `Vec<path>` : `/:/etc:/home/username:/bin`
- `Vec<number>` : `1,2,3`

결론을 말하자면, 제네릭을 사용해 여러 타입에 대한 출력을 한꺼번에 처리하는 것은 불가능합니다. 모든 타입에 대한 만능 열쇠는 없으며, `fmt::Display`는 `Vec<T>` 혹은 다른 제네릭 컨테이너에 대해 구현되지 않습니다. 이러한 케이스에 대해서는 반드시 `fmt::Debug`만이 쓰여야 합니다.

사실, 제네릭이 아닌 새 컨테이너 타입의 경우에는 `fmt::Display`를 사용할 수 있기 때문에 문제가 되지 않습니다.

`i64` 타입의 값을 두개 갖는 `MinMax` 구조에 대한 출력을 구현해봅시다.

```rust,editable
use std::fmt;

// Debug와 Display 간의 출력 형태 차이를
// 확인하기 위해 derive 합니다.
#[derive(Debug)]
struct MinMax(i64, i64);

// MinMax에 대한 Display를 구현합니다.
impl fmt::Display for MinMax {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    write!(f, "({}, {})", self.0, self.1)
  }
}

fn main() {
  println!("Debug: {:?}", MinMax(20, 40));
  println!("Display: {}", MinMax(20, 40));
}
```

이번엔 필드 이름을 지정할 수 있는 형태의 `Point2D` 구조에 대한 출력을 구현해봅시다.

```rust,editable
use std::fmt;

#[derive(Debug)]
struct Point2D {
  x: f64,
  y: f64,
}

impl fmt::Display for Point2D {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    write!(f, "x: {}, y: {}", self.x, self.y)
  }
}

fn main() {
  let point = Point2D { x: 3.14, y: 1.59 };
  println!("Debug: {:?}", point);
  // 이렇게도 출력할 수 있음을 상기시키기 위해 사족을 붙여봤습니다.
  println!("Display: {point}", point = point);
}
```

위에서, `fmt::Display`는 구현되었으나 `fmt::Binary`는 구현되지 않았기 때문에 사용할 수 없습니다. `std::fmt`는 이러한 유형의 많은 [트레이트들](https://doc.rust-lang.org/stable/rust-by-example/trait.html)을 가지고 있으며, 각각의 트레이트들이 자기 자신에 대한 구현을 요구합니다. 자세한 사항에 대해서는 [여기](https://doc.rust-lang.org/std/fmt/)를 살펴봅시다.

추가적으로, 아래는 복소수 구조를 만들고, 이에 대한 출력을 처리한 내용입니다.

```rust
use std::fmt;

#[derive(Debug)]
struct Complex {
    real: f64,
    imag: f64,
}

impl fmt::Display for Complex {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    write!(f, "{} + {}i", self.real, self.imag)
  }
}

fn main() {
  let complex = Complex { real: 3.3, imag: 7.2 };

  println!("Display: {}", complex);
  println!("Debug: {:?}", complex);
}
```
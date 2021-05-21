# To and from Strings

## Converting to String
어떤 타입을 `String`으로 변환하는 것은 `ToString` 트레이트를 해당 타입에 대해서 구현하면 쉽습니다. 이를 직접 구현하기 보다는, `fmt::Display` 트레이트를 구현한다면, `ToString`이 자동으로 제공되며, `print!` 매크로의 사용 시 적절하게 출력하도록 할 수 있습니다.

```rust,editable
use std::fmt;

struct Circle {
    radius: i32
}

// Circle 구조에 대한 fmt::Display 트레이트를 구현합니다.
impl fmt::Display for Circle {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Circle of radius {}", self.radius)
    }
}

fn main() {
    let circle = Circle { radius: 6 };
    // 아래의 `.to_string()`이 없더라도 제대로 출력됩니다.
    println!("{}", circle.to_string());
}
```

## Parsing a String
어떤 타입을 String으로 변환하는 것만큼 일반적인 상황은 바로 Number 타입입니다. 이에 대해 접근하는 자연스러운 방법은 `parse` 함수를 통한 타입 추론 기반으로 처리하거나, *turbofish* 문을 통해 직접 파싱할 타입을 정해주는 것입니다. 두가지 방법 모두 아래의 예시에서 확인할 수 있습니다.

`FromStr` 트레이트가 해당 타입에 대해 구현되어 있는 한, 지정된 타입으로 스트링을 변환할 수 있습니다. 내장 라이브러리에서도 수많은 타입에 대해 이것이 구현되어 있습니다. 직접 정의한 타입에 대해 해당 기능을 갖추게 하기 위해서는 단순히 `FromStr` 트레이트를 해당 타입에 대해 구현하기만 하면 됩니다.

```rust,editable
fn main() {
    // 그냥 `parse` 함수를 사용하면 타입 추론을 기반으로 처리됩니다.
    // `unwrap`을 적용하기 전의 결과는 `Result` 입니다.
    let parsed: i32 = "5".parse().unwrap();
    // turbofish 문은 직접 파싱할 타입을 지정해주어야 합니다.
    let turbo_parsed = "10".parse::<i32>().unwrap();

    let sum = parsed + turbo_parsed;
    println!("Sum: {:?}", sum);
}
```
# Returning Traits with dyn

Rust 컴파일러는 모든 함수들의 반환 타입이 요구하는 공간이 어느 정도인지 알아야합니다. 다시 말해, Rust에서 구현하는 모든 함수의 반환 타입은 콘크리트(concrete) 타입입니다. 다른 언어들과는 다르게, 만약, `Animal`과 같은 트레이트를 갖고 있다면, 이 `Animal`을 반환하는 함수를 작성할 수 없습니다. 다른 구현들은 메모리의 다른 부분들을 차지할 것이기 때문입니다.

하지만, 쉬운 해결 방안이 있습니다. 트레이트 객체를 곧바로 반환하는 대신, `Animal`을 담은 `Box`를 반환하는 것입니다. `Box`는 힙 내의 특정 메모리에 대한 단순한 참조입니다. 참조는 정적으로 알려진(statically-known) 사이즈를 보유하기 때문에, 컴파일러는 힙에 할당된 `Animal`에 대한 참조를 보장합니다. 이를 통해, 함수에서도 트레이트를 반환할 수 있습니다!

Rust는 힙에 메모리를 할당할 때마다 가능한 명시적으로 하려고 합니다. 따라서, 만약 함수가 아래 방식으로 *힙에 있는 트레이트에 대한 포인터*(pointer-to-trait-on-heap)를 반환한다면, 반환 타입을 `dyn` 키워드와 함께 작성해주어야 합니다. (ex. `Box<dyn Animal>`)

```rust,editable
struct Sheep {}
struct Cow {}

trait Animal {
    // 인스턴스 메서드 서명
    fn noise(&self) -> &'static str;
}

// `Sheep`에 대한 `Animal` 트레이트 구현
impl Animal for Sheep {
    fn noise(&self) -> &'static str {
        "baaaaah!"
    }
}

// `Cow`에 대한 `Animal` 트레이트 구현
impl Animal for Cow {
    fn noise(&self) -> &'static str {
        "moooooo!"
    }
}

// `Animal`을 구현하는 어떤 구조를 반환합니다.
// 여전히 컴파일 시점에는 무엇이 반환될지 모릅니다.
fn random_animal(random_number: f64) -> Box<dyn Animal> {
    if random_number < 0.5 {
        Box::new(Sheep {})
    } else {
        Box::new(Cow {})
    }
}

fn main() {
    let random_number = 0.234;
    let animal = random_animal(random_number);
    println!("You've randomly chosen an animal, and it says {}", animal.noise());
}
```
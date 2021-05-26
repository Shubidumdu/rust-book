# Traits

**트레이트**는 unknown 타입(`Self)에 대해 정의하는 메서드의 컬렉션입니다. 트레이트 각각은 동일한 트레이트 내에 정의된 다른 메서드들에 접근할 수 있습니다.

트레이트들은 어떤 데이터 타입에 대해서도 구현될 수 있습니다. 아래 예시에서, 우리는 `Animal`이라고 하는 메서드 모음을 정의할 것입니다. 이 `Animal` 트레이트는 `Sheep` 데이터 타입에 대해서 구현될 것이고, 이에 따라 `Sheep` 타입에서 `Animal`로부터의 메서드를 사용할 수 있습니다.

```rust,editable
struct Sheep { naked: bool, name: &'static str }

trait Animal {
    // 정적 메서드 선언;
    // `Self`는 구현자(implementor) 타입을 나타냅니다.
    fn new(name: &'static str) -> Self;

    // 인스턴스 메서드 선언
    // 아래 함수들은 string을 반환합니다.
    fn name(&self) -> &'static str;
    fn noise(&self) -> &'static str;

    // 트레이트는 기본 메서드 정의를 제공할 수 있습니다.
    fn talk(&self) {
        println!("{} says {}", self.name(), self.noise());
    }
}

impl Sheep {
    fn is_naked(&self) -> bool {
        self.naked
    }

    fn shear(&mut self) {
        if self.is_naked() {
            // 구현자 메서드는 구현자의 트레이트 메서드를 사용할 수 있습니다.
            println!("{} is already naked...", self.name());
        } else {
            println!("{} gets a haircut!", self.name);

            self.naked = true;
        }
    }
}

// `Sheep`에 대해 `Animal` 트레이트를 구현합니다.
impl Animal for Sheep {
    // `Self`는 구현자 타입입니다. 여기서는 `Sheep`에 해당합니다.
    fn new(name: &'static str) -> Sheep {
        Sheep { name: name, naked: false }
    }

    fn name(&self) -> &'static str {
        self.name
    }

    fn noise(&self) -> &'static str {
        if self.is_naked() {
            "baaaaah?"
        } else {
            "baaaaah!"
        }
    }
    
    // 기본 트레이트 메서드들은 오버라이딩될 수 있습니다.
    fn talk(&self) {
        println!("{} pauses briefly... {}", self.name, self.noise());
    }
}

fn main() {
    // 이 경우, 타입 지정은 필수적입니다.
    let mut dolly: Sheep = Animal::new("Dolly");

    dolly.talk();
    dolly.shear();
    dolly.talk();
}
```
# Enums

`enum` 키워드는 여러 형태 중 하나일 수 있는 타입을 생성하도록 해줍니다. `struct`로서 유효한 변형 형태라면 `enum`에서도 유효합니다.

```rust,editable
// 웹 이벤트를 분류하는 `enum`을 만듭니다.
// 이벤트 이름과 타입 정보가 변형 형태를 명시합니다.
// 각각의 변형은 구분되며, 독립적입니다.
enum WebEvent {
    // enum은 `unit` 형태의 구조 일수도 있고,
    PageLoad,
    PageUnload,
    // 튜플 구조일 수도 있으며,
    KeyPress(char),
    Paste(String),
    // c-like 구조일 수도 있습니다.
    Click { x: i64, y: i64 },
}

// 아래 함수는 `WebEvent` enum을 받은 뒤 아무 것도 반환하지 않습니다.
fn inspect(event: WebEvent) {
    // `match`는 C의 `switch`와 유사합니다.
    match event {
        WebEvent::PageLoad => println!("page loaded"),
        WebEvent::PageUnload => println!("page unloaded"),
        WebEvent::KeyPress(c) => println!("pressed '{}'.", c),
        WebEvent::Paste(s) => println!("pasted \"{}\".", s),
        WebEvent::Click { x, y } => {
            println!("clicked at x={}, y={}.", x, y);
        },
    }
}

fn main() {
    let pressed = WebEvent::KeyPress('x');
    // `to_owned()` 메서드는 스트링 슬라이스에서
    // 스스로의 `String`을 생성해냅니다.
    let pasted  = WebEvent::Paste("my text".to_owned());
    let click   = WebEvent::Click { x: 20, y: 80 };
    let load    = WebEvent::PageLoad;
    let unload  = WebEvent::PageUnload;

    inspect(pressed);
    inspect(pasted);
    inspect(click);
    inspect(load);
    inspect(unload);
}
```

## Type aliases

Type aliases(타입 별칭)을 사용한다면, 각각의 enum을 별칭으로 다룰 수 있습니다. enum의 이름이 너무 길거나, 너무 일반적이라서 새로 이름을 짓고자 할때 사용할 수 있습니다.

```rust,editable
enum VeryVerboseEnumOfThingsToDoWithNumbers {
    Add,
    Subtract,
}

// Type alias를 생성합니다.
type Operations = VeryVerboseEnumOfThingsToDoWithNumbers;

fn main() {
    // 각 변형을 alias를 통해 참조할 수 있습니다.
    let x = Operations::Add;
}
```

가장 일반적으로 이를 많이 사용하게 되는 경우는 `impl` 블록에서 `Self` 별칭을 사용하는 경우입니다.

```rs,editable
enum VeryVerboseEnumOfThingsToDoWithNumbers {
    Add,
    Subtract,
}

impl VeryVerboseEnumOfThingsToDoWithNumbers {
    fn run(&self, x: i32, y: i32) -> i32 {
        match self {
            Self::Add => x + y,
            Self::Subtract => x - y,
        }
    }
}
```

enum과 Type Alias에 대해 더 많이 살펴보려면, [여기](https://github.com/rust-lang/rust/pull/61682/#issuecomment-502472847)를 읽어보세요.
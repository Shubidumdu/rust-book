# macro_rules!

Rust는 [메타프로그래밍](https://ko.wikipedia.org/wiki/%EB%A9%94%ED%83%80%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)을 가능하게 하는 강력한 매크로 시스템을 제공합니다. 이전 챕터에서 봤던 것처럼, 매크로는 `!`문자로 끝난다는 것을 제외하면 함수와 비슷합니다. 그러나 함수의 호출을 생성하는 대신, 매크로는 소스코드로 확장되어 프로그램의 나머지 부분과 함께 컴파일 됩니다. 하지만 C나 다른 언어에서의 마크로와는 다르게, Rust의 매크로는 문자열에 대한 사전처리가 아닌, 추상 구문 트리로 확장되어 있으므로, 예상치 못한 우선순위 버그가 발생하지 않습니다.

매크로는 `macro_rules!` 매크로를 통해 생성됩니다.

```rust
// 이는 `say_hello`라고 하는 간단한 매크로입니다.
macro_rules! say_hello {
    // `()`는 매크로가 아무 인수도 받지 않음을 의미합니다.
    () => {
        // 매크로는 해당 블럭의 컨텐츠로 확장됩니다.
        println!("Hello!");
    };
}

fn main() {
    // 아래 호출은 `println!("Hello");`로 확장됩니다.
    say_hello!()
}
```

그래서, 왜 매크로가 유용할까요?

1. DRY(Don't repeat yourself) 원칙에 활용할 수 있습니다. 여러 타입에 대해 유사한 기능을 반복적으로 구현해야 하는 많은 경우가 발생합니다. 종종, 매크로를 작성하는 것은 반복 코드 작성을 피하는 유용한 방법입니다.

2. DSL(Domain-specific languages)를 활용할 수 있습니다.. 매크로는 특정 목적에 사용될 특별한 구문에 대해 정의할 수 있습니다.

3. 가변인자 인터페이스(Variadic interfaces)를 사용할 수 있습니다. 어떤 경우, 수많은 인수를 갖는 인터페이스를 정의해야 할지도 모릅니다. 이를테면, `prinln!`은 포맷스트링에 따라 수많은 인수들을 가질 수 있습니다.
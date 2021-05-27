# DSL (Domain Specific Languages)

DSL은 Rust 매크로에 포함된 작은 "언어"(language)입니다. 이는 작은 언어처럼 보이지만, 완전히 유효한 Rust 언어인데, 매크로 시스템이 일반적인 Rust 구조의 확장에 해당하기 때문입니다. DSL은 특별한 기능을 갖는 간결하거나 직관적인 구문을(Bound와 같이) 정의할 수 있도록 해줍니다.

간단한 계산기 API를 정의하려 한다고 가정해봅시다. 계산식을 전달하고 이에 대한 결과를 콘솔로 출력하려고 합니다.

```rust,editable
macro_rules! calculate {
    (eval $e:expr) => {{
        {
            let val: usize = $e; // 정수로 강제합니다.
            println!("{} = {}", stringify!{$e}, val);
        }
    }};
}

fn main() {
    calculate! {
        eval 1 + 2 // `eval`은 Rust의 키워드가 아니네요!
    }

    calculate! {
        eval (1 + 2) * (3 / 4)
    }
}
```

출력은 다음과 같습니다.

```
1 + 2 = 3
(1 + 2) * (3 / 4) = 0
```

이는 매우 간단한 예시이지만, 훨씬 더 복잡한 인터페이스도 구현할 수 있습니다. 이를테면 [`lazy_static`](https://crates.io/crates/lazy_static) 또는 [`clap`](https://crates.io/crates/clap) 같은 것들이 있습니다.

또, 매크로 내의 겹괄호(`{{ ... }}`)를 주의하세요. 바깥의 괄호가 `macro_rules!`문의 일부입니다. `()`와 `[]`를 포함해서요.
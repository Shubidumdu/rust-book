# Bounds

제네릭 타입이 제한(bound)될 수 있었던 것처럼, 라이프타임(사실, 그 자체가 제네릭입니다.) 역시 제한을 가질 수 있습니다. `:` 문자는 여기서 조금 다른 의미를 가지는 반면, `+`는 동일합니다.

1. `T: 'a`: `T` 내의 모든 참조는 반드시 `'a` 보다 라이프타임이 길어야 합니다.
2. `T: Trait + 'a`: `T` 타입은 반드시 `Trait` 트레이트를 구현하고, 모든 `T` 내의 참조들은 반드시 `'a`보다 라이프타임이 길어야 합니다. 

아래의 예제는 `where` 키워드 다음에 위와 같이 라이프타임 제한을 적용합니다.

```rust,editable
use std::fmt::Debug; // 제한을 적용할 트레이트입니다.

#[derive(Debug)]
struct Ref<'a, T: 'a>(&'a T);
// `Ref`는 알 수 없는 라이프타임 `'a`를 가진 제네릭 타입 `T`에 대한 참조를 갖습니다.
// `T` 내의 모든 참조들은 반드시 `'a`보다 긴 라이프타임을 가져야 합니다.
// 추가로, `Ref`의 라이프타임은 `'a`를 초과하지 않습니다.

// `Debug` 트레이트를 사용하여 출력하는 제네릭 함수입니다.
fn print<T>(t: T) where
    T: Debug {
    println!("`print`: t is {:?}", t);
}

// `T`에 위치할 참조는 `Debug`를 구현해야 하며,
// `T` 의 모든 참조들은 `'a`보다 긴 라이프타임을 가져야 합니다.
// 추가로 `'a`는 반드시 본인 함수보다 라이프타임이 길어야 합니다.
fn print_ref<'a, T>(t: &'a T) where
    T: Debug + 'a {
    println!("`print_ref`: t is {:?}", t);
}

fn main() {
    let x = 7;
    let ref_x = Ref(&x);

    print_ref(&ref_x);
    print(ref_x);
}
```
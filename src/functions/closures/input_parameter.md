# As input parameters

Rust는 대부분 타입 정의 없이 즉각적으로 변수를 캡처하는 방법을 택하지만, 이러한 모호성은 함수를 작성할 때는 허용되지 않습니다. 입력 파라미터로 클로저를 사용할 때, 클로저는 몇가지 트레이트 중 하나를 사용해 완전한 타입을 정의해야 합니다. 

- `Fn`: 참조로 클로저를 캡처(`&T`)
- `FnMut` : mutable 참조로 클로저를 캡처(`&mut T`)
- `FnOnce` : 값으로 클로저를 캡처(`T`)

변수별 기준에 따라, 컴파일러는 가능한 제한이 적은 방식으로 변수를 캡처합니다. 

예를 들어, 매개 변수가 `FnOnce`로 정의되었을 경우를 생각해봅시다. 이는 클로저가 `&T`, `&mut T` 또는 `T`로 캡처링 될 수 있음을 의미합니다. 그러나 컴파일러는 최종적으로 클로저 내에서 캡처링된 해당 변수가 어떻게 사용되느냐에 따라 어떤 방식을 사용할지를 결정합니다.

이는 이동(move)이 가능하다면, 어떤 형태의 대여(borrow)도 가능해야 하기 때문입니다. 이에 대한 역은 성립하지 않습니다. 만약 매개변수가 `Fn`으로 정해진다면, `&mut T`나 `T`에 의한 캡처를 변수는 허용되지 않습니다.

아래 예시에서, `Fn`의 사용을 `FnMut`나 `FnOnce`로 바꾼 뒤 동작을 확인해보세요.

```rust,editable
// 아래 함수는 클로저를 인자로 사용하여 호출합니다.
// `<F>`는 제네릭 타입 매개변수를 나타냅니다.
fn apply<F>(f: F) where
    // 해당 클로저는 아무 입출력(input/return)이 없습니다.
    F: FnOnce() {
    // 이 부분을 `Fn` 혹은 `FnMut`로 바꾸고 동작을 확인하세요.
    f();
}

// 클로저를 가져와 `i32`를 반환하는 함수입니다.
fn apply_to_3<F>(f: F) -> i32 where
    // 해당 클로저는 i32 -> i32로 동작합니다.
    F: Fn(i32) -> i32 {

    f(3)
}

fn main() {
    use std::mem;

    let greeting = "hello";
    // `greeting`은 non-copy 타입입니다.

    // `to_owned`은 빌려온 데이터를 바탕으로
    // 본인 소유의 데이터를 생성해냅니다.
    let mut farewell = "goodbye".to_owned();

    // 두개의 변수를 캡쳐링 해봅시다.
    // `greeting`은 참조에 의해 캡처링되고
    // `farewell`은 값(value)에 의해 캡처링됩니다.
    let diary = || {
        // `greeting`은 참조에 의해 캡처링되며, 
        // 현재 이 클로저는 `Fn`이 요구됩니다.
        println!("I said {}.", greeting);

        // `farewell`은 mutable 참조에 의해 캡처됩니다.
        // 현재 이 클로저는 `FnMut`가 요구됩니다.
        farewell.push_str("!!!");
        println!("Then I screamed {}.", farewell);
        println!("Now I can sleep. zzzzz");

        // `drop`의 호출은 강제로 `farewell`이
        // 값(value)에 의해 캡처링되도록 만듭니다.
        // 최종적으로 이 클로저는 `FnOnce`가 요구됩니다.
        mem::drop(farewell);
    };

    // 클로저가 적용된 함수를 호출합니다.
    apply(diary);

    // `double`은 `apply_to_3`의 트레이트 바운드를 충족시킵니다.
    let double = |x| 2 * x;

    println!("3 doubled: {}", apply_to_3(double));
}
```
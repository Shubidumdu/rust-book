# Closures

클로저는 닫혀있는 환경을 캡처할 수 있는 기능입니다. 예를 들어, 아래는 `x` 변수를 캡처하는 클로저입니다.

```rust
|val| val + x
```

클로저 구문과 기능은 이를 즉시 사용할 수 있도록 하여 매우 편리하게 만들어줍니다. 클로저의 호출은 함수의 호출과 완전히 동일합니다. 그러나, 클로저의 입력과 반환 타입은 모두 유추될 수 있으며, 입력 변수명은 반드시 지정되어야 합니다.

클로저의 다른 특징에는 다음과 같은 것들이 있습니다.

- 입력 변수에 `()` 대신에 `||` 괄호를 사용합니다.
- 단일 식에 대해서는 `{}` 본문 구분을 선택적으로 사용할 수 있습니다.
- 외부 환경 변수들을 캡처할 수 있습니다.

```rust,editable
fn main() {
    // 클로저와 함수를 통해 값을 증가시킵니다.
    fn function(i: i32) -> i32 { i + 1 }

    // 클로저는 익명으로, 여기서는 이들을 참조로 바인딩하고 있습니다.
    // 타입 지정은 함수와 동일하지만, 본문의 `{}`와 같이 선택 사항입니다.
    // 이들 익명 함수는 적절하게 명명된 변수에 할당됩니다.
    let closure_annotated = |i: i32| -> i32 { i + 1 };
    let closure_inferred  = |i     |          i + 1  ;

    let i = 1;
    // 함수와 클로저를 호출합니다.
    println!("function: {}", function(i));
    println!("closure_annotated: {}", closure_annotated(i));
    println!("closure_inferred: {}", closure_inferred(i));

    // 인자가 존재하지 않는 클로저도 만들어봅시다.
    // 반환 타입에 대해서는 `i32`로 타입 추론이 적용됩니다.
    let one = || 1;
    println!("closure returning one: {}", one());
}
```
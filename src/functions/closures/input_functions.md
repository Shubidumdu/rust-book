# Input functions

앞에서 살펴본 것처럼, 클로저는 함수의 매개변수로 사용될 수 있습니다. 그렇다면 이 경우에 함수도 매개변수로 사용될 수 있을까요? 실제로 사용이 가능합니다! 만약 클로저를 매개변수로 받는 함수를 정의한다면, 해당 클로저의 트레이트 제한(trait bound)를 만족하는 어떤 함수든지 매개변수로 전달될 수 있습니다.

```rust,editable
// 제네릭 `F` 인자를 갖는 함수를 정의합니다.
// 이는 `Fn`으로 제한됩니다.
fn call_me<F: Fn()>(f: F) {
    f();
}

// `Fn` 규격을 만족하는 새로운 함수를 정의합니다.
fn function() {
    println!("I'm a function!");
}

fn main() {
    // `Fn` 규격을 만족하는 새로운 클로저를 정의합니다.
    let closure = || println!("I'm a closure!");

    call_me(closure);
    call_me(function);
}
```

추가적인 참고 사항으로, `Fn`, `FnMut`, 그리고 `FnOnce` 트레이트는 닫힌 스코프로부터 변수를 어떤 식으로 캡처할지에 대한 방법을 지시합니다.
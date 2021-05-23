# Iterator::any

`Iterator::any`는 iterator가 넘겨졌을 때, 특정 하나의 요소라도 조건을 만족하면 `true`를, 그외에는 `false`를 반환해주는 함수입니다. 

이는 아래와 같이 구성되어, 클로저를 활용합니다.

```rust
pub trait Iterator {
    // 순회될 대상의 타입입니다.
    type Item;

    // `any`는 `&mut self`를 가져옵니다.
    // 즉, 해당 함수의 호출은 스스로에 대한 참조를 빌려오고, 수정합니다.
    // 하지만, 소비(consume)하지는 않습니다.
    fn any<F>(&mut self, f: F) -> bool where
        // `FnMut`은 캡처된 변수가 수정될 수 있으나, 소비되지 않음을 의미합니다.
        // `Self::Item`은 인수를 받아 값(value)을 통해 클로저에 추가함을 의미합니다.
        F: FnMut(Self::Item) -> bool {}
}
```

```rust,editable
fn main() {
    let vec1 = vec![1, 2, 3];
    let vec2 = vec![4, 5, 6];

    // `vec`의 `iter()`는 `&i32`를 만듭니다.
    // 이는 `i32`로 구조 분해 될 수 있습니다.
    println!("2 in vec1: {}", vec1.iter()     .any(|&x| x == 2));
    // `vec`의 `into_iter()`는 `i32`를 만듭니다.
    // 이 경우, 구조 분해가 필요없습니다. (그 자체가 값입니다.)
    println!("2 in vec2: {}", vec2.into_iter().any(| x| x == 2));

    let array1 = [1, 2, 3];
    let array2 = [4, 5, 6];

    // `array`의 `iter()`는 `&i32`를 만듭니다.
    println!("2 in array1: {}", array1.iter()     .any(|&x| x == 2));
    // `array`의 `into_iter()`는 예외적으로 `&i32`를 만듭니다.
    println!("2 in array2: {}", array2.into_iter().any(|&x| x == 2));
}
```
# Searching through iterators

`Iterator::find`는 순회 가능한 구조 객체들을 순회하며, 특정 조건을 만족하는 첫번째 값을 탐색하여 반환하는 함수입니다. 만약, 아무 값도 찾지 못했다면 `None`을 반환합니다.

```rust
pub trait Iterator {
    // 순회될 대상 타입
    type Item;

    // `find`는 `&mut self`를 받아서 사용합니다.
    // 즉, 해당 메서드의 호출은 인스턴스 본인에 대한 참조를
    // 대여하고 수정하지만, 소모하지는 않습니다.
    fn find<P>(&mut self, predicate: P) -> Option<Self::Item> where
        // `FnMut`는 캡처된 값이 수정될 순 있으나, 소모되진 않음을 의미합니다.
        // `&Self::Item`은 인수를 참조를 바탕으로 클로저에 보관함을 의미합니다.
        P: FnMut(&Self::Item) -> bool {}
}
```
```rust,editable
fn main() {
    let vec1 = vec![1, 2, 3];
    let vec2 = vec![4, 5, 6];

    // `vec`의 `iter()`는 `&i32`가 생성됩니다.
    let mut iter = vec1.iter();
    // `vec`의 `into_iter()`는 `i32`가 생성됩니다.
    let mut into_iter = vec2.into_iter();

    // `vec`의 `iter()`는 `&i32`를 생성합니다.
    // 그리고 우리는 각 요소들에 대한 레퍼런스를 참조하고자 합니다.
    // 따라서 `&&i32`를 통한 구조분해로 `i32`를 사용해야 합니다.
    println!("Find 2 in vec1: {:?}", iter     .find(|&&x| x == 2));

    // `vec`의 `into_iter()`는 `i32`를 생성합니다.
    // 그리고 우리는 각 요소들에 대한 레퍼런스를 참조하고자 합니다.
    // 따라서 `&i32`을 통한 구조 분해로 `i32`를 사용합니다.
    println!("Find 2 in vec2: {:?}", into_iter.find(| &x| x == 2));

    let array1 = [1, 2, 3];
    let array2 = [4, 5, 6];

    // `array`의 `iter()`는 `&i32`를 생성합니다.
    println!("Find 2 in array1: {:?}", array1.iter()     .find(|&&x| x == 2));
    // `array`의 `into_iter()`는 예외적으로 `&i32`를 생성합니다.
    println!("Find 2 in array2: {:?}", array2.into_iter().find(|&&x| x == 2));
}
```

`Iterator::find`는 발견한 요소에 대한 참조를 제공합니다. 만약, 참조가 아닌 요소에 대한 인덱스가 필요한 경우라면, `Iterator::position`을 사용할 수 있습니다.

```rust,editable
fn main() {
    let vec = vec![1, 9, 3, 3, 13, 2];

    let index_of_first_even_number = vec.iter().position(|x| x % 2 == 0);
    assert_eq!(index_of_first_even_number, Some(5));
    
    let index_of_first_negative_number = vec.iter().position(|x| x < &0);
    assert_eq!(index_of_first_negative_number, None);
}
```
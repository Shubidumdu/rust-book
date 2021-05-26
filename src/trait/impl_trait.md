# impl Trait

함수가 `MyTrait`를 구현한 타입을 반환한다고 할 때, 이를 `-> impl MyTrait`와 같이 작성할 수 있습니다. 이는 타입 시그니처를 굉장히 간단하게 만들도록 해줍니다!

```rust,editable
use std::iter;
use std::vec::IntoIter;

// 아래 함수는 두 개의 `Vec<i32>`를 합쳐
// 이에 대한 Iterator를 반환합니다.
fn combine_vecs_explicit_return_type(
    v: Vec<i32>,
    u: Vec<i32>,
) -> iter::Cycle<iter::Chain<IntoIter<i32>, IntoIter<i32>>> {
    v.into_iter().chain(u.into_iter()).cycle()
}

// 아래는 정확히 동일한 함수입니다.
// 하지만 반환 타입으로 `impl Trait`를 사용하고 있습니다.
// 훨씬 간결해보이네요!
fn combine_vecs(
    v: Vec<i32>,
    u: Vec<i32>,
) -> impl Iterator<Item=i32> {
    v.into_iter().chain(u.into_iter()).cycle()
}

fn main() {
    let v1 = vec![1, 2, 3];
    let v2 = vec![4, 5];
    let mut v3 = combine_vecs(v1, v2);
    assert_eq!(Some(1), v3.next());
    assert_eq!(Some(2), v3.next());
    assert_eq!(Some(3), v3.next());
    assert_eq!(Some(4), v3.next());
    assert_eq!(Some(5), v3.next());
    println!("all done");
}
```

더 중요한 점은, 일부 Rust 타입은 기록할 수 없다는 점입니다. 예를 들어, 모든 클로저는 고유한 이름이 존재하지 않는 콘크리트 타입을 갖습니다. `impl Trait`를 사용하지 않는다면, 클로저를 반환할 때는 이를 직접 힙에 할당해주어야 합니다. 그러나, 이제 이를 완전히 정적으로 처리할 수 있습니다.

```rust,editable
// 함수의 입력에 `y`를 추가하는 함수를 반환합니다. 
fn make_adder_function(y: i32) -> impl Fn(i32) -> i32 {
    let closure = move |x: i32| { x + y };
    closure
}

fn main() {
    let plus_one = make_adder_function(1);
    assert_eq!(plus_one(2), 3);
}
```

`impl Trait`를 `map` 또는 `filter` 클로저를 사용하는 반복자를 반환하도록 사용할 수도 있습니다. 이는 `map`과 `filter`의 사용을 더 쉽게 만들어줍니다. 클로저 타입들은 이름이 존재하지 않기 때문에, 함수가 클로저와 함께 반복자를 반환하는 경우, 반환 타입을 명시적으로 작성해줄 수 없습니다. 그러나 `impl Trait`를 통해 이를 손 쉽게 해결할 수 있습니다.

```rust,editable
fn double_positives<'a>(numbers: &'a Vec<i32>) -> impl Iterator<Item = i32> + 'a {
    numbers
        .iter()
        .filter(|x| x > &&0)
        .map(|x| x * 2)
}
```
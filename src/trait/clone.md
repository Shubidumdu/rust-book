# Clone

리소스를 다룰 때의 기본 동작은, 할당 또는 함수의 호출 중에 이들을 전송하는 것입니다. 그러나, 때때로 리소스에 대한 복사본을 만들어야 하는 경우가 있습니다.

`Clone` 트레이트는 정확히 이를 수행해줌으로써 우리를 돕습니다. 가장 일반적으로, 우리는 `Clone` 트레이트에 의해 정의된 `clone()` 메서드를 사용할 수 있습니다.

```rust,editable
// 리소스가 존재하지 않는 유닛 구조입니다.
#[derive(Debug, Clone, Copy)]
struct Unit;

// `Clone` 트레이트를 구현하는, 리소스를 가진 튜플 구조입니다.
#[derive(Clone, Debug)]
struct Pair(Box<i32>, Box<i32>);

fn main() {
    // `Unit`으로 초기화합니다.
    let unit = Unit;
    // `Unit`을 복사합니다.
    // 여기서는 "이동"시킬 별다른 리소스가 없습니다.
    let copied_unit = unit;

    // 두 `Unit` 모두 독립적으로 사용될 수 있습니다.
    println!("original: {:?}", unit);
    println!("copy: {:?}", copied_unit);

    // `Pair`로 초기화 합니다.
    let pair = Pair(Box::new(1), Box::new(2));
    println!("original: {:?}", pair);

    // `pair`를 `moved_pair`로 이동시킵니다.
    // 리소스의 이동이 발생합니다.
    let moved_pair = pair;
    println!("moved: {:?}", moved_pair);

    // ERROR : `pair`는 본인의 리소스를 잃었습니다.
    println!("original: {:?}", pair);

    // `moved_pair`를 `cloned_pair`로 복사합니다.
    // 여기엔 리소스의 이동도 포함됩니다.
    let cloned_pair = moved_pair.clone();
    // 기존의 `Pair`를 `std::mem::drop`으로 제거합니다.
    drop(moved_pair);

    // ERROR : `moved_pair`는 제거되었습니다.
    println!("copy: {:?}", moved_pair);

    // .clone()을 통해 리소스를 옮겨온 `cloned_pair`는 여전히 사용 가능합니다.
    println!("clone: {:?}", cloned_pair);
}
```
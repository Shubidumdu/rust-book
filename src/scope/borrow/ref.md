# The ref pattern

`let` 바인딩으로 패턴을 매칭시키거나, 해체(destructuring)할 때, `ref` 키워드는 구조 혹은 튜플의 필드를 참조하기 위해 사용될 수 있습니다. 아래 예시는 이것이 유용한 몇가지 경우에 대해 보여줍니다.

```rust
#[derive(Clone, Copy)]
struct Point { x: i32, y: i32 }

fn main() {
    let c = 'Q';

    // 아래 할당의 좌측에 사용된 `ref` 대여는
    // 할당 우측에 `&`를 사용하는 대여와 동일합니다.
    // 따라서, 아래의 둘은 그 원리가 동일합니다.
    let ref ref_c1 = c;
    let ref_c2 = &c;

    println!("ref_c1 equals ref_c2: {}", *ref_c1 == *ref_c2);

    let point = Point { x: 0, y: 0 };

    // `ref` 또한 구조를 분해할 때 사용될 수 있습니다.
    let _copy_of_x = {
        // `ref_to_x`는 `point`의 `x` 필드에 대해 참조합니다.
        let Point { x: ref ref_to_x, y: _ } = point;

        // `point`의 `x` 필드의 복사를 반환합니다.
        *ref_to_x
    };

    // `point`의 mutable한 복사입니다.
    let mut mutable_point = point;

    {
        // mutable 참조를 받기 위해
        // `ref`가 `mut`와 함께 사용되었습니다.
        let Point { x: _, y: ref mut mut_ref_to_y } = mutable_point;

        // mutable 참조를 통해서
        // `mutable_point`의 `y` 필드를 수정합니다.
        *mut_ref_to_y = 1;
    }

    println!("point is ({}, {})", point.x, point.y);
    println!("mutable_point is ({}, {})", mutable_point.x, mutable_point.y);

    // 포인터를 갖는 mutable 튜플입니다.
    let mut mutable_tuple = (Box::new(5u32), 3u32);
    
    {
        // `mutable_tuple`을 분해하여
        // `last` 변수의 값으로 변경합니다.
        let (_, ref mut last) = mutable_tuple;
        *last = 2u32;
    }
    
    println!("tuple is {:?}", mutable_tuple);
}
```
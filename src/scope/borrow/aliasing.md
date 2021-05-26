# Aliasing

데이터는 여러번 immutable하게 대여될 수 있습니다. 하지만, immutable하게 대여가 된 이후, 해당 데이터의 원본은 mutable하게 대여될 수 없습니다. 한편으로, mutable 대여는 오직 한번에 하나씩만 가능합니다. 원본 데이터는 마지막으로 사용되는 mutable 참조 이후에야 또 다시 대여될 수 있습니다.

```rust
struct Point { x: i32, y: i32, z: i32 }

fn main() {
    let mut point = Point { x: 0, y: 0, z: 0 };

    let borrowed_point = &point;
    let another_borrow = &point;

    // 데이터는 참조와 기존 소유자를 통해서 대여될 수 있습니다.
    println!("Point has coordinates: ({}, {}, {})",
                borrowed_point.x, another_borrow.y, point.z);

    // ERROR : `point`는 mutable하게 대여할 수 없습니다.
    // 이는 현재 immutable하게 대여된 상태로,
    // 바로 아래의 코드에서 사용되고 있기 때문입니다.
    let mutable_borrow = &mut point; 

    // 대여한 데이터가 여기서 다시 사용됩니다.
    println!("Point has coordinates: ({}, {}, {})",
                borrowed_point.x, another_borrow.y, point.z);

    // `point`에 대한 immutable 참조가 더 이상 위에서 사용되지 않기 때문에,
    // 이제 mutable 참조로 다시 대여를 할 수 있습니다.
    let mutable_borrow = &mut point;

    // mutable 참조로 데이터를 수정합니다.
    mutable_borrow.x = 5;
    mutable_borrow.y = 2;
    mutable_borrow.z = 1;

    // ERROR : `point`는 현재 mutable하게 대여되고 있습니다.
    // 따라서 이를 다시 immutable하게 대여할 수 없습니다.
    let y = &point.y;

    // ERROR : `println!`은 immutable 참조를 받습니다.
    // 현재 mutable하게 대여 중인 `point`를 대여할 수 없습니다.
    println!("Point Z coordinate is {}", point.z);

    // 반면, mutable 참조 변수는 `println!`에
    // immutable하게 대여될 수 있습니다!
    println!("Point has coordinates: ({}, {}, {})",
                mutable_borrow.x, mutable_borrow.y, mutable_borrow.z);

    // `point`에 대한 mutable 참조가 더 이상 사용되지 않기 때문에,
    // 다시 immutable하게 대여될 수 있습니다.
    let new_borrowed_point = &point;
    println!("Point now has coordinates: ({}, {}, {})",
             new_borrowed_point.x, new_borrowed_point.y, new_borrowed_point.z);
}
```
# Mutability

소유권이 변경될 때 데이터의 불변성(Mutability) 여부를 변경할 수 있습니다.

```rust,editable
fn main() {
    let immutable_box = Box::new(5u32);

    println!("immutable_box contains {}", immutable_box);

    // ERROR : `immutable_box`은 immutable 하기 때문에 값을 변경할 수 없습니다.
    *immutable_box = 4;

    // box를 이동시켜, 소유권을 이전합니다.
    // 동시에 불변성의 여부도 변경합니다.
    let mut mutable_box = immutable_box;

    println!("mutable_box contains {}", mutable_box);

    // `mutable_box`는 이제 mutable하기 때문에
    // 값을 변경해도 문제가 없습니다.
    *mutable_box = 4;

    println!("mutable_box now contains {}", mutable_box);
}
```
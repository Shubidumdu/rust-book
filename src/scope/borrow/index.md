# Borrowing

대부분의 경우, 우리는 데이터의 소유권을 넘겨받지 않고 데이터에 접근하고자 합니다. 이를 위해, Rust는 **대여(Borrowing)** 매커니즘을 사용합니다. 이는 객체를 값(`T`)으로 전달하지 않고, 참조(`&T`)를 통해 넘겨줄 수 있게 합니다.

컴파일러는 (borrow checker를 통해서) 참조들이 항상 올바른 객체들을 가리키고 있음을 정적으로 보장합니다. 다시 말해, 어떤 객체에 대한 참조가 존재하는 한, 해당 객체는 파괴될 수 없습니다.

```rust
// 아래 함수는 Box의 소유권을 넘겨받고, 파괴합니다.
fn eat_box_i32(boxed_i32: Box<i32>) {
    println!("Destroying box that contains {}", boxed_i32);
}

// 아래 함수는 `i32`를 "대여"합니다.
fn borrow_i32(borrowed_i32: &i32) {
    println!("This int is: {}", borrowed_i32);
}

fn main() {
    // Box에 저장된 i32와 스택에 저장된 i32를 생성합니다.
    let boxed_i32 = Box::new(5_i32);
    let stacked_i32 = 6_i32;

    // Box의 컨텐츠를 대여합니다.
    // 소유권은 넘겨받지 않기 때문에,
    // 이는 여전히 다시 대여할 수 있습니다.
    borrow_i32(&boxed_i32);
    borrow_i32(&stacked_i32);

    {
        // Box 내에 보관된 데이터에 대한 참조를 넘겨받습니다.
        let _ref_to_i32: &i32 = &boxed_i32;

        // ERROR : `boxed_i32`는 파괴될 수 없습니다.
        // 현재 스코프의 아래쪽에서 다시 대여될 것이기 때문입니다.
        eat_box_i32(boxed_i32);

        // 내부 값이 파괴된 이후 `_ref_to_i32`를 대여합니다. 
        borrow_i32(_ref_to_i32);
        // `_ref_to_i32`는 스코프를 벗어나 더 이상 대여될 수 없습니다.
    }

    // `boxed_i32`는 이제야 `eat_box`에 대한 소유권을 넘겨주고, 파괴될 수 있습니다.
    eat_box_i32(boxed_i32);
}
```
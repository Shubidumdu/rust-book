# Unsafe Operations

코드 베이스 상에서는 안전하지 않은(unsafe) 코드의 양을 최소화하려고 해야합니다. Rust에서 `unsafe` 지정은 컴파일러가 지정한 보호 기능을 우회하기 위해 사용됩니다. 특히, `unsafe`가 사용되는 주된 네가지 대상이 있습니다.

- Raw 포인터에 대한 역참조
- `unsafe`에 해당하는 함수 또는 메서드의 호출 (FFI 포함)
- mutable한 정적 변수에 대한 접근 또는 수정
- `unsafe` 트레이트의 구현

## Raw Pointers

Raw 포인터 `*`와 참조 `&T`는 유사하게 동작하지만, 참조의 경우엔 항상 안전합니다. 참조는 borrow checker 덕분에 항상 유효한 데이터를 가리키고 있음을 보장받기 때문입니다. 반면, Raw 포인터에 대한 역참조는 오직 `unsafe` 블록을 통해서만 이루어질 수 있습니다.

```rust,editable
fn main() {
    let raw_p: *const u32 = &10;

    unsafe {
        assert!(*raw_p == 10);
    }
}
```

## Calling Unsafe Functions

일부 함수들은 `unsafe`로 선언될 수 있습니다. 이는, "정확성"에 대한 책임을 컴파일러가 아닌 프로그램 개발자에게 넘긴다는 의미입니다. 이에 대한 하나의 예시는 `std::slice::from_raw_parts`입니다. 이는 첫 번째 요소에 대한 포인터와 길이를 가진 슬라이스를 만들어냅니다.

```rust,editable
use std::slice;

fn main() {
    let some_vector = vec![1, 2, 3, 4];

    let pointer = some_vector.as_ptr();
    let length = some_vector.len();

    unsafe {
        let my_slice: &[u32] = slice::from_raw_parts(pointer, length);

        assert_eq!(some_vector.as_slice(), my_slice);
    }
}
```

`slice::from_raw_parts`에서 반드시 유지해야 하는 가정 중 하나는, 포인터가 유효한 메모리에 전달되고, 가리키는 해당 메모리가 올바른 타입이라는 것입니다. 만약 이러한 규칙이 지켜지지 않는다면, 프로그램의 동작은 정의되지 않으며, 무슨 일이 일어나게 될 지 가늠할 수 없게 됩니다.
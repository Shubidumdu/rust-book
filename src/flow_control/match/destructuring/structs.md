# structs

이와 유사하게, `struct`도 분해될 수 있습니다.

```rust,editable
fn main() {
    struct Foo {
        x: (u32, u32),
        y: u32,
    }

    let foo = Foo { x: (1, 2), y: 3 };

    match foo {
        Foo { x: (1, b), y } => println!("First of x is 1, b = {},  y = {} ", b, y),

        // 구조를 분해하고 변수명을 변경할수도 있습니다.
        // 순서는 상관 없습니다.
        Foo { y: 2, x: i } => println!("y is 2, i = {:?}", i),

        // 나머지 변수들을 무시해도 됩니다.
        Foo { y, .. } => println!("y = {}, we don't care about x", y),

        // 단, 아래는 에러가 발생합니다.
        // `x` 필드에 대한 처리를 다루지 않았기 때문입니다.
        Foo { y } => println!("y = {}", y),
    }
}
```
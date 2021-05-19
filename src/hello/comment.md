 # Comments

 `//` 혹은 `/* ... */`을 통해 코멘트를 작성할 수 있습니다.
 ```rust
 // 한줄 주석
 /*
   여러 줄 주석
 */
 ```
 이는 컴파일러에 의해 무시됩니다.

 Rust에서는 Expression 한 가운데에 주석이 껴있어도 문제가 없습니다.

```rust,editable
 fn main() {
    let x = 5 + /* 90 + */ 5;
    println!("Is `x` 10 or 100? x = {}", x);
 }
```

 `///`와 `//!`는 Doc Comment라고 하며, 이에 대해선 추후에 다루겠습니다.

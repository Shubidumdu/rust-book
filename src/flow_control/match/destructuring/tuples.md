# tuples

- 튜플은 `match`를 통해 분해될 수 있습니다.

```rust,editable
fn main() {
    let triple = (0, -2, 3);

    println!("Tell me about {:?}", triple);
    // match는 튜플 값을 분해할 수 있습니다.
    match triple {
        // 2, 3번째 값을 바인딩하여 가져옵니다.
        (0, y, z) => println!("First is `0`, `y` is {:?}, and `z` is {:?}", y, z),
        (1, ..)  => println!("First is `1` and the rest doesn't matter"),
        // `..`는 튜플의 나머지 부분을 무시하기 위해 사용됩니다.
        _      => println!("It doesn't matter what they are"),
        // `_`는 값을 변수에 바인딩하지 않겠다는 의미입니다.
    }
}
```
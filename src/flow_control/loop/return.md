# Returning from loops

`loop`의 사용 목적 중 하나는 '성공할 때까지 실행하는' 것입니다. 만약 작업 중 값을 반환하게 되면, 코드의 나머지 부분들을 무시해야 할 겁니다. `break` 뒤에 반환값을 두면, `loop` Expression에 의해 반환됩니다.

```rust,editable
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            // 여기서의 `;`은 선택사항입니다.
            break counter * 2;
        }
    };

    assert_eq!(result, 20);
}
```
# while let

`if let`과 유사하게, `while let`도 어색한 `match` 문을 좀 더 낫게 만들어줍니다. `i`가 증가해나가는 아래의 루프를 살펴봅시다.

```rust,editable
#![allow(unused)]
fn main() {
// `Option<i32>` 타입을 가진 `optional`을 바인딩합니다.
let mut optional = Some(0);

// 테스트를 반복적으로 수행합니다.
loop {
    match optional {
        // 만약 `optional`이 분해 가능하다면, 블럭을 수행합니다.
        Some(i) => {
            if i > 9 {
                println!("Greater than 9, quit!");
                optional = None;
            } else {
                println!("`i` is `{:?}`. Try again.", i);
                optional = Some(i + 1);
            }
        },
        // 구조 분해에 실패한다면 loop에서 빠져나옵니다.
        _ => { break; }
        // 과연 위의 코드가 필요한걸까요? 더 나은 방법이 있을겁니다!
    }
}
}
```

`while let`은 이를 더 나아보이게 만듭니다.

```rust,editable
fn main() {
    // `Option<i32>` 타입을 갖는 `optional`을 바인딩합니다.
    let mut optional = Some(0);

    // : `optional`이 `Some(i)`로 구조 분해 될 수 있다면,
    // 블럭(`{}`)을 수행하고, 그렇지 않다면 `break` 합니다.
    while let Some(i) = optional {
        if i > 9 {
            println!("Greater than 9, quit!");
            optional = None;
        } else {
            println!("`i` is `{:?}`. Try again.", i);
            optional = Some(i + 1);
        }
        // 들여쓰기가 줄어들고, 실패 케이스에 대한
        // 명확한 처리를 하지 않아도 됩니다!
    }
    // `if let`은 `else`, `else if` 문이 선택적으로 쓰일 수 있었지만,
    // `while let`은 이런 것들이 존재하지 않습니다.
}

```
# pointers/ref

포인터의 경우, C 언어와 같이, 다르게 사용되는 개념이기 때문에 분해(destructuring)과 역참조(dereferencing) 간의 구분이 필요하다.

- 역참조(Dereference)는 `*`를 사용합니다.
- 분해(Destructuring)은 `&`, `ref`, 그리고 `ref mut`를 사용합니다.

```rust,editable
fn main() {
    // `i32` 타입의 레퍼런스를 할당합니다.
    // `&`는 할당된 참조가 존재함을 나타냅니다.
    let reference = &4;

    match reference {
        // 참조의 매칭은 `&val`에 대해 이루어집니다.
        // 즉 매칭은 `&4` == `&val`와 같이 이루어지는데,
        // `&`를 떼놓고 본다면, `i32`가 `val`과 매칭됨을 알 수 있습니다.
        &val => println!("Got a value via destructuring: {:?}", val),
    }

    // `&`을 사용하지 않으려면, 역참조를 활용하면 됩니다.
    match *reference {
        val => println!("Got a value via dereferencing: {:?}", val),
    }

    // 애초에 참조를 사용하지 않는다면 어떨까요?
    let _not_a_reference = 3;

    // `ref`는 이런 경우에 사용하기 위해 `ref`를 제공합니다.
    // `ref`를 사용하면, 요소에 대한 참조가 생성되도록 할당을 수정합니다.
    // 이 경우, 값이 아닌, 참조가 할당됩니다.
    let ref _is_a_reference = 3;

    // 따라서, 참조 없이 정의한 아래의 두 값에 대해서도,
    // `ref`와 `ref mut`를 통해 참조값을 얻을 수 있습니다.
    let value = 5;
    let mut mut_value = 6;

    // `ref` 키워드가 참조를 생성합니다.
    match value {
        ref r => println!("Got a reference to a value: {:?}", r),
    }

    // `ref mut` 역시 유사합니다.
    match mut_value {
        ref mut m => {
            // 참조를 얻어, 이에 대한 역참조를 얻습니다.
            // 이후 해당 값을 수정합니다.
            *m += 10;
            println!("We added 10. `mut_value`: {:?}", m);
        },
    }
}
```
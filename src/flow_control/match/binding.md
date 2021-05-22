# Binding

변수에 간접적으로 접근할 경우 다시 바인딩 하지 않고서는 변수를 사용하거나 분기를 처리할 수 없습니다. `match`는 값을 다른 이름으로 바인딩하기 위한 `@` 표기를 제공합니다.

```rust,editable
// A function `age` which returns a `u32`.
// `age` 함수는 `u32`를 반환합니다.
fn age() -> u32 {
    15
}

fn main() {
    println!("Tell me what type of person you are");

    match age() {
        0             => println!("I haven't celebrated my first birthday yet"),
        // 현재, `age()`에 대해 `1 ..= 12`로 매칭 여부는 판단할 수 있습니다.
        // 그런데, 해당 값에 어떻게 접근할 수 있을까요??
        // 이를 해결하기 위해, `1 ..= 12`의 시퀀스에 `n`을 바인딩 시킵니다.
        n @ 1  ..= 12 => println!("I'm a child of age {:?}", n),
        n @ 13 ..= 19 => println!("I'm a teen of age {:?}", n),
        // 아래는 바인딩된 것이 없습니다. `n`은 단순히 `age()`의 값입니다.
        n             => println!("I'm an old person of age {:?}", n),
    }
}
```

`Option`과 같은 `enum` 변형에 대해서도 분해를 할수도 있습니다.

```rust,editable
fn some_number() -> Option<u32> {
    Some(42)
}

fn main() {
    match some_number() {
        // `Some` 변형 가져와, 값을 매칭합니다.
        // 이후 이를 `n`에 바인딩시키며, 이는 `42`와 동일합니다.
        Some(n @ 42) => println!("The Answer: {}!", n),
        // 그 외의 다른 수인 경우와 매칭됩니다.
        Some(n)      => println!("Not interesting... {}", n),
        // 그 외의 경우와 매칭됩니다. (`None` 변형인 경우)
        _            => (),
    }
}
```
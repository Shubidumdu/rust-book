# Literals

숫자 리터럴은 타입을 suffix(접미사)로 추가하여 타입을 지정할 수 있습니다. 예를 들어, `42` 리터럴에 대해 `42i32`로 작성하여 `i32` 타입을 갖도록 할 수 있습니다.

suffix가 없는 숫자 리터럴의 경우 해당 리터럴이 어떻게 사용되느냐에 따라 타입이 다르게 고려됩니다. 별도의 제약이 없다면, 컴파일러는 기본적으로 정수에 대해서는 `i32`로, 부동소수점 수에 대해서는 `f64` 타입이 적용됩니다.

```rust,eitable
fn main() {
    // 리터럴에 suffix가 붙으면,
    // 초기화 시점에 해당 타입을 알 수 있습니다.
    let x = 1u8;
    let y = 2u32;
    let z = 3f32;

    // suffix가 없는 리터럴의 경우,
    // 이들의 타입은 어떻게 사용되었느냐에 따라 달라집니다.
    let i = 1;
    let f = 1.0;

    // `size_of_val`은 변수의 사이즈를 bytes로 반환합니다.
    println!("size of `x` in bytes: {}", std::mem::size_of_val(&x));
    println!("size of `y` in bytes: {}", std::mem::size_of_val(&y));
    println!("size of `z` in bytes: {}", std::mem::size_of_val(&z));
    println!("size of `i` in bytes: {}", std::mem::size_of_val(&i));
    println!("size of `f` in bytes: {}", std::mem::size_of_val(&f));
}
```

위의 코드에서 설명하지 않은 부분이 있습니다.

- `std::mem::size_of_val`는 *full path*를 통해 호출된 함수입니다. 코드는 **모듈(module)**이라고 부르는 로직 단위로 쪼개질 수 있습니다. 위의 경우, `size_of_val` 함수는 `mem` 모듈에서 정의된 것이며, 그 `mem` 모듈은 `std` 크레이트로부터 정의된 것입니다. 더 자세한 내용에 대해서는 추후에 설명하도록 하겠습니다.
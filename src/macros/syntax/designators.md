# Designators

매크로의 인수는 `$`문자가 접두어로 붙습니다. 이후 *지정자(designator)*로 타입이 지정됩니다.

```rust,editable
macro_rules! create_function {
    // 아래 매크로는 `ident` 지정자의 인수를 받아
    // `$func_name`라는 이름의 함수를 생성합니다.
    // `ident` 지정자는 변수/함수명에 사용됩니다.
    ($func_name:ident) => {
        fn $func_name() {
            // `stringify!` 매크로는 `ident`를 String으로 변환합니다.
            println!("You called {:?}()",
                     stringify!($func_name));
        }
    };
}

// 위의 매크로로 `foo`와 `bar`라는 이름의 함수를 생성합니다.
create_function!(foo);
create_function!(bar);

macro_rules! print_result {
    // 아래 매크로는 `expr` 타입을 갖는 Expression을 받습니다.
    // 그리고 결과와 함께 이를 String으로 출력합니다.
    // `expr` 지정자는 Expression으로 사용됩니다.
    ($expression:expr) => {
        // `stringify!`는 Expression을 *그대로* string으로 변환합니다.
        println!("{:?} = {:?}",
                 stringify!($expression),
                 $expression);
    };
}

fn main() {
    foo();
    bar();

    print_result!(1u32 + 1);

    // 블럭도 Expression이라는 점을 기억하세요!
    print_result!({
        let x = 1u32;

        x * x + 2 * x - 1
    });
}
```

아래는 가능한 지정자(designator)들의 일부입니다.

- `block`
- `expr`: Expression에 사용
- `ident` : 변수/함수명에 사용
- `item`
- `literal` : 리터럴 상수에 사용
- `pat` : 패턴
- `path`
- `stmt` : Statement
- `tt` : 토큰 트리(token tree)
- `ty` : 타입(type)
- `vis` : 가시성 한정자(visibility qualifier)

완전한 리스트에 대해서는 [여기](https://doc.rust-lang.org/reference/macros-by-example.html)를 참조하세요.
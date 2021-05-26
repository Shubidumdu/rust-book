# Static

Rust에는 몇 가지 지정된(reserved) 라이프타임 이름이 있습니다. 그 중 하나가 `'static`입니다. 아마 다음과 같은 두 가지 상황에 이를 마주하게 될 것입니다.

```rust,editable
// 'static 라이프타임을 갖는 참조
let s: &'static str = "hello world";

// 트레이트 제한의 일부로 'static을 갖는 경우
fn generic<T>(x: T) where T: 'static {}
```

양쪽 다 서로 관련이 있긴 하지만 미묘하게 다르며, 이는 Rust를 배울때 종종 혼란을 일으킵니다. 이제 각각의 상황에 대한 예시에 대해 알아봅시다.

## Reference lifetime

참조 라이프타임으로 쓰인 `'static`은 참조가 가리키는 데이터의 라이프타임이 프로그램 실행 내내 유지됨을 의미합니다. 이는 여전히 더 짧은 라이프타임으로 변환될 수 있습니다.

`'static` 라이프타임을 갖는 변수를 만드는 두 가지 방법이 있으며, 두 방법 모두 바이너리 내의 읽기 전용 메모리에 저장됩니다.

- `static` 선언으로 상수를 생성하는 방법
- `&'static str` 타입으로 `string` 리터럴을 만드는 방법

각 방법을 사용하는 예시를 살펴봅시다.

```rust,editable
// `'static` 라이프타임을 갖는 상수를 만듭니다.
static NUM: i32 = 18;

// `'static` 라이프타임이 입력 인수의 라이프타임으로 변환되는
// `NUM`에 대한 참조를 반환합니다.
fn coerce_static<'a>(_: &'a i32) -> &'a i32 {
    &NUM
}

fn main() {
    {
        // `string` 리터럴을 만들고 출력합니다.
        let static_string = "I'm in read-only memory";
        println!("static_string: {}", static_string);

        // `static_string`이 스코프를 벗어날 때,
        // 참조는 더 이상 사용될 수 없습니다.
        // 따라서 데이터는 바이너리 내에서 유지됩니다.
    }

    {
        // `coerce_static`을 사용하기 위한 정수를 만듭니다.
        let lifetime_num = 9;

        // `NUM`을 `lifetime_num`의 라이프타임으로 변환합니다.
        let coerced_static = coerce_static(&lifetime_num);

        println!("coerced_static: {}", coerced_static);
    }

    println!("NUM: {} stays accessible!", NUM);
}
```

## Trait bound

트레이트 제한의 경우, 해당 타입은 정적이지 않은 참조는 포함하지 않는다는 것을 의미합니다. 예를 들어, 참조의 수신자는 원하는 한 해당 타입을 계속 유지할 수 있으며, 수신자가 사라질 때까지 절대 무효(invalid)해지지 않습니다.

이는 소유한 모든 데이터의 경우(참조가 아닌 경우) `'static`' 라이프타임 제한을 통과한다는 것을 의미하지만, 해당 소유 데이터에 대한 **참조**는 일반적으로 그렇지 않다는 것을 의미합니다.

```rust,editable
use std::fmt::Debug;

fn print_it( input: impl Debug + 'static ) {
    println!( "'static value passed in is: {:?}", input );
}

fn main() {
    // `i`는 소유된 상태이며, 아무런 참조도 갖고 있지 않습니다.
    // 그러므로, 이는 `'static`에 해당합니다.
    let i = 5;
    print_it(i);

    // `&i`는 오직 `use_it()`의 스코프에 의해 정의된 라이프타임을 갖습니다.
    // 따라서, 이는 `'static`이 아닙니다.
    print_it(&i);
}
```
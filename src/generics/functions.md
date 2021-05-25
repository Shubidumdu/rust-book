# Functions

동일한 규칙은 함수에도 적용됩니다. `<T>`가 타입 `T` 앞에 작성되면 해당 타입 `T`가 제네릭이 됩니다.

제네릭 함수를 사용하는 것은 종종 명시적인 타입 매개변수의 지정이 요구됩니다. 이러한 상황은 함수가 반환하는 타입이 제네릭에 해당하거나, 컴파일러 입장에서 필수적인 타입 매개변수를 추측하기 위한 충분한 정보가 존재하지 않을 경우에 그렇습니다.

명시적으로 타입 매개변수를 지정하여 함수를 호출하는 경우, 다음과 같은 형태를 띕니다. `func::<A, B, ...>()`

```rust,editable
struct A;          // 콘크리트 타입 'A'
struct S(A);       // 콘크리트 타입 'B'
struct SGen<T>(T); // 제네릭 타입 'SGen'

// 아래에 오는 모든 함수들은 본인에게 전달된 변수들에 대한 소유권을 넘겨 받습니다.

// `reg_fn` 함수는 `S` 타입을 가진 `_s` 인수를 받습니다.
// 여기에는 `<T>`가 사용되지 않았으므로, 제네릭 함수가 아닙니다.
fn reg_fn(_s: S) {}

// `gen_spec_t` 함수는 `SGen<T>` 타입의 `_s` 인수를 받습니다.
// 이는 명시적으로 타입 매개변수 `A`를 넘겨받지만,
// 이는 `gen_spec_t`의 제네릭 타입 매개변수로 명시된 것이 아니므로,
// 해당 함수는 제네릭 함수가 아닙니다.
fn gen_spec_t(_s: SGen<A>) {}

// `gen_spec_i32` 함수는 `SGen<i32>` 타입의 `_s` 인수를 받습니다.
// 이는 명시적으로 타입 매개변수 `i32`를 넘겨받지만,
// `i32`는 제네릭 타입이 아니므로, 해당 함수 역시 제네릭이 아닙니다.
fn gen_spec_i32(_s: SGen<i32>) {}

// `generic` 함수는 `SGen<T>` 타입의 `_s` 인수를 받습니다.
// `<T>`가 `SGen<T>`에 앞서 있으므로, 해당 함수는 `T`에 대한 제네릭 함수입니다.
fn generic<T>(_s: SGen<T>) {}

fn main() {
    // 먼저, 제네릭이 아닌 함수들을 사용해봅시다.
    reg_fn(S(A));          // 콘크리트 타입
    gen_spec_t(SGen(A));   // 암시적으로 지정된 타입매개변수 `A`
    gen_spec_i32(SGen(6)); // 암시적으로 지정된 타입매개변수 `i32`

    // 명시적으로 `char`타입 매개변수를 지정합니다.
    generic::<char>(SGen('a'));

    // 암시적으로 `char` 타입 매개변수를 지정합니다.
    generic(SGen('c'));
}
```
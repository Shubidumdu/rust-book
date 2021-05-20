# Primitives

Rust는 다양한 형태의 `primitives`를 제공합니다.

### 스칼라 타입 (Scalar Types)
- signed integers : `i8`, `i16`, `i32`, `i64`, `i128`, `isize` (포인터 사이즈)
- unsigned integers : `u8`, `u16`, `u32`, `u64`, `u128`, `usize` (포인터 사이즈)
- floating point : `f32`, `f64`
- `char` : 유니코드 스칼라값, 각각 4byte (`a`, `α`, `∞` 등)
- `bool` : `true` 혹은 `false`
- `()` : 유닛타입. 빈 튜플.

`()`은 튜플임에도 불구하고, 아무 값도 포함하지 않기 때문에 컴파운드(복합) 타입으로 고려되지 않습니다.

### 컴파운드 타입 (Compound Types)

- arrays : `[1, 2, 3]`
- tuples : `(1, true)`

변수들은 항상 타입이 지정됩니다. 숫자 타입들은 *suffix*를 통해 직접 타입을 지정하거나, 기본적으로 지정됩니다. (`int`는 `i32`로, `float`는 `f64`로) 또한 Rust는 컨텍스트를 통해 타입을 추측하기도 합니다.

```rust,editable
fn main() {
    // 변수는 타입이 지정될 수 있습니다.
    let logical: bool = true;

    // 일반적인 타입 지정
    let a_float: f64 = 1.0;
    // suffix 타입 지정 -> `i32` 타입의 `5`
    let an_integer   = 5i32; // Suffix annotation

    // 기본 타입 지정
    let default_float   = 3.0; // `f64`
    let default_integer = 7;   // `i32`
    
    // Context에 따라 타입이 지정될 수도 있습니다. 
    let mut inferred_type = 12; 
    // 아래에서의 i64로 타입이 지정됩니다.
    inferred_type = 4294967296i64;
    
    // `mut`을 통해 `mutable`로 지정한 변수는 변경될 수 있습니다.
    let mut mutable = 12; // Mutable `i32`
    mutable = 21;
    
    // 단, 타입을 유지해야 합니다.
    // 아래는 에러가 출력됩니다.
    mutable = true;
    
    // 섀도잉(shadowing)을 통해 덮어쓸수도 있습니다.
    let mutable = true;
}

```
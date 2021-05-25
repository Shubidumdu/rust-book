# Testcase: unit clarification

단위 변환의 유용한 메서드는 팬텀 타입 매개변수로 `Add`를 구현함으로서 검사할 수 있습니다. `Add` 트레이트는 아래와 같습니다.

```rust
// 아래 생성은 `Self + RHS = Output`을 구성합니다.
// RHS는 구현 내에서 명시되지 않는다면 `Self`가 기본값이 됩니다.
pub trait Add<RHS = Self> {
    type Output;

    fn add(self, rhs: RHS) -> Self::Output;
}

// `Output`은 반드시 `T<U>`가 되며,
// 따라서 `T<U> + T<U> = T<U>` 입니다.
impl<U> Add for T<U> {
    type Output = T<U>;
    ...
}
```

전체 구현은 아래와 같습니다.

```rust,editable
use std::ops::Add;
use std::marker::PhantomData;

// 유닛 타입 정의를 위해 비어있는 enum을 만듭니다.
#[derive(Debug, Clone, Copy)]
enum Inch {}
#[derive(Debug, Clone, Copy)]
enum Mm {}

// `Length`는 팬텀 타입 매개변수 `Unit`을 사용하는 타입입니다.
// 그리고 이는 length 타입(`f64`)에 대한 제네릭이 아닙니다.
// `f64`는 이미 `Clone`과 `Copy` 트레이트에 대해 구현되었습니다.
#[derive(Debug, Clone, Copy)]
struct Length<Unit>(f64, PhantomData<Unit>);

// `Add` 트레이트는 `+` 연산자의 동작에 대해 정의합니다.
impl<Unit> Add for Length<Unit> {
     type Output = Length<Unit>;

    // add() returns a new `Length` struct containing the sum.
    // `add()`는 덧셈이 수행된 새로운 `Length` 구조를 반환합니다.
    fn add(self, rhs: Length<Unit>) -> Length<Unit> {
        // `+` 는 `f64`에 대한 새로운 `Add` 구현을 호출합니다.
        Length(self.0 + rhs.0, PhantomData)
    }
}

fn main() {
    // 팬텀 타입 매개변수 `Inch`를 갖기 위해 `one_foot`를 정의합니다.
    let one_foot:  Length<Inch> = Length(12.0, PhantomData);
    // `one_meter`는 `Mm` 팬텀 타입 매개변수를 갖습니다.
    let one_meter: Length<Mm>   = Length(1000.0, PhantomData);

    // `+`는 `Length<Unit>` 에 대해 구현한 `add()` 메서드를 호출합니다. 
    //
    // `Length`의 `Copy`, `add()` 구현은 `one_foot`과 `one_meter`를
    // "소비"하지 않고, `self`와 `rhs`에 이를 복사해옵니다.
    let two_feet = one_foot + one_foot;
    let two_meters = one_meter + one_meter;

    // 덧셈이 동작합니다.
    println!("one foot + one_foot = {:?} in", two_feet.0);
    println!("one meter + one_meter = {:?} mm", two_meters.0);

    // ERROR : `one_foot`과 `one_meter`간에는 타입이 맞지 않습니다.
    // 이러한 비논리적인 작업은 컴파일 에러를 유발합니다.
    let one_feter = one_foot + one_meter;
}
```
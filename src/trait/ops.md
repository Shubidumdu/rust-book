# Operator Overloading

Rust에서는 여러 연산자가 트레이트에 의해 오버로딩될 수 있습니다. 다시 말해, 일부 연산자들이 그들의 입력 인수에 기반하여 다른 동작을 수행하도록 할 수 있습니다. 이것이 가능한 이유는 각 연산자가 메서드 호출에 대한 Syntactic sugar 이기 때문입니다. 예를 들어, `a + b` 에서의 `+` 연산자는 사실 `a.add(b)`와 같이 `add` 메서드를 호출하는 것입니다. 이 `add` 메서드는 `Add` 트레이트의 일부입니다. 그러므로 `+` 연산자는 `Add` 트레이트의 구현자를 통해 사용될 수 있습니다.

`Add`와 같은 트레이트들의 오버로드 연산자의 목록은 [`core::ops`](https://doc.rust-lang.org/core/ops/)에서 찾아볼 수 있습니다.

```rust,editable
use std::ops;

struct Foo;
struct Bar;

#[derive(Debug)]
struct FooBar;

#[derive(Debug)]
struct BarFoo;

// `std::ops:Add` 트레이트는 `+`의 기능을 구체화하기 위해 사용됩니다.
// 여기서 `Add<Bar>`는 RHS(연산자 우측)의 `Bar` 타입에 대한 트레이트입니다.
// 이후의 블럭은 다음 연산을 수행합니다. : Foo + Bar = FooBar 
impl ops::Add<Bar> for Foo {
    type Output = FooBar;

    fn add(self, _rhs: Bar) -> FooBar {
        println!("> Foo.add(Bar) was called");

        FooBar
    }
}

// 여기서 `Add<Foo>`는 RHS의 `Foo` 타입에 대한 트레이트입니다.
// 이후의 블럭은 다음 연산을 수행합니다. : Bar + Foo = BarFoo
impl ops::Add<Foo> for Bar {
    type Output = BarFoo;

    fn add(self, _rhs: Foo) -> BarFoo {
        println!("> Bar.add(Foo) was called");

        BarFoo
    }
}

fn main() {
    println!("Foo + Bar = {:?}", Foo + Bar);
    println!("Bar + Foo = {:?}", Bar + Foo);
}
```
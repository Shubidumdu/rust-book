# implementation

함수와 유사하게, 구현(Implementation) 역시 제네릭을 활용할 수 있다.

```rust,editable
#![allow(unused)]
fn main() {
  struct S; // 콘크리트 타입 `S`
  struct GenericVal<T>(T); // 제네릭 타입 `GenericVal`
  
  // 명시적인 타입 매개변수 지정을 통한 GenericVal의 구현
  impl GenericVal<f32> {} // `f32` 지정
  impl GenericVal<S> {} // 상단의 `S` 타입에 대한 지정

  // `<T>`가 제네릭을 위해 사용되었습니다.
  impl<T> GenericVal<T> {}
}
```

```rust,editable
struct Val {
    val: f64,
}

struct GenVal<T> {
    gen_val: T,
}

// Val 구현
impl Val {
    fn value(&self) -> &f64 {
        &self.val
    }
}

// 제네릭 타입 `T`에 대한 GenVal의 구현
impl<T> GenVal<T> {
    fn value(&self) -> &T {
        &self.gen_val
    }
}

fn main() {
    let x = Val { val: 3.0 };
    let y = GenVal { gen_val: 3i32 };

    println!("{}, {}", x.value(), y.value());
}
```
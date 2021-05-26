# Traits

트레이트 메서드에서의 라이프타임 지정은 기본적으로 함수와 유사하니다. `impl` 역시 라이프타임 지정이 가능함을 기억하세요.

```rust,editable
// 라이프타임의 지정을 가진 구조
#[derive(Debug)]
 struct Borrowed<'a> {
     x: &'a i32,
 }

// impl에 대한 라이프타임 지정
impl<'a> Default for Borrowed<'a> {
    fn default() -> Self {
        Self {
            x: &10,
        }
    }
}

fn main() {
    let b: Borrowed = Default::default();
    println!("b is {:?}", b);
}
```
# Methods

메서드들도 함수와 유사하게 지정됩니다.

```rust
struct Owner(i32);

impl Owner {
    // 독립적인 함수에 라이프타임을 지정해줍니다.
    fn add_one<'a>(&'a mut self) { self.0 += 1; }
    fn print<'a>(&'a self) {
        println!("`print`: {}", self.0);
    }
}

fn main() {
    let mut owner = Owner(18);

    owner.add_one();
    owner.print();
}
```
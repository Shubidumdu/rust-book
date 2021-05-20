# C-like

`enum`은 C 에서의 enum과 유사하게 사용될 수 있습니다.

```rs
// 사용하지 않은 코드에 대한 경고를 숨깁니다.
#![allow(dead_code)]

// implicit discriminator를 활용한 enum (0부터 시작)
enum Number {
    Zero,
    One,
    Two,
}

// explicit discriminator를 활용한 enum
enum Color {
    Red = 0xff0000,
    Green = 0x00ff00,
    Blue = 0x0000ff,
}

fn main() {
    // 정수로 변환될 수 있습니다.
    println!("zero is {}", Number::Zero as i32);
    println!("one is {}", Number::One as i32);

    println!("roses are #{:06x}", Color::Red as i32);
    println!("violets are #{:06x}", Color::Blue as i32);
}

```
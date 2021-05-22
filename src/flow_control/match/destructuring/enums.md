# enums

`enum`도 유사하게 분해될 수 있습니다.

```rust,editable
// 사용하지 않은 변수에 대한 경고를 감춥니다.
#[allow(dead_code)]
enum Color {
    // 아래 셋은 이름만 명시되어 있습니다.
    Red,
    Blue,
    Green,
    // 나머지는 `u32` 튜플들을 각자 다른 이름으로 묶습니다.
    RGB(u32, u32, u32),
    HSV(u32, u32, u32),
    HSL(u32, u32, u32),
    CMY(u32, u32, u32),
    CMYK(u32, u32, u32, u32),
}

fn main() {
    // 아래의 `RGB`를 다른 변형으로 바꾸어보세요.
    let color = Color::RGB(122, 17, 40);

    println!("What color is it?");
    // `enum`은 `match`를 통해 분해될 수 있습니다.
    match color {
        Color::Red   => println!("The color is Red!"),
        Color::Blue  => println!("The color is Blue!"),
        Color::Green => println!("The color is Green!"),
        Color::RGB(r, g, b) =>
            println!("Red: {}, green: {}, and blue: {}!", r, g, b),
        Color::HSV(h, s, v) =>
            println!("Hue: {}, saturation: {}, value: {}!", h, s, v),
        Color::HSL(h, s, l) =>
            println!("Hue: {}, saturation: {}, lightness: {}!", h, s, l),
        Color::CMY(c, m, y) =>
            println!("Cyan: {}, magenta: {}, yellow: {}!", c, m, y),
        Color::CMYK(c, m, y, k) =>
            println!("Cyan: {}, magenta: {}, yellow: {}, key (black): {}!",
                c, m, y, k),
        // 모든 변형에 대해서 처리했습니다.
    }
}
```
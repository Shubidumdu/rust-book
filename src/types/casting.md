# Casting

Rust는 원시 타입 간의 암묵적인 타입 변환을 제공하지 않습니다. 허나 `as` 키워드를 통한 명시적 타입 변환을 적용할 수 있습니다.

유형 간의 변환 규칙은 일반적으로 C에 정의되지 않은 동작이 있는 경우를 제외하고는 C에서의 규칙을 따릅니다. 타입 간의 모든 변환 동작에 대해서는 Rust 내에 잘 정의되어 있습니다.

```rust
// 오버플로되는 캐스트에 대한 경고를 표시하지 않게끔 합니다.
#![allow(overflowing_literals)]

fn main() {
    let decimal = 65.4321_f32;

    // ERROR : 암시적인 타입 변환은 불가능합니다.
    let integer: u8 = decimal;

    // 타입 변환을 위해서는 명시적인 변환이 필요합니다.
    let integer = decimal as u8;
    let character = integer as char;

    // ERROR : 변환 규칙에는 따라 몇가지 제한이 존재합니다.
    // float는 char 타입으로 직접적인 변환이 불가능합니다.
    let character = decimal as char;

    println!("Casting: {} -> {} -> {}", decimal, integer, character);

    // 어떤 값을 `unsigned` T 타입으로 변환하려고 하는 경우,
    // 새로운 타입에 값이 들어맞을 때까지
    /// T::MAX + 1을 더하거나 뺍니다.
    // Binary의 관점에서 보면, 
    // 이는 LSB에서부터 T개 자리의 숫자를 유지하고,
    // 남은 MSB로부터의 나머지는 버리는 작업을 수행하는 것입니다.

    // 1000은 애초에 u16의 범위 내에 있습니다.
    // (0 ~ 65535)
    println!("1000 as a u16 is: {}", 1000 as u16);

    // 1000은 `u8`의 범위를 벗어납니다. (0 ~ 255)
    // 따라서 여러번 T::MAX + 1 (256)를 뺍니다.
    // 1000 - 256 - 256 - 256 = 232
    println!("1000 as a u8 is : {}", 1000 as u8);
    
    // -1의 경우도 마찬가지입니다.
    // -1 + 256 = 255
    println!("  -1 as a u8 is : {}", (-1i8) as u8);

    // 양수 입장에서, 이는 계수(modulus)와 동일해집니다.
    println!("1000 mod 256 is : {}", 1000 % 256);

    // signed 타입으로의 변환은 unsigned와 그 방식이 동일합니다.
    // 그 결과의 MSB가 1이라면 (음수라면)
    // 2의 보수를 구함으로써 signed 타입을 파악할 수 있습니다.

    // 128은 이미 `i16`의 범위 내에 있습니다.
    // (-32768 ~ 32768)
    println!(" 128 as a i16 is: {}", 128 as i16);

    // 128 as u8 -> 128이고, 해당 binary의
    // 2의 보수를 구하여 음수를 구해보면 -128입니다.
    println!(" 128 as a i8 is : {}", 128 as i8);

    // 1000 as u8 -> 232입니다.
    println!("1000 as a u8 is : {}", 1000 as u8);

    // 232의 binary를 2의 보수로 음수를 구해보면 -24입니다.
    println!(" 232 as a i8 is : {}", 232 as i8);
    
    // Rust 1.45v 이후로, float -> int 변환은 Saturating cast 됩니다.
    // 즉, 기존 float가 변환할 int 타입의 최대보다 크거나,
    // 최소보다 작을 경우 해당 최댓값 또는 최솟값으로 변환이 됩니다.
    
    // 300.0의 unsigned 8 변환은 256이 됩니다.
    println!("300.0 is {}", 300.0_f32 as u8);
    // -100.0의 unsigned 8 변환은 0이 됩니다.
    println!("-100.0 as u8 is {}", -100.0_f32 as u8);
    // NaN의 unsigned 8 변환은 0이 됩니다.
    println!("nan as u8 is {}", f32::NAN as u8);

    // 아래의 방식은 안전하지 않은 방법이지만,
    // 런타임 비용을 줄일 수 있습니다.
    // 다만, 그 결과가 오퍼플로우 될수 있어
    // 원치않는 값을 반환할 수도 있으니 주의해야 합니다.
    unsafe {
        // 300.0 -> 44가 됩니다.
        println!("300.0 is {}", 300.0_f32.to_int_unchecked::<u8>());
        // -100.0 -> 156이 됩니다.
        println!("-100.0 as u8 is {}", (-100.0_f32).to_int_unchecked::<u8>());
        // nan -> 0이 됩니다.
        println!("nan as u8 is {}", f32::NAN.to_int_unchecked::<u8>());
    }
}

```
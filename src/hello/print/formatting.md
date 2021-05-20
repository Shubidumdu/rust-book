# Formatting

앞서 포맷팅이 **포맷 스트링**을 통해서 형태가 정해짐을 확인할 수 있었습니다.

- `format!("{}", foo)` -> `"3735928559"`
- `format!("0x{:X}", foo)` -> `"0xDEADBEEF"`
- `format!("0o{:o}", foo)` -> "0o33653337357"

동일한 값인 `foo`에 대해서도 어떤 매개변수 타입이 사용되느냐에 따라 다르게 포맷팅됩니다.

이러한 포맷팅 기능은 트레이트를 통해서 구현될 수 있으며, 각각의 매개변수 타입에 대해 하나의 트레이트가 사용됩니다.. 가장 일반적인 포맷팅 프레이트는 `Display`로, 이는 매개변수 타입이 구체화되지 않은 경우에 다루어집니다. (`{}`)

```rust,editable
use std::fmt::{self, Formatter, Display};

struct City {
  name: &'static str,
  lat: f32,
  lon: f32,
}

impl Display for City {
  // `f`는 버퍼로, `fmt` 메서드는 여기에 포맷 스트링을 작성해주어야 합니다.
  fn fmt(&self, f: &mut Formatter) -> fmt::Result {
    let lat_c = if self.lat >= 0.0 { 'N' } else { 'S' };
    let lon_c = if self.lon >= 0.0 { 'E' } else { 'W' };

      // `write!`는 `format!`과 유사하지만
      // 포맷스트링을 `f` 버퍼에 작성합니다.
      //
      // 아래의 `:.3`은 소수 3번째 자리까지 반올림을 수행합니다.
      write!(f, "{}: {:.3}°{} {:.3}°{}",
        self.name, 
        self.lat.abs(), 
        lat_c, 
        self.lon.abs(), 
        lon_c)
  }
}

#[derive(Debug)]
struct Color {
    red: u8,
    green: u8,
    blue: u8,
}

// RGB 형태의 `Color` 구조에 Hex출력을 추가해보겠습니다.
impl Display for Color {
    fn fmt(&self, f: &mut Formatter) -> fmt::Result {
        // `{:02X}`의 경우,
        // `:02`는 width(`2`) 만큼 0을 padding으로 넣습니다.
        // `:X`는 Upper Hex(16진수)로 변환시킵니다.
        write!(f, "RGB ({0}, {1}, {2}) 0x{0:02X}{1:02X}{2:02X}", 
            self.red, 
            self.green, 
            self.blue)
    }
}

fn main() {
    for city in [
        City { name: "Dublin", lat: 53.347778, lon: -6.259722 },
        City { name: "Oslo", lat: 59.95, lon: 10.75 },
        City { name: "Vancouver", lat: 49.25, lon: -123.1 },
    ].iter() {
        println!("{}", *city);
    }
    for color in [
        Color { red: 128, green: 255, blue: 90 },
        Color { red: 0, green: 3, blue: 254 },
        Color { red: 0, green: 0, blue: 0 },
    ].iter() {
        println!("{}", *color);
    }
}
```

원하는 형태로 포매팅을 하기 위한 매개변수의 종류들에 대해서는 [여기](https://doc.rust-lang.org/std/fmt/)에서 자세히 찾아볼 수 있습니다.
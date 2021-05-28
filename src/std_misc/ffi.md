# Foreign Function Interface

Rust는 C 라이브러리들에 대한 Foreign Function Interface(FFI : 외부 함수 인터페이스)를 제공합니다. 외부 함수들은 외부 라이브러리의 이름을 포함한 `#[link]` 어트리뷰트로 지정된 `extern` 블럭 내에서 정의되어야만 합니다.

```rust
use std::fmt;

// `extern` 블럭은 `libm` 라이브러리로 연결됩니다.
#[link(name = "m")]
extern {
    // 이것은 외부 함수입니다.
    // 단정밀도 복소수에 대한 제곱근을 계산합니다.
    fn csqrtf(z: Complex) -> Complex;

    fn ccosf(z: Complex) -> Complex;
}

// 외부 함수의 호출은 안전하지 않은 것으로 간주됩니다.
// 따라서, 이를 감쌀 safe wrapper들을 작성하는 것이 일반적입니다.
fn cos(z: Complex) -> Complex {
    unsafe { ccosf(z) }
}

fn main() {
    // z = -1 + 0i
    let z = Complex { re: -1., im: 0. };

    // 외부 함수의 호출은 안전하지 않은 작업입니다.
    let z_sqrt = unsafe { csqrtf(z) };

    println!("the square root of {:?} is {:?}", z, z_sqrt);

    // 안전하지 않음 작업을 안전한 API로 감싸서 호출합니다.
    println!("cos({:?}) = {:?}", z, cos(z));
}

// 단정밀도 복소수에 대한 간단한 구현입니다.
#[repr(C)]
#[derive(Clone, Copy)]
struct Complex {
    re: f32,
    im: f32,
}

impl fmt::Debug for Complex {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        if self.im < 0. {
            write!(f, "{}-{}i", self.re, -self.im)
        } else {
            write!(f, "{}+{}i", self.re, self.im)
        }
    }
}
```
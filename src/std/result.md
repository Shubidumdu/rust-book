# Result

`Option` enum은 실패할지도 모르는 함수의 반환값으로서 사용될 수 있습니다. 이 때, `None`이 작업의 실패를 나타내기 위해 반환됩니다. 그러나, 종종 왜 해당 작업이 실패했는지에 대해 알려주는 것은 중요합니다. 이를 위해선 `Result` enum을 사용할 수 있습니다.

`Result<T, E>` enum은 다음의 두 변형을 가질 수 있습니다.

- `Ok(value)`는 작업의 성공을 나타냅니다. 작업 이후 반환되는 값 `value`을 감쌉니다. (`value`는 `T` 타입을 갖습니다.)
- `Err(why)`는 작업의 실패를 나타냅니다. 이는 `why`를 감싸며, 이는 실패의 원인에 대해 설명합니다. (`why`는 `E` 타입을 갖습니다.)

```rust,editable
mod checked {
    // 우리가 잡아내고자 하는 수학적인 Error들입니다.
    #[derive(Debug)]
    pub enum MathError {
        DivisionByZero,
        NonPositiveLogarithm,
        NegativeSquareRoot,
    }

    pub type MathResult = Result<f64, MathError>;

    pub fn div(x: f64, y: f64) -> MathResult {
        if y == 0.0 {
            // 해당 작업이 실패하면,
            // `Err`로 실패의 원인을 반환합니다.
            Err(MathError::DivisionByZero)
        } else {
            // 해당 작업이 유효하다면,
            // 그 결과를 `Ok`로 감싸서 반환합니다.
            Ok(x / y)
        }
    }

    pub fn sqrt(x: f64) -> MathResult {
        if x < 0.0 {
            Err(MathError::NegativeSquareRoot)
        } else {
            Ok(x.sqrt())
        }
    }

    pub fn ln(x: f64) -> MathResult {
        if x <= 0.0 {
            Err(MathError::NonPositiveLogarithm)
        } else {
            Ok(x.ln())
        }
    }
}

// `op(x, y)` === `sqrt(ln(x / y))`
fn op(x: f64, y: f64) -> f64 {
    // 아래는 3단계에 걸친 match 입니다.
    match checked::div(x, y) {
        Err(why) => panic!("{:?}", why),
        Ok(ratio) => match checked::ln(ratio) {
            Err(why) => panic!("{:?}", why),
            Ok(ln) => match checked::sqrt(ln) {
                Err(why) => panic!("{:?}", why),
                Ok(sqrt) => sqrt,
            },
        },
    }
}

fn main() {
    println!("{}", op(1.0, 10.0));
}
```
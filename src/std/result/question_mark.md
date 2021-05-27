# ?

`match`를 통한 체이닝 결과는 상당히 지저분해 보일 수 있습니다. `?` 연산자는 이 경우 코드를 좀 더 "이쁘게" 보이도록 할 수 있습니다. `?`은 `Result`이 반환되는 Expression의 끝에 사용됩니다. `match` 문과 동일하게, `Err(err)` 분기는 `Err(From::from(err))`로 확장되며, `Ok(ok)` 분기는 `ok` 문으로 확장됩니다.

```rust,editable
mod checked {
    #[derive(Debug)]
    enum MathError {
        DivisionByZero,
        NonPositiveLogarithm,
        NegativeSquareRoot,
    }

    type MathResult = Result<f64, MathError>;

    fn div(x: f64, y: f64) -> MathResult {
        if y == 0.0 {
            Err(MathError::DivisionByZero)
        } else {
            Ok(x / y)
        }
    }

    fn sqrt(x: f64) -> MathResult {
        if x < 0.0 {
            Err(MathError::NegativeSquareRoot)
        } else {
            Ok(x.sqrt())
        }
    }

    fn ln(x: f64) -> MathResult {
        if x <= 0.0 {
            Err(MathError::NonPositiveLogarithm)
        } else {
            Ok(x.ln())
        }
    }

    // 중간 함수
    fn op_(x: f64, y: f64) -> MathResult {
        // `div` 함수가 실패한다면,
        // `DivisionByZero`가 반환됩니다.
        let ratio = div(x, y)?;

        // `ln` 함수가 실패한다면,
        // `NonPositiveLogarithm`이 반환됩니다.
        let ln = ln(ratio)?;

        sqrt(ln)
    }

    pub fn op(x: f64, y: f64) {
        match op_(x, y) {
            Err(why) => panic!(match why {
                MathError::NonPositiveLogarithm
                    => "logarithm of non-positive number",
                MathError::DivisionByZero
                    => "division by zero",
                MathError::NegativeSquareRoot
                    => "square root of negative number",
            }),
            Ok(value) => println!("{}", value),
        }
    }
}

fn main() {
    checked::op(1.0, 10.0);
}
```

`Result`에 사용되는 많은 메서드들을 확인하려면 [여기](https://doc.rust-lang.org/std/result/index.html)를 확인하세요.
# New Type Idiom

`newtype` 패턴은 컴파일 시점에 값의 올바른 타입이 프로그램에 전달되도록 합니다.

예를 들어, 연령 확인 함수는 년 단위로 이루어지며, `Years` 타입의 값을 넘겨받아야 합니다.

```rust
struct Years(i64);

struct Days(i64);

impl Years {
    pub fn to_days(&self) -> Days {
        Days(self.0 * 365)
    }
}


impl Days {
    // 나눈 후의 나머지 연도는 버립니다.
    pub fn to_years(&self) -> Years {
        Years(self.0 / 365)
    }
}

fn old_enough(age: &Years) -> bool {
    age.0 >= 18
}

fn main() {
    let age = Years(5);
    let age_days = age.to_days();
    println!("Old enough {}", old_enough(&age));
    println!("Old enough {}", old_enough(&age_days.to_years()));
    // ERROR : `old_enough`는 `Years` 타입에 대해서만 유효합니다.
    println!("Old enough {}", old_enough(&age_days));
}
```

`newtype`의 값을 기본 타입으로 얻으려면, 다음과 같이 튜플을 사용할 수 있습니다.


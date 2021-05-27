# Unpacking options with ?

`Option`들은 `match`문을 통해 개봉(unpack)될 수 있습니다. 그러나 이는 `?` 연산자를 사용하면 훨씬 더 쉬워집니다. 만약 `x`이 `Option`이라면, `x?`는 `x`가 `Some`이라면 내부의 값을 반환할 것이고, 그렇지 않다면 실행 중이던 모든 함수가 종료되고 `None`이 반환됩니다.

```rust,editable
fn next_birthday(current_age: Option<u8>) -> Option<String> {
  // `current_age`가 `None`이라면 `None`을 반환합니다.
  // `current_age`가 `Some`이라면, 내부의 `u8`이 `next_age`에 할당됩니다.
    let next_age: u8 = current_age?;
    Some(format!("Next year I will be {}", next_age))
}
```

코드의 가독성을 향상시키기 위해 `?`을 여러번 체이닝할 수 있습니다.

```rust,editable
struct Person {
    job: Option<Job>,
}

#[derive(Clone, Copy)]
struct Job {
    phone_number: Option<PhoneNumber>,
}

#[derive(Clone, Copy)]
struct PhoneNumber {
    area_code: Option<u8>,
    number: u32,
}

impl Person {
    fn work_phone_area_code(&self) -> Option<u8> {
        // 만약, `?` 연산자가 없다면, 이는 중첩 `match`문을 써야합니다.
        // 그런 경우, 코드가 너무 많이 소모될겁니다.
        self.job?.phone_number?.area_code
    }
}

fn main() {
    let p = Person {
        job: Some(Job {
            phone_number: Some(PhoneNumber {
                area_code: Some(61),
                number: 439222222,
            }),
        }),
    };

    assert_eq!(p.work_phone_area_code(), Some(61));
}
```
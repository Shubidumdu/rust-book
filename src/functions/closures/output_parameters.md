# As output parameters

클로저는 입력 매개변수로 사용될 수 있습니다. 따라서 반환되는 결과로도 사용될 수 있어야 합니다. 그러나, 익명 클로저 타입은 정의 상 unknown에 해당하며, 이를 반환 타입으로 사용하기 위해선 `impl Trait`를 사용해야 합니다.

클로저를 반환하기 위해 사용 가능한 트레이트에는 다음과 같은 것들이 있습니다.

- `Fn`
- `FnMut`
- `FnOnce`

그 밖에도, 모든 캡처들이 값(value)에 의해 발생함을 나타내는 `move` 키워드가 사용되어야 합니다. 참조에 의해 발생하는 모든 캡처들은 클로저 내에 부정확한 참조들을 남겨놓고 함수가 종료되는대로 사라지기 때문입니다.

```rust,editable
fn create_fn() -> impl Fn() {
    let text = "Fn".to_owned();

    move || println!("This is a: {}", text)
}

fn create_fnmut() -> impl FnMut() {
    let text = "FnMut".to_owned();

    move || println!("This is a: {}", text)
}

fn create_fnonce() -> impl FnOnce() {
    let text = "FnOnce".to_owned();

    move || println!("This is a: {}", text)
}

fn main() {
    let fn_plain = create_fn();
    let mut fn_mut = create_fnmut();
    let fn_once = create_fnonce();

    fn_plain();
    fn_mut();
    fn_once();
}
```
# Freezing

기존의 mutable 데이터가 동일한 이름을 가진 immutable 변수에 바인딩되면, 데이터를 얼릴(Freeze) 수 있습니다. 얼린 데이터는 해당 변수 바인딩이 적용된 스코프를 벗어날 때까지 유지되어, 수정할 수 없습니다.

```rust,editable
fn main() {
    // `_mutable_integer`는 최초에 mutable 합니다.
    let mut _mutable_integer = 7i32;

    {
        // 동일한 변수에 대한 바인딩으로 
        // 이를 immutable하게 만듭니다.
        let _mutable_integer = _mutable_integer;

        // ERROR : 이제 현재 스코프에서는 아래 바인딩을 수정할 수 없습니다.
        _mutable_integer = 50;
    }

    // Freezing을 적용한 스코프를 벗어나게 되면,
    // 다시 해당 바인딩은 mutable 합니다.
    _mutable_integer = 3;
}
```
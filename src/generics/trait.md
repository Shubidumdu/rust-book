# Traits

당연히 `trait` 역시 제네릭이 될 수 있습니다. 

```rust,editable
// Non-copyable 타입
struct Empty;
struct Null;

// `T`에 대한 트레이트 제네릭
trait DoubleDrop<T> {
    // 추가 단일 매개변수 `T`를 받아 아무 것도 하지 않는
    // 호출자 타입에 대한 메서드를 정의합니다.
    fn double_drop(self, _: T);
}

// 제네릭 매개변수 `T`와 호출자 `U`로 `DoubleDrop<T>`를 구현합니다.
impl<T, U> DoubleDrop<T> for U {
    // 아래 메서드는 전달된 두 인수의 소유권을 가져와 할당을 취소합니다.
    fn double_drop(self, _: T) {}
}

fn main() {
    let empty = Empty;
    let null  = Null;

    // `empty`와 `null`의 할당을 취소합니다.
    empty.double_drop(null);

    // ERROR : 소유권이 이전되어 아래 변수들은 사용할 수 없습니다.
    empty;
    null;
}
```
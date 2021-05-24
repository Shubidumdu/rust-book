# Struct visibility

Struct는 본인의 필드에 대한 추가적인 가시성을 보유합니다. 이는 기본적으로 private로 설정되며, 마찬가지로 `pub` 수정자를 통해 오버라이딩될 수 있습니다.

이러한 가시성은 정의된 모듈의 외부에서 해당 struct에 접근할 때만 고려되며, 내부 정보를 숨기려는 목적을 갖고 있습니다(캡슐화).

```rust
mod my {
    // 제네릭 타입 `T`의 public 필드를 가진 public 구조
    pub struct OpenBox<T> {
        pub contents: T,
    }

    // 제네릭 타입 `T`의 private 필드를 가진 public 구조
    #[allow(dead_code)]
    pub struct ClosedBox<T> {
        contents: T,
    }

    impl<T> ClosedBox<T> {
        // public 생성자 메서드
        pub fn new(contents: T) -> ClosedBox<T> {
            ClosedBox {
                contents: contents,
            }
        }
    }
}

fn main() {
    // public 필드를 가진 public 구조는 평소와 같이 생성됩니다.
    let open_box = my::OpenBox { contents: "public information" };

    // 또한  해당 public 필드에도 정상적으로 접근할 수 있습니다.
    println!("The open box contains: {}", open_box.contents);

    // ERROR : private 필드를 가진 public 구조는 
    // 해당 private 필드를 사용하여 직접 생성할 수 없습니다.
    let closed_box = my::ClosedBox { contents: "classified information" };

    // 대신, private 필드를 가진 구조의 경우
    // public 생성자를 통해 구조를 생성할 수 있습니다.
    let _closed_box = my::ClosedBox::new("classified information");

    // ERROR : public 구조의 private 필드에는 접근할 수 없습니다.
    println!("The closed box contains: {}", _closed_box.contents);
}
```
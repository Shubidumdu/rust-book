# Box, stack, and heap

Rust의 모든 값들은 기본적으로 스택에 할당됩니다. 값(value)들은 `Box<T>`를 통해서 박싱될(*boxed*) 수 있습니다. (이 경우 힙에 할당됩니다.) `Box`는 힙에 할당된 `T` 타입의 값을 가리키는 똑똑한 포인터입니다. 박스가 스코프에서 벗어날 때, 해당 박스의 해체자(destructor)가 동작하며, 내부 객체는 파괴되고, 할당되었던 힙의 메모리도 해제(freed)됩니다.

박싱된 값은 `*` 연산자로 역참조될 수 있습니다. 이를 통해 간접적인 요소를 한겹 제거해냅니다.

```rust,editable
use std::mem;

#[allow(dead_code)]
#[derive(Debug, Clone, Copy)]
struct Point {
    x: f64,
    y: f64,
}

// 사각형은 좌상단과 우하단의 값으로 구체화될 수 있습니다.
#[allow(dead_code)]
struct Rectangle {
    top_left: Point,
    bottom_right: Point,
}

fn origin() -> Point {
    Point { x: 0.0, y: 0.0 }
}

fn boxed_origin() -> Box<Point> {
    // 힙에 할당된 포인터를 가리킵니다.
    // 그리고 이에 대한 포인터를 반환합니다.
    Box::new(Point { x: 0.0, y: 0.0 })
}

fn main() {
    // 스택에 할당된 변수들입니다.
    // 이 때 모든 타입 지정은 불필요합니다.
    let point: Point = origin();
    let rectangle: Rectangle = Rectangle {
        top_left: origin(),
        bottom_right: Point { x: 3.0, y: -4.0 }
    };

    // 힙에 할당된 `rectangle`입니다.
    let boxed_rectangle: Box<Rectangle> = Box::new(Rectangle {
        top_left: origin(),
        bottom_right: Point { x: 3.0, y: -4.0 },
    });

    // 함수들의 결과도 박싱될 수 있습니다.
    let boxed_point: Box<Point> = Box::new(origin());

    // 이중으로 박싱합니다.
    let box_in_a_box: Box<Box<Point>> = Box::new(boxed_origin());

    println!("Point occupies {} bytes on the stack",
             mem::size_of_val(&point));
    println!("Rectangle occupies {} bytes on the stack",
             mem::size_of_val(&rectangle));

    // 박스의 크기 == 포인터 크기
    println!("Boxed point occupies {} bytes on the stack",
             mem::size_of_val(&boxed_point));
    println!("Boxed rectangle occupies {} bytes on the stack",
             mem::size_of_val(&boxed_rectangle));
    println!("Boxed box occupies {} bytes on the stack",
             mem::size_of_val(&box_in_a_box));

    // `boxed_point`에 포함된 데이터를 `unboxed_point`에 복사합니다.
    let unboxed_point: Point = *boxed_point;
    println!("Unboxed point occupies {} bytes on the stack",
             mem::size_of_val(&unboxed_point));
}
```
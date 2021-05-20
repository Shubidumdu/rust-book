# Structures

`struct` 키워드를 통해 만들 수 있는 세가지 타입의 스트럭처가 있습니다.

- 튜플, 기본적이고, 이름이 존재하는 튜플(named tuples)
- 클래식 C 스트럭처 
- 유닛 스트럭처, 필드가 없어 제네릭에 유용함

```rust,editable
#[derive(Debug)]
struct Person {
    name: String,
    age: u8,
}

// 유닛 스트럭처
struct Unit;

// 튜플 스트럭처
struct Pair(i32, f32);

// 두 개의 필드를 갖는 스트럭처 (클래식 C 스트럭처)
#[derive(Debug)]
struct Point {
    x: f32,
    y: f32,
}

// 스트럭처는 다른 스트럭처의 필드로 쓰일 수 있습니다.
#[derive(Debug)]
struct Rectangle {
// 사각형은 좌상단과 우하단의 좌표만 있으면 구성할 수 있습니다.
    top_left: Point,
    bottom_right: Point,
}

// 사각형의 넓이를 구하는 함수를 구현해봅시다.
fn rect_area(rect: Rectangle) -> f32 {
    let Rectangle { 
        top_left : Point {
            x: x1,
            y: y1,
        }, 
        bottom_right : Point {
            x: x2,
            y: y2,
        }
    } = rect;
    (x2 - x1).abs() * (y2 - y1).abs()
}

// 우측 하단의 점과 길이를 받아 
// Rectangle 스트럭처를 생성하는 함수
fn square(bottom_left: Point, length: f32) -> Rectangle {
    Rectangle {
        top_left : Point {
            x: bottom_left.x,
            y: bottom_left.y - length,
        },
        bottom_right : Point {
            x: bottom_left.x + length,
            y: bottom_left.y
        }
    }
}

fn main() {
    // 짧은 형태로 struct를 만들 수 있습니다.
    let name = String::from("Peter");
    let age = 27;
    let peter = Person { name, age };

    // 스트럭처에 대한 디버그 출력을 합니다.
    println!("{:?}", peter);


    // Point 기반의 인스턴스를 생성합니다.
    let point: Point = Point { x: 10.3, y: 0.4 };

    // 포인트 인스턴스의 각 필드는 `.field` 형태로 접근할 수 있습니다.
    println!("point coordinates: ({}, {})", point.x, point.y);

    // 기존 인스턴스의 필드값을 기반으로 새 인스턴스를 만들 수 있습니다.
    let bottom_right = Point { x: 5.2, ..point };

    // bottom_right.y는 point.y와 동일합니다.
    println!("second point: ({}, {})", bottom_right.x, bottom_right.y);

    // `let` 바인딩을 통해 포인트의 구조를 분해할 수 있습니다.
    let Point { x: top_edge, y: left_edge } = point;

    // struct를 기반으로 인스턴스를 만드는 것 역시 Expression 입니다.
    let _rectangle = Rectangle {
        top_left: Point { x: left_edge, y: top_edge },
        bottom_right: bottom_right,
    };

    // 사전에 구현했던 함수를 통해 사각형 넓이를 구합니다.
    println!("rectangle's area : {}", rect_area(_rectangle));

    // 사전에 구현했던 함수를 통해 새로운 사각형을 만듭니다.
    println!("new Rectangle with square(...) : {:?}", 
        square(Point { x : 3.0, y: 3.0}, 2.0));

    // 유닛 스트럭처의 인스턴스를 생성합니다.
    let _unit = Unit;

    // 튜플 스트럭처의 인스턴스를 생성합니다.
    let pair = Pair(1, 0.1);

    // 튜플 구조의 필드들에 접근합니다.
    println!("pair contains {:?} and {:?}", pair.0, pair.1);

    // 튜플 구조도 `let` 바인딩으로 분해될 수 있습니다.
    let Pair(integer, decimal) = pair;
    println!("pair contains {:?} and {:?}", integer, decimal);
}
```
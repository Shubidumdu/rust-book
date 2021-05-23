# Methods

메서드는 객체에 부착된 함수입니다. 메서드는 `self` 키워드를 통해 본인 객체의 데이터와 다른 메서드에 접근할 수 있습니다. 메서드는 `impl` 블럭 내에서 정의됩니다.

```rust,editable
struct Point {
    x: f64,
    y: f64,
}

// 모든 'Point'의 메서드는 이 `impl` 블럭에 작성됩니다.
impl Point {
    // 이는 정적(static) 메서드 입니다.
    // 정적 메서드는 인스턴스를 통해 호출될 필요가 없습니다.
    // 일반적으로 이들은 생성자로 사용됩니다.
    fn origin() -> Point {
        Point { x: 0.0, y: 0.0 }
    }

    // 두개의 인자를 갖는 다른 정적 메서드입니다.
    fn new(x: f64, y: f64) -> Point {
        Point { x: x, y: y }
    }
}

struct Rectangle {
    p1: Point,
    p2: Point,
}

impl Rectangle {
    // 이것은 인스턴스 메서드입니다.
    // `&self`는 `self: &Self`의 Syntactic sugar 입니다.
    // `Self`는 호출 객체의 타입이며, 여기서는 `Rectangle` 입니다.
    fn area(&self) -> f64 {
        // `self`에서 `.`을 통해 인스턴스의 필드에 접근할 수 있습니다.
        let Point { x: x1, y: y1 } = self.p1;
        let Point { x: x2, y: y2 } = self.p2;

        // `abs`는 호출자의 절대값을 반환하는 `f64` 메서드입니다.
        ((x1 - x2) * (y1 - y2)).abs()
    }

    fn perimeter(&self) -> f64 {
        let Point { x: x1, y: y1 } = self.p1;
        let Point { x: x2, y: y2 } = self.p2;

        2.0 * ((x1 - x2).abs() + (y1 - y2).abs())
    }

    // `&mut self` desugars to `self: &mut Self`
    // 아래 메서드는 mutable한 호출 객체를 요구합니다.
    // `&mut self`는 `self: &mut Self`의 Syntactic Sugar입니다.
    fn translate(&mut self, x: f64, y: f64) {
        self.p1.x += x;
        self.p2.x += x;

        self.p1.y += y;
        self.p2.y += y;
    }
}

// `Pair`는 정수가 할당된 두 개의 Heap을 보유합니다.
struct Pair(Box<i32>, Box<i32>);

impl Pair {
    // 아래 메서드는 호출 객체의 리소스를 "소비"합니다.
    // `self`는 `self: Self`의 Syntactic Sugar 입니다.
    fn destroy(self) {
        // `self`를 구조분해 합니다.
        let Pair(first, second) = self;

        println!("Destroying Pair({}, {})", first, second);
        // `first`와 `second`는 이제 사용할 수 없습니다.
    }
}

fn main() {
    let rectangle = Rectangle {
        // 정적 메서드들은 `::`을 통해 호출됩니다.
        p1: Point::origin(),
        p2: Point::new(3.0, 4.0),
    };

    // 인스턴스 메서드들은 `.`로 호출됩니다.
    // 첫번째 인자인 `&self`는 암시적으로 전달됩니다.
    // `rectangle.perimeter()` === `Rectangle::perimeter(&rectangle)`
    println!("Rectangle perimeter: {}", rectangle.perimeter());
    println!("Rectangle area: {}", rectangle.area());

    let mut square = Rectangle {
        p1: Point::origin(),
        p2: Point::new(1.0, 1.0),
    };

    // ERROR : `rectangle`은 immutable 객체입니다.
    // 하지만 앞서 구현한 `translate` 메서드는 mutable 객체를 요구합니다.
    // 때문에 아래 코드는 에러가 발생합니다.
    rectangle.translate(1.0, 0.0);

    // `square`의 경우엔 mutable 객체이기 때문에 문제가 없습니다.
    square.translate(1.0, 1.0);

    let pair = Pair(Box::new(1), Box::new(2));

    pair.destroy();

    // ERROR : 앞서 구현했듯, `destroy` 메서드는 리소스를 '소비'(consume)합니다.
    pair.destroy();
}
```
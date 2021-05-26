# Derive

컴파일러는 `#[derive]` 어트리뷰트를 통해 일부 트레이트에 대한 기본적인 구현을 제공할 수 있습니다. 이들 트레이트들은 더 복잡한 로직이 요구되는 경우에는 여전히 수동으로 구현될 수 있습니다.

아래는 `derive` 가능한 트레이트들의 목록입니다.

- 비교 트레이트들: `Eq`, `PartialEq`, `Ord`, `PartialOrd`
- `Clone`, `&T`로부터 복사를 통해 `T`를 만듭니다.
- `Copy`, 'move semantics' 대신에 'copy semantics' 타입을 지정합니다.
- `Hash`, `&T`로부터 해쉬를 계산합니다.
- `Default`, 데이터 타입의 비어있는 인스턴스를 생성합니다.
- `Debug`, `{:?}` 포맷에 사용할 값을 지정합니다.

```rust,editable
// `Centimeters`는 비교 가능한 튜플 구조입니다.
#[derive(PartialEq, PartialOrd)]
struct Centimeters(f64);

// `Inches`는 출력 가능한 튜플 구조입니다.
#[derive(Debug)]
struct Inches(i32);

impl Inches {
    fn to_centimeters(&self) -> Centimeters {
        let &Inches(inches) = self;

        Centimeters(inches as f64 * 2.54)
    }
}

// `Seconds`는 별 다른 추가 어트리뷰트가 없는 튜플 구조입니다.
struct Seconds(i32);

fn main() {
    let _one_second = Seconds(1);

    // ERROR : `Seconds`는 `Debug` 트레이트를 구현하지 않았기에 출력될 수 없습니다.
    println!("One second looks like: {:?}", _one_second);

    // ERROR : `Seconds`는 `PartialEq` 트레이트를 구현하지 않았기에 비교될 수 없습니다.
    let _this_is_true = (_one_second == _one_second);

    let foot = Inches(12);

    println!("One foot equals {:?}", foot);

    let meter = Centimeters(100.0);

    let cmp =
        if foot.to_centimeters() < meter {
            "smaller"
        } else {
            "bigger"
        };

    println!("One foot is {} than one meter.", cmp);
}
```
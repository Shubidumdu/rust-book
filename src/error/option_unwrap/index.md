# Option & unwrap

지난 예시에서, 프로그램의 실패를 일부러 유도할 수 있음을 살펴봤습니다. 특정 결과를 받았는데, 원하는 결과가 아닌 경우에는 `panic`을 통해 에러 핸들링을 할 수 있었습니다. 그렇다면, 애초에 결과 자체를 받지 못했다면 어떻게 처리해야 할까요? 

`std` 라이브러리의 `Option<T>`라고 불리는 `enum`은 값이 "없을 수도 있는" 경우에 사용됩니다. 이는 두 가지 옵션 중 하나로 나타납니다.

- `Some(T)` : `T` 타입의 요소가 발견됨
- `None` : 아무 요소도 발견되지 않음

이러한 케이스들은 `match`를 통해 명시적으로 핸들링되거나, `unwrap`을 통해 암시적으로 다루어질 수 있습니다. 암시적(implicit) 핸들링은 내부 요소 또는 `panic`을 반환하게 됩니다.

`expect`를 통해 수동으로 `panic`을 커스터마이징할 수도 있지만, `unwrap`은 명시적인 핸들링보다 덜 의미있는 결과를 얻을 수도 있다는 점을 주의하세요. 아래 예시에서, 명시적인 핸들링을 통해 보다 정제된 결과를 얻을 수 있으며, 원하는 경우 `panic` 옵션을 유지할 수도 있습니다.

```rust,editable
// 모든 `gift`들은 `match`를 통해 명시적으로 처리됩니다.
fn give_commoner(gift: Option<&str>) {
    // 각각의 경우에 대한 처리를 명시합니다.
    match gift {
        Some("snake") => println!("Yuck! I'm putting this snake back in the forest."),
        Some(inner)   => println!("{}? How nice.", inner),
        None          => println!("No gift? Oh well."),
    }
}

// 모든 `gift`들은 `unwrap`을 통해 암시적으로 다루어집니다.
fn give_royal(gift: Option<&str>) {
    // `unwrap`은 `None`값을 받게 되면 `panic`을 반환합니다.
    let inside = gift.unwrap();
    if inside == "snake" { panic!("AAAaaaaa!!!!"); }

    println!("I love {}s!!!!!", inside);
}

fn main() {
    let food  = Some("cabbage");
    let snake = Some("snake");
    let void  = None;

    give_commoner(food);
    give_commoner(snake);
    give_commoner(void);

    let bird = Some("robin");
    let nothing = None;

    give_royal(bird);
    give_royal(nothing);
}
```
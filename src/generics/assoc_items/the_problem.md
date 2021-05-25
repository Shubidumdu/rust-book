# The Problem

컨테이너 타입보다는 제네릭에 해당하는 트레이트는 구체적인 타입 요구사항이 존재합니다. 트레이트의 사용자는 반드시 모든 제네릭 타입을 명시해주어야 합니다.

아래 예시에서, `Contains` 트레이트는 제네릭 타입 `A`와 `B`의 사용을 허가합니다. 이후 해당 트레이트는 `fn difference()`를 통해 `Container` 타입에 대해 구현하고, `A`와 `B`에 대해 `i32` 타입을 명시합니다.

`Contains`는 제네릭이기 때문에, 여기서 우리는 `fn difference()`로 모든 제네릭 타입에 대해 명시적으로 정의해주어야 합니다. 실제로, `A`와 `B`는 입력 `C`에 의해 결정되는 방식을 원합니다. 아래 예시에서 볼 수 있듯, *연관 항목(Associated types)*이 정확히 그 기능을 제공해줍니다.

```rust
struct Container(i32, i32);

// 컨테이너 내부에 두 항목이 존재하는지 체크하는 트레이트 입니다.
// 또한 첫번째 혹은 마지막 값을 검색합니다.
trait Contains<A, B> {
    fn contains(&self, _: &A, _: &B) -> bool; // 명시적으로 `A`와 `B`를 요구합니다.
    fn first(&self) -> i32; // 명시적으로 `A`와 `B`를 요구하지 않습니다.
    fn last(&self) -> i32;  // 명시적으로 `A`와 `B`를 요구하지 않습니다.
}

impl Contains<i32, i32> for Container {
    // 저장된 수가 동일하다면 `true`를 반환합니다.
    fn contains(&self, number_1: &i32, number_2: &i32) -> bool {
        (&self.0 == number_1) && (&self.1 == number_2)
    }

    // 첫번째 수를 가져옵니다.
    fn first(&self) -> i32 { self.0 }

    // 마지막 수를 가져옵니다.
    fn last(&self) -> i32 { self.1 }
}

// `C`는 이미 `A`와 `B`를 갖습니다.
// 그런 점에서, `A`와 `B`를 일일이 다시 표현할 필요는 없습니다.
fn difference<A, B, C>(container: &C) -> i32 where
    C: Contains<A, B> {
    container.last() - container.first()
}

fn main() {
    let number_1 = 3;
    let number_2 = 10;

    let container = Container(number_1, number_2);

    println!("Does container contain {} and {}: {}",
        &number_1, &number_2,
        container.contains(&number_1, &number_2));
    println!("First number: {}", container.first());
    println!("Last number: {}", container.last());

    println!("The difference is: {}", difference(&container));
}
```
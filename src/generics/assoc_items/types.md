# Associated types

*관련 항목(Associated types)*의 사용은 내부의 타입들을 로컬에서 트레이트로 출력타입으로 옮겨 코드의 전반적인 가독성을 향상시킵니다.

`trait` 정의에 대한 내용을 살펴봅시다.

```rust
#![allow(unused)]
fn main() {
// `A`와 `B`는 `type` 키워드로 트레이트 내에 정의됩니다.
// (주의 : 해당 컨텍스트 내에서의 `type`은 타입 별칭에서의 `type`과 다릅니다.)
  trait Contains {
      type A;
      type B;

      // 제네릭으로 새로운 타입들에 대한 참조를 업데이트했습니다.
      fn contains(&self, &Self::A, &Self::B) -> bool;
  }
}
```

- 다음 함수에서 `Contains` 트레이트의 사용이 더 이상 `A`와 `B`에 대한 표현을 요구하지 않는다는 점을 확인하세요.

```rust
// 관련 타입(associated types)을 사용하지 않는 경우
fn difference<A, B, C>(container: &C) -> i32 where
    C: Contains<A, B> { ... }

// 관련 타입(associated types)를 사용하는 경우
fn difference<C: Contains>(container: &C) -> i32 { ... }
```

자, 이제 이전 섹션에서의 구현을 관련 타입을 통해서 다시 작성해봅시다.

```rust
struct Container(i32, i32);

// 컨테이너 내부에 두 항목이 존재하는지 체크하는 트레이트 입니다.
// 또한 첫번째 혹은 마지막 값을 검색합니다.
trait Contains {
    // 활용할 수 있는 제네릭 타입들에 대해 정의합니다.
    type A;
    type B;

    fn contains(&self, _: &Self::A, _: &Self::B) -> bool;
    fn first(&self) -> i32;
    fn last(&self) -> i32;
}

impl Contains for Container {
    // 여기에서 `A`와 `B`의 타입에 대해 명시합니다.
    // 만약, `Container(i32, i32)`가 입력 타입이 된다면,
    // 결과 타입은 따라서 결정됩니다.
    type A = i32;
    type B = i32;

    // `&Self::A` and `&Self::B` are also valid here.
    fn contains(&self, number_1: &i32, number_2: &i32) -> bool {
        (&self.0 == number_1) && (&self.1 == number_2)
    }
    // Grab the first number.
    fn first(&self) -> i32 { self.0 }

    // Grab the last number.
    fn last(&self) -> i32 { self.1 }
}

fn difference<C: Contains>(container: &C) -> i32 {
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
# Combinators: map

`match`는 `Option`들을 핸들링 하는데 유효한 메서드입니다. 그러나, 이는 오직 입력만으로 충분한 작업에서는 과한 작업으로 느껴질 수 있습니다. 이러한 경우에, *combinator*를 사용하여 제어 흐름을 모듈 방식으로 관리할 수 있습니다.

`Option`은 `map()`이라고 하는 내장 메서드를 갖고 있습니다. 이는 `Some -> Some`, 그리고 `None -> None`의 간단한 매핑을 해주는 컴비네이터(combinator)입니다. 여러번의 `map()`은 유연함을 위해 서로 체이닝 될 수 있습니다.

다음 예시에서, `process()`는 간단한 형태를 유지한 채로 이전의 모든 함수들을 대신하고 있습니다.

```rust
#![allow(dead_code)]

#[derive(Debug)] enum Food { Apple, Carrot, Potato }

#[derive(Debug)] struct Peeled(Food);
#[derive(Debug)] struct Chopped(Food);
#[derive(Debug)] struct Cooked(Food);

// 아무 값도 없다면, `None`을 반환하고,
// 그렇지 않다면, `Peeled(food)`를 반환합니다.
fn peel(food: Option<Food>) -> Option<Peeled> {
    match food {
        Some(food) => Some(Peeled(food)),
        None       => None,
    }
}

// 아무 값도 없다면, `None`을 반환하고,
// 그렇지 않다면, `Chopped(food)`를 반환합니다.
fn chop(peeled: Option<Peeled>) -> Option<Chopped> {
    match peeled {
        Some(Peeled(food)) => Some(Chopped(food)),
        None               => None,
    }
}

// 여기서, 우리는 `match` 대신에 `map()`을 사용할 것입니다.
fn cook(chopped: Option<Chopped>) -> Option<Cooked> {
    chopped.map(|Chopped(food)| Cooked(food))
}

// `peel`, `chop`, `cook` 함수를 일련적으로 호출합니다.
// `map()`을 체이닝을 통해 여러번 호출함으로써 코드를 간략화했습니다.
fn process(food: Option<Food>) -> Option<Cooked> {
    food.map(|f| Peeled(f))
        .map(|Peeled(f)| Chopped(f))
        .map(|Chopped(f)| Cooked(f))
}

fn eat(food: Option<Cooked>) {
    match food {
        Some(food) => println!("Mmm. I love {:?}", food),
        None       => println!("Oh no! It wasn't edible."),
    }
}

fn main() {
    let apple = Some(Food::Apple);
    let carrot = Some(Food::Carrot);
    let potato = None;

    let cooked_apple = cook(chop(peel(apple)));
    let cooked_carrot = cook(chop(peel(carrot)));

    // `process`는 위의 `cook(chop(peel(...)))`을 완전히 대체합니다.
    // 너무 간결하네요! :)
    let cooked_potato = process(potato);

    eat(cooked_apple);
    eat(cooked_carrot);
    eat(cooked_potato);
}
```
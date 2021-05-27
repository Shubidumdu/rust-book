# Combinators: and_then

`map()`는 `match`문을 간결하게 하기 위해 체이닝을 활용할 수 있었습니다. 그러나 `Option<T>`를 반환하는 함수에 `map()`을 사용하면 이는 중첩된 `Option<Option<T>>`를 갖게됩니다. 여러번의 체이닝 호출은 혼란스러울 수 있습니다. 이런 경우에 또 다른 컴비네이터(`combinator`)인 `and_then()`를 사용할 수 있습니다. 이는 다른 언어에서는 *flatmap*이라고 불리기도 합니다.

`and_then()`은 함수 입력을 래핑된 값으로 호출하고 결과를 반환합니다. 만약 `Option`이 `None`이라면, 대신에 `None`을 반환합니다.

아래 예시에서, `cookable_v2()`는 `Option<Food>`를 반환합니다. `and_then()` 대신에 `map()`를 사용하게 되면, 반환값이 `Option<Option<Food>>`가 될 것이며, 이 경우 `eat()`에 부적합한 타입이 됩니다.

```rust,editable
#![allow(dead_code)]

#[derive(Debug)] enum Food { CordonBleu, Steak, Sushi }
#[derive(Debug)] enum Day { Monday, Tuesday, Wednesday }

// Sushi를 만들기위한 재료는 없습니다.
fn have_ingredients(food: Food) -> Option<Food> {
    match food {
        Food::Sushi => None,
        _           => Some(food),
    }
}

// Cordon Bleu를 제외한 모든 레시피가 있습니다.
fn have_recipe(food: Food) -> Option<Food> {
    match food {
        Food::CordonBleu => None,
        _                => Some(food),
    }
}

// 요리를 만드려면, 레시피와 재료가 모두 필요합니다.
// 해당 로직을 `match` 체인으로 나타낼 수 있습니다.
fn cookable_v1(food: Food) -> Option<Food> {
    match have_recipe(food) {
        None       => None,
        Some(food) => match have_ingredients(food) {
            None       => None,
            Some(food) => Some(food),
        },
    }
}

// 이는 `and_then()`을 통해서 더 간결하게 작성될 수 있습니다.
fn cookable_v2(food: Food) -> Option<Food> {
    have_recipe(food).and_then(have_ingredients)
}

fn eat(food: Food, day: Day) {
    match cookable_v2(food) {
        Some(food) => println!("Yay! On {:?} we get to eat {:?}.", day, food),
        None       => println!("Oh no. We don't get to eat on {:?}?", day),
    }
}

fn main() {
    let (cordon_bleu, steak, sushi) = (Food::CordonBleu, Food::Steak, Food::Sushi);

    eat(cordon_bleu, Day::Monday);
    eat(steak, Day::Tuesday);
    eat(sushi, Day::Wednesday);
}
```

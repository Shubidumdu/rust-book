# Diverging functions

Diverging funciton(발산 함수)는 값을 *절대* 반환하지 않는 함수입니다. 이는 `!`를 통해 표시되며, 이는 *비어있음*을 의미하는 타입입니다.

```rust
#![allow(unused)]
fn main() {
  fn foo() -> ! {
      panic!("This call never returns.");
  }
}
```

다른 모든 타입들과는 다르게, 해당 함수는 인스턴스화될 수 없습니다. 해당 타입이 가질 수 있는 모든 가능한 값의 집합은 비어있기 때문입니다. 유닛 `()` 타입과는 다르다는 점을 기억하세요. `()`는 실제로는 가능한 값이 하나 존재함을 의미합니다.

예를 들어, 아래 함수는 별 다른 정보를 담고 있지 않지만, 일반적인 형태로 값을 반환합니다.

```rust
fn some_fn() {
    ()
}

fn main() {
    let a: () = some_fn();
    println!("This function returns and you can see this line.")
}
```
반면, 아래 함수는 호출 시에 말 그대로 아무 값도 반환하지 않습니다.

```rust
#![feature(never_type)]

fn main() {
    let x: ! = panic!("This call never returns.");
    println!("You will never see this line!");
}
```

제법 추상적인 개념으로 보이긴 하지만, 이는 사실 굉장히 유용합니다. 해당 타입을 이용하는 경우의 주된 장점은, 정확한 타입이 요구되는 모든 부분에서 활용될 수 있다는 것입니다. 이를테면, match 분기에 대한 예를 들어볼 수 있습니다.

```rust
fn main() {
    fn sum_odd_numbers(up_to: u32) -> u32 {
        let mut acc = 0;
        for i in 0..up_to {
            // `addtion` 변수의 타입에 의해서,
            // match 문에서 반환되는 타입은 반드시 u32이어야 합니다.
            let addition: u32 = match i%2 == 1 {
                // `i` 변수는 `u32` 타입이기 때문에, 문제 없습니다.
                true => i,

                // 반면 `continue` 문은 `u32`를 반환하지 않습니다.
                // 하지만 문제 없습니다. 
                // 애초에 아무 것도 반환하지 않기 때문에,
                // match 문에서의 타입 조건을 해치지 않습니다.
                false => continue,
            };
            acc += addition;
        }
        acc
    }
    println!("Sum of odd numbers up to 9 (excluding): {}", sum_odd_numbers(9));
}
```

이러한 형태의 함수는 네트워크 서버와 같이 끊임없이 루프가 동작해야 하는 경우(`loop {}`)나, 프로세스를 종료하는 경우(`exit()`)에서 살펴볼 수 있습니다.
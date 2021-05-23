# Functions

함수는 `fn` 키워드로 선언될 수 있습니다. 이들의 인자(arguments)는 변수와 마찬가지로 타입을 지정해야하며, 함수가 값을 반환한다면, `->` 화살표를 통해 반환 값의 타입도 지정되어야 합니다. 

함수 내에서의 마지막 Expression은 반환값으로 사용됩니다. 또는, `return` 값을 통해 원하는 시점에서 값을 반환할 수 있습니다. 이는 루프나 `if` 문 내에서 활용할 수 있습니다.

함수를 이용한 FizzBuzz를 구현해봅시다!

```rust,editable
// C/C++과 다르게, 함수 정의의 순서에는 제약이 없습니다.
fn main() {
    // 여기에서 `fizzbuzz_to`를 호출하되,
    // 구현은 아래에서 할 것입니다.
    fizzbuzz_to(100);
}

// 이 함수는 boolean값을 반환합니다.
fn is_divisible_by(lhs: u32, rhs: u32) -> bool {
    // 코너 케이스(corner case)에 대해 값을 반환시킵니다.
    if rhs == 0 {
        return false;
    }

    // 아래는 Expression은 반환값으로 쓰입니다.
    // 여기서는 `return` 키워드가 필수적이지 않습니다.
    lhs % rhs == 0
}

// 함수가 값을 반환하지 않는 경우, 유닛 타입 `()`이 반환됩니다.
fn fizzbuzz(n: u32) -> () {
    if is_divisible_by(n, 15) {
        println!("fizzbuzz");
    } else if is_divisible_by(n, 3) {
        println!("fizz");
    } else if is_divisible_by(n, 5) {
        println!("buzz");
    } else {
        println!("{}", n);
    }
}

// 함수가 `()`를 반환하는 경우는 반환 타입 정의를 생략할 수 있습니다.
fn fizzbuzz_to(n: u32) {
    for n in 1..n + 1 {
        fizzbuzz(n);
    }
}
```
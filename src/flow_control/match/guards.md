# Guards

가능한 경우에 대해 필터링을 하기 위해, Match Guard를 추가할 수도 있습니다.

```rust,editable
fn main() {
    let pair = (2, -2);

    println!("Tell me about {:?}", pair);
    match pair {
        (x, y) if x == y => println!("These are twins"),
        // 위의 `if 조건`이 match guard에 해당합니다.
        (x, y) if x + y == 0 => println!("Antimatter, kaboom!"),
        (x, _) if x % 2 == 1 => println!("The first one is odd"),
        _ => println!("No correlation..."),
    }
}
```

컴파일러는 모든 조건이 처리되는지에 대해서는 체크하지 않습니다. 따라서, 이를 활용할 때 마지막에 `_` 패턴을 통해 예외에 대한 처리를 해주어야 합니다.

```rust,editable
fn main() {
    let number: u8 = 4;

    match number {
        i if i == 0 => println!("Zero"),
        i if i > 0 => println!("Greater than zero"),
        // 아래 조건은 도달할 일이 없지만,
        // 컴파일러 입장에서 요구됩니다.
        _ => println!("Fell through"),
    }
}
```
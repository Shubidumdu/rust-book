# Expressions

Rust로 작성한 프로그램은 대부분 Statement의 모음으로 구성됩니다.

```rust
  fn main() {
    // statement
    // statement
    // statement
}
```

Rust에는 몇몇 종류의 statement가 존재합니다. 그중 가장 일반적인 두가지는 '변수 바인딩'과 `;`을 사용하는 expression입니다.

```rust
fn main() {
    // variable binding
    let x = 5;

    // expression;
    x;
    x + 1;
    15;
}
```

블록(`{}`)도 마찬가지로 Expression 입니다. 따라서 블록 역시 할당에 사용될 수 있습니다. 이 경우, 블록 내의 마지막 Expression이 할당 값이 됩니다. 하지만, 마지막 Expression이 세미콜론(`;`)과 함께 작성되는 경우에는 아무 값도 반환되지 않고, 유닛 타입 `()`이 됩니다.

```rust,editable
fn main() {
    let x = 5u32;

    let y = {
        let x_squared = x * x;
        let x_cube = x_squared * x;

        // 아래 expression이 y에 할당됩니다.
        x_cube + x_squared + x
    };

    let z = {
        // 세미콜론이 아래 식을 억제합니다.
        // `z`는 `()`이 됩니다.
        2 * x;
    };

    println!("x is {:?}", x);
    println!("y is {:?}", y);
    println!("z is {:?}", z);
}
```
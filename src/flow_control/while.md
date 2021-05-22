# while

`while` 키워드는 주어진 조건이 `true`인 경우에 루프를 실행합니다.

*FizzBuzz* 문제를 `while`을 통해서 해결해보자.

```rust,editable
fn main() {
    let mut n = 1;

    // n이 101 미만인 동안만 루프가 실행됩니다.
    while n < 101 {
        if n % 15 == 0 {
            println!("fizzbuzz");
        } else if n % 3 == 0 {
            println!("fizz");
        } else if n % 5 == 0 {
            println!("buzz");
        } else {
            println!("{}", n);
        }

        // n을 1씩 더합니다.
        n += 1;
    }
}
```
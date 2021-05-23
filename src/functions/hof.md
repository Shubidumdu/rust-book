# Higher Order Functions

Rust는 고차 함수(HOF)를 제공합니다. 이는 하나 이상의 함수를 가져와 더 유용한 함수를 생성해내기 위한 함수입니다. 고차함수와 lazy iterator는 Rust에 함수형 프로그래밍의 맛을 부여합니다.

```rust,editable
fn is_odd(n: u32) -> bool {
    n % 2 == 1
}

fn main() {
    println!("Find the sum of all the squared odd numbers under 1000");
    let upper = 1000;

    // 명령형 프로그래밍으로 접근
    // `acc` 변수를 정의합니다.
    let mut acc = 0;
    // 0, 1, 2, ... infinity
    for n in 0.. {
        // 수의 제곱
        let n_squared = n * n;

        if n_squared >= upper {
            // 상한을 넘기게 되면 루프를 멈춥니다.
            break;
        } else if is_odd(n_squared) {
            // 홀수라면 값을 더합니다.
            acc += n_squared;
        }
    }
    println!("imperative style: {}", acc);

    // 함수형 프로그래밍으로 접근
    let sum_of_squared_odd_numbers: u32 =
        (0..).map(|n| n * n) // 모든 자연수에 제곱을 적용합니다.
             .take_while(|&n_squared| n_squared < upper) // 상한을 지정합니다.
             .filter(|&n_squared| is_odd(n_squared))     // 홀수 여부를 판단합니다.
             .fold(0, |acc, n_squared| acc + n_squared); // 이들을 더합니다.
    println!("functional style: {}", sum_of_squared_odd_numbers);
}
```

Option과 Iterator는 HOF를 굉장히 많이 사용하게 됩니다.
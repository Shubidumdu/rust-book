# Program arguments

## Standard Library

커맨드라인 인수는 `std::env::args`를 통해 접근할 수 있습니다. 이는 각 인수에 대한 `String`을 반환하는 반복자(iterator)를 반환합니다.

```rust,editable
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    // 첫번째 인수는 프로그래믈 실행하기 위한 경로입니다.
    println!("My path is {}.", args[0]);

    // 나머지 인수들은 커맨드라인 매개변수입니다.
    // 프로그램을 다음과 같이 호출합니다.
    //   $ ./args arg1 arg2
    println!("I got {:?} arguments: {:?}.", args.len() - 1, &args[1..]);
}
```
```
$ ./args 1 2 3
My path is ./args.
I got 3 arguments: ["1", "2", "3"].
```

## Crates

또는, CLI 애플리케이션을 만들기 위한 수많은 크레이트들이 존재합니다. [Rust Cookbook](https://rust-lang-nursery.github.io/rust-cookbook/cli/arguments.html)는 `clap`이라는 가장 인기 있는 커맨드라인 인수 크레이트 중 하나를 사용하는 모범 사례를 보여줍니다.
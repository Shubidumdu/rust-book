# Wait

`process::Child`가 완료될 때까지 기다리고자 한다면, `Child::wait`를 호출해야합니다. 이는 `process::ExitStatus`를 반환합니다.

```rust,editable
use std::process::Command;

fn main() {
    let mut child = Command::new("sleep").arg("5").spawn().unwrap();
    let _result = child.wait().unwrap();

    println!("reached end of main");
}
```
```
$ rustc wait.rs && ./wait
# `wait` keeps running for 5 seconds until the `sleep 5` command finishes
reached end of main
```
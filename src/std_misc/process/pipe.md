# Pipes

`std::Child` 구조는 작동 중인 자식 프로세스를 나타내며, 파이프(pipe)를 통한 기본 프로세스와의 상호작용을 위해 `stdin`, `stdout`, 그리고 `stderr`을 다룹니다.

```rust
use std::io::prelude::*;
use std::process::{Command, Stdio};

static PANGRAM: &'static str =
"the quick brown fox jumped over the lazy dog\n";

fn main() {
    // `wc` 커맨드를 생성합니다.
    let process = match Command::new("wc")
                                .stdin(Stdio::piped())
                                .stdout(Stdio::piped())
                                .spawn() {
        Err(why) => panic!("couldn't spawn wc: {}", why),
        Ok(process) => process,
    };

    // `wc`의 `stdin`에 대한 문자열을 작성합니다.
    //
    // `stdin`은 `Option<ChildStdin>` 타입을 갖습니다.
    // 하지만, 여기서 `stdin`은 항상 존재하기 때문에,
    // 곧바로 이를 `unwrap` 할 수 있습니다.
    match process.stdin.unwrap().write_all(PANGRAM.as_bytes()) {
        Err(why) => panic!("couldn't write to wc stdin: {}", why),
        Ok(_) => println!("sent pangram to wc"),
    }

    // `stdin`은 위와 같은 호출 이후 `drop`되어 사라지므로, 파이프도 종료됩니다.
    // 이는 상당히 중요한데, 그렇지 않으면 
    // `wc`가 방금 전달하지 않을 것이기 때문입니다.

    // `stdout` 필드는 `Option<ChildStdout>`타입을 가지며, 따라서 반드시 `unwrap`될 수 있습니다.
    let mut s = String::new();
    match process.stdout.unwrap().read_to_string(&mut s) {
        Err(why) => panic!("couldn't read wc stdout: {}", why),
        Ok(_) => print!("wc responded with:\n{}", s),
    }
}
```
# Child processes

`process::Output` 구조는 완료된 자식 프로세스의 출력을 나타냅니다. 

`process::Command` 구조는 프로세스 작성기입니다.

```rust,editable
use std::process::Command;

fn main() {
    let output = Command::new("rustc")
        .arg("--version")
        .output().unwrap_or_else(|e| {
            panic!("failed to execute process: {}", e)
    });

    if output.status.success() {
        let s = String::from_utf8_lossy(&output.stdout);

        print!("rustc succeeded and stdout was:\n{}", s);
    } else {
        let s = String::from_utf8_lossy(&output.stderr);

        print!("rustc failed and stderr was:\n{}", s);
    }
}
```

(잘못된 플래그가 `rustc`에 전달된 상태로 위의 예시를 시도해보세요.)
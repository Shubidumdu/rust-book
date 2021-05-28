# read_lines

`lines()` 메서드는 한 파일의 각 줄에 대한 반복자(iterator)를 반환합니다.

`File::open` 은 `AsRef<Path>` 제네릭을 요구합니다. `AsRef<Path>`는 `read_lines()`가 입력으로 요구하는 타입입니다.

```rust,editable
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn main() {
    // 파일 호스트는 출력을 생성하기 전에 반드시 현재 경로에 존재해야 합니다.
    if let Ok(lines) = read_lines("./hosts") {
        // 반복자들을 소모하여, (선택적인) 문자열을 반환합니다.
        for line in lines {
            if let Ok(ip) = line {
                println!("{}", ip);
            }
        }
    }
}

// 출력은 Error에 대한 매칭을 허용하기 위해 Result로 포장됩니다.
// 파일의 각 줄에 대한 리더(Reader)에 반복기를 반환합니다.
fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
```

프로그램의 실행은 아래와 같이 각 줄을 출력할 것입니다.

```
$ echo -e "127.0.0.1\n192.168.0.1\n" > hosts
$ rustc read_lines.rs && ./read_lines
127.0.0.1
192.168.0.1
```

이와 같은 작업은 대용량 파일을 사용하는 경우, 직접 메모리에 `String`을 생성하는 것보다 특히 효율적입니다.
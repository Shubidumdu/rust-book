# create

`create` 정적 메서드는 파일을 "쓰기 전용" 모드로 엽니다. 만약 파일이 이미 존재한다면, 기존 파일은 파괴되고 새로운 파일이 생성됩니다.

```rust,editable
static LOREM_IPSUM: &str =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
";

use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

fn main() {
    let path = Path::new("lorem_ipsum.txt");
    let display = path.display();

    // 쓰기 전용 모드로 파일을 엽니다.
    // `io::Result<File>`를 반환합니다.
    let mut file = match File::create(&path) {
        Err(why) => panic!("couldn't create {}: {}", display, why),
        Ok(file) => file,
    };

    // `LOREM_IPSUM` 문자열을 `file`로 작성합니다.
    // `io::Result<()>`를 반환합니다.
    match file.write_all(LOREM_IPSUM.as_bytes()) {
        Err(why) => panic!("couldn't write to {}: {}", display, why),
        Ok(_) => println!("successfully wrote to {}", display),
    }
}
```

이에 대한 출력은 다음과 같습니다.

```rust
$ rustc create.rs && ./create
successfully wrote to lorem_ipsum.txt
$ cat lorem_ipsum.txt
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

파일을 여는 방법에 대한 설정을 하기 위해 [`OpenOptions`](https://doc.rust-lang.org/std/fs/struct.OpenOptions.html) 옵션도 존재합니다.
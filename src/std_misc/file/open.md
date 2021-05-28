# open

`open` 정적 메서드는 파일을 '읽기 전용' 모드로 열 수 있게 만듭니다.

`File`은 리소스와, 파일 설명자(file descriptor)를 소유하며, 이들이 `drop`될 때 파일을 닫습니다.

```rust,editable
use std::fs::File;
use std::io::prelude::*;
use std::path::Path;

fn main() {
    // 원하는 파일의 경로를 생성합니다.
    let path = Path::new("hello.txt");
    let display = path.display();

    // 경로의 파일을 읽기 전용 모드로 엽니다.
    // 이는 `io::Result<File>`를 반환합니다.
    let mut file = match File::open(&path) {
        Err(why) => panic!("couldn't open {}: {}", display, why),
        Ok(file) => file,
    };

    // 파일 컨텐츠를 문자열로 읽습니다.
    // `io::Result<usize>`를 반환합니다.
    let mut s = String::new();
    match file.read_to_string(&mut s) {
        Err(why) => panic!("couldn't read {}: {}", display, why),
        Ok(_) => print!("{} contains:\n{}", display, s),
    }

    // `file`가 스코프를 벗어나면, `hello.txt` 파일도 닫습니다.
}
```

출력은 아래와 같습니다.

```
$ echo "Hello World!" > hello.txt
$ rustc open.rs && ./open
hello.txt contains:
Hello World!
```
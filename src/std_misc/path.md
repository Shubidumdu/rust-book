# Path

`Path` 구조는 기본 파일 시스템에 대한 파일 경로를 나타냅니다. `Path`에는 두 가지 형태가 있는데, UNIX-like 시스템에 쓰이는 `posix::Path`와 Windows 기반에 쓰이는 `windows::Path`입니다. 앞쪽의 접두사가 플랫폼 별로 적절한 `Path` 변형을 제공합니다.

`Path`는 `OsStr`로부터 생성될 수 있습니다. 이는 파일/디렉토리 경로가 가리키는 곳으로부터 정보를 얻기 위한 몇가지 메서드를 제공합니다.

`Path`는 내부적으로는 UTF-8 문자열로 구성되어있지 *않음*을 명시하세요. 대신 이는 바이트 벡터(`Vec<u8>`)에 이를 저장합니다. 그러므로, `Path`에서 `&str`로의 변환은 자유롭지 않으며, 실패할 가능 성이 있습니다. (`Option`이 반환됩니다.)

```rust,editable
use std::path::Path;

fn main() {
    // `&'static str`로부터 `Path`를 생성합니다.
    let path = Path::new(".");

    // `display` 메서드는 "보여질수 있는" 구조를 반환합니다.
    let _display = path.display();

    // `join`은 OS별 구분자를 통해
    // 바이트 벡터를 하나의 경로로 합쳐냅니다. 
    let new_path = path.join("a").join("b");

    // 경로를 문자열 Slice로 변환합니다.
    match new_path.to_str() {
        None => panic!("new path is not a valid UTF-8 sequence"),
        Some(s) => println!("new path is {}", s),
    }
}
```
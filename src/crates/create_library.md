# Creating a Library

크레이트를 통해 라이브러리를 만들어봅시다. 그리고 나서 해당 크레이트가 어떻게 다른 크레이트와 연결되는지 확인해봅시다.

```rust
pub fn public_function() {
    println!("called rary's `public_function()`");
}

fn private_function() {
    println!("called rary's `private_function()`");
}

pub fn indirect_access() {
    print!("called rary's `indirect_access()`, that\n> ");

    private_function();
}
```

```bash
$ rustc --crate-type=lib rary.rs
$ ls lib*
library.rlib
```

라이브러리에는 `lib` 접두사가 붙습니다. 라이브러리 파일은 기본적으로 그들 크레이트 파일의 이름을 따서 이름 지어집니다. 이러한 기본 파일명은 `rustc`의 `--crate-name` 옵션 혹은 `crate_name` 어트리뷰트를 사용하여 오버라이딩될 수 있습니다.
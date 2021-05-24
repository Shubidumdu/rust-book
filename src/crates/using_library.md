# Using a Library

`rustc`의 `--extern` 플래그를 사용하면 크레이트를 새로운 라이브러리와 연결할 수 있습니다. 이 경우, 라이브러리와 동일한 이름의 모듈을 모두 가져오게 됩니다. 이 모듈은 일반적으로 다른 모듈과 동일한 방식으로 동작합니다.

이전 섹션에서 생성했던 라이브러리를 다시 살펴봅시다.

```rust
// rary.rs
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

아래는 위의 라이브러리를 사용하고자 하는 크레이트 파일입니다.

```rust
// executable.rs
// 아래 명령어는 Rust의 2015 이전 버전에서 요구됩니다.
// extern crate rary;

fn main() {
    rary::public_function();

    // 라이브러리 내 private 함수의 경우 여전히 private하게 취급됩니다.
    // rary::private_function();

    rary::indirect_access();
}
```

```bash
# library.rlib이 컴파일된 라이브러리의 경로입니다. 여기선 동일한 디렉토리 내에 위치한다고 가정하겠습니다.
$ rustc executable.rs --extern rary=library.rlib --edition=2018 && ./executable 
called rary's `public_function()`
called rary's `indirect_access()`, that
> called rary's `private_function()`
```
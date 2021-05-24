# Crates

`crate_type` 어트리뷰트는 컴파일러에게 크레이트가 바이너리인지 라이브러리인지(더불어 어떤 타입의 라이브러리인지) 전달해주는 역할을 합니다. `crate_name` 어트리뷰트는 크레이트의 이름을 설정하기 위해 사용될 수 있습니다.

그러나, `crate_type`과 `crate_name`은 Cargo를 사용하는 경우엔 아무런 영향을 미치지 않는다는 점을 기억하세요. Cargo는 대부분의 Rust 프로젝트에서 사용되기 때문에, `crate_type` 과 `crate_name`의 실제 사용이 상대적으로 제한적이라는 것을 의미합니다.

```rust
// 이 크레이트는 library입니다.
#![crate_type = "lib"]
// 라이브러리의 이름은 "rary"입니다.
#![crate_name = "rary"]

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

`crate_type` 어트리뷰트가 사용된다면, 더 이상 `rustc`에 `--crate-type` 플래그를 전달할 필요가 없습니다.

```
$ rustc lib.rs
$ ls lib*
library.rlib
```
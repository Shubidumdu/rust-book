# File hierarchy

모듈은 파일 혹은 디렉토리 구조에 매핑될 수 있습니다. 다음과 같은 파일 구조가 있다고 가정해봅시다.

```bash
$ tree .
.
|-- my
|   |-- inaccessible.rs
|   |-- mod.rs
|   `-- nested.rs
`-- split.rs
```

`split.rs`는 다음과 같습니다.

```rust
// 아래 선언은 `my.rs` 또는 `my/mod.rs` 파일을 탐색합니다.
// 탐색한 이후, 현재 스코프의 `my`라는 이름의 모듈에 해당 파일의 내용을 삽입합니다.
mod my;

fn function() {
    println!("called `function()`");
}

fn main() {
    my::function();

    function();

    my::indirect_access();

    my::nested::function();
}
```

`my/mod.rs`는 다음과 같습니다.

```rust
// `mod inaccessible`과 `mod nested`도 각자
// `nested.rs`와 `inaccessible.rs` 파일은 찾아
// 현재 스코프의 모듈에 해당 파일의 내용을 삽입합니다.
mod inaccessible;
pub mod nested;

pub fn function() {
    println!("called `my::function()`");
}

fn private_function() {
    println!("called `my::private_function()`");
}

pub fn indirect_access() {
    print!("called `my::indirect_access()`, that\n> ");

    private_function();
}
```

`my/nested.rs`는 다음과 같습니다.

```rust
pub fn function() {
    println!("called `my::nested::function()`");
}

#[allow(dead_code)]
fn private_function() {
    println!("called `my::nested::private_function()`");
}
```

`my/inaccessible.rs`는 다음과 같습니다.

```rust
#[allow(dead_code)]
pub fn public_function() {
    println!("called `my::inaccessible::public_function()`");
}
```

이제 `split.rs`를 컴파일함으로써 여기저기 흩어진 모듈들이 정상적으로 동작하는지 확인해봅시다.

```rust
$ rustc split.rs && ./split
called `my::function()`
called `function()`
called `my::indirect_access()`, that
> called `my::private_function()`
called `my::nested::function()`
```
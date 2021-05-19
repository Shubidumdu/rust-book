# Hello, World!

```rust,editable
// `//` 혹은 `/* ... */`을 통해 주석을 작성할 수 있습니다.

/*
  이는 컴파일링 단계에서 무시됩니다.
*/

fn main() {
  println!("Hello World!");
}
```

Rust는 다음 명령을 통해 파일을 바이너리로 컴파일링합니다.

```bash
$ rustc <path>
```

컴파일 이후, 컴파일된 파일(확장자가 없음)을 실행하여 프로그램을 확인할 수 있습니다.

```bash
$ ./hello
Hello World!
```

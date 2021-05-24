# Tests

테스트는 모든 소프트웨어에 필수적입니다. Rust는 유닛 및 통합테스트에 대해 최고 수준으로 지원하고 있습니다.

간단한 유닛 테스트와 통합 테스트를 어떻게 작성하는지에 대해 살펴봅시다. 구조적으로, 우리는 수행할 테스트를 `tests/` 디렉토리에 위치시킬 수 있습니다.

```
foo
├── Cargo.toml
├── src
│   └── main.rs
└── tests
    ├── my_test.rs
    └── my_other_test.rs
```

`tests`의 각 파일은 분리된 통합 테스트입니다.

`cargo`는 모든 테스트를 실행하는 가장 간단한 방법을 제공합니다.

```bash
$ cargo test
```

아래와 같은 결과를 얻을 수 있습니다.

```bash
$ cargo test
   Compiling blah v0.1.0 (file:///nobackup/blah)
    Finished dev [unoptimized + debuginfo] target(s) in 0.89 secs
     Running target/debug/deps/blah-d3b32b97275ec472

running 3 tests
test test_bar ... ok
test test_baz ... ok
test test_foo_bar ... ok
test test_foo ... ok

test result: ok. 3 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

특정 패턴과 일치하는 파일명을 가진 테스트에 대해서만 테스트를 수행할 수 있습니다.

```bash
$ cargo test test_foo
   Compiling blah v0.1.0 (file:///nobackup/blah)
    Finished dev [unoptimized + debuginfo] target(s) in 0.35 secs
     Running target/debug/deps/blah-d3b32b97275ec472

running 2 tests
test test_foo ... ok
test test_foo_bar ... ok

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 2 filtered out
```

한 가지 주의사항이 있습니다. Cargo는 여러 테스트들을 동시에 실행할 수 있습니다. 따라서 이들이 서로 race 상태에 놓이지 않도록 해야합니다. 이를테면, 각각의 테스트가 하나의 파일에 그 결과를 출력한다면, 이를 각자 다른 파일로 작성하게끔 만드세요.
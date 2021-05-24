# Conventions

이전 챕터에서, 다음의 디렉토리 구조들을 살펴봤습니다.

```
foo
├── Cargo.toml
└── src
    └── main.rs
```

만약, 동일한 프로젝트 내에서, 두개의 바이너리를 생성하고 싶다면 어떻게 해야할까요?

`cargo`가 이를 해결해줄 수 있습니다. 앞서 확인한 것처럼, 기본 바이너리의 이름은 `main`입니다. 그러나 `bin/` 디렉토리에 또 다른 바이너리를 추가할 수 있습니다.

```
foo
├── Cargo.toml
└── src
    ├── main.rs
    └── bin
        └── my_other_bin.rs
```

`cargo`에게 기본 바이너리 대신에 해당 바이너리를 컴파일하고, 실행하고 싶다면, `cargo`에 `--bin my_other_bin` 플래그를 전달하면 됩니다. `my_other_bin`은 작업을 수행하고자 하는 바이너리의 이름입니다.

추가적인 바이너리에 대해, `cargo`는 벤치마크, 테스트 등 [더 많은 기능](https://doc.rust-lang.org/cargo/guide/project-layout.html)들을 제공하고 있습니다. 
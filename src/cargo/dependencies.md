# Dependencies

대부분의 프로그램은 여러 라이브러리에 의존성을 갖고 있습니다. 만약 일일이 의존성을 관리했던 경험이 있다면, 그것이 얼마나 힘든 일인지 알고 계실 겁니다. 다행히도, Rust 생태계는 `cargo`를 기반으로 구축되어 있습니다! `cargo`가 프로젝트의 의존성을 관리해줄 수 있습니다.

Rust 프로젝트를 생성해봅시다.

```bash
# 바이너리 프로젝트를 생성합니다.
cargo new foo

# 또는 라이브러리 프로젝트를 생성합니다.
cargo new --lib foo 
```

해당 챕터의 나머지 부분에서, 저희는 바이너리 프로젝트를 기반으로 한다고 가정하겠습니다. 하지만 전반적인 컨셉 자체는 모두 동일합니다.

위의 명령을 실행하고 나면, 아래와 같은 파일 구조를 확인할 수 있습니다.

```
foo
├── Cargo.toml
└── src
    └── main.rs

```

`main.rs`는 (특별할 것 없는) 새로운 프로젝트의 루트 소스 파일입니다. `Cargo.toml`은 해당 프로젝트(`foo`)에 대한 `cargo` 설정파일입니다. 이를 살펴보면, 아래와 같은 내용을 확인할 수 있습니다.

```toml
[package]
name = "foo"
version = "0.1.0"
authors = ["mark"]

[dependencies]
```

`[package]` 아래의 `name` 필드는 프로젝트의 이름을 결정합니다. 이는 추후에 크레이트를 배포하는 경우 `crate.io`에 의해 사용됩니다. 컴파일 시에 출력되는 바이너리의 이름이기도 합니다.

- `version` 필드는 [Semantic Versioning](https://semver.org/)에 따른 크레이트 버전을 나타냅니다.

- `authors` 필드는 크레이트를 배포할 때 사용되는 작성자들의 리스트입니다.

- `[dependencies]` 섹션에는 프로젝트에 사용되는 모든 의존성이 추가됩니다.

예를 들어, 어마어마한 CLI 프로그램을 개발하려 한다고 가정해봅시다. [crate.io](https://crates.io/)에서 여러가지 굉장한 패키지를 찾을 수 있습니다. 그 중 인기있는 하나는 [clap](https://crates.io/crates/clap)입니다. 현재 `clap`의 최신 버전은 `2.27.1`입니다. 저희 프로젝트에 해당 의존성을 추가하기 위해선, `Cargo.toml`의 `[dependencies]`에 단순히 `clap = "2.27.1"`을 추가하기만 하면 됩니다. 이제 `clap`을 프로젝트에서 사용할 수 있습니다!

`cargo`는 [다른 종류의 의존성]도 지원합니다. 아래는 간단한 예시입니다.

```toml
[package]
name = "foo"
version = "0.1.0"
authors = ["mark"]

[dependencies]
clap = "2.27.1" # crates.io 의존성
rand = { git = "https://github.com/rust-lang-nursery/rand" } # 온라인 저장소
bar = { path = "../bar" } # 로컬 파일시스템
```

`cargo`는 단순한 의존성 관리자 그 이상의 역할을 수행합니다. `Cargo.toml`에서 활용할 수 있는 모든 설정 옵션들은 [여기](https://doc.rust-lang.org/cargo/reference/manifest.html)에서 찾아볼 수 있습니다.

프로젝트를 빌드하기 위해서는 프로젝트 디렉토리 내 어디서든 `cargo build`를 실행하면 됩니다. `cargo run`을 실행하면 빌드와 구동을 한꺼번에 합니다. 이러한 명령들은 모든 종속성을 해결하고, 필요한 경우 크레이트를 다운로드하며, 우리 프로젝트의 크레이트를 포함한 모든 것을 빌드해줍니다. (이는 `make` 명령과 비슷하게, 이미 빌드되지 않은 사항에 대해서만 다시 빌드를 수행합니다.)

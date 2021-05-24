# Build Scripts

일부 경우, `cargo`를 통한 일반적인 빌드가 충분하지 않을 수 있습니다. 프로젝트의 크레이트가 `cargo` 컴파일 이전에 먼저 갖추어져야 하는 요구사항이 있을 지도 모릅니다. 이를테면, 코드 생성 혹은 컴파일되어야 하는 네이티브 코드와 같은 것들입니다. 이런 경우, Cargo가 실행할 수 있는 새로운 빌드 스크립트를 작성함으로써 문제를 해결할 수 있습니다.

빌드 스크립트를 작성하여 이를 패키지를 추가하기 위해선 `Cargo.toml`에 아래와 같이 작성할 수 있습니다.

```toml
[package]
...
build = "build.rs"
```

이후, Cargo는 기본적으로 프로젝트 디렉토리 내에서 `build.rs`를 탐색하려고 할 것입니다.

## How to use a build script

빌드 스크립트는 다른 Rust 파일과 동일하며, 다른 파일들을 컴파일하기 전에 미리 컴파일되고 호출될 뿐입니다. 따라서 크레이트 사전 요구사항을 충족하기 위해 이를 사용할 수 있습니다.

Cargo는 [여기](https://doc.rust-lang.org/cargo/reference/environment-variables.html#environment-variables-cargo-sets-for-build-scripts)에 명시된 환경 변수를 통해 스크립트에서 사용할 수 있는 입력을 제공합니다.

스크립트는 `stdout`을 통한 출력을 제공합니다. 출력되는 모든 내용은 `target/debug/build/<pkg>/output`에 작성됩니다. 덧붙여, `cargo:` 접두어가 붙은 출력에 대해서는 Cargo가 직접 해석할 수 있으므로, 패키지 컴파일을 위한 매개변수를 정의하기 위해 사용할 수 있습니다.

더 구체적인 사항과 예시에 대해서는 [Cargo](https://doc.rust-lang.org/cargo/reference/build-scripts.html) 명세서를 확인하세요.
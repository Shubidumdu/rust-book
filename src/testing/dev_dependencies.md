# Development dependencies

이따금씩, 오직 테스트를 위해서 의존성이 요구되는 경우가 있습니다. 이러한 의존성은 `Cargo.toml`의 `[dev-dependencies]` 섹션에 추가될 수 있습니다. 이러한 의존성들은 해당 패키지에 종속된 다른 패키지로 전파되지 않습니다.

아래는 일반적인 `assert!` 매크로를 확장하는 크레이트를 사용하는 예시입니다.

`Cargo.toml` 파일 :

```toml
[dev-dependencies]
pretty_assertions = "0.4.0"
```

`src/lib.rs` 파일 :

```
// `pretty_assertions`는 테스트 목적으로만 사용됩니다.
#[cfg(test)]
#[macro_use]
extern crate pretty_assertions;

pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }
}
```
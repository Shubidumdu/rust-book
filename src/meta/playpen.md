# Playpen

Rust Playpen은 웹 인터페이스를 통해 Rust 코드를 실행해볼 수 있는 방법입니다. 이는 [Rust Playground](https://play.rust-lang.org/)로도 알려져 있습니다.

## Using it with mdbook

`mdbook`에서도, 실행 및 편집할 수 있는 코드 예제를 작성할 수 있습니다.

```rust,editable
fn main() {
    println!("Hello World!");
}
```

이는 코드 예제를 실행할 수 있고, 수정을 해볼 수도 있습니다. 이를 위해서는 코드 블럭에 `editable` 키워드를 추가적으로 작성해주면 됩니다.

```markdown
```rust,editable
//...place your code here
```
```

`mdbook`이 해당 코드 블럭은 무시하고 빌드 및 실행시키지 않게끔 하려면 `ignore` 키워드를 추가하면 됩니다.

```markdown
```rust,editable,ignore
//...place your code here
```
```

## Using it with docs

Rust 공식 문서에서 종종 "Run"이라고 쓰여있는 버튼을 확인할 수 있습니다. 이는 새로운 Rust Playground 탭을 만들어 코드 샘플을 열어볼 수 있게 합니다. 이 기능은 [`html_playground_url`](https://doc.rust-lang.org/rustdoc/the-doc-attribute.html#html_playground_url)이라고 하는 `#[doc]` 어트리뷰트를 사용하여 활성화시킬 수 있습니다.
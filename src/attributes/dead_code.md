# dead_code

컴파일러는 사용하지 않는 함수에 대해 경고하는 `dead_code` 린트를 제공합니다. 어트리뷰트는 이러한 린트를 비활성화하는데 사용될 수 있습니다.

```rust,editable
fn used_function() {}

// `#[allow(dead_code)]`는 `dead_code` 린트를 비활성화하는 어트리뷰트입니다.
#[allow(dead_code)]
fn unused_function() {}

// 아래의 경우는 `dead_code`를 허용하지 않았으므로 경고가 출력됩니다.
fn noisy_unused_function() {}
// FIXME ^ Add an attribute to suppress the warning

fn main() {
    used_function();
}
```

단, 실제 프로그램에서는 이러한 Dead Code가 없어야 한다는 점에 주의하세요. 여기서는 여러 예시들을 보여주기 위해 어쩔 수 없이 dead code를 허용하지만, 실제 개발 시에 Dead Code는 존재하지 않아야 합니다.
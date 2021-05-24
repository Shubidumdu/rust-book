# cfg

환경 조건 검사는 두 가지 다른 연산자를 통해 이루어질 수 있습니다.

- `cfg` 어트리뷰트 : `#[cfg(...)]`을 어트리뷰트로 사용
- `cfg` 매크로 : `cfg!(...)`을 Boolean 문에서 사용

어트리뷰트를 이용한 방법은 조건부 컴파일을 활성화하지만, 후자는 런타임 시점에 조건을 판단하여 `true` 또는 `false` 리터럴을 반환합니다. 양쪽 모두 동일한 인수들을 사용합니다.

```rust
// 아래 함수는 target OS가 리눅스인 경우에만 컴파일 됩니다.
#[cfg(target_os = "linux")]
fn are_you_on_linux() {
    println!("You are running linux!");
}

// 아래 함수는 target OS가 리눅스가 아닌 경우에만 컴파일 됩니다.
#[cfg(not(target_os = "linux"))]
fn are_you_on_linux() {
    println!("You are *not* running linux!");
}

fn main() {
    are_you_on_linux();

    println!("Are you sure?");
    // target_os가 리눅스인 경우에만 true 조건이 충족됩니다.
    if cfg!(target_os = "linux") {
        println!("Yes. It's definitely linux!");
    } else {
        println!("Yes. It's definitely *not* linux!");
    }
}
```
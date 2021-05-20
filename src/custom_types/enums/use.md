# use

`use` 선언은 일일이 수동으로 스코핑을 하지 않고자 할 때 사용할 수 있습니다.

```rust,editable
// 사용하지 않는 코드에 대한 경고를 숨깁니다.
#![allow(dead_code)]

enum Status {
    Rich,
    Poor,
}

enum Work {
    Civilian,
    Soldier,
}

fn main() {
    // `use`를 사용하면 수동 스코핑 없이 
    // enum의 각 변형에 접근할 수 있습니다.
    use crate::Status::{Poor, Rich};
    // `Work` 내의 모든 변형을 사용합니다.
    use crate::Work::*;

    // 아래는 `Status::Poor`과 동일합니다.
    let status = Poor;
    // 아래는 `Work::Civilian`과 동일합니다.
    let work = Civilian;

    // 과도한 `use`의 사용으로 인해
    // 스코프 내에서 충돌이 일어날 수 있다는 점에 주의합시다.
    match status {
        Rich => println!("The rich have lots of money!"),
        Poor => println!("The poor have no money..."),
    }

    match work {
        Civilian => println!("Civilians work!"),
        Soldier  => println!("Soldiers fight!"),
    }
}
```
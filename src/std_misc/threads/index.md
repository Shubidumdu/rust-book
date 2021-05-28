# Threads

Rust는 `spawn` 함수를 통해서 네이티브 OS 쓰레드를 생성하는 메커니즘을 제공합니다. 해당 함수의 인수는 이동(moving) 클로저입니다.

```rust,editable
use std::thread;

const NTHREADS: u32 = 10;

// 아래는 `main` 쓰레드 입니다.
fn main() {
    // 생성되는 자식들을 보유한 벡터를 만듭니다.
    let mut children = vec![];

    for i in 0..NTHREADS {
        // 다른 쓰레드에서 동작시킵니다.
        children.push(thread::spawn(move || {
            println!("this is thread number {}", i);
        }));
    }

    for child in children {
        // 다른 쓰레드들이 일을 끝낼때까지 기다립니다.
        let _ = child.join();
    }
}
```
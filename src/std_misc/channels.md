# Channels

Rust는 쓰레드 간의 상호작용을 위한 비동기적인 `channels`를 제공합니다. 채널은 두 엔드포인트 간의 단방향 정보 흐름을 제공합니다. 이는 `Sender`와 `Receiver`로 구성됩니다.

```rust,editable
use std::sync::mpsc::{Sender, Receiver};
use std::sync::mpsc;
use std::thread;

static NTHREADS: i32 = 3;

fn main() {
    // 채널은 두 엔드포인트로 구성됩니다. : `Sender<T>`와 `Receiver<T>`
    // 여기서 `T`는 전송될 메시지의 타입에 해당합니다.
    // (타입 지정은 필수적이지 않습니다.)
    let (tx, rx): (Sender<i32>, Receiver<i32>) = mpsc::channel();
    let mut children = Vec::new();

    for id in 0..NTHREADS {
        // Sender 엔드포인트는 복사될 수 있습니다.
        let thread_tx = tx.clone();

        // 각 쓰레드가 채널을 통해 본인의 id를 전송할 겁니다.
        let child = thread::spawn(move || {
            // 쓰레드는 `thread_tx`에 대한 소유권을 넘겨받습니다.
            // 각 쓰레드는 채널에 메시지를 대기열에 넣습니다.
            thread_tx.send(id).unwrap();

            // 전송은 논-블로킹(non-blocking) 작업입니다.
            // 따라서 쓰레드는 메시지의 전달 이후에도 계속 진행됩니다.
            println!("thread {} finished", id);
        });

        children.push(child);
    }

    // 모든 메시지는 수집될 수 있습니다.
    let mut ids = Vec::with_capacity(NTHREADS as usize);
    for _ in 0..NTHREADS {
        // `recv` 메서드는 채널에서 메시지를 가져옵니다.
        // `recv`는 이용가능한 메시지가 없다면
        // 현재 쓰레드를 막습니다.
        ids.push(rx.recv());
    }
    
    // 쓰레드들이 작업을 마칠때까지 기다립니다.
    for child in children {
        child.join().expect("oops! the child thread panicked");
    }

    // 전송된 메시지를 순서대로 보여줍니다.
    println!("{:?}", ids);
}
```
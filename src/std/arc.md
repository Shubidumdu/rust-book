# Arc

스레드 간에도 소유권의 공유가 필요할 때, `Arc`(Atomic Reference Counted)가 사용될 수 있습니다. 이 구조는 `Clone` 구현을 통해, 참조 카운트를 증가시키며, 동시에 메모리 힙 내의 값의 위치에 대한 참조 포인터를 생성합니다. 이는 쓰레드 간의 소유권도 공유할 수 있기 때문에, 값에 대한 마지막 참조 포인터가 스코프를 벗어나게 되면, 해당 변수도 제거됩니다.

```rust,editable
fn main() {
  use std::sync::Arc;
  use std::thread;

  // 아래 변수 선언은 값을 지정할 위치에 해당합니다.
  let apple = Arc::new("the same apple");

  for _ in 0..10 {
      // 이는 메모리 힙 내의 참조에 대한 포인터입니다.
      // 따라서 여기서는 값(value)을 사용할 수 없습니다.
      let apple = Arc::clone(&apple);

      thread::spawn(move || {
          // Arc가 사용된 경우,
          // 스레드는 Arc 변수 포인터의 위치에
          // 할당된 값을 통해 생성될 수 있습니다.
          println!("{:?}", apple);
      });
  }
}
```
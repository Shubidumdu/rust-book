# RAII

Rust의 변수들은 단순히 데이터를 스택에 보관하는 것 이상의 일을 합니다. 그들은 자원(resources) 역시 소유합니다. (예를 들어, `Box<T>`는 힙에 본인의 메모리를 소유합니다.) Rust는 RAII(Resource Acquisition Is Initialization)를 강요합니다. 따라서, 한 객체가 스코프를 벗어날 때마다, 소멸자가 호출되고 소유되었던 리소스는 풀려납니다.

이러한 방식은 *resource leak(리소스 누수)* 문제에 대한 방어의 역할을 합니다. 덕분에 수동으로 메모리를 관리를 하거나 메모리 누수에 대한 걱정을 할 필요가 없습니다! 아래는 간단한 예시입니다.

```rust,editable
// raii.rs
fn create_box() {
    // 힙에 정수를 할당합니다.
    let _box1 = Box::new(3i32);

    // `_box1`은 이 시점에 파괴됩니다.
    // 할당되었던 메모리는 이제 자유로워집니다.
}

fn main() {
    // 힙에 정수를 할당합니다.
    let _box2 = Box::new(5i32);

    // 중첩 스코프
    {
        // 힙에 정수를 할당합니다.
        let _box3 = Box::new(4i32);

        // `_box3`은 이 시점에 파괴됩니다.
        // 할당되었던 메모리는 이제 자유로워집니다.
    }

    // 수 많은 Box들을 만들어 봅시다.
    // 수동적으로 메모리를 관리할 필요가 없습니다!
    for _ in 0u32..1_000 {
        create_box();
    }

    // `_box2`은 이 시점에 파괴됩니다.
    // 할당되었던 메모리는 이제 자유로워집니다.
}
```

물론, `valgrind`를 통해 메모리 에러에 대해 한번 더 체크해줄 수 있습니다.

```
$ rustc raii.rs && valgrind ./raii
==26873== Memcheck, a memory error detector
==26873== Copyright (C) 2002-2013, and GNU GPL'd, by Julian Seward et al.
==26873== Using Valgrind-3.9.0 and LibVEX; rerun with -h for copyright info
==26873== Command: ./raii
==26873==
==26873==
==26873== HEAP SUMMARY:
==26873==     in use at exit: 0 bytes in 0 blocks
==26873==   total heap usage: 1,013 allocs, 1,013 frees, 8,696 bytes allocated
==26873==
==26873== All heap blocks were freed -- no leaks are possible
==26873==
==26873== For counts of detected and suppressed errors, rerun with: -v
==26873== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 2 from 2)
```

아무런 메모리 누수가 없네요!

## Destructor

러스트에서의 소멸자(destructor)는 `Drop` 트레이트를 통해 제공됩니다. 소멸자는 리소스가 스코프를 벗어날 때마다 호출됩니다. 해당 트레이트는 모든 타입에 대해서 구현될 필요는 없고, 자체적인 소멸자 로직이 요구되는 경우에만 구현합니다.

아래 예시를 실행하여 `Drop` 트레이트가 동작하는 방식에 대해 살펴봅시다. `main` 함수의 변수가 스코프를 벗어나게 되면 커스텀 소멸자가 실행될 것입니다.

```rust,editable
struct ToDrop;

impl Drop for ToDrop {
    fn drop(&mut self) {
        println!("ToDrop is being dropped");
    }
}

fn main() {
    let x = ToDrop;
    println!("Made a ToDrop!");
}
```
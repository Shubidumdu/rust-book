# panic!

`panic!` 매크로는 `panic`를 생성하고 스택을 되감을 수 있습니다. 되감는 도중, 런타임은 모든 객체의 소멸자들을 호출하여 스레드에 의해 *소유된(owned)* 모든 리소스를 해제하는 작업을 수행합니다.

프로그램이 오직 하나의 스레드로 다루어지는 한, `panic!`은 프로그램이 패닉 메시지를 보고하고 종료하도록 합니다.

```rust,editable
// 정수 나눗셈 (/)에 대해 다시 구현해봅시다.
fn division(dividend: i32, divisor: i32) -> i32 {
    if divisor == 0 {
        // `0`으로 나누는 경우 `panic`을 발생시킵니다.
        panic!("division by zero");
    } else {
        dividend / divisor
    }
}

// `main` 작업
fn main() {
    // 힙에 할당된 정수
    let _x = Box::new(0i32);

    // 해당 작업은 실패를 유발합니다.
    division(3, 0);

    println!("This point won't be reached!");

    // `_x` 는 이 시점에서 파괴되어야 합니다.
}
```

`panic!`이 메모리 누수을 일으키고 있지는 않은지 확인해봅시다.

```
$ rustc panic.rs && valgrind ./panic
==4401== Memcheck, a memory error detector
==4401== Copyright (C) 2002-2013, and GNU GPL'd, by Julian Seward et al.
==4401== Using Valgrind-3.10.0.SVN and LibVEX; rerun with -h for copyright info
==4401== Command: ./panic
==4401== 
thread '<main>' panicked at 'division by zero', panic.rs:5
==4401== 
==4401== HEAP SUMMARY:
==4401==     in use at exit: 0 bytes in 0 blocks
==4401==   total heap usage: 18 allocs, 18 frees, 1,648 bytes allocated
==4401== 
==4401== All heap blocks were freed -- no leaks are possible
==4401== 
==4401== For counts of detected and suppressed errors, rerun with: -v
==4401== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
```
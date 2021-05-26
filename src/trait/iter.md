# Iterators

반복자([Iterator])(https://doc.rust-lang.org/core/iter/trait.Iterator.html) 트레이트는 Array와 같은 컬렉션 내의 순회를 구현하기 위해 사용됩니다.

해당 트레이트는 `next` 요소를 정의하는 하나의 메서드만을 요구하며, 이는 `impl` 블럭을 통해 직접 구현하거나, 자동으로 정의됩니다.(array나 range의 경우에는)

일반적인 상황에서 편리한 점으로, `for` 문은 `.into_iter()` 메서드를 사용하여 일부 컬렉션들을 반복자로 변경해줍니다.

```rust,editable
struct Fibonacci {
    curr: u32,
    next: u32,
}

// `Fibonacci`에 대한 `Iterator`를 구현합니다.
// `Iterator` 트레이트는 오직 `next` 요소에 대해
// 구현하는 하나의 메서드만 요구합니다.
impl Iterator for Fibonacci {
    type Item = u32;

    // 여기서, 우리는 `.curr`과 `.next`를 통해 순서를 정의합니다.
    // 반환타입은 `Option<T>`입니다 :
    //    * `Iterator`가 종료되었을 때, `None`이 반환됩니다.
    //    * 그렇지 않은 경우, `Some`으로 감싸진 다음 값이 반환됩니다.
    fn next(&mut self) -> Option<u32> {
        let new_next = self.curr + self.next;

        self.curr = self.next;
        self.next = new_next;

        // 피보나치 수에는 끝이 없기 때문에,
        // `Iterator`는 절대 `None`을 반환하지 않습니다.
        // 따라서 항상 `Some`이 반환됩니다.
        Some(self.curr)
    }
}

// 피보나치 배열 생성기를 반환합니다.
fn fibonacci() -> Fibonacci {
    Fibonacci { curr: 0, next: 1 }
}

fn main() {
    // `0..3`은 `0, 1, 2`은 생성하는 반복자입니다.
    let mut sequence = 0..3;

    println!("Four consecutive `next` calls on 0..3");
    println!("> {:?}", sequence.next());
    println!("> {:?}", sequence.next());
    println!("> {:?}", sequence.next());
    println!("> {:?}", sequence.next());

    // `for`는 `None` 반환 전까지 `Iterator`를 통해 동작합니다.
    // 각각의 `Some`값의 래핑이 해제된 후 변수(`i`)에 바인딩됩니다.
    println!("Iterate through 0..3 using `for`");
    for i in 0..3 {
        println!("> {}", i);
    }

    // `take(n)` 메서드는 첫 `n`개의 값만큼
    // 반복자를 진행합니다.
    println!("The first four terms of the Fibonacci sequence are: ");
    for i in fibonacci().take(4) {
        println!("> {}", i);
    }

    // `skip(n)` 메서드는 첫 `n`개의 값만큼을 버리고
    // 반복자를 진행합니다.
    println!("The next four terms of the Fibonacci sequence are: ");
    for i in fibonacci().skip(4).take(4) {
        println!("> {}", i);
    }

    let array = [1u32, 3, 3, 7];

    // `iter` 메서드는 array/slice에 대한
    // `Iterator`를 생성해냅니다.
    println!("Iterate the following array {:?}", &array);
    for i in array.iter() {
        println!("> {}", i);
    }
}
```
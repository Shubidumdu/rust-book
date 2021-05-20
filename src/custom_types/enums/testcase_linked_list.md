# Testcase: linked-list

`enums`의 일반적인 용도는 링크드 리스트(linked-list)를 만드는 것입니다.

```rust,editable
use crate::List::*;

enum List {
    // Cons : (요소, 다음 노드에 대한 포인터)
    Cons(u32, Box<List>),
    // Nil : 링크드 리스트의 끝을 나타내는 노드
    Nil,
}

// 메서드를 enum에 연결할 수 있습니다.
impl List {
    // 빈 리스트 생성
    fn new() -> List {
        // `Nil` 은 리스트 타입을 보유합니다..
        Nil
    }

    // 새로운 값이 추가된 동일한 리스트를 반환합니다.
    fn prepend(self, elem: u32) -> List {
        // `Cons`도 리스트 타입을 보유합니다.
        Cons(elem, Box::new(self))
    }

    // 리스트의 길이를 반환합니다.
    // 아래 메서드는는 `self`의 
    // 변형 형태에 따라 달라지기 때문에
    // `self`에 대해 match를 수행해야 합니다.
    fn len(&self) -> u32 {
        // `self`는 `&List` 타입을 갖고,
        // `*self`는 `List` 타입을 갖습니다.
        // 콘크리트 타입 `T`에 대한 매치가 
        // 참조 `&T`의 매치보다 선호됩니다.
        match *self {
            // `self`는 빌려온(borrow) 것이기에, 
            // `tail`을 소유할 수 없습니다.
            // 대신에 `tail`에 대한 참조를 가져옵니다.
            Cons(_, ref tail) => 1 + tail.len(),
            // 빈 리스트는 길이가 0입니다.
            Nil => 0
        }
    }

    // 리스트의 표현을 (Heap 할당) 문자열로 반환합니다.
    fn stringify(&self) -> String {
        match *self {
            Cons(head, ref tail) => {
                // `format!`은 `print!`와 유사하지만, 
                // 콘솔 출력 대신 heap 할당 문자열을 반환합니다.
                format!("{}, {}", head, tail.stringify())
            },
            Nil => {
                format!("Nil")
            },
        }
    }
}

fn main() {
    // 빈 링크드 리스트를 만듭니다.
    let mut list = List::new();

    // 몇몇 요소들을 추가합니다.
    list = list.prepend(1);
    list = list.prepend(2);
    list = list.prepend(3);

    // 리스트의 상태를 출력합니다.
    println!("linked list has length: {}", list.len());
    println!("{}", list.stringify());
}

```
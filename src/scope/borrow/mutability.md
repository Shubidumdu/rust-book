# Mutability

mutable한 데이터는 `&mut T`를 통해 mutable하게 대여될 수 있습니다. 이를 *가변 참조(mutable reference)*라고 하며, 대여자에게 읽기/쓰기 권한을 전달합니다. 대조적으로, `&T`는 불변 참조(immutable reference)를 통해 대여되며, 대여자들은 해당 데이터를 읽을 순 있지만, 수정할 수는 없습니다.

```rust
#[allow(dead_code)]
#[derive(Clone, Copy)]
struct Book {
    // `&'static str`은 읽기 전용 메모리에 할당된 
    // String에 대한 참조입니다.
    author: &'static str,
    title: &'static str,
    year: u32,
}

// 아래 함수는 `book`에 대한 참조를 받습니다.
fn borrow_book(book: &Book) {
    println!("I immutably borrowed {} - {} edition", book.title, book.year);
}

// 아래 함수는 mutable한 `book`에 대한 참조를 받아
// `year` 필드를 `2014`로 변경합니다.
fn new_edition(book: &mut Book) {
    book.year = 2014;
    println!("I mutably borrowed {} - {} edition", book.title, book.year);
}

fn main() {
    // `immutabook`이란 이름을 가진 immutaable Book을 만듭니다.
    let immutabook = Book {
        // String 리터럴은 `&'static str` 타입을 갖습니다.
        author: "Douglas Hofstadter",
        title: "Gödel, Escher, Bach",
        year: 1979,
    };

    // `immutabook`의 mutable 복사를 만들고 이를 `mutabook`으로 바인딩합니다.
    let mut mutabook = immutabook;

    // immutable 객체를 immutable하게 대여합니다.
    borrow_book(&immutabook);

    // mutable 객체를 immutable하게 대여합니다.
    borrow_book(&mutabook);

    // mutable 객체를 mutable하게 대여합니다.
    new_edition(&mut mutabook);
    
    // ERROR : immutable 객체를 mutable하게 대여할 수는 없습니다.
    new_edition(&mut immutabook);
}
```
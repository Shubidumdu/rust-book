# Structs

구조(structure)에서의 라이프타임 지정도 함수와 유사합니다.

```rust,editable
// `Borrowed` 타입은 `i32`에 대한 참조를 보유합니다.
// `i32` 참조의 라이프타임은 `Borrowed`의 라이프타임보다 길어야 합니다.
#[derive(Debug)]
struct Borrowed<'a>(&'a i32);

// 유사하게, 두 입력 참조 역시 해당 구조보다 라이프타임이 길어야 합니다.
#[derive(Debug)]
struct NamedBorrowed<'a> {
    x: &'a i32,
    y: &'a i32,
}

// 아래 `enum`은 `i32` 또는 그에 대한 참조가 될 수 있습니다.
#[derive(Debug)]
enum Either<'a> {
    Num(i32),
    Ref(&'a i32),
}

fn main() {
    let x = 18;
    let y = 15;

    let single = Borrowed(&x);
    let double = NamedBorrowed { x: &x, y: &y };
    let reference = Either::Ref(&x);
    let number    = Either::Num(y);

    println!("x is borrowed in {:?}", single);
    println!("x and y are borrowed in {:?}", double);
    println!("x is borrowed in {:?}", reference);
    println!("y is *not* borrowed in {:?}", number);
}
```
# Functions

엘리션(Elision)을 제외하면, 라이프 타임을 가진 함수의 선언에는 몇 가지 제약이 있습니다.

- 참조는 *반드시* 라이프타임이 명시되어야 합니다.
- 반환되는 참조는 *반드시* 입력과 동일한 라이프타임을 갖거나, `static`이어야 합니다.

덧붙여, 입력 없이 반환되는 참조는 유효하지 않은 데이터에 대한 참조를 반환할 경우 금지된다는 점을 주의하세요. 아래 예시는 라이프타임을 가진 몇가지 유효한 형태의 함수를 보여줍니다.

```rust,editable
// 적어도 해당 함수의 라이프타임을 갖는
// `'a` 라이프타임을 가진 참조 입력입니다.
fn print_one<'a>(x: &'a i32) {
    println!("`print_one`: x is {}", x);
}

// 라이브타임을 가진 mutable 참조도 가능합니다.
fn add_one<'a>(x: &'a mut i32) {
    *x += 1;
}

// 다른 라이프타임을 가진 여러 요소들을 사용합니다.
// 이 경우, 동일한 라이프 타임 `'a`를 갖더라도 문제 없습니다.
// 다만 대부분의 복잡한 경우에는 다른 라이프타임들이 요구됩니다.
fn print_multi<'a, 'b>(x: &'a i32, y: &'b i32) {
    println!("`print_multi`: x is {}, y is {}", x, y);
}

// 입력받은 참조를 그대로 반환하는 것은 가능합니다.
// 다만, 이 경우 올바른 라이프타임이 반환되어야 합니다.
fn pass_x<'a, 'b>(x: &'a i32, _: &'b i32) -> &'a i32 { x }

// ERROR : `'a`는 해당 함수보다 더 긴 라이프타임을 가져야 합니다.
// 여기서, `&String::from("foo")`는 참조에 따른 `String`을 생성합니다.
// 스코프가 종료되면, 해당 데이터는 삭제되고,
// 이 경우 잘못된 데이터에 대한 참조가 반환됩니다.
// 따라서, 아래는 에러를 발생시킵니다.
fn invalid_output<'a>() -> &'a String { &String::from("foo") }

fn main() {
    let x = 7;
    let y = 9;
    
    print_one(&x);
    print_multi(&x, &y);
    
    let z = pass_x(&x, &y);
    print_one(z);

    let mut t = 3;
    add_one(&mut t);
    print_one(&t);
}
```
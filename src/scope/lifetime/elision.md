# Elision

일부 라이프타임 패턴은 지극히 일반적이기 때문에, borrow checker는 이를 생략하는 것을 허용합니다. 덕분에 타이핑을 줄이고 가독성을 향상시킬 수 있습니다. 이를 일리전(Elision)이라 합니다. 이러한 패턴들은 지극히 일반적이기 때문에, 일리전은 오로지 Rust에만 존재합니다.

아래 코드는 일리전의 일부 예시들을 보여줍니다. 일리전에 대한 더 심도있는 설명을 보고 싶다면, [여기](https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html#lifetime-elision)를 살펴보세요.

```rust,editable
// `elided_input`과 `annotated_input`은 근본적으로는 동일한 방식의 할당입니다.
// `elided_input`의 라이프타임은 컴파일러에 의해 추론될 수 있기 때문입니다.
fn elided_input(x: &i32) {
    println!("`elided_input`: {}", x);
}

fn annotated_input<'a>(x: &'a i32) {
    println!("`annotated_input`: {}", x);
}

// 이와 유사하게, `elided_pass`와 `annotated_pass`도 근본적으로는 같습니다.
// `elided_pass`에 대한 라이프타임이 암시적으로 추가되기 때문입니다. 
fn elided_pass(x: &i32) -> &i32 { x }

fn annotated_pass<'a>(x: &'a i32) -> &'a i32 { x }

fn main() {
    let x = 3;

    elided_input(&x);
    annotated_input(&x);

    println!("`elided_pass`: {}", elided_pass(&x));
    println!("`annotated_pass`: {}", annotated_pass(&x));
}
```
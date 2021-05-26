# Supertraits

Rust에는 *상속*이라는 개념이 없습니다. 그러나 다른 트레이트에 대한 슈퍼셋이 되는 트레이트(Supertraits)를 정의할 수 있습니다.

```rust
trait Person {
    fn name(&self) -> String;
}

// Person은 Student의 슈퍼트레이트 입니다.
// Student의 구현은 Person에 대한 구현 역시 요구합니다.
trait Student: Person {
    fn university(&self) -> String;
}

trait Programmer {
    fn fav_language(&self) -> String;
}

// `CompSciStudent` 는 `Programmer`와 `Student`의 서브트레이트(subtrait)입니다.
// 이에 대한 구현은 양쪽의 슈퍼트레이트에 대한 구현을 모두 요구합니다.
trait CompSciStudent: Programmer + Student {
    fn git_username(&self) -> String;
}

fn comp_sci_student_greeting(student: &dyn CompSciStudent) -> String {
    format!(
        "My name is {} and I attend {}. My favorite language is {}. My Git username is {}",
        student.name(),
        student.university(),
        student.fav_language(),
        student.git_username()
    )
}

fn main() {}
```
# panic

가장 간단하게 에러 핸들링을 다루는 방법은 `panic`입니다. 이는 에러 메시지를 출력하고, 스택을 다시 되감기 시작하며(stack unwinding), 일반적으로는 프로그램을 종료합니다. 자, 아래 에러 조건에서 `panic`을 호출해봅시다.

```rust,editable
fn drink(beverage: &str) {
    if beverage == "lemonade" { panic!("AAAaaaaa!!!!"); }

    println!("Some refreshing {} is all I need.", beverage);
}

fn main() {
    drink("water");
    drink("lemonade");
}
```
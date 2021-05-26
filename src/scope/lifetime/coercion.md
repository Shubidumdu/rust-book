# Coercion

라이프타임은 보다 짧은 라이프타임으로 변환될 수 있으며, 이를 통해 일반적으로는 작동할 수 없는 스코프 내에서도 동작하도록 할수 있습니다. 이는 Rust 컴파일러에 의해 추론 변형(inferred coercion)의 형태 또는 라이프타임의 변경을 정의하는 형태로 이루어질 수 있습니다.

```rust,editable
// 여기서, Rust는 가능한 짧은 쪽으로 라이프타임을 추론합니다.
// 두 참조들은 더 짧은 쪽의 라이프타임으로 변환됩니다.
fn multiply<'a>(first: &'a i32, second: &'a i32) -> i32 {
    first * second
}

// `<'a: 'b, 'b>` : `'a`는 적어도 `'b`만큼의 라이프타임을 갖습니다.
// 아래 함수에서 우리는 `&'a i32`를 받아서 변환하여 `&'b i32`를 반환합니다.
fn choose_first<'a: 'b, 'b>(first: &'a i32, _: &'b i32) -> &'b i32 {
    first
}

fn main() {
    let first = 2; // 더 긴 라이프타임
    
    {
        let second = 3; // 더 짧은 라이프 타임
        
        println!("The product is {}", multiply(&first, &second));
        println!("{} is the first", choose_first(&first, &second));
    };
}
```
# Rc

다중 소유권(Multiple ownership)이 요구되는 경우, `Rc`(Reference Counting)이 사용될 수 있습니다. `Rc`는 참조의 수(*`Rc` 내에 포장된 값의 소유자(onwer)의 수*)를 추적합니다. 

`Rc`의 참조 갯수는 `Rc`가 복사(clone)될 때마다 1씩 증가하고, 복사된 `Rc`가 스코프를 벗어날 때마다 1씩 감소합니다. `Rc`의 참조 갯수가 0이 되면, 이는 아무 소유자도 남아있지 않음을 의미하며, 이 때는 `Rc`와 내부 값 모두 제거됩니다.

`Rc`의 복사는 절대 *깊은 복사*를 수행하지 않습니다. 여기서의 복사는 단순히 감싸진 값에 대한 또다른 포인터만을 생성해낼 뿐입니다.

```rust,editable
use std::rc::Rc;

fn main() {
    let rc_examples = "Rc examples".to_string();
    {
        println!("--- rc_a is created ---");
        
        let rc_a: Rc<String> = Rc::new(rc_examples);
        println!("Reference Count of rc_a: {}", Rc::strong_count(&rc_a));
        
        {
            println!("--- rc_a is cloned to rc_b ---");
            
            let rc_b: Rc<String> = Rc::clone(&rc_a);
            println!("Reference Count of rc_b: {}", Rc::strong_count(&rc_b));
            println!("Reference Count of rc_a: {}", Rc::strong_count(&rc_a));
            
            // 내부 값이 동일하다면 두 `Rc`는 동일합니다.
            println!("rc_a and rc_b are equal: {}", rc_a.eq(&rc_b));
            
            // 내부 값의 메서드를 곧바로 사용할 수 있습니다.
            println!("Length of the value inside rc_a: {}", rc_a.len());
            println!("Value of rc_b: {}", rc_b);
            
            println!("--- rc_b is dropped out of scope ---");
        }
        
        println!("Reference Count of rc_a: {}", Rc::strong_count(&rc_a));
        
        println!("--- rc_a is dropped out of scope ---");
    }
    
    // ERROR : `rc_examples`는 이미 `rc_a`로 이동했습니다.
    // `rc_a`가 제거될 때, `rc_examples`도 같이 제거됩니다.
    println!("rc_examples: {}", rc_examples);
}
```
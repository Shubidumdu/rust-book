# super and self

`super` 와 `self` 키워드는 항목에 접근할 때의 모호함을 없애고 path를 작성할 때의 불필요한 하드코딩을 막아줍니다.

```rust,editable
fn function() {
    println!("called `function()`");
}

mod cool {
    pub fn function() {
        println!("called `cool::function()`");
    }
}

mod my {
    fn function() {
        println!("called `my::function()`");
    }
    
    mod cool {
        pub fn function() {
            println!("called `my::cool::function()`");
        }
    }
    
    pub fn indirect_call() {
        // 이 스코프에서 접근할 수 있는 모든 `function` 함수들을 호출해봅시다!
        print!("called `my::indirect_call()`, that\n> ");
        
        // `self` 키워드는 현재의 모듈 스코프를 참조합니다. 여기선 `my`입니다.
        // `self::function()`와 해당 스코프에서의 `function()`는
        // 동일한 함수를 호출하기 때문에, 그 결과도 동일합니다.
        self::function();
        function();
        
        // `my` 모듈 내에서의 다른 항목에 접근하기 위해서도 `self`를 사용할 수 있습니다.
        self::cool::function();
        
        // `super` 키워드는 `my` 모듈 바깥의 부모 스코프를 참조합니다.
        super::function();
        
        // 아래는 `cool::function`을 *crate* 스코프에 바인딩합니다.
        // 여기서의 crate 스코프는 가장 바깥의 소코프가 됩니다.
        {
            use crate::cool::function as root_function;
            root_function();
        }
    }
}

fn main() {
    my::indirect_call();
}
```
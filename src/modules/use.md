# The use declaration

`use` 선언은 모듈의 더 쉬운 접근을 위하여, 전체 경로를 새로운 이름으로 바인딩하기 위해 사용됩니다.

```rust
use crate::deeply::nested::{
    my_first_function,
    my_second_function,
    AndATraitType
};

fn main() {
    // 이제 `crate::deply::nested::my_first_function`이 아닌
    // `my_first_function`으로 접근할 수 있습니다.
    my_first_function();
}
```

`as` 키워드와 함께 사용하여 다른 이름으로 바인딩하여 가져올 수 있습니다.

```rust,editable
// `deeply::nested::function` 경로를 `other_function`으로 바인딩합니다.
use deeply::nested::function as other_function;

fn function() {
    println!("called `function()`");
}

mod deeply {
    pub mod nested {
        pub fn function() {
            println!("called `deeply::nested::function()`");
        }
    }
}

fn main() {
    // `deeply::nested::function`은 이제 `other_function`으로 호출할 수 있습니다.
    other_function();

    println!("Entering block");
    {
        // 아래는 `use deeply::nested::function as function`과 동일합니다.
        // 이는 최상단에서 선언한 `function()`을 덮어쓰게 됩니다.
        use crate::deeply::nested::function;

        // `use` 바인딩은 로컬 스코프를 갖습니다.
        // 즉, 위에서 섀도잉한 `function`은 해당 블록에서만 유효합니다.
        function();

        println!("Leaving block");
    }

    function();
}
```
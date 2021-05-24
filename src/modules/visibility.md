# Visibility

기본적으로, 모듈 내의 각 항목들은 private 가시성을 갖습니다. 그러나 이는 `pub` 수정자를 통해 public으로 오버라이딩될 수 있습니다. 오직 모듈의 public 항목들에만 모듈 스코프 바깥에서 접근할 수 있습니다.

```rust,editable
// `my_mod` 라는 이름의 모듈입니다.
mod my_mod {
    // 모듈 내의 항목들은 기본적으로 `private` 가시성을 갖습니다.
    fn private_function() {
        println!("called `my_mod::private_function()`");
    }

    // 가시성을 `public`으로 바꾸기 위해 `pub` 수정자로 오버라이딩합니다.
    pub fn function() {
        println!("called `my_mod::function()`");
    }

    // 동일한 모듈 내의 각 항목들은 private 여부와 상관없이 서로 접근할 수 있습니다.
    pub fn indirect_access() {
        print!("called `my_mod::indirect_access()`, that\n> ");
        private_function();
    }

    // 모듈은 중첩될 수 있습니다.
    pub mod nested {
        pub fn function() {
            println!("called `my_mod::nested::function()`");
        }

        #[allow(dead_code)]
        fn private_function() {
            println!("called `my_mod::nested::private_function()`");
        }

        // `pub(in path)`로 선언된 함수는 오직 주어진 경로에서만 가시적입니다.
        // 해당 `path`는 반드시 부모 혹은 조상 모듈이어야 합니다.
        pub(in crate::my_mod) fn public_function_in_my_mod() {
            print!("called `my_mod::nested::public_function_in_my_mod()`, that\n> ");
            public_function_in_nested();
        }

        // `pub(self)`로 선언된 함수는 오직 본인 모듈에서만 가시적입니다.
        // 이는 사실 상 private 상태로 두는 것과 동일합니다.
        pub(self) fn public_function_in_nested() {
            println!("called `my_mod::nested::public_function_in_nested()`");
        }

        // `pub(super)`로 선언된 함수는 부모 모듈 내에서만 가시적입니다.
        pub(super) fn public_function_in_super_mod() {
            println!("called `my_mod::nested::public_function_in_super_mod()`");
        }
    }

    pub fn call_public_function_in_my_mod() {
        print!("called `my_mod::call_public_function_in_my_mod()`, that\n> ");
        nested::public_function_in_my_mod();
        print!("> ");
        nested::public_function_in_super_mod();
    }

    // `pub(crate)`로 선언된 함수는 현재 크레이트내에서만 가시적입니다. 
    pub(crate) fn public_function_in_crate() {
        println!("called `my_mod::public_function_in_crate()`");
    }

    // 중첩 모듈은 가시성에 대해 동일한 규칙을 따릅니다.
    mod private_nested {
        #[allow(dead_code)]
        pub fn function() {
            println!("called `my_mod::private_nested::function()`");
        }

        // Private한 부모 항목들은 자식 항목들의 가시성에도 영향을 미칩니다.
        // 심지어 자식 항목에 `pub`이 수정자가 적용되더라도 말이죠.
        #[allow(dead_code)]
        pub(crate) fn restricted_function() {
            println!("called `my_mod::private_nested::restricted_function()`");
        }
    }
}

fn function() {
    println!("called `function()`");
}

fn main() {
    // 모듈은 동일한 이름을 가진 항목을 구분하여 사용할 수 있게끔 합니다.
    function();
    my_mod::function();

    // 중첩 모듈 내에 포함된 Public 항목들은 부모 모듈 바깥에서 접근할 수 있다.
    my_mod::indirect_access();
    my_mod::nested::function();
    my_mod::call_public_function_in_my_mod();

    // pub(crate) 항목들은 동일한 크레이트 내 어디서든 호출될 수 있습니다.
    my_mod::public_function_in_crate();

    // ERROR : `pub(in path)` 항목들은 지정된 모듈 내에서만 호출할 수 있습니다.
    my_mod::nested::public_function_in_my_mod();

    // private 항목들에는 직접 접근할 수 없습니다.
    // 심지어 public 모듈 내에 중첩되어 있더라도 마친가지입니다.

    // ERROR : private 항목들은 직접 접근할 수 없습니다.
    my_mod::private_function();

    // ERROR : `nested`는 public 모듈이지만,
    // 그 안에 중첩된 private 항목에는 접근할 수 없습니다.
    my_mod::nested::private_function();

    // ERROR : `private_nested`는 private 모듈입니다.
    // `function`이 public 으로 선언되더라도, 접근할 수 없습니다.
    my_mod::private_nested::function();

    // ERROR : `private_nested`는 private 모듈입니다.
    // `function`이 `pub(crate)`로 선언되더라도, 접근할 수 없습니다.
    my_mod::private_nested::restricted_function();
}
```
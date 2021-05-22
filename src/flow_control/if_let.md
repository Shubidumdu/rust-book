# if let

일부 상황에서, enums를 매칭할 때 `match`가 어색한 경우가 발생합니다. 하나의 예를 살펴봅시다.

```rust,editable
#![allow(unused)]
fn main() {
// `Option<i32>` 타입의 `optional` 변수를 바인딩합니다.
let optional = Some(7);

match optional {
    Some(i) => {
        println!("This is a really long string and `{:?}`", i);
    },
    // `match`는 철저하게 모든 경우에 처리해야 하므로
    // 아래와 같은 처리가 필요합니다.
    // 공간 낭비처럼 보이지 않나요?
    _ => {},
};

}
```

`if let`은 이런 상황에서 더 깔끔한 코드를 작성할 수 있게끔 해줍니다. 추가적으로, 여러 실패 옵션들을 구체적으로 지정할 수 있습니다.

```rust,editable
fn main() {
    // 아래는 모두 `Option<i32>` 타입입니다.
    let number = Some(7);
    let letter: Option<i32> = None;
    let emoticon: Option<i32> = None;

    // `if let` 구조는 다음과 같이 해석될 수 있습니다.
    // : "만약 `number`가 `Some(i)`로 분해될 수 있다면, 아래의 블럭을 수행합니다."
    if let Some(i) = number {
        println!("Matched {:?}!", i);
    }

    // 수행될 수 없다면, 이에 대한 대처도 할 수 있습니다.
    if let Some(i) = letter {
        println!("Matched {:?}!", i);
    } else {
        // 분해에 실패했다면, 해당 블럭이 실행됩니다.
        println!("Didn't match a number. Let's go with a letter!");
    }

    // 다른 실패 케이스를 만들어 봅시다.
    let i_like_letters = false;

    if let Some(i) = emoticon {
        println!("Matched {:?}!", i);
    // 분해에 실패하면, `else if` 조건에 대해 추가적으로 판단합니다.
    } else if i_like_letters {
        println!("Didn't match a number. Let's go with a letter!");
    } else {
        println!("I don't like letters. Let's go with an emoticon :)!");
    }
}
```

동일한 방식으로, `if let`은 `enum`에 대해서도 사용될 수 있습니다.

```rust,editable
// 임의로 enum을 만듭니다.
enum Foo {
    Bar,
    Baz,
    Qux(u32)
}

fn main() {
    // 임의로 변수 바인딩을 몇개 만듭니다.
    let a = Foo::Bar;
    let b = Foo::Baz;
    let c = Foo::Qux(100);
    
    // 변수 `a`가 Foo::Bar에 해당한다면 블럭을 수행합니다.
    if let Foo::Bar = a {
        println!("a is foobar");
    }
    
    // 변수 `b`는 Foo::Bar에 매칭되지 않습니다.
    // 따라서 아래는 출력되지 않습니다.
    if let Foo::Bar = b {
        println!("b is foobar");
    }
    
    // 변수 `c`는 값을 보유한 Foo::Qux와 매칭됩니다.
    if let Foo::Qux(value) = c {
        println!("c is {}", value);
    }

    // `if let`에 대해서도 바인딩을 할 수 있습니다.
    if let Foo::Qux(value @ 100) = c {
        println!("c is one hundred");
    }
}
```

`if let`의 또 다른 이점은 *매개변수가 아닌(non-parameterized)* enum 변형에 대해 일치시킬 수 있다는 점입니다. 심지어 enum이 `PartialEq`를 구현/파생하지 않는 경우에도 마찬가지입니다. 

```rust,editable
// 아래 enum은 의도적으로 구현도, PartialEq도 파생하지 않았습니다.
// 이런 이유로, `Foo::Bar == a`는 아래에서 실패할 것입니다.
enum Foo {Bar}

fn main() {
    let a = Foo::Bar;

    // ERROR : 변수 `a`는 `Foo::Bar`에 매칭되지만, 
    // 아래는 컴파일 에러가 발생합니다.
    if Foo::Bar == a {
        println!("a is foobar");
    }

    // 대신 아래와 같이 사용한다면 문제 없습니다.
    if let Foo::Bar = a {
        println!("a is foobar");
    }
}
```
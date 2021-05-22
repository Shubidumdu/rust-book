# for loops

## for and range

`for in` 구조는 순회를 통해 반복되는 작업을 수행하고자 할 때에 사용됩니다. iterator를 생성하는 가장 쉬운 방법은 `a..b`로 range 표기를 사용하는 것입니다. 이는 `a`(포함)에서 `b`(제외)까지의 값들을 매번 하나씩 가져옵니다.

FizzBuzz 문제를 이번엔 `for`문을 통해 해결해봅시다.

```rust,editable
fn main() {
    // `n`은 매 순회마다 순서대로 
    // 1, 2, ... 100 이 됩니다.
    for n in 1..101 {
        if n % 15 == 0 {
            println!("fizzbuzz");
        } else if n % 3 == 0 {
            println!("fizz");
        } else if n % 5 == 0 {
            println!("buzz");
        } else {
            println!("{}", n);
        }
    }
}

```

`a..=b`를 사용한다면, `b` 역시 순회에 포함하게 됩니다.

```rust,editable
fn main() {
    // `n`은 매 순회마다 순서대로 
    // 1, 2, ... 100 이 됩니다.
    for n in 1..=100 {
        if n % 15 == 0 {
            println!("fizzbuzz");
        } else if n % 3 == 0 {
            println!("fizz");
        } else if n % 5 == 0 {
            println!("buzz");
        } else {
            println!("{}", n);
        }
    }
}
```

## for and iterators

`for in` 구조는 `Iterator`와 다양한 방식으로 상호작용할 수 있습니다. 추후 Iterator에 대해 설명하겠지만, 기본적으로 `for` 루프는 컬렉션에 `into_iter` 함수를 적용합니다. 그러나, 컬렉션을 iterator로 변환하는 방법은 이것이 다가 아닙니다.

데이터에 대한 다양한 관점으로, `into_iter`, `iter` 와 `iter_mut` 모두 컬렉션을 iterator로 다른 방식으로 변환할 수 있습니다.

- `iter` - 컬렉션의 각 요소들을 각 순회에서 '빌려'옵니다.  따라서 컬렉션 자체는 건들지 않으며, 루프가 진행된 이후에도 재사용될 수 있습니다.

```rust,editable
fn main() {
    let names = vec!["Bob", "Frank", "Ferris"];

    for name in names.iter() {
        match name {
            // `&`로  가져오고 있음을 주의하세요.
            &"Ferris" => println!("There is a rustacean among us!"),
            _ => println!("Hello {}", name),
        }
    }
    
    println!("names: {:?}", names);
}
```

- `into_iter` - 실제 컬렉션을 사용하여, 각 순회에 실제 데이터가 사용됩니다. 한번 컬렉션이 사용되고 나면, 루프 내에서 *변했기* 때문에 더 이상 재사용할 수 없습니다.

```rust,editable
fn main() {
    let names = vec!["Bob", "Frank", "Ferris"];

    for name in names.into_iter() {
        match name {
            "Ferris" => println!("There is a rustacean among us!"),
            _ => println!("Hello {}", name),
        }
    }
    
    // ERROR : 아래 코드에선 에러가 발생합니다.
    // `into_iter`의 메서드로 인해 `names`가 변경되었기 때문입니다.
    println!("names: {:?}", names);
}
```

- `into_mut` - 컬렉션에서 각 요소들을 mutable하게 빌려옵니다. 다시 말해, 매 순환마다 컬렉션 자체에 수정을 가할 수 있습니다.

```rust,editable
fn main() {
    let mut names = vec!["Bob", "Frank", "Ferris"];

    for name in names.iter_mut() {
        *name = match name {
            &mut "Ferris" => "There is a rustacean among us!",
            _ => "Hello",
        }
    }

    println!("names: {:?}", names);
}
```

위의 여러 방법 간에, 순회에서 제공되는 타입이 저마다 다르다는 점을 주의하세요. 당연히, 타입이 다름에 따라 수행될 수 있는 동작 자체에도 차이가 있습니다.
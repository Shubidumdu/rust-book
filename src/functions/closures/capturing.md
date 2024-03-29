# Capturing

클로저는 유연하고, 타입 선언 없이도 클로저를 동작시키기 위한 작업들이 실행됩니다. 이는 캡처링을 실제로 유연하게 적용할 수 있도록 하고, 때로는 캡처한 변수를 이동(moving)시키거나, 대여(borrowing)합니다.

클로저는 아래 방법들을 통해 변수들을 캡처할 수 있습니다.

- `&T` : 참조를 통해
- `&mut T` : mutable 참조를 통해
- `T` : 값을 통해

클로저는 기본적으로 참조를 통한 변수 캡처링이 우선시하며, 필요에 따라 아래 순위로 옮겨갑니다.

```rust,editable
fn main() {
    use std::mem;
    
    let color = String::from("green");

    // `color`를 출력하기 위한 클로저입니다.
    // 이는 `color`를 즉각적으로 참조(`&`)로 가져와서
    // `print` 변수에 빌려온 `color`와 클로저를 저장합니다.
    // 이는 마지막으로 `print`를 사용할 때까지 유지됩니다.
    // `println!`은 오직 immutable 참조에 의한 인자만을 요구하며,
    // 따라서 별다른 제한 사항은 없습니다.
    let print = || println!("`color`: {}", color);

    // 클로저를 호출하여 대여한 변수를 사용합니다.
    print();

    // `color`는 다시 immutable하게 다른 변수에 대여될 수 있습니다.
    // 여기서의 클로저는 단순히 `color`에 대한 불변 참조를 보유할 뿐입니다.
    let _reborrow = &color;
    print();

    // 이동(move)와 재대여(reborrow)는 마지막 `print`의 사용 이후 가능합니다.
    let _color_moved = color;


    let mut count = 0;

    // 값 증가를 구현하는 클로저 `count`는 `&mut count`나 `count` 둘 다 사용할 수 있습니다.
    // 하지만, `&mut count` 쪽이 덜 제한적이므로, 이를 사용합니다.
    // `&mut`가 `inc` 내부에 저장되어 있기 때문에, `inc`에도 `mut`가 필요합니다.
    // 해당 클로저의 호출은 `mut`를 가진 클로저 스스로를 변형시킵니다.
    let mut inc = || {
        count += 1;
        println!("`count`: {}", count);
    };

    // mutable 대여를 사용하는 클로저를 호출합니다.
    inc();


    // `int` 클로저는 여전히 `count`를 mutable하게 대여하고 있습니다.
    // 추후에도 아래쪽에서 `int`가 호출되기 때문입니다.
    // ERROR: 따라서, 이를 reborrow 하려는 시도는 에러를 발생시킵니다.
    let _reborrow = &count; 

    inc();

    // 클로저는 더 이상 `&mut count`를 빌려올 필요가 없습니다.
    // 따라서 이제 reborrow에 대한 에러를 발생시키지 않습니다.
    let _count_reborrowed = &mut count; 

    
    // non-copy 타입 -> 값(value) 자체를 사용합니다.
    let movable = Box::new(3);

    // `mem::drop`은 `T`를 요구하므로, 참조가 아닌 값(value)을 사용해야 합니다.
    // copy 타입은 기존 값을 건드리지 않고 클로저에 이를 복사하는 반면,
    // non-copy 타입은 값 자체를 즉각적으로 클로저로 이동시킵니다.
    let consume = || {
        println!("`movable`: {:?}", movable);
        mem::drop(movable);
    };

    // `consume`은 변수를 소비하기 때문에(mem::drop), 한번만 호출될 수 있습니다.
    consume();

    // ERROR : 따라서 아래는 에러를 발생시킵니다.
    consume();
}
```

`move`를 사용하면 캡처된 변수의 소유권을 클로저가 갖도록 강제할 수 있습니다.

```rust,editable
fn main() {
    // `Vec`는 non-copy semantic들을 갖습니다.
    let haystack = vec![1, 2, 3];

    let contains = move |needle| haystack.contains(needle);

    println!("{}", contains(&1));
    println!("{}", contains(&4));

    // ERROR : `haystack`은 `moved` 되었으므로
    // 해당 변수 바인딩을 다시 사용할 수 없습니다.
    println!("There're {} elements in vec", haystack.len());
    
    // 위에서 구현한 클로저에서 `move`를 지우면,
    // 클로저가 `haystack`변수를 immutable하게 대여합니다.
    // 그러므로, 여전히 `haystack`은 이용가능한 상태이며,
    // 따라서 바로 위의 코드도 에러를 발생시키지 않습니다.
}
```
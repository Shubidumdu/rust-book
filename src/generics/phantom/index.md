# Phantom type parameters

팬텀 타입 매개변수(phantom type parameter)는 런타임 시점에 표시되지 않으나, 컴파일 시점에 정적으로 확인되는 타입 매개변수입니다.

데이터 타입들은 마커로서의 역할을 수행하거나, 컴파일 시점에 타입 체킹을 수행하기 위해 추가적인 제네릭 타입 매개변수를 사용할 수 있습니다. 이러한 추가적인 매개변수들은 저장소 공간을 요구하지 않으며, 런타임 시점에서의 행동도 없습니다.

아래 예시에서, 우리는 다른 데이터 타입들을 포함하는 튜플을 생성하는 팬텀 타입 매개변수로 `std::marker::PhantomData`를 결합합니다.

```rust,editable
use std::marker::PhantomData;

// 숨겨진 매개변수 `B`로 `A`에 제네릭을 적용한 팬텀 튜플 구조입니다.
#[derive(PartialEq)] // 해당 타입에 대한 동등성 테스트를 수행합니다.
struct PhantomTuple<A, B>(A,PhantomData<B>);
.
// 숨겨진 매개변수 `B`로 `A`에 제네릭을 적용하는 팬텀 타입 구조입니다.
#[derive(PartialEq)] // 해당 타입에 대한 동등성 테스트를 수행합니다.
struct PhantomStruct<A, B> { first: A, phantom: PhantomData<B> }

// 주의 : 저장소는 제네릭 `A` 타입에 대해서는 할당되지만, `B`는 그렇지 않습니다.
// 그러므로, `B` 타입은 연산에 활용될 수 없습니다.

fn main() {
    // 여기, `f32`와 `f64`가 숨겨진 매개변수로 존재합니다.
    // PhantomTuple 타입은 `<char, f32>`로 명시될 수 있습니다.
    let _tuple1: PhantomTuple<char, f32> = PhantomTuple('Q', PhantomData);
    // PhantomTuple 타입은 `<char, f64>`로 명시될 수 있습니다.
    let _tuple2: PhantomTuple<char, f64> = PhantomTuple('Q', PhantomData);

    // 타입은 `<char, f32>`로 명시될 수 있습니다.
    let _struct1: PhantomStruct<char, f32> = PhantomStruct {
        first: 'Q',
        phantom: PhantomData,
    };
    // 타입은 `<char, f64>`로 명시될 수 있습니다.
    let _struct2: PhantomStruct<char, f64> = PhantomStruct {
        first: 'Q',
        phantom: PhantomData,
    };
    
    // ERROR : 아래는 타입이 불일치하여 비교될 수 없습니다.
    // 따라서 컴파일 에러가 발생합니다.
    println!("_tuple1 == _tuple2 yields: {}",
             _tuple1 == _tuple2);
    
    // ERROR : 아래는 타입이 불일치하여 비교될 수 없습니다.
    // 따라서 컴파일 에러가 발생합니다.
    println!("_struct1 == _struct2 yields: {}",
             _struct1 == _struct2);
}

```
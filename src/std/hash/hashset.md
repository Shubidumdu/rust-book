# HashSet

`HashSet`을 단순히 Key에 관심을 갖는 `HashMap`으로 간주해도 좋습니다. 실제로 `HashSet<T>`는 `HashMap<T, ()>`의 래퍼(wrapper)일 뿐입니다.

"그래서, 그게 무슨 소용인데요?"라고 묻는다면, "Key를 `Vec`에 보관하면 됩니다."

`HashSet`의 독특한 특징은 중복된 요소들을 갖지 않음을 보장한다는 것입니다. 이는 모든 Set 컬렉션들이 수행하는 조건입니다. `HashSet`은 그 중 하나의 구현일 뿐입니다. ([BTreeSet](https://doc.rust-lang.org/std/collections/struct.BTreeSet.html)도 확인해보세요.)

만약, `HashSet`에 이미 존재하는 값을 삽입한다면, 새로운 값이 기존의 값을 대체됩니다. 

`HashSet`은 중복값을 절대 허용하지 않거나, 이미 갖고있는 값에 대해 체크해야 할 때 매우 유용합니다.

반면, Set는 여전히 그 이상을 할 수 있습니다.

Set는 4가지 기본 작업을 수행합니다. 다음의 모든 호출들은 반복자(iterator)를 반환합니다.

- `union`: 두 Set의 합집합을 가져옵니다.
- `difference` : 첫번째 Set에는 있으나 두번째 Set에는 없는 모든 요소들을 가져옵니다.
- `intersection` : 두 Set의 교집합을 가져옵니다.
- `symmetric_difference` : 두 Set의 대칭차(symmetric difference)를 가져옵니다. (union - intersection)

아래 예시를 살펴봅시다.

```rust,editable
use std::collections::HashSet;

fn main() {
    let mut a: HashSet<i32> = vec![1i32, 2, 3].into_iter().collect();
    let mut b: HashSet<i32> = vec![2i32, 3, 4].into_iter().collect();

    assert!(a.insert(4));
    assert!(a.contains(&4));

    // 만약 이미 값이 존재하는 경우
    // `HashSet::insert()`는 `false`를 반환합니다.
    assert!(b.insert(4), "Value 4 is already in set B!");

    b.insert(5);

    // 컬렉션의 요소 타입이 `Debug`를 구현하는 경우,
    // 해당 요소의 컬렉션도 `Debug`를 구현합니다.
    // 이는 일반적으로 `[elem1, elem2, ...]`의 형태로 출력됩니다.
    println!("A: {:?}", a);
    println!("B: {:?}", b);

    // 임의의 순서로 `[1, 2, 3, 4, 5]`를 출력합니다.
    println!("Union: {:?}", a.union(&b).collect::<Vec<&i32>>());

    // 이는 `[1]`를 출력합니다.
    println!("Difference: {:?}", a.difference(&b).collect::<Vec<&i32>>());

    // 임의의 순서로 `[2, 3, 4]`를 출력합니다.
    println!("Intersection: {:?}", a.intersection(&b).collect::<Vec<&i32>>());

    // 이는 `[1, 5]`를 출력합니다.
    println!("Symmetric Difference: {:?}",
             a.symmetric_difference(&b).collect::<Vec<&i32>>());
}
```
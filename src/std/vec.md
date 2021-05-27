# Vectors

벡터는 가변적인 사이즈를 갖는 Array입니다. Slice와 유사하게, 이들 사이즈는 컴파일 시점에는 알 수 없고, 어느 때나 늘어나고 줄어들 수 있습니다. 벡터는 다음 3개의 파라미터로 표현될 수 있습니다.

- 데이터에 대한 포인터
- 길이
- 용량

용량(capacity)은 현재 해당 벡터에 예약된 메모리가 얼마나 되는지를 나타냅니다. 벡터는 이 용량 이하로만 길이를 늘릴 수 있습니다. 해당 용량을 초과해야 하는 경우라면, 벡터는 더 큰 용량으로 재할당됩니다.

```rust,editable
fn main() {
    // 순환자는 벡터에 의해 수집될 수 있습니다.
    let collected_iterator: Vec<i32> = (0..10).collect();
    println!("Collected (0..10) into: {:?}", collected_iterator);

    // `vec!` 매크로는 벡터를 초기화하기 위해 사용됩니다.
    let mut xs = vec![1i32, 2, 3];
    println!("Initial vector: {:?}", xs);

    // 벡터의 끝에 새로운 요소를 추가합니다.
    println!("Push 4 into the vector");
    xs.push(4);
    println!("Vector: {:?}", xs);

    // ERROR : immutable한 벡터는 길이가 늘어날 수 없습니다.
    collected_iterator.push(0);

    // `len` 메서드는 벡터에 현재 저장된 요소의 수를 반환합니다.
    println!("Vector length: {}", xs.len());

    // `[]`를 사용하여 인덱싱을 적용할 수 있습니다.
    println!("Second element: {}", xs[1]);

    // `pop`은 벡터의 마지막 값을 반환하고, 제거합니다.
    println!("Pop last element: {:?}", xs.pop());

    // ERROR : 벡터의 범위를 벗어나는 값에 대한 인덱싱은 에러를 유발합니다.
    println!("Fourth element: {}", xs[3]);

    // 벡터는 간단하게 순회될 수 있습니다.
    println!("Contents of xs:");
    for x in xs.iter() {
        println!("> {}", x);
    }

    // `enumerate()`메서드로 순회 인덱싱과 값을 별도로 구분하여 순회될 수도 있습니다.
    for (i, x) in xs.iter().enumerate() {
        println!("In position {} we have value {}", i, x);
    }

    // `iter_mut` 덕분에, mutable한 벡터는
    // 각각의 값에 대한 변경을 허용한 채로
    // 순회될 수도 있습니다!
    for x in xs.iter_mut() {
        *x *= 3;
    }
    println!("Updated vector: {:?}", xs);
}
```
# Arrays and Slices

Array는 동일한 타입의 값들이 모인 컬렉션입니다. 메모리에 연속적으로 저장됩니다. Array는 `[]` 괄호를 통해 생성되며, 그 길이는 `[T; length]`와 같은 형태로 작성하여 컴파일링 시점에 알려주어야 합니다.

Slices는 Array와 유사하지만, 컴파일링 차원에서 그 길이를 파악하지 않습니다. 대신, 슬라이스는 two-word 객체로, 첫번째는 데이터의 포인터를 가리키고, 두번째는 슬라이스의 길이를 나타냅니다. word의 크기는 x86-64의 프로세서 아키텍처(ex. 64bit)에 의해 결정되는 usize와 동일합니다. Slice는 한 Array의 일부를 가져오기 위해 `&[T]` 형식 선언으로 사용합니다.

```rs,editable
use std::mem;

// 아래 함수는 Array로부터 Slice를 가져옵니다.
fn analyze_slice(slice: &[i32]) {
  println!("first element of the slice: {}", slice[0]);
  println!("the slice has {} elements", slice.len());
}

fn main() {
  // 고정 사이즈 Array
  // 별도로 타입 선언이 없어도 됩니다.
  let xs: [i32; 5] = [1, 2, 3, 4, 5];

  // 모든 요소가 동일한 값(여기서는 `0`)으로 초기화할 수 있습니다.
  let ys: [i32; 500] = [0; 500];

  // 인덱싱은 `0`에서 시작합니다.
  println!("first element of the array: {}", xs[0]);
  println!("second element of the array: {}", xs[1]);

  // `len`은 Array의 요소 갯수를 반환합니다.
  println!("number of elements in array: {}", xs.len());

  // Array는 스택에 할당됩니다.
  println!("array occupies {} bytes", mem::size_of_val(&xs));

  // 기본적으로 모든 Array는
  // Slice로 제공될 수 있습니다.
  println!("borrow the whole array as a slice");
  analyze_slice(&xs);

  // Slice는 한 Array의 일부를 가리킬 수 있습니다.
  // [start_index .. end_index] 형태로 작성합니다.
  // start_index는 슬라이스가 시작될 지점이고,
  // end_index는 (슬라이스가 끝나는 지점 + 1)에 해당합니다.
  println!("borrow a section of the array as a slice");
  analyze_slice(&ys[1 .. 4]);

  // Array의 길이를 벗어나서 인덱싱을 하게되면 컴파일 에러가 발생합니다.
  println!("{}", xs[5]);
}
```
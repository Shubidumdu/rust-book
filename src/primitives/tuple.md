# Tuples

튜플은 여러 값들의 컬렉션입니다. 튜플은 `()` 괄호를 통해 생성되며, 튜플의 각 값들은 타입 시그니처의 값(`(T1, T2, ...)`)입니다. 튜플은 여러 값들을 보유할 수 있기 때문에, 함수에서 여러 값들을 반환하기 위해 튜플을 사용할 수 있습니다.

```rust,editable
use std::fmt;

// 튜플은 함수의 인수 혹은 반환값으로 사용될 수 있습니다.
// 아래는 두 타입의 값으로 구성된 튜플의 index를 서로 바꾸는 함수입니다.
fn reverse(pair: (i32, bool)) -> (bool, i32) {
  // `let`은 튜플의 각 구성원을 변수에 바인딩하는데 사용할 수 있습니다.
  let (integer, boolean) = pair;
  (boolean, integer)
}

#[derive(Debug)]
struct Matrix(f32, f32, f32, f32);

// 이전에 배웠던 fmt::Display 포맷을 Matrix 구조에 구현해봅시다.
impl fmt::Display for Matrix {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    write!(f, "( {} {} )\n", &self.0, &self.1)?;
    write!(f, "( {} {} )", &self.2, &self.3)
  }
}

//
fn transpose(matrix: Matrix) -> (matrix) {
  let (first, second, third, fourth) = matrix;
  (first, third, second, fourth)
}

fn main() {
  // 여러 타입의 값들을 담고 있는 튜플
  let long_tuple = (1u8, 2u16, 3u32, 4u64,
                    -1i8, -2i16, -3i32, -4i64,
                    0.1f32, 0.2f64,
                    'a', true);

  // 튜플의 각 값은 인덱싱을 통해 추출될 수 있습니다.
  println!("long tuple first value: {}", long_tuple.0);
  println!("long tuple second value: {}", long_tuple.1);

  // 튜플 역시도 다른 튜플의 값이 될 수 있습니다.
  let tuple_of_tuples = ((1u8, 2u16, 2u32), (4u64, -1i8), -2i16);

  // 튜플은 출력 가능(printable)합니다.
  println!("tuple of tuples: {:?}", tuple_of_tuples);
  
  // 허나 너무 긴 튜플은 출력할 수 없습니다.
  // 아래 코드는 컴파일 에러를 발생시킵니다.
  let too_long_tuple = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
  println!("too long tuple: {:?}", too_long_tuple);

  let pair = (1, true);
  println!("pair is {:?}", pair);
  println!("the reversed pair is {:?}", reverse(pair));

  // 하나의 요소만 갖는 튜플의 경우 `,`이 요구됩니다.
  println!("one element tuple: {:?}", (5u32,));
  println!("just an integer: {:?}", (5u32));

  // 튜플은 바인딩 생성을 위해 쪼개질 수 있습니다.
  let tuple = (1, "hello", 4.5, true);

  let (a, b, c, d) = tuple;
  println!("{:?}, {:?}, {:?}, {:?}", a, b, c, d);

  // 
  let matrix = Matrix(1.1, 1.2, 2.1, 2.2);
  println!("Matrix:\n{}", matrix);
  println!("Transpose:\n{}", transpose(matrix));
}
```
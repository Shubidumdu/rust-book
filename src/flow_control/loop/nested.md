# Nesting and labels

중첩 루프를 다룰 때, 바깥 쪽의 루프에 대해서도 `break`나 `continue`를 사용할 수 있습니다. 이를 위해선, 각 루프들에 대한 `'label`이 정의되어야 하며, 해당 라벨이 `break`나 `continue` 문에 전달되어야 합니다.

```rust,editable
#![allow(unreachable_code)]

fn main() {
    'outer: loop {
        println!("Entered the outer loop");

        'inner: loop {
            println!("Entered the inner loop");

            // 단순히 `break`를 사용하면 현재 루프를 멈춥니다.
            //break;

            // label을 함께 넘기면 지정한 label의 루프를 멈춥니다.
            break 'outer;
        }

        println!("This point will never be reached");
    }

    println!("Exited the outer loop");
}

```
# Drop

`Drop` 트레이트는 오직 하나의 메서드 `drop`만 갖습니다. 이는 객체가 스코프를 벗어났을 때 호출됩니다. `Drop` 트레이트의 주된 사용은 구현자 인스턴스가 소유한 리소스들을 비우기 위함입니다.

`Box`, `Vec`, `String`, `File`, 그리고 `Process`는 리소스를 비우기 위해 `Drop` 트레이트를 구현한 타입들의 예시입니다. `Drop` 트레이트는 커스텀 데이터 타입에 대해서 수동으로 구현될 수 있습니다.

아래는 `drop` 함수가 실행될 때 콘솔에 문구를 출력해보는 예시입니다.

```rust
struct Droppable {
    name: &'static str,
}

// `drop`에 콘솔 출력을 추가하는 간단한 구현입니다.
impl Drop for Droppable {
    fn drop(&mut self) {
        println!("> Dropping {}", self.name);
    }
}

fn main() {
    let _a = Droppable { name: "a" };

    // block A
    {
        let _b = Droppable { name: "b" };

        // block B
        {
            let _c = Droppable { name: "c" };
            let _d = Droppable { name: "d" };

            println!("Exiting block B");
        }
        println!("Just exited block B");

        println!("Exiting block A");
    }
    println!("Just exited block A");

    // `drop` 함수를 사용하면 수동으로 리소스를 해제할 수 있습니다.
    drop(_a);

    println!("end of the main function");

    // `_a`는 이미 위에서 `drop`되었기 때문에, 
    // 여기서 다시 `drop`이 호출되진 않습니다.
}
```
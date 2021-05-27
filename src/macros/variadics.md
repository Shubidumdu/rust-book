# Variadic Interface

가변 매크로(Variadic Interface)는 임의 개수의 인수들을 받습니다. 예를 들어, `println!`은 포맷스트링에 의해서 인수의 개수를 판단하는 Variadic Interface의 예시가 됩니다.

이전 섹션에서의 `calculate!` 매크로를 variadic하게 확장할 수 있습니다.

```rust,editable
macro_rules! calculate {
    // 단일 `eval` 패턴
    (eval $e:expr) => {{
        {
            let val: usize = $e; // Force types to be integers
            println!("{} = {}", stringify!{$e}, val);
        }
    }};

    // 여러 `eval`의 사용을 재귀적으로 분해합니다.
    (eval $e:expr, $(eval $es:expr),+) => {{
        calculate! { eval $e }
        calculate! { $(eval $es),+ }
    }};
}

fn main() {
    calculate! { 
      // 이제 임의적인 갯수의 인수들에 대해서도 처리할 수 있게 됐습니다!
        eval 1 + 2,
        eval 3 + 4,
        eval (2 * 3) + 1
    }
}
```
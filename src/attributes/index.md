# Attributes

어트리뷰트(attribute)는 일부 모듈, 크레이트 또는 항목(item)에 적용되는 메타데이터입니다. 이러한 메타데이터는 다음의 목적으로 사용됩니다.

- 코드의 조건부 컴파일
- 크레이트의 이름, 버전, 타입 (바이너리 혹은 라이브러리) 설정
- 린트 (lint, 또는 경고 : warnings) 비활성화
- 컴파일러 기능 활성화 (매크로, glob import 등)
- 외부 라이브러리에 대한 링크
- 유닛 테스트를 시행할 함수 표시
- 벤치마크의 일부가 될 함수 표시

어트리뷰트가 크레이트 전체에 적용될 때, 이들의 작성은 `#![crate_attribute]`가 되고, 하나의 모듈 또는 항목에 적용될 때, 이들의 작성은 `#[item_attribute]`가 됩니다. (`!`가 하나 사라졌음을 주의하세요.)

어트리뷰트는 다양한 형태로 인수를 전달받을 수 있습니다. :

- `#[attribute = "value"]`
- `#[attribute(key = "value")]`
- `#[attribute(value)]`

어트리뷰트는 여러 값들을 가질 수 있고, 여러 줄로 나누어 작성될 수도 있습니다.

```rust
#[attribute(value, value2)]


#[attribute(value, value2, value3,
            value4, value5)]
```
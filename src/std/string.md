# Strings

Rust에는 두 가지 타입의 String이 있습니다. : `String`과 `&str` 입니다.

`String`은 바이트 단위의 벡터에 저장됩니다. (`Vec<u8>`) 이는 항상 유효한 UTF-8 시퀀스임을 보장합니다. 또한 `String`은 힙에 할당되며, 길이가 가변적이면서, [Null-terminated](https://ko.wikipedia.org/wiki/%EB%84%90_%EC%A2%85%EB%8B%A8_%EB%AC%B8%EC%9E%90%EC%97%B4)가 아닙니다.

`&str`은 항상 유효한 UTF-8 시퀀스를 가리키는 Slice입니다. (`&[u8]`) 또, 이는 `String`처럼 보이도록 사용될 수 있습니다. 단순히 `&[T]`가 `Vec<T>`에 대한 보기인 것 처럼요.

```rust,editable
fn main() {
    // (모든 타입 선언은 사실 불필요합니다.)

    // 읽기 전용 메모리에 할당된 str에 대한 참조입니다.
    let pangram: &'static str = "the quick brown fox jumps over the lazy dog";
    println!("Pangram: {}", pangram);

    // 단어들을 거꾸로 순회합니다.
    // 새로운 문자열이 할당되지는 않습니다.
    println!("Words in reverse");
    for word in pangram.split_whitespace().rev() {
        println!("> {}", word);
    }

    // Char들을 벡터로 복사합니다.
    // 정렬 이후 중복값들을 없앱니다.
    let mut chars: Vec<char> = pangram.chars().collect();
    chars.sort();
    chars.dedup();

    // 비어있는 가변적인 `String`을 생성합니다.
    let mut string = String::new();
    for c in chars {
        // 문자열 끝에 char을 추가합니다.
        string.push(c);
        // 문자열 끝에 문자열을 추가합니다.
        string.push_str(", ");
    }

    // 잘라낸 문자열은 기존 문자열의 slice입니다.
    // 따라서 새로운 할당이 이루어지지는 않습니다.
    let chars_to_trim: &[char] = &[' ', ','];
    let trimmed_str: &str = string.trim_matches(chars_to_trim);
    println!("Used characters: {}", trimmed_str);

    // 힙에 문자열을 할당합니다.
    let alice = String::from("I like dogs");
    // 새로운 메모리를 할당하고 수정된 문자열을 저장합니다.
    let bob: String = alice.replace("dog", "cat");

    println!("Alice says: {}", alice);
    println!("Bob says: {}", bob);
}
```

`str`과 `String` 메서드에 대한 더 많은 내용은 각각의 모듈에 대한 문서를 참조하세요.

## Literals and escapes

특수문자가 포함된 문자열 리터럴을 작성하는 방법에는 여러가지가 있습니다. 모든 결과가 `&str`와 유사하기 때문에, 작성하기에 편한 방법을 선택하면 됩니다. 바이트 스트링 리터럴(Byte string literals)을 작성하는 방법에도 여러가지가 존재하며, 그 결과도 모두 `&[u8; N]`으로 동일합니다.

일반적으로 특수문자들은 백슬래시(`\`)로 이스케이프됩니다. 이를 통해, 출력될 수 없는 문자열 혹은 입력 방법을 모르는 문자열도 추가할 수 있습니다. 리터럴 백슬래시(백슬래시 그 자체)를 입력하고 싶다면, 이를 또다른 백슬래시로 이스케이핑하면 됩니다. (`\\`)

문자열 또는 캐릭터 리터럴 내에서 발생하는 따옴표도 이스케이프 처리되어야 합니다. (`"\""`, `'\''`)

```rust,editable
fn main() {
    // 16진수를 기반으로 바이트를 이스케이프 처리합니다.
    let byte_escape = "I'm writing \x52\x75\x73\x74!";
    println!("What are you doing\x3F (\\x3F means ?) {}", byte_escape);

    // 유니코드도 이스케이프 처리해봅시다.
    let unicode_codepoint = "\u{211D}";
    let character_name = "\"DOUBLE-STRUCK CAPITAL R\"";

    println!("Unicode character {} (U+211D) is called {}",
                unicode_codepoint, character_name );


    let long_string = "String literals
                        can span multiple lines.
                        The linebreak and indentation here ->\
                        <- can be escaped too!";
    println!("{}", long_string);
}
```

때때로, 이스케이프 처리해야 하는 문자열이 너무 많거나, 단순히 String을 출력 그 자체로 활용하고 싶을 수 있습니다. 이 경우 Raw 문자열 리터럴(Raw string literal)을 사용할 수 있습니다.

```rust,editable
fn main() {
    let raw_str = r"Escapes don't work here: \x3F \u{211D}";
    println!("{}", raw_str);

    // raw 문자열에서 따옴표가 필요한 `#s` 쌍을 추가합니다.
    let quotes = r#"And then I said: "There is no escape!""#;
    println!("{}", quotes);

    // 문자열에 "# 이 필요한 경우, `#`을 더 많이 사용합시다.
    // 사용할 수 있는 `#`의 수에는 제한이 없습니다.
    let longer_delimiter = r###"A string with "# in it. And even "##!"###;
    println!("{}", longer_delimiter);
}
```

UTF-8이 아닌 문자열을 원하나요? (`str`와 `String`이 항상 유효한 UTF-8임을 기억하세요.) 아니면 대부분이 텍스트인 바이트 배열을 원하나요? 바이트 문자열(Byte string)이 도와줄겁니다!

```rust,editable
use std::str;

fn main() {
    // 아래 변수는 `&str`이 아님을 기억하세요.
    let bytestring: &[u8; 21] = b"this is a byte string";

    // Byte Array는 `Display` 트레이트를 갖고 있지 않습니다.
    // 따라서 이를 출력하는 것은 조금 제한적입니다.
    println!("A byte string: {:?}", bytestring);

    // Byte String을 byte 이스케이프를 가질 수 있습니다.
    let escaped = b"\x52\x75\x73\x74 as bytes";
    println!("Some escaped bytes: {:?}", escaped);

    // ERROR : 하지만 유니코드는 이스케이프 할 수 없습니다.
    let escaped = b"\u{211D} is not allowed";

    // Raw 바이트 스트링은 Raw 스트링과 동일하게 동작합니다.
    let raw_bytestring = br"\u{211D} is not escaped here";
    println!("{:?}", raw_bytestring);

    // Byte array를 `str`로 변환하는 것은 실패합니다.
    if let Ok(my_str) = str::from_utf8(raw_bytestring) {
        println!("And the same as text: '{}'", my_str);
    }

    let _quotes = br#"You can also use "fancier" formatting, \
                    like with normal raw strings"#;

    // Byte 문자열은 UTF-8이 될 수 없습니다.
    let shift_jis = b"\x82\xe6\x82\xa8\x82\xb1\x82\xbb"; // "ようこそ" in SHIFT-JIS

    // 하지만 여전히 `str`로 변환될 수 없습니다.
    match str::from_utf8(shift_jis) {
        Ok(my_str) => println!("Conversion successful: '{}'", my_str),
        Err(e) => println!("Conversion failed: {:?}", e),
    };
}
```

캐릭터 인코딩 간의 변환은 [encoding](https://crates.io/crates/encoding) 크레이트를 참조하세요.

문자열 리터럴과 이스케이프 문자를 작성하는 구체적인 방법들은 [여기](https://doc.rust-lang.org/reference/tokens.html)에서 확인할 수 있습니다.
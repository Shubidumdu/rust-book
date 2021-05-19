Object.assign(window.search, {"doc_urls":["index.html#내가-보려고-만든-rust-book","hello/index.html#hello-world","hello/comment.html#comments","hello/print/index.html#formatted-print","hello/print/debug.html#debug"],"index":{"documentStore":{"docInfo":{"0":{"body":2,"breadcrumbs":3,"title":2},"1":{"body":10,"breadcrumbs":4,"title":2},"2":{"body":16,"breadcrumbs":4,"title":1},"3":{"body":85,"breadcrumbs":6,"title":2},"4":{"body":74,"breadcrumbs":6,"title":1}},"docs":{"0":{"body":"Rust By Example 을 보면서 개인적으로 개념을 익혀가기 위한 프로젝트입니다. 번역 작업 그 자체에 중점을 둔 것이 아닌, 오직 스스로의 학습을 위한 프로젝트이기 때문에 다소 불친절하게 번역되거나, 작성자가 임의로 내용을 변경할 수 있음을 알려드립니다.","breadcrumbs":"Introduction » 내가 보려고 만든 Rust Book","id":"0","title":"내가 보려고 만든 Rust Book"},"1":{"body":"// `//` 혹은 `/* ... */`을 통해 주석을 작성할 수 있습니다. /* 이는 컴파일링 단계에서 무시됩니다.\n*/ fn main() { println!(\"Hello World!\");\n} Rust는 다음 명령을 통해 파일을 바이너리로 컴파일링합니다. $ rustc <path> 컴파일 이후, 컴파일된 파일(확장자가 없음)을 실행하여 프로그램을 확인할 수 있습니다. $ ./hello\nHello World!","breadcrumbs":"Hello World » Hello, World!","id":"1","title":"Hello, World!"},"2":{"body":"// 혹은 /* ... */을 통해 코멘트를 작성할 수 있습니다. // 한줄 주석\n/* 여러 줄 주석\n*/ 이는 컴파일러에 의해 무시됩니다. Rust에서는 Expression 한 가운데에 주석이 껴있어도 문제가 없습니다. fn main() { let x = 5 + /* 90 + */ 5; println!(\"Is `x` 10 or 100? x = {}\", x); } ///와 //!는 Doc Comment라고 하며, 이에 대해선 추후에 다루겠습니다.","breadcrumbs":"Hello World » Comments » Comments","id":"2","title":"Comments"},"3":{"body":"std::fmt에 의해 정의된 매크로들에는 다음과 같은 것들이 있습니다. format!: String 타입으로 포맷 텍스트를 작성합니다. print! : format!과 동일하되, 콘솔에 이를 출력합니다. (io::stdout) println! : print!와 동일하되, 줄이 변경됩니다. eprint! : format!과 동일하되, standard error로 이를 출력합니다. (io::stderr) eprintln! : eprint!와 동일하되, 줄이 변경됩니다. 위의 매크로 모두 같은 방식으로 구문을 분석하며, 컴파일 시점에 포맷이 적합한지 체크됩니다. 여러 개의 인수를 가져와서 사용할 수도 있습니다. 별도로 0, 1과 같이 인덱싱을 하지 않더라도, 인수의 순서대로 사용합니다. fn main() { println!(\"{0}, this is {1}. {1}, this is {0}\", \"Tom\", \"Jack\");\n} 인수에 이름을 붙일 수도 있습니다. fn main() { println!( \"{subject} {verb} {object}\", object = \"the lazy dog\", subject = \"the quick brown fox\", verb = \"jumps over\" );\n} :<trait>를 붙여 특정 형태로 포맷을 적용하여 사용할 수 있습니다. 아래에서는 :b가 사용됐는데, 이는 이진법을 적용하여 변환한다는 뜻입니다. 따라서 아래는 인수 2를 받아 10으로 출력합니다. fn main() { println!( \"{} of {:b} people know binary, the other half doesn't\", 1, 2 );\n} 특정 width에 만족한 상태에서 우측 정렬으로 출력할 수도 있습니다. 아래는 1으로, 좌측에 5개의 여백이 생깁니다. fn main() { println!(\"{number:>width$}\", number = 1, width = 6);\n} 특정 width를 만족하도록 특정 값으로 padding을 채워넣을 수도 있습니다. 아래는 000001로 출력됩니다. fn main() { println!(\"{number:>0width$}\", number = 1, width = 6);\n} std::fmt은 텍스트 표시를 제어하는 여러 트레이트들을 포함하며, 아래 두 가지가 중요한 기본 형태입니다. fmt::Debug - {:?} 마커를 사용하며, 디버깅 목적으로 텍스트를 포맷합니다. fmt::Display - {} 마커를 사용하며, 좀더 유연하고 이용자 친화적인 형태로 텍스트를 포맷합니다. 위의 예시에서는 fmt::Display를 사용했는데, std 라이브러리는 해당 유형들에 대한 구현을 제공하기 때문입니다. fmt::Display 트레이트의 실행은 자동으로 ToString trait를 실행시켜 타입을 String으로 변환합니다.","breadcrumbs":"Hello World » Formatted Print » Formatted Print","id":"3","title":"Formatted Print"},"4":{"body":"트페이트를 포매팅하는 std::fmt를 사용하고자 하는 모든 타입들은 출력 가능해야 합니다. std 라이브러리에서와 같은 타입들에 대해서만 이 부분이 자동적으로 구현되어 있습니다. fn main() { println!(\"{:?} months in a year.\", 12); println!(\"{1:?} {0:?} is the {actor:?} name.\", \"Slater\", \"Christian\", actor=\"actor's\");\n} 그 외의 다른 타입들은 반드시 수동으로 이를 수행해주어야 합니다. fmt::Debug 트레이트는 이 과정을 상당히 직관적으로 만들어줍니다. 모든 타입들이 fmt::Debug 구현을 derive (자동 생성) 할 수 있습니다. 이는 반드시 수동적으로 구현해주어야 하는 fmt::Display에 대해서는 적용되지 않습니다. 아래의 structure는 현재로선 출력에 대해 구현하지 않았기 때문에 fmt::Display 혹은 fmt::Debug로 출력할 수 없습니다. struct UnPrintable(i32); fn main() { println!(\"{:?} would not print!\", Structure(3));\n} derive 어트리뷰트를 사용하면 fmt::Debug로 해당 struct를 출력가능하도록 자동으로 구현할 수 있습니다. #[derive(Debug)]\nstruct DebugPrintable(i32); fn main() { println!(\"Now {:?} will printed!\", DebugPrintable(3));\n} 여러 스트럭쳐들을 겹쳐 사용하는 경우에도 가능합니다. #[derive(Debug)]\nstruct Structure(i32); #[derive(Debug)]\nstruct Deep(Structure); fn main() { println!(\"Now {:?} will print!\", Deep(Structure(7)));\n} 위에서 본 것처럼, fmt::Debug는 분명 스트럭처를 인쇄 가능하도록 만들어주긴 하지만 썩 보기 좋은 형태는 아닙니다. 따라서 Rust는 {:#?}을 통해 \"이쁘게 출력\"하는 기능을 제공합니다. #[derive(Debug)]\nstruct Person<'a> { name: &'a str, age: u8\n} fn main() { let name = \"Peter\"; let age = 27; let peter = Person { name, age }; // Pretty print println!(\"{:#?}\", peter);\n}","breadcrumbs":"Hello World » Formatted Print » Debug » Debug","id":"4","title":"Debug"}},"length":5,"save":true},"fields":["title","body","breadcrumbs"],"index":{"body":{"root":{"0":{"0":{"0":{"0":{"0":{"1":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":2,"docs":{"3":{"tf":1.4142135623730951},"4":{"tf":1.0}}},"1":{"0":{"0":{"df":1,"docs":{"2":{"tf":1.0}}},"df":2,"docs":{"2":{"tf":1.0},"3":{"tf":1.0}}},"2":{"df":1,"docs":{"4":{"tf":1.0}}},"df":1,"docs":{"3":{"tf":2.6457513110645907}}},"2":{"7":{"df":1,"docs":{"4":{"tf":1.0}}},"df":1,"docs":{"3":{"tf":1.4142135623730951}}},"5":{"df":2,"docs":{"2":{"tf":1.4142135623730951},"3":{"tf":1.0}}},"6":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}},"9":{"0":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}},"a":{"c":{"df":0,"docs":{},"t":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"=":{"\"":{"a":{"c":{"df":0,"docs":{},"t":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"'":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":1,"docs":{"4":{"tf":1.0}}}}}},"df":0,"docs":{},"g":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}}},"b":{"df":1,"docs":{"3":{"tf":1.4142135623730951}},"i":{"df":0,"docs":{},"n":{"a":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{}}},"o":{"df":0,"docs":{},"o":{"df":0,"docs":{},"k":{"df":1,"docs":{"0":{"tf":1.0}}}}},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"w":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}}}}},"c":{"df":0,"docs":{},"h":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"a":{"df":0,"docs":{},"n":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}}}}}}},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}}}}}}}},"d":{"df":0,"docs":{},"e":{"b":{"df":0,"docs":{},"u":{"df":0,"docs":{},"g":{"df":1,"docs":{"4":{"tf":1.0}},"p":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"a":{"b":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"(":{"3":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{},"i":{"3":{"2":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"(":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":0,"docs":{},"r":{"df":0,"docs":{},"u":{"c":{"df":0,"docs":{},"t":{"df":0,"docs":{},"u":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.0}},"e":{"(":{"7":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"v":{"df":1,"docs":{"4":{"tf":1.4142135623730951}},"e":{"(":{"d":{"df":0,"docs":{},"e":{"b":{"df":0,"docs":{},"u":{"df":0,"docs":{},"g":{"df":1,"docs":{"4":{"tf":2.0}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"o":{"c":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"n":{"'":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}}}},"g":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.4142135623730951}},"l":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}}}}}}},"r":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"x":{"a":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"0":{"tf":1.0}}}}}},"df":0,"docs":{},"p":{"df":0,"docs":{},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"s":{"df":1,"docs":{"2":{"tf":1.0}}}}}}}}},"f":{"df":0,"docs":{},"m":{"df":0,"docs":{},"t":{":":{":":{"d":{"df":0,"docs":{},"e":{"b":{"df":0,"docs":{},"u":{"df":0,"docs":{},"g":{"df":2,"docs":{"3":{"tf":1.0},"4":{"tf":2.23606797749979}}}}},"df":0,"docs":{}},"i":{"df":0,"docs":{},"s":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"y":{"df":2,"docs":{"3":{"tf":1.7320508075688772},"4":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}},"n":{"df":4,"docs":{"1":{"tf":1.0},"2":{"tf":1.0},"3":{"tf":2.23606797749979},"4":{"tf":2.23606797749979}}},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"m":{"a":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":2.0}}}},"df":0,"docs":{}}},"x":{"df":1,"docs":{"3":{"tf":1.0}}}}},"h":{"a":{"df":0,"docs":{},"l":{"df":0,"docs":{},"f":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":1,"docs":{"1":{"tf":1.7320508075688772}}}}}}},"i":{"df":0,"docs":{},"o":{":":{":":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"r":{"df":1,"docs":{"3":{"tf":1.0}}}}},"o":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"df":0,"docs":{}}}},"df":0,"docs":{}},"df":0,"docs":{}}},"j":{"a":{"c":{"df":0,"docs":{},"k":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{},"u":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"k":{"df":0,"docs":{},"n":{"df":0,"docs":{},"o":{"df":0,"docs":{},"w":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"l":{"a":{"df":0,"docs":{},"z":{"df":0,"docs":{},"i":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{}},"m":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":4,"docs":{"1":{"tf":1.0},"2":{"tf":1.0},"3":{"tf":2.23606797749979},"4":{"tf":2.23606797749979}}}}},"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":1,"docs":{"4":{"tf":1.0}}}}}}},"n":{"a":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":1,"docs":{"4":{"tf":2.0}}}}},"df":0,"docs":{},"u":{"df":0,"docs":{},"m":{"b":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}}},"df":0,"docs":{}}}},"o":{"b":{"df":0,"docs":{},"j":{"df":0,"docs":{},"e":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}}},"df":0,"docs":{},"v":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"p":{"a":{"d":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"3":{"tf":1.0}}}}},"r":{"df":0,"docs":{},"s":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"<":{"'":{"a":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":1,"docs":{"4":{"tf":1.0}}}}}},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}}}}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"t":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":1,"docs":{"4":{"tf":1.0}}}}}},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":2,"docs":{"3":{"tf":1.7320508075688772},"4":{"tf":2.0}},"l":{"df":0,"docs":{},"n":{"!":{"(":{"\"":{"df":0,"docs":{},"h":{"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":1,"docs":{"1":{"tf":1.0}}}}}}},"i":{"df":1,"docs":{"2":{"tf":1.0}}},"n":{"df":0,"docs":{},"o":{"df":0,"docs":{},"w":{"df":1,"docs":{"4":{"tf":1.4142135623730951}}}}},"{":{"0":{"df":1,"docs":{"3":{"tf":1.0}}},"1":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{},"n":{"df":0,"docs":{},"u":{"df":0,"docs":{},"m":{"b":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{":":{">":{"0":{"df":0,"docs":{},"w":{"df":0,"docs":{},"i":{"d":{"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{}}}},"df":0,"docs":{},"w":{"df":0,"docs":{},"i":{"d":{"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{}}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":2,"docs":{"3":{"tf":1.7320508075688772},"4":{"tf":1.7320508075688772}}}}}}}}},"q":{"df":0,"docs":{},"u":{"df":0,"docs":{},"i":{"c":{"df":0,"docs":{},"k":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}}}},"r":{"df":0,"docs":{},"u":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"c":{"df":1,"docs":{"1":{"tf":1.0}}},"df":4,"docs":{"0":{"tf":1.4142135623730951},"1":{"tf":1.0},"2":{"tf":1.0},"4":{"tf":1.0}}}}}},"s":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.0}}}}}},"df":0,"docs":{}},"t":{"a":{"df":0,"docs":{},"n":{"d":{"a":{"df":0,"docs":{},"r":{"d":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}}},"d":{":":{":":{"df":0,"docs":{},"f":{"df":0,"docs":{},"m":{"df":0,"docs":{},"t":{"df":2,"docs":{"3":{"tf":1.4142135623730951},"4":{"tf":1.0}}}}}},"df":0,"docs":{}},"df":2,"docs":{"3":{"tf":1.0},"4":{"tf":1.0}}},"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.0}},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"g":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}}},"u":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"4":{"tf":2.449489742783178}},"u":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.0}},"e":{"(":{"3":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{},"i":{"3":{"2":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}},"u":{"b":{"df":0,"docs":{},"j":{"df":0,"docs":{},"e":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}}},"df":0,"docs":{}}},"t":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":1,"docs":{"3":{"tf":1.0}}},"s":{"df":0,"docs":{},"t":{"df":0,"docs":{},"r":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"r":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}}},"df":0,"docs":{}}},"u":{"8":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{},"n":{"df":0,"docs":{},"p":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"a":{"b":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"(":{"df":0,"docs":{},"i":{"3":{"2":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}}}},"v":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"b":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}},"df":0,"docs":{}}}},"w":{"df":0,"docs":{},"i":{"d":{"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":1,"docs":{"3":{"tf":2.0}}}}},"df":0,"docs":{}},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"l":{"d":{"df":1,"docs":{"1":{"tf":1.7320508075688772}}},"df":0,"docs":{}}}}},"x":{"df":1,"docs":{"2":{"tf":2.0}}},"y":{"df":0,"docs":{},"e":{"a":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}}}}},"breadcrumbs":{"root":{"0":{"0":{"0":{"0":{"0":{"1":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":2,"docs":{"3":{"tf":1.4142135623730951},"4":{"tf":1.0}}},"1":{"0":{"0":{"df":1,"docs":{"2":{"tf":1.0}}},"df":2,"docs":{"2":{"tf":1.0},"3":{"tf":1.0}}},"2":{"df":1,"docs":{"4":{"tf":1.0}}},"df":1,"docs":{"3":{"tf":2.6457513110645907}}},"2":{"7":{"df":1,"docs":{"4":{"tf":1.0}}},"df":1,"docs":{"3":{"tf":1.4142135623730951}}},"5":{"df":2,"docs":{"2":{"tf":1.4142135623730951},"3":{"tf":1.0}}},"6":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}},"9":{"0":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}},"a":{"c":{"df":0,"docs":{},"t":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"=":{"\"":{"a":{"c":{"df":0,"docs":{},"t":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"'":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":1,"docs":{"4":{"tf":1.0}}}}}},"df":0,"docs":{},"g":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}}},"b":{"df":1,"docs":{"3":{"tf":1.4142135623730951}},"i":{"df":0,"docs":{},"n":{"a":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{}}},"o":{"df":0,"docs":{},"o":{"df":0,"docs":{},"k":{"df":1,"docs":{"0":{"tf":1.4142135623730951}}}}},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"w":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}}}}},"c":{"df":0,"docs":{},"h":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"a":{"df":0,"docs":{},"n":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}}}}}}},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":2.0}}}}}}}}},"d":{"df":0,"docs":{},"e":{"b":{"df":0,"docs":{},"u":{"df":0,"docs":{},"g":{"df":1,"docs":{"4":{"tf":1.7320508075688772}},"p":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"a":{"b":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"(":{"3":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{},"i":{"3":{"2":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"(":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":0,"docs":{},"r":{"df":0,"docs":{},"u":{"c":{"df":0,"docs":{},"t":{"df":0,"docs":{},"u":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.0}},"e":{"(":{"7":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"v":{"df":1,"docs":{"4":{"tf":1.4142135623730951}},"e":{"(":{"d":{"df":0,"docs":{},"e":{"b":{"df":0,"docs":{},"u":{"df":0,"docs":{},"g":{"df":1,"docs":{"4":{"tf":2.0}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"o":{"c":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"n":{"'":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}}}},"g":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.4142135623730951}},"l":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}}}}}}},"r":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"x":{"a":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"0":{"tf":1.0}}}}}},"df":0,"docs":{},"p":{"df":0,"docs":{},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"s":{"df":1,"docs":{"2":{"tf":1.0}}}}}}}}},"f":{"df":0,"docs":{},"m":{"df":0,"docs":{},"t":{":":{":":{"d":{"df":0,"docs":{},"e":{"b":{"df":0,"docs":{},"u":{"df":0,"docs":{},"g":{"df":2,"docs":{"3":{"tf":1.0},"4":{"tf":2.23606797749979}}}}},"df":0,"docs":{}},"i":{"df":0,"docs":{},"s":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"y":{"df":2,"docs":{"3":{"tf":1.7320508075688772},"4":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}},"n":{"df":4,"docs":{"1":{"tf":1.0},"2":{"tf":1.0},"3":{"tf":2.23606797749979},"4":{"tf":2.23606797749979}}},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"m":{"a":{"df":0,"docs":{},"t":{"df":2,"docs":{"3":{"tf":2.449489742783178},"4":{"tf":1.0}}}},"df":0,"docs":{}}},"x":{"df":1,"docs":{"3":{"tf":1.0}}}}},"h":{"a":{"df":0,"docs":{},"l":{"df":0,"docs":{},"f":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":4,"docs":{"1":{"tf":2.23606797749979},"2":{"tf":1.0},"3":{"tf":1.0},"4":{"tf":1.0}}}}}}},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"d":{"df":0,"docs":{},"u":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"0":{"tf":1.0}}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}},"o":{":":{":":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"r":{"df":1,"docs":{"3":{"tf":1.0}}}}},"o":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"df":0,"docs":{}}}},"df":0,"docs":{}},"df":0,"docs":{}}},"j":{"a":{"c":{"df":0,"docs":{},"k":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{},"u":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"k":{"df":0,"docs":{},"n":{"df":0,"docs":{},"o":{"df":0,"docs":{},"w":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"l":{"a":{"df":0,"docs":{},"z":{"df":0,"docs":{},"i":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{}},"m":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":4,"docs":{"1":{"tf":1.0},"2":{"tf":1.0},"3":{"tf":2.23606797749979},"4":{"tf":2.23606797749979}}}}},"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":1,"docs":{"4":{"tf":1.0}}}}}}},"n":{"a":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":1,"docs":{"4":{"tf":2.0}}}}},"df":0,"docs":{},"u":{"df":0,"docs":{},"m":{"b":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}}},"df":0,"docs":{}}}},"o":{"b":{"df":0,"docs":{},"j":{"df":0,"docs":{},"e":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}}},"df":0,"docs":{},"v":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"p":{"a":{"d":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"3":{"tf":1.0}}}}},"r":{"df":0,"docs":{},"s":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"<":{"'":{"a":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":1,"docs":{"4":{"tf":1.0}}}}}},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.7320508075688772}}}}}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"t":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":1,"docs":{"4":{"tf":1.0}}}}}},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":2,"docs":{"3":{"tf":2.23606797749979},"4":{"tf":2.23606797749979}},"l":{"df":0,"docs":{},"n":{"!":{"(":{"\"":{"df":0,"docs":{},"h":{"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":1,"docs":{"1":{"tf":1.0}}}}}}},"i":{"df":1,"docs":{"2":{"tf":1.0}}},"n":{"df":0,"docs":{},"o":{"df":0,"docs":{},"w":{"df":1,"docs":{"4":{"tf":1.4142135623730951}}}}},"{":{"0":{"df":1,"docs":{"3":{"tf":1.0}}},"1":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{},"n":{"df":0,"docs":{},"u":{"df":0,"docs":{},"m":{"b":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{":":{">":{"0":{"df":0,"docs":{},"w":{"df":0,"docs":{},"i":{"d":{"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{}}}},"df":0,"docs":{},"w":{"df":0,"docs":{},"i":{"d":{"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{}}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":2,"docs":{"3":{"tf":1.7320508075688772},"4":{"tf":1.7320508075688772}}}}}}}}},"q":{"df":0,"docs":{},"u":{"df":0,"docs":{},"i":{"c":{"df":0,"docs":{},"k":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}}}},"r":{"df":0,"docs":{},"u":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"c":{"df":1,"docs":{"1":{"tf":1.0}}},"df":4,"docs":{"0":{"tf":1.7320508075688772},"1":{"tf":1.0},"2":{"tf":1.0},"4":{"tf":1.0}}}}}},"s":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.0}}}}}},"df":0,"docs":{}},"t":{"a":{"df":0,"docs":{},"n":{"d":{"a":{"df":0,"docs":{},"r":{"d":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}}},"d":{":":{":":{"df":0,"docs":{},"f":{"df":0,"docs":{},"m":{"df":0,"docs":{},"t":{"df":2,"docs":{"3":{"tf":1.4142135623730951},"4":{"tf":1.0}}}}}},"df":0,"docs":{}},"df":2,"docs":{"3":{"tf":1.0},"4":{"tf":1.0}}},"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.0}},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"g":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}}},"u":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"4":{"tf":2.449489742783178}},"u":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.0}},"e":{"(":{"3":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{},"i":{"3":{"2":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}},"u":{"b":{"df":0,"docs":{},"j":{"df":0,"docs":{},"e":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}}},"df":0,"docs":{}}},"t":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":1,"docs":{"3":{"tf":1.0}}},"s":{"df":0,"docs":{},"t":{"df":0,"docs":{},"r":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"r":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}}},"df":0,"docs":{}}},"u":{"8":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{},"n":{"df":0,"docs":{},"p":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"a":{"b":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"(":{"df":0,"docs":{},"i":{"3":{"2":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}}}},"v":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"b":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}},"df":0,"docs":{}}}},"w":{"df":0,"docs":{},"i":{"d":{"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":1,"docs":{"3":{"tf":2.0}}}}},"df":0,"docs":{}},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"l":{"d":{"df":4,"docs":{"1":{"tf":2.23606797749979},"2":{"tf":1.0},"3":{"tf":1.0},"4":{"tf":1.0}}},"df":0,"docs":{}}}}},"x":{"df":1,"docs":{"2":{"tf":2.0}}},"y":{"df":0,"docs":{},"e":{"a":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.0}}}},"df":0,"docs":{}}}}},"title":{"root":{"b":{"df":0,"docs":{},"o":{"df":0,"docs":{},"o":{"df":0,"docs":{},"k":{"df":1,"docs":{"0":{"tf":1.0}}}}}},"c":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}}}}}}},"d":{"df":0,"docs":{},"e":{"b":{"df":0,"docs":{},"u":{"df":0,"docs":{},"g":{"df":1,"docs":{"4":{"tf":1.0}}}}},"df":0,"docs":{}}},"df":0,"docs":{},"f":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"m":{"a":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}}}}},"h":{"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":1,"docs":{"1":{"tf":1.0}}}}}}},"p":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.0}}}}}}},"r":{"df":0,"docs":{},"u":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":1,"docs":{"0":{"tf":1.0}}}}}},"w":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"l":{"d":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}}}}}}},"lang":"English","pipeline":["trimmer","stopWordFilter","stemmer"],"ref":"id","version":"0.9.5"},"results_options":{"limit_results":30,"teaser_word_count":30},"search_options":{"bool":"OR","expand":true,"fields":{"body":{"boost":1},"breadcrumbs":{"boost":1},"title":{"boost":2}}}});
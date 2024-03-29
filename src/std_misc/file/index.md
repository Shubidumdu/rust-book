# File I/O

`File` 구조는 열려 있는 파일을 나타내며, 기본 파일에 대한 읽기 또는 쓰기 권한을 제공합니다.

파일 I/O를 수행하는 동안에는 많은 문제가 발생할 수 있으므로, 모든 파일 메서드는 `io:Result<T>` 타입을 반환합니다. 이는 `Result<T, io::Error>`의 별칭입니다.

이를 통해 모든 I/O 작업의 실패를 명시적으로 처리할 수 있습니다. 덕분에 개발자들은 모든 실패 경로를 확인할 수 있으며, 이를 사전 예방할 수 있게끔 할 수 있습니다.
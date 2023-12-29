# Chocoya Todo 
초코야 투두는 '초코야 프로젝트'로 진행되는 투두 리스트 어플리케이션 입니다.


## 준비사항
- Node.js
- pnpm
- Rust

## 빌드 및 설치
프로젝트를 클론한 뒤 프로젝트 폴더로 이동하여 다음 명령어들을 수행합니다.
```
git pull
pnpm install
pnpm tauri build
```

### Windows (작성중)
다음 파일을 실행하면 설치할 수 있습니다
```
(Project Directory)/target/
```

### Mac OS
빌드후 자동으로 Dmg 가 열리니, Applications 폴더로 이동시켜주면 됩니다

## 빌드 없이 실행
Release 를 통해 빌드 파일을 받을 수 있지만, 인증을 하지 않은 앱이기 때문에 문제가 좀 있습니다.

### Windows
(모름)

### Mac OS
DMG를 통해 applications 으로 이동 시켜준 뒤 오른쪽 클릭 후 열기를 눌러줍니다. (첫실행은 이 방식으로 열어야 합니다.)

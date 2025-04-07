## ✅ common과 special로 나누는 이유

### 🔹 common: 범용적으로 재사용 가능한 컴포넌트

- 여러 페이지나 기능에서 반복적으로 사용하는 기초 UI 컴포넌트들
- 디자인 시스템에 가까운 구성요소

예시

- Button
- Input
- Modal
- Avatar
- Tooltip

📦 이 컴포넌트들은 특정한 기능이나 도메인에 의존하지 않고, 다양한 곳에서 재사용

---

<br>

### 🔹 special: 특정 목적이나 도메인에 맞춰진 컴포넌트

- 특정 기능(페이지, 섹션 등)에 맞게 구성된 복합 컴포넌트 또는 특화 컴포넌트
- API나 비즈니스 로직과 밀접한 경우도 있음

예시

- BookCard, ProductItem, UserProfile
- LoginForm, ReviewSection

📦 이 컴포넌트들은 어느 정도 맥락이 있는 데이터나 기능을 전제로 만들어졌기 때문에, 재사용 범위는 제한적

---

<br>

### ✅ 왜 이렇게 나누는 게 좋을까?

| 구분      | 설명                        | 장점                                                   |
| --------- | --------------------------- | ------------------------------------------------------ |
| `common`  | 작고 재사용 가능한 컴포넌트 | - 재사용성 ↑ <br> - 테스트/유지보수 쉬움               |
| `specail` | 특정 페이지를 위한 컴포넌트 | - 목적에 맞게 최적화 <br> - context나 데이터 포함 가능 |

---

<br>

### ✅ Storybook 기준에서 나눌 때 장점

- Storybook 탐색이 쉬워져요  
  → 공통 컴포넌트는 common에서 찾고, 기능별 UI는 special에서 찾을 수 있어요.

- 디자인 시스템 정리에도 효과적  
  → common은 디자인 시스템 문서로도 활용 가능.

- 개발자 협업에 명확함  
  → 이 컴포넌트가 재사용 가능한지, 특정 도메인용인지 한눈에 알 수 있어요.

---

<br>

### ✅ 실제 Storybook 구조 예시

```css
📁 components/
  ├── common/
  │   ├── Button/
  │   ├── Input/
  ├── special/
  │   ├── BookCard/
  │   ├── ReviewForm/

📁 stories/
  ├── common/
  │   └── Button.stories.tsx
  ├── special/
  │   └── BookCard.stories.tsx
```

---

### ✅ 정리하면

common과 special로 나누는 건 단순한 분류가 아니라
➡ "재사용 가능성 + 기능 의존성" 기준으로 역할을 나눈 설계 전략

💡 유지보수성과 협업 효율을 위해서도 이 구조는 매우 유용

---

<br>

### ✅ packages 폴더에 컴포넌트를 작성하는 경우

Monorepo 구조 또는 Design System을 따로 관리하려는 경우에 일반적으로 사용되는 방식

### ✅ 언제 packages 폴더를 쓰나?

- 디자인 시스템 컴포넌트를 따로 모듈로 분리하고 싶을 때
- 여러 앱에서 공통으로 사용하는 컴포넌트를 만들고 관리할 때
- Monorepo (TurboRepo, Nx 등)를 사용하는 경우
- npm에 배포할 UI 라이브러리를 만드는 경우

---

<br>

### monorepo, turborepo 구조

- apps/storybook: Storybook 전용 앱
- packages/ui: 실제 UI 컴포넌트들이 들어 있는 패키지
- .stories.tsx 파일은 apps/storybook 안에서 관리

#### 📁 전체 폴더 구조 예시

```
/
├── apps/
│   ├── web/                     # 실제 웹 앱
│   └── storybook/               # ✅ Storybook 전용 앱
│       ├── .storybook/          # Storybook 설정
│       │   ├── main.ts
│       │   ├── preview.ts
│       └── stories/             # ✅ 스토리 파일 모음
│           ├── Button.stories.tsx
│           ├── Input.stories.tsx
│           └── ...
├── packages/
│   └── ui/                      # ✅ 컴포넌트 패키지
│       ├── src/
│       │   ├── components/
│       │   │   ├── Button.tsx
│       │   │   ├── Input.tsx
│       │   │   └── index.ts
│       ├── index.ts
│       └── package.json
├── package.json
├── turbo.json / nx.json         # (선택) monorepo 툴 설정
```

---

<br>

### 🔍 barrelsby의 역할

`barrelsby`는 단순히 "barrel file" — 즉, 폴더 내부에 있는 모듈을 한데 모아서 `index.ts`로 자동 생성해주는 도구

예를 들어 packages/ui/src/components/ 안에 여러 컴포넌트가 있으면, 이렇게 만들어준다.

```ts
// packages/ui/src/components/index.ts
export * from './Button';
export * from './Modal';
export * from './Accordion';
```

이걸 다시 src/index.ts에서 import 하게 만들어두면:

```ts
// packages/ui/src/index.ts
export * from './components';
export * from './common';
export * from './special';
```

그리고 나서 이걸 packages/ui/index.ts에서:

```ts
// packages/ui/index.ts
'use client';
export * from './src';
```

최종적으로는 @yb/ui로 가져올 수 있게 된다(package.json 에 name 설정이 되어있다면)

```json
{
  "name": "@yb/ui",
  "version": "1.0.0",
  "private": true,
  "exports": {
    ".": "./index.ts",
    "./css/*.css": "./src/assets/css/*.css"
  }
}
```

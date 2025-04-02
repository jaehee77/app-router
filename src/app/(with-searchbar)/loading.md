### loading.tsx 주의사항

1. loading.tsx 파일은 현재 경로에 있는 페이지 컴포넌트뿐만 아니라 마치 레이아웃 파일처럼  
   해당 경로 아래에 있는 모든 비동기(async) 페이지 컴포넌트들을 모두 스트리밍 되도록 설정하다.
2. 스트리밍하도록 설정하는 페이지 컴포넌트는 async라는 키워드가 붙은 비동기로 작동하도록 설정된  
   페이지 컴포넌트(일반 컴포넌트아님)에만 스트리밍을 제공한다.  
   (비동기 컴포넌트가 아니라면 데이터를 불러오지 않는다는 의미이기 때문에)
3. 주소 변경이 아닌 쿼리스트링만 변경되는 경우에는 스트리밍이 동작하지 않는다.  
   ex. 처음 서치페이지 진입시에는 주소가 변경되면서 /search?q=aaa 스트리밍이 동작하지만  
   서치페이지 진입후 재검색시 쿼리스트링만 변경되면 스트리밍이 동작하지 않는다.

<br>

### 컴포넌트 스트리밍(페이지 컴포넌트가 아닌 컴포넌트에 스트리밍을 적용하는 방법)

1. `Suspense` 로 설정

```javascript
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>,
}) {
  const params = await searchParams;
  const query = params.q;
  return (
    <Suspense key={query} fallback={<div>Loading...</div>}>
      <SearchResult q={query || ''} />
    </Suspense>
  );
}
```

> key 값을 넘겨주면서 컴포넌트를 리렌더링시키도록 함(컴포넌트를 새롭게 그림)



'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error.message);
  }, [error]);

  const router = useRouter();

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      {/* 1번 방법 */}
      {/* 브라우저 측에서 즉, 클라이언트측에서만 현재 서버로부터 전달받은 데이터를 이용해 화면을 
        다시 렌더링해보기만 하는 메소드임. 즉, 서버측에서 실행되는 서버 컴포넌트를 다시 실행하지는 않음 
      */}
      {/* <button onClick={() => reset()}>다시 시도</button> */}

      {/* 2번 방법 */}
      {/* 브라우저에 보관해뒀던 스테이트나 클라이언트 컴포넌트들의 각종 데이터, 에러가 발생하지 않은 레이아웃이나 
      다른 컴포넌트까지 완전히 새롭게 렌더링되기 때문에 추천되는 방법은 아님
      */}
      {/* <button onClick={() => window.location.reload()}>다시 시도</button> */}

      {/* 3번 방법 */}
      {/* 현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴 */}
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴
            reset(); // 에러 상태를 초기화, 컴포넌트들을 다시 렌더링
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}

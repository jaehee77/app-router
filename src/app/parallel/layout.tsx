import { ReactNode } from 'react';

// Slot(슬롯) : 병렬로 렌더링 될 페이지 컴포넌트를 보관하는 폴더
// 예시 : @sidebar/

export default function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

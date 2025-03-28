import { ReactNode } from 'react';

export default function TestLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>testSub2 Layout.tsx(중첩 레이아웃 설정)</div>
      {children}
    </div>
  );
}

'use client';

import { createReviewAction } from '@/actions/create-review.action';
import style from '@/css/index.module.scss';
import { useActionState, useEffect } from 'react';

export default function ReviewEditor({ bookId }: { bookId: string }) {
  // form 액션함수, 폼의 상태 초기값
  // state : 상태값
  // 2번째: 함수
  // 3번째 : 로딩상태
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section className={style.review_editor}>
      <form action={formAction} className={style.form_container}>
        <input type="hidden" name="bookId" value={bookId} readOnly />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={style.submit_container}>
          <input
            type="text"
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
          />
          <button type="submit" disabled={isPending}>
            {isPending ? '...' : '작성하기'}
          </button>
        </div>
      </form>
    </section>
  );
}

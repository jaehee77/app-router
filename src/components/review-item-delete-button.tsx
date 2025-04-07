'use client';

import deleteReviewAction from '@/actions/delete-review.action';
import { useActionState, useEffect, useRef } from 'react';

export default function ReviewItemDeleteButton({
  bookId,
  reviewId,
}: {
  bookId: number;
  reviewId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} ref={formRef}>
      <input hidden name="reviewId" value={reviewId} readOnly />
      <input hidden name="bookId" value={bookId} readOnly />
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
}

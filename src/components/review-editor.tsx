import { createReviewAction } from '@/actions/create-review.action';
import style from '@/css/index.module.scss';

export default function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section className={style.review_editor}>
      <form action={createReviewAction} className={style.form_container}>
        <input type="hidden" name="bookId" value={bookId} readOnly />
        <textarea required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          <input type="text" required name="author" placeholder="작성자" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}

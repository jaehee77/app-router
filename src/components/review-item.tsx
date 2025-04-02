import { ReviewData } from '@/types';
import style from '@/css/index.module.scss';

export default function ReviewItem({
  id,
  content,
  author,
  createAt,
  bookId,
}: ReviewData) {
  return (
    <div className={style.review_item}>
      <div className={style.author}>{author}</div>
      <div className={style.content}>{content}</div>
      <div className={style.bottom_container}>
        <div className={style.date}>{new Date(createAt).toLocaleString()}</div>
        <div className={style.delete_btn}>삭제하기</div>
      </div>
    </div>
  );
}

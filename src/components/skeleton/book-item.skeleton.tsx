import style from '@/css/index.module.scss';

export default function BookItemSkeleton() {
  return (
    <div className={style.skeleton_container}>
      <div className={style.cover_img}></div>
      <div className={style.info_container}>
        <div className={style.title}></div>
        <div className={style.subtitle}></div>
        <br />
        <div className={style.author}></div>
      </div>
    </div>
  );
}

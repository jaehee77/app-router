import BookItem from '@/components/book-item';
import BookItemSkeleton from '@/components/skeleton/book-item.skeleton';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import style from '@/css/index.module.scss';
import books from '@/mock/books.json';
import { BookData } from '@/types';
import { delay } from '@/util/delay';
import { Suspense } from 'react';

// export const dynamic = 'force-dynamic';

// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : 기본값, 아무것도 강제하지 않음
// 2. force-dynamic : 페이지를 강제로 Dynamic 페이지로 설정
// 3. force-static : 페이지를 강제로 Static 페이지로 설정
// 4. error : 페이지를 강제롤 Static 페이지로 설정하지만
// 빌드시 설정하면 안되는 이유에 대한 빌드 오류를 알려줌

async function AllBooks() {
  await delay(1500);
  const reponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: 'force-cache' }
  );

  if (!reponse.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allBooks: BookData[] = await reponse.json();
  // console.log(allBooks);

  return (
    <>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}

async function RecoBooks() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    {
      next: {
        revalidate: 3,
      },
    }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
}

export default function Home() {
  // const reponse = await fetch(`http://localhost:12345/book`);
  // const allBooks = await reponse.json();
  // console.log(allBooks);

  return (
    <div className={style.content}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {/* <BookItemSkeleton /> */}
        <Suspense fallback={<BookListSkeleton count={2} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}

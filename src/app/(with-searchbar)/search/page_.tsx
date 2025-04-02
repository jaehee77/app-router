import books from '@/mock/books.json';
import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import { delay } from '@/util/delay';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await delay(1500);
  const params = await searchParams; // 👈 비동기적으로 값을 가져옴
  const query = params.q || '';
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${query}`,
    { cache: 'force-cache' }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

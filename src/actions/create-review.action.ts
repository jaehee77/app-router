'use server';

import { delay } from '@/util/delay';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function createReviewAction(state: any, formData: FormData) {
  // console.log('server action called');
  // console.log(formData);

  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();
  // console.log(bookId,content, author);

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: '리뷰 내용과 작성자를 작성해 주세요.',
    };
  }

  try {
    await delay(2000);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    // console.log(response.status);

    // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);

    // 2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath(`/book/[id]`, 'page');

    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath(`/(with-searchbar)`, 'layout');

    // 4. 모든 데이터 재검증
    // revalidatePath(`/`, 'layout');

    // 5. 태그값을 기준으로 데이터 캐시 재검증
    // fetch 에서 옵션중 태그 설정 { next: { tags: [`review-${bookId}`] } }
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    revalidateTag(`review-${bookId}`);
    return {
      status: true,
      error: '',
    };

    // console.log(response.status);
  } catch (err) {
    // console.error(err);
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다 : ${err}`,
    };
  }
}

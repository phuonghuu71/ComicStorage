export async function getComicByComicId<Data>(url: string, comicId: string) {
  const res = await fetch(`${url}/api/comic/get-by-comic-id/${comicId}`, {
    next: {
      revalidate: 10,
    },
  });

  return res.json() as Data;
}

export async function getChapterByChapterId<Data>(
  url: string,
  chapterId: string
) {
  const res = await fetch(`${url}/api/chapter/get-chapter-by-id/${chapterId}`, {
    next: {
      revalidate: 30,
    },
  });

  return res.json() as Data;
}

// Fetch all chapters without paginating
export async function getChaptersByComicId<Data>(url: string, comicId: string) {
  const res = await fetch(`${url}/api/chapter/${comicId}/all`, {
    next: {
      revalidate: 60,
    },
  });

  return res.json() as Data;
}

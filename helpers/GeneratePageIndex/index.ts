type pageProps = {
  pageIndex: number;
};

export function GeneratePageIndex(
  pageSize: number,
  firstIndex: number,
  pageCount: number
) {
  const pages: pageProps[] = [];

  const startWidth = firstIndex < 0 ? 0 : firstIndex;

  const endWidth =
    pageSize + startWidth > pageCount ? pageSize + startWidth - pageCount : 0;

  for (
    let i = startWidth - endWidth;
    i < pageSize + startWidth - endWidth;
    i++
  ) {
    pages.push({
      pageIndex: i,
    });
  }

  return pages;
}

export default GeneratePageIndex;

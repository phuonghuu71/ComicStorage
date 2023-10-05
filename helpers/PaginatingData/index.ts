import { NextApiRequest } from "next";

export function PaginatingData(req: NextApiRequest) {
  const url = new URL(req.url || "");
  const searchParams = new URLSearchParams(url.search);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const _page = Number(page);
  const _limit = Number(limit);
  const _startIndex = (_page - 1) * _limit;

  return {
    _limit,
    _startIndex,
  };
}

export default PaginatingData;

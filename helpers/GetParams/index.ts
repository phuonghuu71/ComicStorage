import { useSearchParams } from "next/navigation";

export function GetParams(value: string) {
  const getParams = useSearchParams();
  const output = getParams.get(value);
  return output;
}

export default GetParams;

import { ComicType } from "@validators/Comic";

import {
  ClockIcon,
  EyeIcon,
  TagIcon,
  UserIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";

import Image from "next/image";
import parse from "html-react-parser";

interface ComicDescriptionProps {
  comicData: ComicType;
  uploader: User;
}

export function ComicDescription({
  comicData,
  uploader,
}: ComicDescriptionProps) {
  return (
    <Card className="h-fit pt-6 w-fit flex flex-col items-center max-w-md shrink-0">
      <CardHeader className="relative max-w-[350px] max-h-[500px] m-0 shadow-none">
        <Image
          width={500}
          height={500}
          src={comicData.cover}
          alt="cover"
          className="object-cover w-full h-full"
        />
      </CardHeader>

      <CardBody className="pb-0 min-w-lg">
        <Typography
          as={"h2"}
          variant="h2"
          className="text-purple-500 text-lg text-center mb-4"
        >
          {comicData.name}
        </Typography>

        <div>
          <Typography as={"h3"} variant="h3" className="text-lg mb-2">
            Description
          </Typography>

          <Typography as={"div"} variant="paragraph" className="text-justify">
            {parse(comicData.description)}
          </Typography>
        </div>
      </CardBody>

      <CardFooter className="w-full">
        <div className="flex gap-2 mb-2">
          <div className="flex items-center gap-x-1 shrink-0">
            <UserIcon className="w-4 h-4" strokeWidth={2} />
            Uploader:
          </div>
          <Typography as={"a"} variant="paragraph" href="/">
            {uploader.name}
          </Typography>
        </div>

        <div className="flex gap-2 mb-2">
          <div className="flex items-center gap-x-1 shrink-0">
            <WifiIcon className="w-4 h-4" strokeWidth={2} />
            Status:
          </div>
          <Typography as={"a"} variant="paragraph" href="/">
            {comicData.status}
          </Typography>
        </div>

        <div className="flex gap-2 mb-2">
          <div className="flex items-center gap-x-1 shrink-0">
            <EyeIcon className="w-4 h-4" strokeWidth={2} />
            Views:
          </div>
          <Typography as={"a"} variant="paragraph">
            {comicData.views}
          </Typography>
        </div>

        <div className="flex gap-2 mb-2">
          <div className="flex items-center gap-x-1 shrink-0">
            <ClockIcon className="w-4 h-4" strokeWidth={2} />
            Last Update:
          </div>
          <Typography as={"a"} variant="paragraph" href="/">
            07/09/2023 14:42
          </Typography>
        </div>

        <div className="flex flex-wrap justify-start items-center gap-2">
          <div className="flex items-center gap-x-1 shrink-0">
            <TagIcon className="w-4 h-4" strokeWidth={2} />
            Tags:
          </div>

          {comicData?.tags.map((tag, i) => (
            <Chip key={i} variant="gradient" value={tag} />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

export default ComicDescription;

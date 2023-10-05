"use client";

import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";

interface TopComicProps {
  title: string;
  viewCount: number;
}

export interface TabDataProps {
  label: string;
  value: string;
  desc: TopComicProps[];
}

export function TabList({ data }: { data: TabDataProps[] }) {
  return (
    <Tabs value={data[0].value}>
      <TabsHeader
        indicatorProps={{
          className: "bg-gray-900/10 shadow-none !text-gray-900",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>

      <TabsBody
        animate={{
          initial: {
            y: 250,
          },
          mount: {
            y: 0,
          },
          unmount: {
            y: 250,
          },
        }}
      >
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            <Typography as={"ul"}>
              {desc.map((value, i) => (
                <Typography
                  key={i}
                  as={"li"}
                  className="flex justify-between items-center group mb-2 last:mb-0"
                >
                  <Typography
                    as={"a"}
                    href="/"
                    variant="h3"
                    className="group-hover:text-purple-500 text-base font-medium max-w-xs line-clamp-1"
                  >
                    {i + 1}. {value.title}
                  </Typography>

                  <Typography as={"p"} className="shrink-0">
                    {value.viewCount
                      .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  </Typography>
                </Typography>
              ))}
            </Typography>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}

export default TabList;

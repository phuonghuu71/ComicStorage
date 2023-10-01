import { urlType } from "@/components/ui/molecules/ChapterItem";
import { UploadableFile } from "@/components/ui/molecules/MultipleFilesUpload";
import React from "react";

export interface UseDragDropProps {
  widgets: UploadableFile[];
  onDropHandler: (e: React.DragEvent) => void;
  onDragOverHandler: (e: React.DragEvent) => void;
  onDragStartHandler: (idx: number) => void;
  onDragEnterHandler: (idx: number) => void;
  onDragEndHandler: () => void;
  onDeleteHandler: (idx: number) => void;
}

export default function useDragDrop() {
  const [widgets, setWidgets] = React.useState<UploadableFile[]>([]);
  const dragItem = React.useRef<number>(0);
  const dragOverItem = React.useRef<number>(0);

  function onDropHandler(e: React.DragEvent) {
    const widgetType = e.dataTransfer.getData("widgetType") as string;
    if (widgetType)
      setWidgets((prev) => {
        const parsedWidgetType = JSON.parse(widgetType) as UploadableFile;
        if (parsedWidgetType.url) {
          const checkExist = prev.some((value) => {
            const currVal = JSON.parse(
              JSON.stringify(value.url) || ""
            ) as urlType;
            const compareVal = JSON.parse(
              JSON.stringify(parsedWidgetType.url) || ""
            ) as urlType;
            return currVal.original_filename === compareVal.original_filename;
          });

          if (checkExist) return [...prev];

          return [...prev, parsedWidgetType];
        }
        return [...prev];
      });
  }

  function onDragOverHandler(e: React.DragEvent) {
    e.preventDefault();
  }

  const onDragStartHandler = (idx: number) => {
    dragItem.current = idx;
  };

  const onDragEnterHandler = (idx: number) => {
    dragOverItem.current = idx;
  };

  function onDragEndHandler() {
    const chapterClone = [...widgets];
    const temp = chapterClone[dragItem.current];
    chapterClone[dragItem.current] = chapterClone[dragOverItem.current];
    chapterClone[dragOverItem.current] = temp;
    setWidgets(chapterClone);
  }

  function onDeleteHandler(idx: number) {
    setWidgets((prev) => prev.filter((item, _idx) => _idx !== idx));
  }

  return {
    widgets,
    onDropHandler,
    onDragOverHandler,
    onDragStartHandler,
    onDragEnterHandler,
    onDragEndHandler,
    onDeleteHandler,
  } as const;
}

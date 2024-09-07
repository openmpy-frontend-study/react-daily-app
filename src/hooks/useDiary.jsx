import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const currentDiaryItem = data.find((item) => item.id === Number(id));

    if (!currentDiaryItem) {
      window.alert("해당 일기가 존재하지 않습니다.");
      nav("/", { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [Number(id), data]);

  return curDiaryItem;
};

export default useDiary;

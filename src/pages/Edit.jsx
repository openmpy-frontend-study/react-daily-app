import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();

  const onClickDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  useEffect(() => {
    const currentDiaryItem = data.find((item) => item.id === Number(params.id));

    if (!currentDiaryItem) {
      window.alert("해당 일기가 존재하지 않습니다.");
      nav("/", { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [params.id, data]);

  const onSubmit = (input) => {
    if (window.confirm("수정하시겠습니까?")) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
        rightChild={
          <Button text={"삭제하기"} onClick={onClickDelete} type={"NEGATIVE"} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;

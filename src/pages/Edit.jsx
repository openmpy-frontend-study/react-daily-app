import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import useDiary from "../hooks/useDiary";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);

  const curDiaryItem = useDiary(params.id);

  const onClickDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

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

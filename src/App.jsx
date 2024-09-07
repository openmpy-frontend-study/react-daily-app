import { createContext, useReducer, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import New from "./pages/New";
import NotFound from "./pages/NotFound";

const mockData = [
  {
    id: 1,
    createdDate: new Date("2024-09-07").getTime(),
    emotionId: 1,
    content: "오늘은 기분이 좋아서 기분이 좋은 일기를 쓰고 있어요.",
  },
  {
    id: 2,
    createdDate: new Date("2024-09-06").getTime(),
    emotionId: 2,
    content: "오늘은 기분이 별로여서 기분이 안 좋은 일기를 쓰고 있어요.",
  },
  {
    id: 3,
    createdDate: new Date("2024-08-05").getTime(),
    emotionId: 3,
    content: "오늘은 기분이 그저 그래서 기분이 그저 그런 일기를 쓰고 있어요.",
  },
  {
    id: 4,
    createdDate: new Date("2024-08-04").getTime(),
    emotionId: 4,
    content: "오늘은 기분이 복잡해서 기분이 복잡한 일기를 쓰고 있어요.",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.data.id ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.data.id);
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      data: {
        id,
      },
    });
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;

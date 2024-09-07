import { getEmotionImage } from "../util/get-emotion";
import "./EmotionItem.css";

const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
  return (
    <div
      className={`EmotionItem ${isSelected ? `Emotion_on_${emotionId}` : ""}`}
      onClick={onClick}
    >
      <img className="emotion_img" src={getEmotionImage(emotionId)} />
      <div className="emotion_name">{emotionName}</div>
    </div>
  );
};

export default EmotionItem;

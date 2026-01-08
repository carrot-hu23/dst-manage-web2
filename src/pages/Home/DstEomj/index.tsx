import style from "./index.module.css";

interface DstEmojiProps {
    text: string;
}

const DstEmoji: React.FC<DstEmojiProps> = ({ text }) => {
    return <span className={style.icon}>{text}</span>
}

export default DstEmoji;

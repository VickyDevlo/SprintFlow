import { useState } from "react";
import { Send } from "lucide-react";
import { INPUT_CLASS } from "../../../assets/assets";

const CommentComposer = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onSubmit(value);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex shrink-0 gap-2 border-t border-border/60 bg-surface p-4 sm:px-6"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={300}
        placeholder="Add a comment..."
        aria-label="Add a comment"
        className={INPUT_CLASS}
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-lime px-5 text-sm font-bold text-bg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Send size={15} />
        <span className="hidden sm:inline">Send</span>
      </button>
    </form>
  );
};

export default CommentComposer;
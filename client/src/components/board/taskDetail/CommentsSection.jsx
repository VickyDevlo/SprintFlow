import { MessageSquare } from "lucide-react";
import { timeAgo } from "../../../utils/utils";

const CommentsSection = ({ comments }) => (
  <section>
    <h3 className="mb-3 flex items-center gap-2 font-heading font-bold text-text">
      <MessageSquare size={16} className="text-lime" />
      Comments
      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-muted">
        {comments.length}
      </span>
    </h3>

    {comments.length === 0 ? (
      <p className="rounded-2xl border-2 border-dashed border-border/50 px-4 py-6 text-center text-xs text-muted">
        No comments yet. Start the conversation.
      </p>
    ) : (
      <ul className="space-y-4">
        {comments.map((c) => (
          <li key={c.id} className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-gold to-coral text-xs font-bold text-black">
              {c.author.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-border/60 bg-bg/40 px-4 py-3">
              <p className="flex flex-wrap items-baseline gap-x-2 text-xs">
                <span className="font-semibold capitalize text-text">{c.author}</span>
                <span className="text-muted">{timeAgo(c.createdAt)}</span>
              </p>
              <p className="mt-1 whitespace-pre-wrap wrap-break-word text-sm text-text">
                {c.text}
              </p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </section>
);

export default CommentsSection;
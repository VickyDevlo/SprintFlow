import { User } from "lucide-react";
import { INPUT_CLASS } from "../../../assets/assets";

const AssigneeSelect = ({ value, members, onChange }) => (
  <section>
    <label className="flex flex-col gap-2">
      <span className="flex items-center gap-1.5 text-xs font-medium text-muted">
        <User size={13} />
        Reassign task
      </span>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={INPUT_CLASS}
      >
        <option value="" className="bg-surface">Unassigned</option>
        {members.map((m) => (
          <option key={m} value={m} className="bg-surface">
            {m}
          </option>
        ))}
      </select>
    </label>
  </section>
);

export default AssigneeSelect;
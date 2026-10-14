import { STATUSES } from "../../../assets/assets";

const StatusSwitcher = ({ current, onMove }) => (
  <section>
    <h3 className="mb-2 text-xs font-medium text-muted">Move to</h3>
    <div className="grid grid-cols-3 gap-2">
      {STATUSES.map(({ key, label, icon: Icon, active }) => {
        const on = current === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onMove(key)}
            aria-pressed={on}
            className={`flex cursor-pointer flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-xs font-semibold transition sm:flex-row sm:justify-center sm:gap-2 ${
              on
                ? active
                : "border-border/60 text-muted hover:border-lime/40 hover:text-text"
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        );
      })}
    </div>
  </section>
);

export default StatusSwitcher;
import { Modal } from "../../shared/Modal";
import { INPUT_CLASS } from "../../assets/assets";

const MemberModal = ({ onClose, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name } = Object.fromEntries(new FormData(e.currentTarget));
    onSubmit(name);
  };

  return (
    <Modal
      title="Add member"
      subtitle="Add a teammate by name to this project."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          required
          autoFocus
          maxLength={40}
          placeholder="Member name"
          className={INPUT_CLASS}
        />
        <button
          type="submit"
          className="mt-2 cursor-pointer rounded-full bg-lime py-3 font-bold text-bg transition hover:brightness-110"
        >
          Add member
        </button>
      </form>
    </Modal>
  );
};

export default MemberModal;
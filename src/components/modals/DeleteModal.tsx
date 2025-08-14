import { useDispatch } from "react-redux";
import { deleteTeam } from "../../store/features/teams/teamThunks";
import ModalFormWrapper from "../../utils/common/ModalFormWrapper";
import Button from "../ui/Button";
import type { AppDispatch } from "../../store/store";

interface DeleteModalProps {
  id: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const DeleteModal = ({ id, isOpen, setIsOpen }: DeleteModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  function handleDelete() {
    dispatch(deleteTeam(id));
  }

  return (
    <ModalFormWrapper
      isOpen={isOpen}
      title="Do you really want to delete this Team?"
    >
      <div className="flex justify-end gap-10 px-5 py-3">
        <Button
          text="Cancel"
          variant="neutral"
          onClick={() => setIsOpen(false)}
        />
        <Button text="Delete" variant="primary" onClick={handleDelete} />
      </div>
    </ModalFormWrapper>
  );
};

export default DeleteModal;

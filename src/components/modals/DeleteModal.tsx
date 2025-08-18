import ModalFormWrapper from "../../utils/common/ModalFormWrapper";
import Button from "../ui/Button";

interface DeleteModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onConfirm: () => void;
}

const DeleteModal = ({ isOpen, setIsOpen, onConfirm }: DeleteModalProps) => {
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
        <Button
          text="Delete"
          variant="primary"
          onClick={() => {
            onConfirm();
            setIsOpen(false);
          }}
        />
      </div>
    </ModalFormWrapper>
  );
};

export default DeleteModal;

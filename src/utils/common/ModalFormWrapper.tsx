interface ModalFormWrapperProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
}

const ModalFormWrapper = ({
  children,
  title,
  isOpen,
}: ModalFormWrapperProps) => {
  if (!isOpen) return null;

  return (
    <div className="bg-black/50 z-10 fixed inset-0 flex items-center justify-center">
      <div className="bg-[#1e1e1e] text-white p-5 rounded-md border border-slate-700 shadow-lg max-w-md w-full">
        <h2 className="my-2 mb-5 text-center font-bold text-xl">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default ModalFormWrapper;

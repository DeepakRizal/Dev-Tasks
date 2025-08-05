interface AddProjectModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const AddProjectModal = ({ isOpen, setIsOpen }: AddProjectModalProps) => {
  function handleSubmit() {}

  function handleCancel() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <div className="bg-black/50 z-10 fixed inset-0 flex items-center justify-center">
          <div className="bg-[#1e1e1e] text-white p-5 rounded-md border border-slate-700 shadow-lg max-w-md w-full">
            <div className="w-full">
              <h2 className="my-2 mb-5 text-center font-bold text-xl">
                Add a Team
              </h2>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 items-center justify-center w-full"
              >
                <input
                  type="text"
                  name="name"
                  className="text-gray-400 outline-none border border-gray-300 rounded-md px-2 py-1 w-full"
                  placeholder="Team Name"
                  //   value={}
                  //   onChange={}
                />
                <input
                  type="text"
                  name="emoji"
                  className="text-gray-400 outline-none border border-gray-300 rounded-md px-2 py-1 w-full"
                  placeholder="Emoji (optional)"
                  //   value={}
                />
                <input
                  type="text"
                  name="description"
                  className="text-gray-400 outline-none border border-gray-300 rounded-md px-2 py-1 w-full"
                  placeholder="Description"
                  //   value={}
                />
                <div className="flex gap-10 mt-7 justify-end ">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className=" px-5 py-2 rounded-md bg-red-500 cursor-pointer text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className=" px-5 py-2 rounded-md bg-green-500 cursor-pointer text-white"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProjectModal;

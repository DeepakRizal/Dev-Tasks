import { useDispatch, useSelector } from "react-redux";
import ModalFormWrapper from "../../utils/common/ModalFormWrapper";
import type { AppDispatch, RootState } from "../../store/store";
import ProjectCard from "../project/ProjectCard";
import { X } from "lucide-react";
import { useEffect } from "react";
import { getAllProjects } from "../../store/features/project/projectThunks";

interface ArchiveModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ArchiveModal = ({ isOpen, setIsOpen }: ArchiveModalProps) => {
  const projects = useSelector((state: RootState) => state.project.projects);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  // filter only archived projects
  const archivedProjects = projects.filter((project) => project.archived);

  return (
    <ModalFormWrapper isOpen={isOpen} title="Archived Projects">
      <div className="relative">
        <button
          onClick={() => setIsOpen(false)}
          className="cursor-pointer absolute right-0 top-[-60px]"
        >
          <X />
        </button>

        {archivedProjects.length > 0 ? (
          archivedProjects.map((project) => (
            <ProjectCard
              project={project}
              key={project.id}
              projectId={project.id}
              isArchive={true}
            />
          ))
        ) : (
          <p className="text-center text-gray-400 text-lg font-medium mt-4">
            No archived projects available.
          </p>
        )}
      </div>
    </ModalFormWrapper>
  );
};

export default ArchiveModal;

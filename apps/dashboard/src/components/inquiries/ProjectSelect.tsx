import { useProjectsQuery } from '@/api/use-projects-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ALL_PROJECTS_VALUE = '__all__';

interface ProjectSelectProps {
  value: string | undefined;
  onChange: (projectId: string | undefined) => void;
}

export function ProjectSelect({ value, onChange }: ProjectSelectProps) {
  const { data: projects, isLoading } = useProjectsQuery();

  return (
    <Select
      value={value ?? ALL_PROJECTS_VALUE}
      onValueChange={(next) =>
        onChange(next === ALL_PROJECTS_VALUE ? undefined : next)
      }
    >
      <SelectTrigger aria-label="Filter by project">
        <SelectValue placeholder="All projects" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL_PROJECTS_VALUE}>All projects</SelectItem>
        {isLoading ? (
          <SelectItem value="__loading__" disabled>
            Loading…
          </SelectItem>
        ) : (
          projects?.map((project) => (
            <SelectItem key={project.projectId} value={project.projectId}>
              {project.projectId} ({project.count})
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}

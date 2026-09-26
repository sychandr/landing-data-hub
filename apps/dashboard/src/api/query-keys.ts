export const inquiriesKeys = {
  all: ['inquiries'] as const,
  list: (params: unknown) => [...inquiriesKeys.all, 'list', params] as const,
  timeline: (params: unknown) =>
    [...inquiriesKeys.all, 'timeline', params] as const,
  byProject: () => [...inquiriesKeys.all, 'by-project'] as const,
};

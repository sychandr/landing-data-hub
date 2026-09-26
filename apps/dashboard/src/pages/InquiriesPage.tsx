import { useInquiriesFilters } from '@/hooks/useInquiriesFilters';
import { InquiriesFilters } from '@/components/inquiries/InquiriesFilters';
import { InquiriesChart } from '@/components/inquiries/InquiriesChart';
import { InquiriesTable } from '@/components/inquiries/InquiriesTable';

function InquiriesPage() {
  const { filters, setFilters } = useInquiriesFilters();

  return (
    <section className="flex flex-col gap-6 p-6 text-left">
      <h1>Inquiries</h1>

      <InquiriesFilters filters={filters} setFilters={setFilters} />

      <InquiriesChart
        projectId={filters.projectId}
        dateFrom={filters.dateFrom}
        dateTo={filters.dateTo}
      />

      <InquiriesTable filters={filters} setFilters={setFilters} />
    </section>
  );
}

export default InquiriesPage;

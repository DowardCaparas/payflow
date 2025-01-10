import CustomersTable from '@/app/ui/customers/table'
import React, { Suspense } from 'react'
import { fetchCustomersPages, fetchFilteredCustomers } from '@/app/lib/data'
import { Metadata } from 'next';
import Pagination from '@/app/ui/invoices/pagination';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';

export const metadata: Metadata = {
  title: 'Customers',
}

export default async function Customers(props: {
  searchParams?: Promise<{
    query?: string,
    page?: string,
  }>
}) {

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const filteredCustomers = await fetchFilteredCustomers(query);

  return (
    <div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
          <CustomersTable customers={filteredCustomers}/>
     </Suspense>
    </div>
  );
}
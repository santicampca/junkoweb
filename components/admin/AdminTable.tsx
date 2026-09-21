export function AdminTable({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto border border-navy/10 bg-white">
      <table className="w-full min-w-[640px] table-auto border-collapse text-left">
        <thead>
          <tr className="border-b border-navy/10 bg-navy/[0.03]">
            {headers.map((header) => (
              <th
                key={header}
                className="whitespace-nowrap px-4 py-3 font-sans text-xs uppercase tracking-widest2 text-navy/50"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-navy/5">{children}</tbody>
      </table>
    </div>
  );
}

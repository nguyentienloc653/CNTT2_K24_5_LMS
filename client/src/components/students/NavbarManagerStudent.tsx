type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  classFilter: string;
  onClassChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  classes: { id: number; name: string }[];
};

export default function NavbarManagerStudent({
  search,
  onSearchChange,
  classFilter,
  onClassChange,
  sort,
  onSortChange,
  classes,
}: Props) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-md gap-4">
      {/* SEARCH */}
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search students..."
        className="border-2 rounded-md p-2 flex-1"
      />

      {/* FILTER CLASS */}
      <select
        value={classFilter}
        onChange={(e) => onClassChange(e.target.value)}
        className="w-[180px] p-2 border rounded-lg bg-white"
      >
        <option value="">All Classes</option>
        {classes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* SORT */}
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="w-[150px] p-2 border rounded-lg bg-white"
      >
        <option value="">Sắp xếp</option>
        <option value="name-asc">Tên A → Z</option>
        <option value="name-desc">Tên Z → A</option>
        <option value="code">Mã SV</option>
      </select>
    </div>
  );
}

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
};

export default function NavbarManagerClass({
  search,
  onSearchChange,
  sort,
  onSortChange
}: Props) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-md gap-4">

        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search class..."
          className="border-2 rounded-md p-2 flex-1"
        />

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-[150px] p-2 border rounded-lg bg-white"
        >
          <option value="">Sắp xếp</option>
          <option value="name-asc">Tên A → Z</option>
          <option value="name-desc">Tên Z → A</option>
          <option value="code">Mã Lớp</option>
        </select>
    </div>
  );
}

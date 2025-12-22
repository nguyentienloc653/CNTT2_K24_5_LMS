type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  classFilter: string;
  onClassChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  classes: { id: number; name: string }[];
};

export default function NavbarManagerTeacher({
  search,
  onSearchChange,
  classFilter,
  onClassChange,
  sort,
  onSortChange,
  classes,
}: Props) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-md">
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search teacher..."
          className="border-2 rounded-md p-2 w-[900px]"
        />
      </div>
      <div>
        <select
          value={classFilter}
          onChange={(e) => onClassChange(e.target.value)}
          className="w-[150px]
        text-center
        p-2 
        border border-gray-300 
        rounded-lg 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500 
        focus:border-blue-500
        bg-white"
        >
          <option value="">All Classes</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-[100px]
        text-center
        p-2 
        border border-gray-300 
        rounded-lg 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500 
        focus:border-blue-500
        bg-white"
        >
          <option value="">Sắp xếp</option>
          <option value="name-asc">Tên A → Z</option>
          <option value="name-desc">Tên Z → A</option>
          <option value="code">Mã GV</option>
        </select>
      </div>
    </div>
  );
}

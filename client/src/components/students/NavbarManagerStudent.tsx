export default function NavbarManagerStudent() {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-md">
      <div>
        <input
          type="text"
          placeholder="Search students..."
          className="border-2 rounded-md p-2 w-[900px]"
        />
      </div>
      <div>
        <select
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
          <option value="a">Class A</option>
          <option value="b">Class B</option>
          <option value="c">Class C</option>
        </select>
      </div>

      <div>
        <select
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
          <option value="name">Tên</option>
          <option value="studentCode">Mã SV</option>
        </select>
      </div>
    </div>
  );
}

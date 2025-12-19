type Props = {
  onAdd: () => void
}

export default function HeaderManagerClass({onAdd}: Props) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <div>
        <h1 className="text-2xl font-bold">Classes</h1>
        <p className="text-sm text-gray-500">Manager classes</p>
      </div>

      <div className="flex items-center gap-5">
        <button onClick={onAdd} className="bg-orange-500 text-white px-4 py-1 rounded-md">Add Class</button>
      </div>
    </div>
  );
}

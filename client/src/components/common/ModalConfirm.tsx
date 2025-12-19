type Props = {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title = "Xác nhận",
  description = "Bạn có chắc chắn muốn xoá không?",
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[380px] p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-3">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded">
            Huỷ
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
}

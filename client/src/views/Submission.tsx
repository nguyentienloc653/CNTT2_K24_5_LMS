import React, { useMemo, useState } from "react";
import "/src/views/css/Submission.css";

import editIcon from "../img/bold.png";
import deleteIcon from "../img/trash.png";
import submit from "../img/submit.png";
import link from "../img/link.png";

type Assignment = {
  subject: string;
  title: string;
  date: string;
  link: string;
};

type FormState = {
  subject: string;
  lesson: string;
  link: string;
};

const INITIAL_ASSIGNMENTS: Assignment[] = [
  { subject: "React.js", title: "Luyện tập Function", date: "12/07/2024", link: "baitap1.git" },
  { subject: "Node.js", title: "Luyện tập Number", date: "13/07/2024", link: "baitap1.git" },
  { subject: "Web Frontend Fundamental", title: "Luyện tập Function", date: "14/07/2024", link: "baitap1.git" },
  { subject: "React.js", title: "Luyện tập Function", date: "12/07/2024", link: "baitap1.git" },
  { subject: "Node.js", title: "Luyện tập Number", date: "13/07/2024", link: "baitap1.git" },
  { subject: "Web Frontend Fundamental", title: "Luyện tập Function", date: "14/07/2024", link: "baitap1.git" },
  { subject: "React.js", title: "Luyện tập Function", date: "12/07/2024", link: "baitap1.git" },
  { subject: "Node.js", title: "Luyện tập Number", date: "13/07/2024", link: "baitap1.git" },
  { subject: "Web Frontend Fundamental", title: "Luyện tập Function", date: "14/07/2024", link: "baitap1.git" },
  { subject: "React.js", title: "Luyện tập Function", date: "12/07/2024", link: "baitap1.git" },
  { subject: "Node.js", title: "Luyện tập Number", date: "13/07/2024", link: "baitap1.git" },
  { subject: "Web Frontend Fundamental", title: "Luyện tập Function", date: "14/07/2024", link: "baitap1.git" },
];

const ITEMS_PER_PAGE = 12;

const SUBJECT_OPTIONS = ["React.js", "Node.js", "Web Frontend Fundamental", "HTML"];

const LESSON_OPTIONS = [
  "Luyện tập Function",
  "Luyện tập Number",
  "Luyện tập Array",
  "Luyện tập Object",
];

function formatToday(): string {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function Submission() {
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({ subject: "", lesson: "", link: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const totalPages = Math.max(1, Math.ceil(assignments.length / ITEMS_PER_PAGE));

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleAssignments = useMemo(
    () => assignments.slice(startIndex, startIndex + ITEMS_PER_PAGE),
    [assignments, startIndex]
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPageNumbers = (): Array<number | "ellipsis"> => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return [1, 2, "ellipsis", totalPages - 1, totalPages];
  };

  const pageNumbers = getPageNumbers();

  const openCreateModal = () => {
    setForm({ subject: "", lesson: "", link: "" });
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const openEditModal = (globalIndex: number) => {
    const item = assignments[globalIndex];
    if (!item) return;
    setForm({
      subject: item.subject,
      lesson: item.title,
      link: item.link,
    });
    setEditingIndex(globalIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingIndex(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAssignment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.subject || !form.lesson || !form.link.trim()) {
      alert("Vui lòng nhập đầy đủ Môn học, Bài học và Link Github.");
      return;
    }

    if (editingIndex === null) {
      const newItem: Assignment = {
        subject: form.subject,
        title: form.lesson,
        date: formatToday(),
        link: form.link.trim(),
      };

      setAssignments((prev) => {
        const updated = [...prev, newItem];
        const newTotal = Math.max(1, Math.ceil(updated.length / ITEMS_PER_PAGE));
        setCurrentPage(newTotal);
        return updated;
      });
    } else {
      setAssignments((prev) => {
        const updated = [...prev];
        const old = updated[editingIndex];
        if (!old) return prev;

        updated[editingIndex] = {
          ...old,
          subject: form.subject,
          title: form.lesson,
          link: form.link.trim(),
        };
        return updated;
      });
    }

    setIsModalOpen(false);
    setEditingIndex(null);
  };

  // ===== DELETE MODAL HANDLERS =====
  const openDeleteModal = (globalIndex: number) => {
    setDeleteIndex(globalIndex);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteIndex(null);
  };

  const confirmDelete = () => {
    if (deleteIndex === null) return;

    setAssignments((prev) => {
      const updated = prev.filter((_, idx) => idx !== deleteIndex);
      const newTotalPages = Math.max(1, Math.ceil(updated.length / ITEMS_PER_PAGE));

      setCurrentPage((page) => (page > newTotalPages ? newTotalPages : page));
      return updated;
    });

    closeDeleteModal();
  };

  const deleteItem = deleteIndex !== null ? assignments[deleteIndex] : null;

  return (
    <div className="page">
      {/* TOP BAR */}
      <header className="topbar submission-topbar">
        <h1 className="page-title">Bài tập</h1>

        <button className="submit-btn" onClick={openCreateModal}>
          <span className="submit-btn-icon">
            <img src={submit} alt="" />
          </span>
          <span>Nộp bài</span>
        </button>
      </header>

      {/* CARD + TABLE */}
      <section className="submission-card">
        <div className="submission-table-wrapper">
          <table className="submission-table">
            <colgroup>
              <col style={{ width: "70px" }} />
              <col style={{ width: "220px" }} />
              <col style={{ width: "260px" }} />
              <col style={{ width: "150px" }} />
              <col />
              <col style={{ width: "90px" }} />
            </colgroup>

            <thead>
              <tr>
                <th>STT</th>
                <th>Môn học</th>
                <th>Bài học</th>
                <th>Ngày nộp</th>
                <th>Link Github</th>
                <th className="submission-edit-header">Edit</th>
              </tr>
            </thead>

            <tbody>
              {visibleAssignments.map((a, index) => {
                const globalIndex = startIndex + index;
                return (
                  <tr key={globalIndex}>
                    <td>{globalIndex + 1}</td>
                    <td className="submission-subject">{a.subject}</td>
                    <td>{a.title}</td>
                    <td>{a.date}</td>
                    <td className="submission-link">{a.link}</td>
                    <td className="submission-actions">
                      <button
                        className="icon-btn edit"
                        title="Chỉnh sửa"
                        onClick={() => openEditModal(globalIndex)}
                        type="button"
                      >
                        <img src={editIcon} alt="edit" />
                      </button>

                      <button
                        className="icon-btn delete"
                        title="Xóa"
                        onClick={() => openDeleteModal(globalIndex)}
                        type="button"
                      >
                        <img src={deleteIcon} alt="delete" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {visibleAssignments.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: 24 }}>
                    Không có bài tập nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="submission-pagination">
          <button
            className={`pager-nav ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            type="button"
          >
            ← Previous
          </button>

          <div className="pager-pages">
            {pageNumbers.map((p, idx) =>
              p === "ellipsis" ? (
                <span key={idx} className="pager-ellipsis">
                  …
                </span>
              ) : (
                <button
                  key={idx}
                  className={`pager-dot ${currentPage === p ? "active" : ""}`}
                  onClick={() => goToPage(p)}
                  type="button"
                >
                  {p}
                </button>
              )
            )}
          </div>

          <button
            className={`pager-nav ${currentPage === totalPages ? "disabled" : ""}`}
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            type="button"
          >
            Next →
          </button>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2 className="modal-title">
              {editingIndex === null ? "Nộp bài" : "Sửa bài nộp"}
            </h2>
            <div className="modal-divider" />

            <form onSubmit={handleSubmitAssignment}>
              <div className="modal-field">
                <label className="modal-label">Môn học</label>
                <div className="modal-input-wrapper">
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="modal-select"
                  >
                    <option value="">Chọn môn học</option>
                    {SUBJECT_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <span className="modal-select-arrow">▾</span>
                </div>
              </div>

              <div className="modal-field">
                <label className="modal-label">Bài học</label>
                <div className="modal-input-wrapper">
                  <select
                    name="lesson"
                    value={form.lesson}
                    onChange={handleChange}
                    className="modal-select"
                  >
                    <option value="">Chọn bài học</option>
                    {LESSON_OPTIONS.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                  <span className="modal-select-arrow">▾</span>
                </div>
              </div>

              <div className="modal-field">
                <label className="modal-label">Link Github</label>
                <div className="modal-input-wrapper modal-link-wrapper">
                  <span className="modal-link-icon">
                    <img src={link} alt="" />
                  </span>
                  <input
                    type="text"
                    name="link"
                    value={form.link}
                    onChange={handleChange}
                    className="modal-input modal-input-link"
                    placeholder="Link Github"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-btn-cancel"
                  onClick={closeModal}
                >
                  Hủy
                </button>

                <button type="submit" className="modal-btn-submit submit-btn">
                  <span className="submit-btn-icon">⭱</span>
                  <span>{editingIndex === null ? "Nộp bài" : "Cập nhật"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Xác nhận xóa</h2>
            <div className="modal-divider" />

            <div className="delete-modal-content">
              <p className="delete-modal-text">
                Bạn có chắc muốn xóa bài <b>{deleteItem?.title || ""}</b> của môn{" "}
                <b>{deleteItem?.subject || ""}</b>?
              </p>
              <p className="delete-modal-note">Hành động này không thể hoàn tác.</p>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-btn-cancel"
                onClick={closeDeleteModal}
              >
                Hủy
              </button>

              <button type="button" className="modal-btn-danger" onClick={confirmDelete}>
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Submission;

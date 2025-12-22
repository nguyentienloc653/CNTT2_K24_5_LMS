import { useEffect, useMemo, useState } from "react";
import "/src/admin/StatisicStudent/statisic.css";
import SideBarManager from "../../components/layout/SideBarManager";

type Student = {
  id: number;
  studentCode: string;
  name: string;
  classId?: number | string; 
  rates?: {
    attendance?: number;
    homework?: number;
    preparation?: number;
  };
};

type Subject = { id: number; name: string };

type StudentScore = {
  id: number;
  studentId: number;
  subjectId: number;
  hk1: number;
  hk2: number;
  project: number;
};

type ClassItem = {
  id: number;
  classCode?: string;
  name: string;
  status?: string;
};

type Row = {
  id: number;
  studentCode: string;
  name: string;
  classId?: number;

  className: string;

  subjectsCount: number;

  hk1: number;
  hk2: number;
  project: number;
  total: number;

  attendance: number;
  homework: number;
  preparation: number;
};

const API_BASE = "http://localhost:3001";

function toNum(v: unknown): number {
  const n = typeof v === "string" ? Number(v) : (v as number);
  return Number.isFinite(n) ? n : 0;
}

export default function Statistic() {
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [studentScores, setStudentScores] = useState<StudentScore[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState<number | "all">("all");
  const [sortBy, setSortBy] = useState<
    "total" | "hk1" | "hk2" | "project" | "attendance" | "homework" | "preparation"
  >("total");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");

  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);

  const [rateAttendance, setRateAttendance] = useState<number>(0);
  const [rateHomework, setRateHomework] = useState<number>(0);
  const [ratePreparation, setRatePreparation] = useState<number>(0);

  type EditScoreRow = {
    id: number; 
    subjectId: number;
    subjectName: string;
    hk1: number;
    hk2: number;
    project: number;
  };
  const [editScores, setEditScores] = useState<EditScoreRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveErr, setSaveErr] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError("");

        const [stRes, subRes, scRes, clRes] = await Promise.all([
          fetch(`${API_BASE}/students`),
          fetch(`${API_BASE}/subjects`),
          fetch(`${API_BASE}/studentScores`),
          fetch(`${API_BASE}/classes`),
        ]);

        if (!stRes.ok) throw new Error(`students fetch failed: ${stRes.status}`);
        if (!subRes.ok) throw new Error(`subjects fetch failed: ${subRes.status}`);
        if (!scRes.ok) throw new Error(`studentScores fetch failed: ${scRes.status}`);
        if (!clRes.ok) throw new Error(`classes fetch failed: ${clRes.status}`);

        const st = (await stRes.json()) as unknown;
        const sub = (await subRes.json()) as unknown;
        const sc = (await scRes.json()) as unknown;
        const cl = (await clRes.json()) as unknown;

        const stArr = Array.isArray(st) ? (st as any[]) : [];
        const subArr = Array.isArray(sub) ? (sub as any[]) : [];
        const scArr = Array.isArray(sc) ? (sc as any[]) : [];
        const clArr = Array.isArray(cl) ? (cl as any[]) : [];

        setStudents(
          stArr.map((x) => ({
            ...x,
            id: toNum(x.id),
            classId: x.classId !== undefined ? toNum(x.classId) : undefined,
            rates: x.rates ?? { attendance: 0, homework: 0, preparation: 0 },
          })) as Student[]
        );

        setSubjects(
          subArr.map((x) => ({
            ...x,
            id: toNum(x.id),
          })) as Subject[]
        );

        setStudentScores(
          scArr.map((x) => ({
            ...x,
            id: toNum(x.id),
            studentId: toNum(x.studentId),
            subjectId: toNum(x.subjectId),
            hk1: Number(x.hk1 ?? 0),
            hk2: Number(x.hk2 ?? 0),
            project: Number(x.project ?? 0),
          })) as StudentScore[]
        );

        setClasses(
          clArr.map((x) => ({
            ...x,
            id: toNum(x.id),
          })) as ClassItem[]
        );
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const classLabelById = useMemo(() => {
    const m = new Map<number, string>();
    for (const c of classes) {
      m.set(c.id, c.name);
    }
    return m;
  }, [classes]);

  const classOptions = useMemo(() => {
    return classes
      .slice()
      .sort((a, b) => a.id - b.id)
      .map((c) => ({
        id: c.id,
        label: c.name,
      }));
  }, [classes]);

  const scoreGroup = useMemo(() => {
    const map = new Map<number, StudentScore[]>();
    for (const sc of studentScores) {
      const arr = map.get(sc.studentId);
      if (arr) arr.push(sc);
      else map.set(sc.studentId, [sc]);
    }
    return map;
  }, [studentScores]);

  const rows = useMemo<Row[]>(() => {
    const mapped: Row[] = students.map((s) => {
      const list = scoreGroup.get(s.id) ?? [];
      const count = list.length;

      const hk1 = count ? avg(list, "hk1") : 0;
      const hk2 = count ? avg(list, "hk2") : 0;
      const project = count ? avg(list, "project") : 0;

      const total = +(hk1 + hk2 + project).toFixed(2);

      const classIdNum =
        typeof s.classId === "string" ? Number(s.classId) : (s.classId as number | undefined);

      const className =
        typeof classIdNum === "number" && Number.isFinite(classIdNum)
          ? classLabelById.get(classIdNum) || `Class #${classIdNum}`
          : "Chưa có lớp";

      const attendance = clampPercent(s.rates?.attendance ?? 0);
      const homework = clampPercent(s.rates?.homework ?? 0);
      const preparation = clampPercent(s.rates?.preparation ?? 0);

      return {
        id: s.id,
        studentCode: s.studentCode || `SV${String(s.id).padStart(3, "0")}`,
        name: s.name || "Chưa có tên",
        classId: typeof classIdNum === "number" && Number.isFinite(classIdNum) ? classIdNum : undefined,
        className,

        subjectsCount: count,

        hk1: +hk1.toFixed(2),
        hk2: +hk2.toFixed(2),
        project: +project.toFixed(2),
        total,

        attendance,
        homework,
        preparation,
      };
    });

    const q = search.trim().toLowerCase();
    let filtered = mapped.filter((r) => {
      const okSearch = !q || r.name.toLowerCase().includes(q) || r.studentCode.toLowerCase().includes(q);
      const okClass = classFilter === "all" || r.classId === classFilter;
      return okSearch && okClass;
    });

    filtered.sort((a, b) => {
      const diff = (a[sortBy] as number) - (b[sortBy] as number);
      return sortDir === "desc" ? -diff : diff;
    });

    return filtered;
  }, [students, scoreGroup, classFilter, search, sortBy, sortDir, classLabelById]);

  const averages = useMemo(() => {
    if (!rows.length) return null;

    const mean = (k: keyof Row) =>
      +(
        rows.reduce((sum, r) => sum + (Number(r[k]) || 0), 0) / rows.length
      ).toFixed(2);

    return {
      hk1: mean("hk1"),
      hk2: mean("hk2"),
      project: mean("project"),
      total: mean("total"),
      attendance: mean("attendance"),
      homework: mean("homework"),
      preparation: mean("preparation"),
    };
  }, [rows]);

  const openEditModal = (studentId: number) => {
    const st = students.find((s) => s.id === studentId) || null;
    setEditStudent(st);
    setSaveErr("");

    const att = clampPercent(st?.rates?.attendance ?? 0);
    const hw = clampPercent(st?.rates?.homework ?? 0);
    const prep = clampPercent(st?.rates?.preparation ?? 0);

    setRateAttendance(att);
    setRateHomework(hw);
    setRatePreparation(prep);

    const list = (scoreGroup.get(studentId) ?? []).slice();
    const mapped: EditScoreRow[] = list.map((sc) => {
      const subName = subjects.find((x) => x.id === sc.subjectId)?.name || `#${sc.subjectId}`;
      return {
        id: sc.id,
        subjectId: sc.subjectId,
        subjectName: subName,
        hk1: Number(sc.hk1 ?? 0),
        hk2: Number(sc.hk2 ?? 0),
        project: Number(sc.project ?? 0),
      };
    });

    mapped.sort((a, b) => a.subjectName.localeCompare(b.subjectName, "vi"));

    setEditScores(mapped);
    setEditOpen(true);
  };

  const closeEditModal = () => {
    setEditOpen(false);
    setEditStudent(null);
    setSaving(false);
    setSaveErr("");
  };

  const handleSave = async () => {
    if (!editStudent) return;

    try {
      setSaving(true);
      setSaveErr("");

      const sid = Number(editStudent.id);

      const patchStudentRes = await fetch(`${API_BASE}/students/${sid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rates: {
            attendance: clampPercent(rateAttendance),
            homework: clampPercent(rateHomework),
            preparation: clampPercent(ratePreparation),
          },
        }),
      });
      if (!patchStudentRes.ok) throw new Error("Lưu tỉ lệ thất bại");

      const patchedStudent = (await patchStudentRes.json()) as Student;

      for (const r of editScores) {
        const res = await fetch(`${API_BASE}/studentScores/${r.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hk1: Number(r.hk1 ?? 0),
            hk2: Number(r.hk2 ?? 0),
            project: Number(r.project ?? 0),
          }),
        });
        if (!res.ok) throw new Error("Lưu điểm theo môn thất bại");
      }

      setStudents((prev) => prev.map((s) => (s.id === patchedStudent.id ? patchedStudent : s)));

      setStudentScores((prev) =>
        prev.map((sc) => {
          const found = editScores.find((x) => x.id === sc.id);
          if (!found) return sc;
          return {
            ...sc,
            hk1: Number(found.hk1 ?? 0),
            hk2: Number(found.hk2 ?? 0),
            project: Number(found.project ?? 0),
          };
        })
      );

      closeEditModal();
      window.location.reload();
    } catch (e) {
      setSaveErr(e instanceof Error ? e.message : "Lưu thất bại");
    } finally {
      setSaving(false);
    }
  };

  const selectedDetail = useMemo(() => {
    if (!selectedStudentId) return null;
    const st = students.find((s) => s.id === selectedStudentId) || null;
    const list = (scoreGroup.get(selectedStudentId) ?? []).slice();

    const detailRows = list.map((sc) => {
      const subjectName = subjects.find((x) => x.id === sc.subjectId)?.name || `#${sc.subjectId}`;
      const total = Number(sc.hk1 ?? 0) + Number(sc.hk2 ?? 0) + Number(sc.project ?? 0);
      return { ...sc, subjectName, total };
    });

    detailRows.sort((a, b) => a.subjectName.localeCompare(b.subjectName, "vi"));
    return { student: st, scores: detailRows };
  }, [selectedStudentId, students, scoreGroup, subjects]);

  if (loading) {
    return (
      <div className="stt-page">
        <div className="stt-header">
          <div>
            <h1 className="stt-title">Statistics</h1>
            <p className="stt-subtitle">Quản lí điểm & tỉ lệ</p>
          </div>
        </div>

        <div className="stt-skeleton">
          <div className="stt-skel-card" />
          <div className="stt-skel-card" />
          <div className="stt-skel-card" />
          <div className="stt-skel-card" />
          <div className="stt-skel-card" />
          <div className="stt-skel-card" />
          <div className="stt-skel-card" />
        </div>

        <div className="stt-panel">
          <div className="stt-skel-table" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stt-page">
        <div className="stt-header">
          <div>
            <h1 className="stt-title">Statistics</h1>
            <p className="stt-subtitle">Quản lí điểm & tỉ lệ</p>
          </div>
        </div>

        <div className="stt-error">
          <div className="stt-error-title">Không load được dữ liệu</div>
          <div className="stt-error-text">{error}</div>
          <div className="stt-error-hint">
            Hãy chắc chắn json-server đang chạy ở <b>{API_BASE}</b> và có endpoint{" "}
            <b>/students</b>, <b>/subjects</b>, <b>/studentScores</b>, <b>/classes</b>.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <SideBarManager />

      <div className="stt-page">
        <div className="stt-header">
          <div>
            <h1 className="stt-title">Statistics</h1>
            <p className="stt-subtitle">Tổng quát điểm theo nhiều môn (TB theo môn) + tỉ lệ học tập</p>
            <p className="stt-subtitle">
              Số môn trong hệ thống: <b>{subjects.length}</b>
            </p>
          </div>

          <div className="stt-actions">
            <div className="stt-field">
              <label>Tìm kiếm</label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nhập mã SV hoặc tên..."
              />
            </div>

            <div className="stt-field">
              <label>Lớp</label>
              <select
                value={classFilter}
                onChange={(e) => {
                  const v = e.target.value;
                  setClassFilter(v === "all" ? "all" : Number(v));
                }}
              >
                <option value="all">Tất cả</option>
                {classOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="stt-field">
              <label>Sắp xếp</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
                <option value="total">Tổng điểm</option>
                <option value="hk1">HK1</option>
                <option value="hk2">HK2</option>
                <option value="project">Project</option>
                <option value="attendance">Tỉ lệ đi học</option>
                <option value="homework">Tỉ lệ làm bài tập</option>
                <option value="preparation">Tỉ lệ chuẩn bị bài</option>
              </select>
            </div>

            <button
              className="stt-btn"
              onClick={() => setSortDir((d) => (d === "desc" ? "asc" : "desc"))}
              title="Đổi chiều sắp xếp"
            >
              {sortDir === "desc" ? "Giảm dần ↓" : "Tăng dần ↑"}
            </button>
          </div>
        </div>

        {averages && (
          <div className="stt-grid">
            <StatCard title="HK1 (TB)" value={averages.hk1} hint="TB HK1 theo môn" />
            <StatCard title="HK2 (TB)" value={averages.hk2} hint="TB HK2 theo môn" />
            <StatCard title="Project (TB)" value={averages.project} hint="TB Project theo môn" />
            <StatCard title="Tổng (TB)" value={averages.total} highlight hint="HK1 + HK2 + Project" />

            <RateCard title="Tỉ lệ đi học" value={averages.attendance} />
            <RateCard title="Tỉ lệ làm bài tập" value={averages.homework} />
            <RateCard title="Tỉ lệ chuẩn bị bài" value={averages.preparation} />
          </div>
        )}

        <div className="stt-panel">
          <div className="stt-panel-head">
            <div className="stt-panel-title">Danh sách sinh viên</div>
            <div className="stt-panel-meta">{rows.length} sinh viên</div>
          </div>

          <div className="stt-table-wrap">
            <table className="stt-table">
              <thead>
                <tr>
                  <th>Mã SV</th>
                  <th>Tên</th>
                  <th>Lớp</th>
                  <th className="right">Số môn</th>
                  <th className="right">HK1 (TB)</th>
                  <th className="right">HK2 (TB)</th>
                  <th className="right">Project (TB)</th>
                  <th className="right">Tổng</th>
                  <th className="right">Đi học</th>
                  <th className="right">Bài tập</th>
                  <th className="right">Chuẩn bị</th>
                  <th className="right">Sửa</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="mono">{r.studentCode}</td>

                    <td>
                      <div className="name-cell">
                        <div
                          className="name stt-link"
                          title="Xem chi tiết điểm theo môn"
                          onClick={() => setSelectedStudentId((cur) => (cur === r.id ? null : r.id))}
                        >
                          {r.name}
                        </div>
                        <div className="sub">{r.className}</div>
                      </div>
                    </td>

                    <td>{r.className}</td>

                    <td className="right">
                      <span className="badge">{r.subjectsCount}</span>
                    </td>

                    <td className="right">{fmtScore(r.hk1)}</td>
                    <td className="right">{fmtScore(r.hk2)}</td>
                    <td className="right">{fmtScore(r.project)}</td>

                    <td className="right">
                      <span className="badge badge-strong">{fmtScore(r.total)}</span>
                    </td>

                    <td className="right">
                      <span className={`badge ${rateClass(r.attendance)}`}>{r.attendance}%</span>
                    </td>
                    <td className="right">
                      <span className={`badge ${rateClass(r.homework)}`}>{r.homework}%</span>
                    </td>
                    <td className="right">
                      <span className={`badge ${rateClass(r.preparation)}`}>{r.preparation}%</span>
                    </td>

                    <td className="right">
                      <button className="stt-btn stt-iconbtn" onClick={() => openEditModal(r.id)}>
                        ✏️
                      </button>
                    </td>
                  </tr>
                ))}

                {!rows.length && (
                  <tr>
                    <td colSpan={12} className="empty">
                      Không có dữ liệu phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="stt-footnote">
            * Điểm “tổng quát” đang tính theo <b>Trung bình theo môn</b>.
          </div>
        </div>

        {selectedDetail && (
          <div className="stt-panel">
            <div className="stt-panel-head">
              <div className="stt-panel-title">
                Chi tiết điểm theo môn — <b>{selectedDetail.student?.studentCode}</b> —{" "}
                <b>{selectedDetail.student?.name}</b>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="stt-btn"
                  onClick={() => selectedDetail.student && openEditModal(selectedDetail.student.id)}
                >
                  Sửa điểm / tỉ lệ
                </button>
                <button className="stt-btn" onClick={() => setSelectedStudentId(null)}>
                  Đóng
                </button>
              </div>
            </div>

            {selectedDetail.scores.length === 0 ? (
              <div className="stt-emptybox">
                Chưa có điểm theo môn trong <b>studentScores</b>.
              </div>
            ) : (
              <div className="stt-table-wrap">
                <table className="stt-table">
                  <thead>
                    <tr>
                      <th>Môn học</th>
                      <th className="right">HK1</th>
                      <th className="right">HK2</th>
                      <th className="right">Project</th>
                      <th className="right">Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedDetail.scores.map((sc) => (
                      <tr key={sc.id}>
                        <td className="mono">{sc.subjectName}</td>
                        <td className="right">{fmtScore(sc.hk1)}</td>
                        <td className="right">{fmtScore(sc.hk2)}</td>
                        <td className="right">{fmtScore(sc.project)}</td>
                        <td className="right">
                          <span className="badge badge-strong">{fmtScore(sc.total)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {editOpen && editStudent && (
          <div className="stt-modal">
            <div className="stt-modal-card">
              <div className="stt-modal-head">
                <div>
                  <div className="stt-modal-title">Sửa điểm & tỉ lệ</div>
                  <div className="stt-modal-sub">
                    {editStudent.studentCode} — {editStudent.name}
                  </div>
                </div>

                <button className="stt-btn" onClick={closeEditModal}>
                  ✕
                </button>
              </div>

              <div className="stt-modal-body">
                <div className="stt-modal-grid">
                  <div className="stt-field">
                    <label>Tỉ lệ đi học (%)</label>
                    <input
                      type="number"
                      value={rateAttendance}
                      onChange={(e) => setRateAttendance(Number(e.target.value))}
                      min={0}
                      max={100}
                    />
                  </div>

                  <div className="stt-field">
                    <label>Tỉ lệ làm bài tập (%)</label>
                    <input
                      type="number"
                      value={rateHomework}
                      onChange={(e) => setRateHomework(Number(e.target.value))}
                      min={0}
                      max={100}
                    />
                  </div>

                  <div className="stt-field">
                    <label>Tỉ lệ chuẩn bị bài (%)</label>
                    <input
                      type="number"
                      value={ratePreparation}
                      onChange={(e) => setRatePreparation(Number(e.target.value))}
                      min={0}
                      max={100}
                    />
                  </div>
                </div>

                <div style={{ height: 10 }} />

                <div className="stt-modal-section-title">Điểm theo môn</div>

                {editScores.length === 0 ? (
                  <div className="stt-emptybox">
                    Sinh viên này chưa có điểm trong <b>studentScores</b>.
                    <div style={{ marginTop: 6, opacity: 0.8 }}>
                      (Bạn thêm dữ liệu vào db.json hoặc tạo màn thêm điểm sau.)
                    </div>
                  </div>
                ) : (
                  <div className="stt-table-wrap">
                    <table className="stt-table">
                      <thead>
                        <tr>
                          <th>Môn</th>
                          <th className="right">HK1</th>
                          <th className="right">HK2</th>
                          <th className="right">Project</th>
                        </tr>
                      </thead>
                      <tbody>
                        {editScores.map((r) => (
                          <tr key={r.id}>
                            <td className="mono">{r.subjectName}</td>

                            <td className="right">
                              <input
                                className="stt-mini-input"
                                type="number"
                                value={r.hk1}
                                onChange={(e) =>
                                  setEditScores((prev) =>
                                    prev.map((x) =>
                                      x.id === r.id ? { ...x, hk1: Number(e.target.value) } : x
                                    )
                                  )
                                }
                              />
                            </td>

                            <td className="right">
                              <input
                                className="stt-mini-input"
                                type="number"
                                value={r.hk2}
                                onChange={(e) =>
                                  setEditScores((prev) =>
                                    prev.map((x) =>
                                      x.id === r.id ? { ...x, hk2: Number(e.target.value) } : x
                                    )
                                  )
                                }
                              />
                            </td>

                            <td className="right">
                              <input
                                className="stt-mini-input"
                                type="number"
                                value={r.project}
                                onChange={(e) =>
                                  setEditScores((prev) =>
                                    prev.map((x) =>
                                      x.id === r.id ? { ...x, project: Number(e.target.value) } : x
                                    )
                                  )
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {saveErr && <div className="stt-save-err">{saveErr}</div>}
              </div>

              <div className="stt-modal-foot">
                <button className="stt-btn" onClick={closeEditModal} disabled={saving}>
                  Huỷ
                </button>
                <button className="stt-btn stt-btn-primary" onClick={handleSave} disabled={saving}>
                  {saving ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  hint,
  highlight,
}: {
  title: string;
  value: number;
  hint?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`stt-card ${highlight ? "highlight" : ""}`}>
      <div className="stt-card-title">{title}</div>
      <div className="stt-card-value">{fmtScore(value)}</div>
      {hint && <div className="stt-card-hint">{hint}</div>}
    </div>
  );
}

function RateCard({ title, value }: { title: string; value: number }) {
  const v = clampPercent(value);
  return (
    <div className="stt-card">
      <div className="stt-card-title">{title}</div>
      <div className="stt-card-value">{v}%</div>
      <div className="stt-bar">
        <div className="stt-bar-fill" style={{ width: `${v}%` }} />
      </div>
      <div className="stt-card-hint">Tính theo %</div>
    </div>
  );
}

function avg(list: StudentScore[], key: "hk1" | "hk2" | "project") {
  const sum = list.reduce((s, x) => s + Number(x[key] ?? 0), 0);
  return list.length ? sum / list.length : 0;
}

function fmtScore(n: number) {
  if (!Number.isFinite(n)) return "0";
  return n % 1 === 0 ? n.toFixed(0) : n.toFixed(2);
}

function clampPercent(n: number) {
  const x = Number(n);
  if (!Number.isFinite(x)) return 0;
  if (x < 0) return 0;
  if (x > 100) return 100;
  return Math.round(x);
}

function rateClass(v: number) {
  const x = clampPercent(v);
  if (x < 70) return "rate-low"; 
  if (x < 85) return "rate-mid"; 
  return "rate-high"; 
}

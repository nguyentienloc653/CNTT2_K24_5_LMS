import { useEffect, useMemo, useState } from "react";
import "/src/admin/StatisicStudent/statisic.css";
import SideBarManager from "../../components/layout/SideBarManager";

type Student = {
  id: number;
  studentCode: string;
  name: string;
  classId?: number;
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

type Row = {
  id: number;
  studentCode: string;
  name: string;
  classId?: number;

  subjectsCount: number;

  hk1: number; // tổng quát (TB theo môn)
  hk2: number; // tổng quát (TB theo môn)
  project: number; // tổng quát (TB theo môn)
  total: number;

  attendance: number;
  homework: number;
  preparation: number;
};

const API_BASE = "http://localhost:3001";

export default function Statistic() {
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [studentScores, setStudentScores] = useState<StudentScore[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState<number | "all">("all");
  const [sortBy, setSortBy] = useState<
    "total" | "hk1" | "hk2" | "project" | "attendance" | "homework" | "preparation"
  >("total");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError("");

        const [stRes, subRes, scRes] = await Promise.all([
          fetch(`${API_BASE}/students`),
          fetch(`${API_BASE}/subjects`),
          fetch(`${API_BASE}/studentScores`),
        ]);

        if (!stRes.ok) throw new Error(`students fetch failed: ${stRes.status}`);
        if (!subRes.ok) throw new Error(`subjects fetch failed: ${subRes.status}`);
        if (!scRes.ok) throw new Error(`studentScores fetch failed: ${scRes.status}`);

        const st = (await stRes.json()) as unknown;
        const sub = (await subRes.json()) as unknown;
        const sc = (await scRes.json()) as unknown;

        setStudents(Array.isArray(st) ? (st as Student[]) : []);
        setSubjects(Array.isArray(sub) ? (sub as Subject[]) : []);
        setStudentScores(Array.isArray(sc) ? (sc as StudentScore[]) : []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const classOptions = useMemo(() => {
    const set = new Set<number>();
    for (const s of students) if (typeof s.classId === "number") set.add(s.classId);
    return Array.from(set).sort((a, b) => a - b);
  }, [students]);

  // group scores by studentId
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

      // ===== Tổng quát điểm theo môn: TRUNG BÌNH (avg) =====
      const hk1 = count ? avg(list, "hk1") : 0;
      const hk2 = count ? avg(list, "hk2") : 0;
      const project = count ? avg(list, "project") : 0;

      // Nếu bạn muốn "CỘNG TỔNG theo môn" thì đổi 3 dòng trên thành:
      // const hk1 = count ? sum(list, "hk1") : 0;
      // const hk2 = count ? sum(list, "hk2") : 0;
      // const project = count ? sum(list, "project") : 0;

      const total = +(hk1 + hk2 + project).toFixed(2);

      const attendance = clampPercent(s.rates?.attendance ?? 0);
      const homework = clampPercent(s.rates?.homework ?? 0);
      const preparation = clampPercent(s.rates?.preparation ?? 0);

      return {
        id: s.id,
        studentCode: s.studentCode || `SV${String(s.id).padStart(3, "0")}`,
        name: s.name || "Chưa có tên",
        classId: s.classId,

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

    // filter
    const q = search.trim().toLowerCase();
    let filtered = mapped.filter((r) => {
      const okSearch =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.studentCode.toLowerCase().includes(q);

      const okClass = classFilter === "all" || r.classId === classFilter;
      return okSearch && okClass;
    });

    // sort
    filtered.sort((a, b) => {
      const diff = (a[sortBy] as number) - (b[sortBy] as number);
      return sortDir === "desc" ? -diff : diff;
    });

    return filtered;
  }, [students, scoreGroup, search, classFilter, sortBy, sortDir]);

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
            <b>/students</b>, <b>/subjects</b>, <b>/studentScores</b>.
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
            <p className="stt-subtitle">
              Tổng quát điểm theo nhiều môn (TB theo môn) + tỉ lệ học tập
            </p>
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
                {classOptions.map((cid) => (
                  <option key={cid} value={cid}>
                    Class #{cid}
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
            <StatCard
              title="Tổng (TB)"
              value={averages.total}
              highlight
              hint="HK1 + HK2 + Project"
            />

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
                  <th className="right">Số môn</th>
                  <th className="right">HK1 (TB)</th>
                  <th className="right">HK2 (TB)</th>
                  <th className="right">Project (TB)</th>
                  <th className="right">Tổng</th>
                  <th className="right">Đi học</th>
                  <th className="right">Bài tập</th>
                  <th className="right">Chuẩn bị</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="mono">{r.studentCode}</td>
                    <td>
                      <div className="name-cell">
                        <div className="name">{r.name}</div>
                        <div className="sub">
                          {typeof r.classId === "number" ? `Class #${r.classId}` : "Chưa có lớp"}
                        </div>
                      </div>
                    </td>

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
                      <span className="badge">{r.attendance}%</span>
                    </td>
                    <td className="right">
                      <span className="badge">{r.homework}%</span>
                    </td>
                    <td className="right">
                      <span className="badge">{r.preparation}%</span>
                    </td>
                  </tr>
                ))}

                {!rows.length && (
                  <tr>
                    <td colSpan={10} className="empty">
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
      </div>
    </div>
  );
}

/* ====== components ====== */
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

/* ====== helpers ====== */
function avg(list: StudentScore[], key: "hk1" | "hk2" | "project") {
  const sum = list.reduce((s, x) => s + Number(x[key] ?? 0), 0);
  return list.length ? sum / list.length : 0;
}

// function sum(list: StudentScore[], key: "hk1" | "hk2" | "project") {
//   return list.reduce((s, x) => s + Number(x[key] ?? 0), 0);
// }

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

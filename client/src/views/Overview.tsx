import DonutChart from "../components/training-manager/DonutChart";
import progressImg from "../img/stat-progress.png";
import retakeImg from "../img/stat-retake.png";
import CourseDropdown from "../components/training-manager/CoursePropDown";
import "/src/views/css/Overview.css";


function Overview() {
  return (
    <>
      <header className="topbar">
        <h1 className="page-title">Tổng quan</h1>
        <select className="term-select">
          <option>Học kỳ 1</option>
          <option>Học kỳ 2</option>
        </select>
      </header>

      <section className="stats-row">
        <div className="stat-card-img">
            <img src={progressImg} alt="Môn học theo lộ trình" />
            <div className="stat-overlay">
            <span className="stat-title">Môn học theo lộ trình</span>
            <span className="stat-value">3/3</span>
            </div>
        </div>

        <div className="stat-card-img">
            <img src={retakeImg} alt="Môn học lại" />
            <div className="stat-overlay">
            <span className="stat-title">Môn học lại</span>
            <span className="stat-value">1/3</span>
            </div>
        </div>
        </section>

      <section className="card react-card">
        <div className="course-header">
          <CourseDropdown />
          <span className="status-pill status-pill--bad">
            Đủ điều kiện
          </span>
        </div>

        <div className="charts-row">
          <DonutChart
            title="Tỉ lệ đi học"
            items={[
              { label: "Đi học đủ", value: 90, color: "#c62026" },
              { label: "Nghỉ học", value: 10, color: "#f9c8ce" },
            ]}
          />

          <DonutChart
            title="Tỉ lệ làm bài tập"
            items={[
              { label: "Làm bài", value: 80, color: "#27115d" },
              { label: "Không làm", value: 20, color: "#e0d7ff" },
            ]}
          />

          <DonutChart
            title="Tỉ lệ chuẩn bị bài"
            items={[
              { label: "Làm bài", value: 33, color: "#5a5a5a" },
              { label: "Không làm", value: 67, color: "#e5e5e5" },
            ]}
          />
        </div>
      </section>
    </>
  );
}

export default Overview;

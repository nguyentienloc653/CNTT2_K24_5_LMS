import React, { useState } from "react";
import "/src/views/css/Attendance.css";

import Property from "../img/Property.png";
import Property2 from "../img/Property2.png";
import Property3 from "../img/Property3.png";
import left from "../img/left.png";
import right from "../img/right.png";

const DAYS = [
  { label: "11 Sun" },
  { label: "12 Mon", isToday: true },
  { label: "13 Tue" },
  { label: "14 Wed" },
  { label: "15 Thu" },
];

const HOURS = [
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
];

function Attendance() {
  const [view, setView] = useState("week"); 
  return (
    
    <div className="page">
      <header className="topbar schedule-topbar">
        <h1 className="page-title">Thời khóa biểu</h1>

        <div className="schedule-stats">
          <div className="schedule-stat-pill">
            <img src={Property} alt="" />
            <span>Ngày đi học:</span>
            <span className="schedule-stat-number">10</span>
          </div>
          <div className="schedule-stat-pill">
            <img src={Property2} alt="" />
            <span>Ngày nghỉ:</span>
            <span className="schedule-stat-number">2</span>
          </div>
          <div className="schedule-stat-pill">
            <img src={Property3} alt="" />
            <span>Tỉ lệ nghỉ học:</span>
            <span className="schedule-stat-number">10</span>
          </div>
        </div>
      </header>

      <section className="schedule-card">
        <div className="schedule-toolbar">
          <div className="schedule-arrows">
            <button className="circle-btn"><img src={left} alt="" /></button>
            <button className="circle-btn"><img src={right} alt="" /></button>
          </div>

          <div className="schedule-range">11–17 tháng 8</div>

          <div className="view-switcher">
            <button
              className={`view-btn ${view === "week" ? "active" : ""}`}
              onClick={() => setView("week")}
            >
              Tuần
            </button>
            <button
              className={`view-btn ${view === "day" ? "active" : ""}`}
              onClick={() => setView("day")}
            >
              Ngày
            </button>
            <button
              className={`view-btn ${view === "month" ? "active" : ""}`}
              onClick={() => setView("month")}
            >
              Tháng
            </button>
          </div>

        </div>

        <div className="schedule-grid">
          <div className="schedule-row schedule-header-row">
            <div className="schedule-time-cell" />
            {DAYS.map((d) => (
              <div
                key={d.label}
                className={
                  "schedule-day-header" +
                  (d.isToday ? " is-today" : "")
                }
              >
                {d.label}
              </div>
            ))}
          </div>

          {HOURS.map((time, rowIndex) => (
            <div key={time} className="schedule-row">
              <div className="schedule-time-cell">{time}</div>

              {DAYS.map((d, dayIndex) => (
                <div
                  key={d.label + time}
                  className={
                    "schedule-cell" +
                    (d.isToday ? " is-today" : "")
                  }
                >
                  {d.isToday && time === "11:00 AM" && (
                    <div className="schedule-event-line" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Attendance;

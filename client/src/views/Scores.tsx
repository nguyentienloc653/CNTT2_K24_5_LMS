// src/views/Scores.jsx
import React from "react";
import "/src/views/css/Scores.css";

const SCORES = [
  { subject: "HTML", hk1: 10, hk2: 10, project: 10 },
  { subject: "Node.js", hk1: 10, hk2: 10, project: 10 },
  { subject: "React.js", hk1: 10, hk2: 10, project: 10 },
  { subject: "Web Frontend Fundamental", hk1: 10, hk2: 10, project: 10 },
  { subject: "HTML", hk1: 10, hk2: 10, project: 10 },
  { subject: "Node.js", hk1: 10, hk2: 10, project: 10 },
  { subject: "React.js", hk1: 10, hk2: 10, project: 10 },
  { subject: "Web Frontend Fundamental", hk1: 10, hk2: 10, project: 10 },
  { subject: "HTML", hk1: 10, hk2: 10, project: 10 },
  { subject: "Node.js", hk1: 10, hk2: 10, project: 10 },
  { subject: "React.js", hk1: 10, hk2: 10, project: 10 },
  { subject: "Web Frontend Fundamental", hk1: 10, hk2: 10, project: 10 },
  { subject: "HTML", hk1: 10, hk2: 10, project: 10 },
];

function Scores() {
  return (
    <div className="page">
      <header className="topbar">
        <h1 className="page-title">Bảng điểm</h1>
        <select className="term-select">
          <option>Học kỳ 1</option>
          <option>Học kỳ 2</option>
        </select>
      </header>

      <section className="scores-card">
        <div className="scores-header">
          <table className="scores-table">
            <colgroup>
              <col style={{ width: "94px" }} />     
              <col style={{ width: "300px" }} />    

              <col style={{ width: "164.5px" }} />   
              <col style={{ width: "164.5px" }} />   
              <col style={{ width: "164.5px" }} />   
              <col style={{ width: "164.5px" }} />  
            </colgroup>

            <thead>
              <tr>
                <th>STT</th>
                <th>Môn học</th>
                <th>HK1</th>
                <th>HK2</th>
                <th>Project</th>
                <th>Tổng điểm</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="scores-body-wrapper">
          <table className="scores-table">
            <colgroup>
              <col style={{ width: "94px" }} />
              <col style={{ width: "300px" }} />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <tbody>
              {SCORES.map((row, index) => {
                const total = row.hk1 + row.hk2 + row.project;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.subject}</td>
                    <td>{row.hk1}</td>
                    <td>{row.hk2}</td>
                    <td>{row.project}</td>
                    <td>{total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Scores;

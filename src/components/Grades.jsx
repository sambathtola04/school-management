import Icon from './Icon';
import { GRADES_DATA } from '../data/mockData';

const getGradeClass = (score) => {
  if (score >= 90) return 'grade-a';
  if (score >= 80) return 'grade-b';
  if (score >= 70) return 'grade-c';
  return 'grade-d';
};

const Grades = () => (
  <div className="card">
    <div className="card-header">
      <div><div className="card-title">Grade Report</div><div className="card-subtitle">Current term academic results</div></div>
      <button className="btn btn-ghost"><span style={{ fontSize: 13 }}>Export CSV</span></button>
    </div>
    <table>
      <thead>
        <tr><th>Student</th><th>Mathematics</th><th>Science</th><th>English</th><th>History</th><th>Average</th><th>Standing</th></tr>
      </thead>
      <tbody>
        {GRADES_DATA.map((g, i) => (
          <tr key={i}>
            <td style={{ fontWeight: 600, color: 'var(--ink)' }}>{g.student}</td>
            {[g.math, g.science, g.english, g.history].map((score, j) => (
              <td key={j}><span className={`grade-cell ${getGradeClass(score)}`}>{score}</span></td>
            ))}
            <td>
              <span className={`grade-cell ${getGradeClass(g.avg)}`} style={{ fontFamily: 'var(--font-display)', fontSize: 15 }}>{g.avg}</span>
            </td>
            <td>
              <div style={{ display: 'flex' }}>
                {[1, 2, 3, 4].map(s => (
                  <span key={s} style={{ color: s <= Math.round(g.avg / 25) ? 'var(--gold)' : 'var(--border)', fontSize: 14 }}>
                    <Icon name="star" size={13} />
                  </span>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Grades;

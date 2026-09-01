import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts'
import { ChartNoAxesCombined, Trophy, AlertTriangle } from 'lucide-react'
import { Panel, PageHeader, StatCard, Progress } from '../../components/ui'
import { chartTopicData, chartTrendData, chartBatchData, chartSkillData } from '../../lib/mock'

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics"
        sub="Performance trends, topic mastery and weak spots — powered by live school data."
      />

      <div className="stat-row">
        <StatCard icon={ChartNoAxesCombined} color="#6366f1" value="87%" label="Overall term score" change="+6 vs last term" />
        <StatCard icon={ChartNoAxesCombined} color="#10b981" value="24" label="Top performers" change="above 90%" />
        <StatCard icon={ChartNoAxesCombined} color="#f59e0b" value="3" label="Need attention" change="weak topics" changeTone="negative" />
        <StatCard icon={ChartNoAxesCombined} color="#ec4899" value="40,247" label="Question bank" change="11 subjects" />
      </div>

      <div className="grid-2">
        <Panel title="Topic-wise Performance — Class 10A" icon={ChartNoAxesCombined}>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartTopicData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e3ddf5" />
                <XAxis dataKey="topic" tick={{ fontSize: 12, fill: '#7c88ad' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#7c88ad' }} />
                <Tooltip cursor={{ fill: '#eef2ff' }} />
                <Bar dataKey="score" name="Score" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={26} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Monthly Score Trend" icon={ChartNoAxesCombined}>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e3ddf5" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#7c88ad' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#7c88ad' }} />
                <Tooltip />
                <Line type="monotone" dataKey="score" name="Avg score" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Batch Comparison — Term 1" icon={ChartNoAxesCombined}>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartBatchData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e3ddf5" />
                <XAxis dataKey="batch" tick={{ fontSize: 12, fill: '#7c88ad' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#7c88ad' }} />
                <Tooltip cursor={{ fill: '#eef2ff' }} />
                <Legend />
                <Bar dataKey="math" name="Math" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={14} />
                <Bar dataKey="science" name="Science" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Skill Radar — Arjun Patel (Term 1 vs Term 2)" icon={ChartNoAxesCombined}>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartSkillData}>
                <PolarGrid stroke="#cfc6ea" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#4b5578' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Term 1" dataKey="term1" stroke="#818cf8" fill="#818cf8" fillOpacity={0.35} />
                <Radar name="Term 2" dataKey="term2" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid-2">
        <Panel title="Top Performers" icon={Trophy}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { name: 'Ananya Iyer', rank: 1, avg: 93, color: '#f59e0b' },
              { name: 'Aarav Sharma', rank: 2, avg: 92, color: '#8b8b8b' },
              { name: 'Priya Nair', rank: 3, avg: 91, color: '#cd7f32' },
              { name: 'Sara Khan', rank: 4, avg: 90, color: '#6366f1' },
              { name: 'Arjun Patel', rank: 5, avg: 88, color: '#10b981' },
            ].map((s) => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="status-badge" style={{ background: s.color, color: '#fff' }}>#{s.rank}</span>
                <span style={{ fontWeight: 800, fontSize: 13.5, color: 'var(--ink)', flex: 1 }}>{s.name}</span>
                <div style={{ width: 110 }}><Progress value={s.avg} color={s.color} /></div>
                <span style={{ fontWeight: 800, fontSize: 13, width: 34, textAlign: 'right' }}>{s.avg}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Students Needing Attention" icon={AlertTriangle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { name: 'Dev Malhotra', weak: ['Trigonometry', 'Algebra'], score: 58 },
              { name: 'Kabir Singh', weak: ['Probability', 'Geometry'], score: 62 },
              { name: 'Rahul Verma', weak: ['Calculus', 'Statistics'], score: 66 },
            ].map((s) => (
              <div key={s.name} className="fcard" style={{ boxShadow: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <b style={{ fontSize: 14, color: 'var(--ink)' }}>{s.name}</b>
                  <span className="status-badge status-overdue">Score {s.score}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {s.weak.map((w) => <span key={w} className="chip" style={{ padding: '4px 10px', fontSize: 11.5 }}>{w}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 6, fontSize: 12.5, color: 'var(--ink-muted)' }}>Auto-suggested remedial homework is queued for these students.</div>
        </Panel>
      </div>
    </>
  )
}
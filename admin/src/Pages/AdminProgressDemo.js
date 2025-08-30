const AdminProgressDemo = () => {
  const MOCK = {
    statistics: {
      totalActiveUsers: 128,
      completedCourses: 312,
      averageProgress: 64,
      certificatesEarned: 275
    },
    progressDistribution: [18, 37, 42, 31],
    weeklyTimeHours: {
      labels: ["W-8","W-7","W-6","W-5","W-4","W-3","W-2","W-1"],
      hours: [210, 238, 255, 290, 310, 330, 362, 401]
    },
    leaderboard: [
      { name: "Aarav Sharma", email: "aarav@school.edu", totalProgress: 95, completedCourses: 6, totalTimeSpent: 13240, averageQuizScore: 92, maxStreak: 21 },
      { name: "Zoya Khan", email: "zoya@school.edu", totalProgress: 92, completedCourses: 5, totalTimeSpent: 11890, averageQuizScore: 89, maxStreak: 18 },
      { name: "Vihaan Patel", email: "vihaan@school.edu", totalProgress: 89, completedCourses: 4, totalTimeSpent: 10420, averageQuizScore: 87, maxStreak: 14 },
      { name: "Ishita Rao", email: "ishita@school.edu", totalProgress: 86, completedCourses: 4, totalTimeSpent: 9800, averageQuizScore: 84, maxStreak: 12 },
      { name: "Kabir Singh", email: "kabir@school.edu", totalProgress: 84, completedCourses: 3, totalTimeSpent: 9120, averageQuizScore: 83, maxStreak: 11 }
    ],
    quizPerformance: {
      labels: ["AI Basics", "Python 101", "Algebra I", "Robotics"],
      averages: [86, 74, 81, 78],
      attempts: [142, 168, 120, 132]
    },
    courseUsers: [
      { name: "Aarav Sharma", course: "Artificial Intelligence Basics", progress: 98, time: 3240, avgQuiz: 93, streak: 21, completed: true },
      { name: "Zoya Khan", course: "Python 101", progress: 88, time: 2860, avgQuiz: 86, streak: 18, completed: false },
      { name: "Vihaan Patel", course: "Algebra I", progress: 75, time: 2440, avgQuiz: 82, streak: 14, completed: false },
      { name: "Ishita Rao", course: "Robotics Foundations", progress: 67, time: 2210, avgQuiz: 79, streak: 12, completed: false },
      { name: "Kabir Singh", course: "AI Basics", progress: 59, time: 1980, avgQuiz: 76, streak: 11, completed: false },
      { name: "Anaya Mehta", course: "Python 101", progress: 81, time: 2100, avgQuiz: 80, streak: 9, completed: false },
      { name: "Rohit Gupta", course: "Algebra I", progress: 44, time: 1520, avgQuiz: 71, streak: 6, completed: false }
    ],
    recentActivity: [
      { course: "Python 101", progress: 88, when: "2 hours ago", milestones: ["quiz_passed"] },
      { course: "AI Basics", progress: 98, when: "Today, 9:30 AM", milestones: ["chapter_complete"] },
      { course: "Robotics Foundations", progress: 67, when: "Yesterday", milestones: [] },
      { course: "Algebra I", progress: 75, when: "2 days ago", milestones: ["first_lecture"] }
    ]
  };

  const formatHours = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  const donutColors = ["#334155", "#1d4ed8", "#7c3aed", "#0ea5e9"];
  const donutTotal = MOCK.progressDistribution.reduce((a, b) => a + b, 0) || 1;
  const donutAngles = MOCK.progressDistribution.map((v) => Math.round((v / donutTotal) * 360));
  const donutStops = donutAngles.reduce((acc, ang, idx) => {
    const start = acc.prev;
    const end = start + ang;
    const color = donutColors[idx % donutColors.length];
    acc.parts.push(`${color} ${start}deg ${end}deg`);
    acc.prev = end;
    return acc;
  }, { prev: 0, parts: [] }).parts.join(", ");

  const timeMax = Math.max(...MOCK.weeklyTimeHours.hours);
  const timePoints = MOCK.weeklyTimeHours.hours.map((h, i) => {
    const x = (i / (MOCK.weeklyTimeHours.hours.length - 1)) * 100;
    const y = 100 - (h / timeMax) * 100;
    return `${x},${y}`;
  }).join(" ");

  const quizMax = 100;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">Learning Progress</span> • Admin Overview
            </h1>
            <p className="text-slate-300/80 mt-1">Mock data snapshot for presentation</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-sm text-slate-200 bg-white/5 border border-white/10">Today</span>
            <span className="px-3 py-1 rounded-full text-sm text-slate-200 bg-white/5 border border-white/10">Last 30 days</span>
            <span className="px-3 py-1 rounded-full text-sm text-slate-200 bg-white/5 border border-white/10">All time</span>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="rounded-2xl p-5 bg-white/5 border border-white/10 hover:translate-y-[-2px] transition">
            <div className="flex items-center justify-between">
              <div className="text-slate-300">Active Learners</div>
              <span className="text-cyan-300 text-xl">👥</span>
            </div>
            <div className="text-3xl font-extrabold mt-2">{MOCK.statistics.totalActiveUsers}</div>
            <div className="text-xs text-slate-400 mt-1">Unique users with progress</div>
          </div>

          <div className="rounded-2xl p-5 bg-white/5 border border-white/10 hover:translate-y-[-2px] transition">
            <div className="flex items-center justify-between">
              <div className="text-slate-300">Completed Courses</div>
              <span className="text-emerald-300 text-xl">✅</span>
            </div>
            <div className="text-3xl font-extrabold mt-2">{MOCK.statistics.completedCourses}</div>
            <div className="text-xs text-slate-400 mt-1">Across the platform</div>
          </div>

          <div className="rounded-2xl p-5 bg-white/5 border border-white/10 hover:translate-y-[-2px] transition">
            <div className="flex items-center justify-between">
              <div className="text-slate-300">Avg. Progress</div>
              <span className="text-fuchsia-300 text-xl">📈</span>
            </div>
            <div className="text-3xl font-extrabold mt-2">{MOCK.statistics.averageProgress}%</div>
            <div className="text-xs text-slate-400 mt-1">Mean course completion</div>
          </div>

          <div className="rounded-2xl p-5 bg-white/5 border border-white/10 hover:translate-y-[-2px] transition">
            <div className="flex items-center justify-between">
              <div className="text-slate-300">Certificates Issued</div>
              <span className="text-amber-300 text-xl">🏅</span>
            </div>
            <div className="text-3xl font-extrabold mt-2">{MOCK.statistics.certificatesEarned}</div>
            <div className="text-xs text-slate-400 mt-1">Eligible completions</div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-2xl p-5 bg-white/5 border border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Progress Distribution</h3>
              <span className="text-cyan-300">🎯</span>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <div className="relative" style={{ width: 180, height: 180 }}>
                <div className="absolute inset-0 rounded-full" style={{ background: `conic-gradient(${donutStops})` }}></div>
                <div className="absolute inset-4 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm text-slate-400">Avg</div>
                    <div className="text-2xl font-bold">{MOCK.statistics.averageProgress}%</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 text-xs">
              <span className="px-2 py-1 rounded border border-white/10 bg-white/5">0–25%</span>
              <span className="px-2 py-1 rounded border border-white/10 bg-white/5">26–50%</span>
              <span className="px-2 py-1 rounded border border-white/10 bg-white/5">51–75%</span>
              <span className="px-2 py-1 rounded border border-white/10 bg-white/5">76–100%</span>
            </div>
          </div>

          <div className="rounded-2xl p-5 bg-white/5 border border-white/10 md:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Learning Time • Last 8 Weeks</h3>
              <span className="text-emerald-300">⏱️</span>
            </div>
            <div className="mt-4">
              <svg viewBox="0 0 100 100" className="w-full h-60">
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="100" height="100" fill="rgba(255,255,255,0.02)" />
                <polyline points={timePoints} fill="none" stroke="#10b981" strokeWidth="1.5" />
                <polygon points={`0,100 ${timePoints} 100,100`} fill="url(#grad)" />
              </svg>
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                {MOCK.weeklyTimeHours.labels.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-2xl p-5 bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Top Learners</h3>
              <span className="text-amber-300">🏆</span>
            </div>
            <ul className="space-y-2">
              {MOCK.leaderboard.map((u, idx) => (
                <li key={u.email} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-sm">{idx + 1}</div>
                    <div>
                      <div className="font-semibold">{u.name}</div>
                      <div className="text-xs text-slate-400">{u.email}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{u.totalProgress}%</div>
                    <div className="text-xs text-slate-400">{u.completedCourses} courses • {formatHours(u.totalTimeSpent)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl p-5 bg-white/5 border border-white/10 md:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Quiz Performance</h3>
              <span className="text-fuchsia-300">📝</span>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3 items-end h-48">
              {MOCK.quizPerformance.averages.map((v, i) => (
                <div key={MOCK.quizPerformance.labels[i]} className="flex flex-col items-center gap-2">
                  <div className="w-10 bg-purple-500/60 rounded" style={{ height: `${(v / quizMax) * 100}%` }}></div>
                  <div className="text-xs text-center text-slate-300">{MOCK.quizPerformance.labels[i]}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Aggregated from {MOCK.quizPerformance.attempts.reduce((a, b) => a + b, 0)} quiz attempts across {MOCK.quizPerformance.labels.length} modules
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl p-5 bg-white/5 border border-white/10 md:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Course Progress by Learner</h3>
              <span className="text-cyan-300">📋</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-slate-400">
                    <th className="py-2">Learner</th>
                    <th className="py-2">Course</th>
                    <th className="py-2">Progress</th>
                    <th className="py-2">Time Spent</th>
                    <th className="py-2">Avg Quiz</th>
                    <th className="py-2">Streak</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK.courseUsers.map((r, idx) => (
                    <tr key={idx} className="border-t border-white/10 hover:bg-white/5">
                      <td className="py-3">
                        <div className="font-semibold">{r.name}</div>
                        <div className="text-xs text-slate-400">{r.completed ? "Certificate earned" : "In progress"}</div>
                      </td>
                      <td className="py-3">{r.course}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-28 bg-white/10 rounded-full h-2 overflow-hidden">
                            <div className={`h-2 rounded-full ${r.progress >= 80 ? "bg-emerald-400" : r.progress >= 50 ? "bg-cyan-400" : "bg-fuchsia-400"}`} style={{ width: `${r.progress}%` }}></div>
                          </div>
                          <div className="text-sm font-semibold">{r.progress}%</div>
                        </div>
                      </td>
                      <td className="py-3">{formatHours(r.time)}</td>
                      <td className="py-3">{r.avgQuiz}%</td>
                      <td className="py-3">{r.streak}d</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${r.completed ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                          {r.completed ? "Completed" : "Active"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl p-5 bg-white/5 border border-white/10 md:col-span-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Recent Activity</h3>
              <span className="text-emerald-300">📊</span>
            </div>
            <ul className="space-y-3">
              {MOCK.recentActivity.map((a, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-cyan-300 text-sm">{a.milestones.includes("chapter_complete") ? "📚" : a.milestones.includes("quiz_passed") ? "✅" : "▶"}</span>
                  </div>
                  <div>
                    <div className="font-semibold">{a.course}</div>
                    <div className="text-xs text-slate-400">Progress: {a.progress}% • {a.when}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminProgressDemo;



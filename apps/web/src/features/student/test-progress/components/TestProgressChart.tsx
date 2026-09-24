import { useEffect, useState, useMemo } from "react";
import {
  TrendingUp,
  Loader2,
  Target,
  Award,
  Sparkles,
  BarChart3,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import toast from "react-hot-toast";

import {
  getStudentTestProgress,
  type TestProgressPoint,
} from "../services/test-progress.api";

// ======================================================
// CUSTOM TOOLTIP COMPONENT
// ======================================================

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="rounded-xl border border-purple-100 bg-white/95 backdrop-blur-md p-3 shadow-xl shadow-purple-500/10 text-xs select-none">
        <div className="flex items-center gap-1.5 font-black text-slate-900 border-b border-slate-100 pb-1.5 mb-1.5">
          <Award size={13} className="text-purple-600" />
          <span className="truncate max-w-[180px] sm:max-w-[240px]">
            {data.title}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 text-slate-600">
          <span className="text-[11px] font-medium text-slate-500">
            {data.type?.replace(/_/g, " ") || "Test Score"}
          </span>
          <span className="text-xs font-black text-purple-700">
            {Number(data.percentage).toFixed(1)}%
          </span>
        </div>
      </div>
    );
  }

  return null;
};

// ======================================================
// MAIN COMPONENT
// ======================================================

const TestProgressChart = () => {
  const [progress, setProgress] = useState<TestProgressPoint[]>([]);
  const [loading, setLoading] = useState(true);

  // ==================================================
  // FETCH TEST PROGRESS
  // ==================================================

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);

        const response = await getStudentTestProgress();
        setProgress(response.progress || []);
      } catch (error: any) {
        console.error("[Test Progress] Failed to load:", error);
        toast.error(
          error?.response?.data?.message || "Unable to load test progress."
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchProgress();
  }, []);

  // ==================================================
  // PREPARE CHART DATA
  // ==================================================

  const chartData = useMemo(() => {
    return progress.map((item, index) => ({
      name: `T${index + 1}`,
      percentage: item.percentage,
      title: item.testTitle,
      type: item.testType,
    }));
  }, [progress]);

  // ==================================================
  // COMPUTED STATS
  // ==================================================

  const latestPercentage = useMemo(() => {
    return progress[progress.length - 1]?.percentage ?? 0;
  }, [progress]);

  const averagePercentage = useMemo(() => {
    if (progress.length === 0) return 0;
    const sum = progress.reduce((acc, item) => acc + item.percentage, 0);
    return sum / progress.length;
  }, [progress]);

  const isImproving = useMemo(() => {
    if (progress.length < 2) return true;
    const previous = progress[progress.length - 2]?.percentage ?? 0;
    return latestPercentage >= previous;
  }, [progress, latestPercentage]);

  // ==================================================
  // LOADING STATE
  // ==================================================

  if (loading) {
    return (
      <section className="rounded-2xl sm:rounded-3xl border border-purple-100/90 bg-white p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col items-center justify-center min-h-[260px] sm:min-h-[300px] gap-2.5">
          <Loader2 className="h-7 w-7 animate-spin text-purple-600" />
          <p className="text-xs font-semibold text-slate-400 animate-pulse">
            Analyzing test performance metrics...
          </p>
        </div>
      </section>
    );
  }

  // ==================================================
  // EMPTY STATE
  // ==================================================

  if (progress.length === 0) {
    return (
      <section className="rounded-2xl sm:rounded-3xl border border-purple-100/90 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
          <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 shadow-2xs mb-3.5">
            <Target className="h-6 w-6" />
          </div>

          <h3 className="text-sm sm:text-base font-black text-slate-900">
            No Test Progress Logged Yet
          </h3>

          <p className="mt-1 max-w-sm text-xs text-slate-500 font-normal leading-relaxed">
            Attempt your syllabus tests to generate real-time AI accuracy
            analytics and score trends here.
          </p>
        </div>
      </section>
    );
  }

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <section className="relative rounded-2xl sm:rounded-3xl border border-purple-100/90 bg-white p-4 sm:p-6 lg:p-7 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden select-none">
      {/* Background Accent Glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-100/50 blur-3xl" />

      {/* ==================================================
          HEADER
          ================================================== */}

      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 border border-purple-100 text-purple-600 shadow-2xs">
              <TrendingUp className="h-4 w-4" />
            </div>

            <h2 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
              Test Performance Analytics
            </h2>
          </div>

          <p className="mt-1 text-[11px] sm:text-xs font-medium text-slate-500">
            Track your score trajectories across all full-length & chapter mock tests
          </p>
        </div>

        {/* Micro Score HUD Stat Badges */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap self-start sm:self-auto">
          {/* Latest Metric */}
          <div className="rounded-xl border border-purple-200/80 bg-gradient-to-br from-purple-50 via-indigo-50/40 to-white px-3 sm:px-3.5 py-1.5 sm:py-2 shadow-2xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-purple-700">
                Latest Score
              </span>
              <Sparkles size={11} className="text-purple-600" />
            </div>
            <p className="mt-0.5 text-xs sm:text-sm font-black text-purple-900 leading-tight">
              {latestPercentage.toFixed(1)}%
            </p>
          </div>

          {/* Average Metric */}
          <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 px-3 sm:px-3.5 py-1.5 sm:py-2 shadow-2xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Avg Accuracy
              </span>
              <BarChart3 size={11} className="text-slate-400" />
            </div>
            <p className="mt-0.5 text-xs sm:text-sm font-black text-slate-800 leading-tight">
              {averagePercentage.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* ==================================================
          CHART CONTAINER (RESPONSIVE HEIGHT & MARGINS)
          ================================================== */}

      <div className="relative z-10 mt-5 h-[230px] sm:h-[270px] md:h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 15,
              right: 15,
              left: -20,
              bottom: 5,
            }}
          >
            {/* Soft Grid Lines */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F5F9"
            />

            {/* X-Axis */}
            <XAxis
              dataKey="name"
              tick={{
                fontSize: 10,
                fill: "#64748B",
                fontWeight: 600,
              }}
              axisLine={false}
              tickLine={false}
            />

            {/* Y-Axis */}
            <YAxis
              domain={[0, 100]}
              tick={{
                fontSize: 10,
                fill: "#64748B",
                fontWeight: 600,
              }}
              tickFormatter={(value) => `${value}%`}
              axisLine={false}
              tickLine={false}
            />

            {/* Interactive Tooltip */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#9333EA",
                strokeWidth: 1.5,
                strokeDasharray: "4 4",
              }}
            />

            {/* Score Progress Line */}
            <Line
              type="monotone"
              dataKey="percentage"
              stroke="#9333EA"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#FFFFFF",
                stroke: "#9333EA",
                strokeWidth: 2.5,
              }}
              activeDot={{
                r: 6,
                fill: "#9333EA",
                stroke: "#FFFFFF",
                strokeWidth: 2.5,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ==================================================
          FOOTER SUMMARY STATUS
          ================================================== */}

      <div className="relative z-10 mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] sm:text-[11px] font-semibold text-slate-500">
        <div className="flex items-center gap-1.5">
          <span
            className={`h-2 w-2 rounded-full ${
              isImproving ? "bg-emerald-500" : "bg-amber-500"
            }`}
          />
          <span>
            {isImproving
              ? "Upward score momentum detected"
              : "Keep practicing to push percentile above average"}
          </span>
        </div>

        <span className="font-bold text-purple-700">
          Last {progress.length} {progress.length === 1 ? "Test" : "Tests"}
        </span>
      </div>
    </section>
  );
};

export default TestProgressChart;
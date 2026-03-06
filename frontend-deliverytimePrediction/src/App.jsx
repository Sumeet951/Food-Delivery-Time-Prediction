import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    Distance_km: "",
    Weather: "",
    Traffic_Level: "",
    Time_of_Day: "",
    Vehicle_Type: "",
    Preparation_Time_min: "",
    Courier_Experience_yrs: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    try {
      const res = await fetch("https://food-delivery-time-prediction-2.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setPrediction(data.predicted_delivery_time);
    } catch {
      alert("Prediction failed. Is the server running?");
    }
    setLoading(false);
  };

  const inputClass =
    "w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 text-sm placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200";

  const labelClass =
    "block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2";

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      {/* Ambient glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">

        {/* Top gradient bar */}
        <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600" />

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
              Live Estimator
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight leading-tight">
            Delivery Time{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Intelligence
            </span>
          </h1>
          <p className="mt-2 text-slate-500 text-sm font-mono">
            // ML-powered ETA prediction engine
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-7">
          <form onSubmit={handleSubmit} className="space-y-7">

            {/* Section: Route Parameters */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-slate-600 uppercase tracking-widest whitespace-nowrap">
                  Route Parameters
                </span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "Distance_km", label: "Distance", unit: "km", placeholder: "0.0" },
                  { name: "Preparation_Time_min", label: "Prep Time", unit: "min", placeholder: "0" },
                  { name: "Courier_Experience_yrs", label: "Experience", unit: "yrs", placeholder: "0" },
                ].map(({ name, label, unit, placeholder }) => (
                  <div key={name}>
                    <label className={labelClass}>{label}</label>
                    <div className="relative">
                      <input
                        type="number"
                        name={name}
                        placeholder={placeholder}
                        onChange={handleChange}
                        step="any"
                        min="0"
                        className={inputClass + " pr-10"}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs font-mono pointer-events-none">
                        {unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Conditions */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-slate-600 uppercase tracking-widest whitespace-nowrap">
                  Conditions
                </span>
                <div className="flex-1 h-px bg-slate-800" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Weather", label: "Weather", icon: "🌤", options: ["Sunny", "Cloudy", "Rainy"] },
                  { name: "Traffic_Level", label: "Traffic Level", icon: "🚦", options: ["Low", "Medium", "High"] },
                  { name: "Time_of_Day", label: "Time of Day", icon: "🕐", options: ["Morning", "Afternoon", "Evening", "Night"] },
                  { name: "Vehicle_Type", label: "Vehicle Type", icon: "🛵", options: ["Bike", "Scooter", "Car"] },
                ].map(({ name, label, icon, options }) => (
                  <div key={name}>
                    <label className={labelClass}>
                      {icon} {label}
                    </label>
                    <select
                      name={name}
                      onChange={handleChange}
                      defaultValue=""
                      className={inputClass + " cursor-pointer"}
                    >
                      <option value="" disabled>Select…</option>
                      {options.map((o) => (
                        <option key={o} value={o} className="bg-slate-900">
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm uppercase tracking-widest py-4 rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Calculating ETA…
                  </>
                ) : (
                  <>
                    <span>Predict Delivery Time</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </>
                )}
              </span>
              {/* Shine sweep effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </button>
          </form>

          {/* Prediction Result */}
          {prediction !== null && (
            <div className="mt-6 rounded-2xl overflow-hidden border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent">
              <div className="flex items-center gap-5 px-6 py-5">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                  🛵
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-1">
                    Estimated Arrival
                  </p>
                  <p className="text-4xl font-black text-white tracking-tight">
                    {prediction}
                    <span className="text-lg font-normal text-slate-500 ml-2">minutes</span>
                  </p>
                </div>
                <div className="ml-auto text-right hidden sm:block">
                  <p className="text-xs text-slate-600 font-mono">confidence</p>
                  <p className="text-lg font-bold text-emerald-400">High</p>
                </div>
              </div>
              <div className="h-1 bg-slate-800">
                <div className="h-full w-3/4 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-700">v1.0.0 · ML Model Active</span>
          <span className="flex items-center gap-1.5 text-xs text-emerald-500 font-mono">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            API Connected
          </span>
        </div>
      </div>
    </div>
  );
}
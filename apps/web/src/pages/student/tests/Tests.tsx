import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { getTests } from "../../../api/studentTestApi";
import TestCard from "./components/TestCard";

import type { Test } from "../../../types/studentTest.types";

const Tests = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTests = async () => {
    try {
      setLoading(true);

      const response = await getTests();

      setTests(response.tests ?? []);
    } catch (error) {
      console.error("Failed to load tests:", error);
      setTests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTests();
  }, []);

  if (loading) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#000000]">
      <Loader2
        size={40}
        className="animate-spin text-indigo-500"
      />
    </div>
  );
}

  return (
    <div className="mx-auto max-w-7xl p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Choose a test and start your preparation.
        </h1>

        
      </div>

      {tests.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-black p-10 text-center">
          <h2 className="text-xl font-semibold text-white">
            No Tests Available
          </h2>

          <p className="mt-2 text-slate-400">
            There are no published tests at the moment.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tests.map((test) => (
            <TestCard
              key={test.id}
              test={test}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tests;
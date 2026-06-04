const AdminDashboard = () => {

  return (

    <div>

      <h1 className="text-4xl font-black text-white">

        Admin Dashboard

      </h1>

      <p className="text-slate-400 mt-2">

        Manage MentorSala Platform

      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        <div className="bg-slate-900 rounded-2xl p-6">
          <h3 className="text-slate-400">
            Total Students
          </h3>
          <p className="text-4xl text-white font-bold mt-3">
            0
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <h3 className="text-slate-400">
            Total Mentors
          </h3>
          <p className="text-4xl text-white font-bold mt-3">
            0
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <h3 className="text-slate-400">
            Pending Mentors
          </h3>
          <p className="text-4xl text-yellow-400 font-bold mt-3">
            0
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6">
          <h3 className="text-slate-400">
            Total Sessions
          </h3>
          <p className="text-4xl text-green-400 font-bold mt-3">
            0
          </p>
        </div>

      </div>

    </div>

  );

};

export default AdminDashboard;
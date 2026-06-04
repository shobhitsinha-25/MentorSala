export default function Rejected() {

  return (

    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6">

      <div className="max-w-xl w-full bg-slate-900 border border-red-900 rounded-3xl p-10 text-center">

        <h1 className="text-3xl font-bold text-red-400 mb-4">

          Application Rejected

        </h1>

        <p className="text-slate-400 leading-relaxed">

          Unfortunately your mentor application was not approved.

          <br />
          <br />

          You may contact MentorSala support for further clarification.

        </p>

      </div>

    </div>

  );

}
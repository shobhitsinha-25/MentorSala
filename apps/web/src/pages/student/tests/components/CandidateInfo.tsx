interface CandidateInfoProps {
  name: string;
  avatar?: string;
}

const CandidateInfo = ({
  name,
  avatar,
}: CandidateInfoProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-slate-300 bg-slate-100">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg font-bold text-slate-500">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-white">
          Candidate
        </p>

        <h2 className="text-base font-semibold text-white">
          {name}
        </h2>
      </div>
    </div>
  );
};

export default CandidateInfo;
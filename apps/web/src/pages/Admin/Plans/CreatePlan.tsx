import { useNavigate } from "react-router-dom";

import PlanForm from "./components/PlanForm";

const CreatePlan = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <h1>
          Create Subscription Plan
        </h1>

        <p>
          Create a subscription plan and configure
          its features and test limits.
        </p>
      </div>

      <PlanForm
        mode="create"
        onSuccess={() => {
          navigate("/admin/plans");
        }}
        onCancel={() => {
          navigate(-1);
        }}
      />
    </div>
  );
};

export default CreatePlan;
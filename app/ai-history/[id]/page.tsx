"use client";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import PlannerDetails from "./components/PlannerDetails";
import WorkflowDetails from "./components/WorkflowDetails";
import { div } from "framer-motion/client";
export default function AIPlanDetailsPage() {
  const params = useParams();

  const [plan, setPlan] = useState<any>(null);
  const [planType, setPlanType] = useState<"planner" | "workflow" | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`/api/ai/history/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setPlan(data.data);
          setPlanType(data.type);
        }
        console.log(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!plan) {
    return <div>Plan not found</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!plan) {
    return <div>Plan not found</div>;
  }
  return planType === "planner" ? (
    <PlannerDetails plan={plan} />
  ) : (
    <WorkflowDetails workflow={plan} />
  );
}

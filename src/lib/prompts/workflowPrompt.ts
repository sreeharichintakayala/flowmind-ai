interface WorkflowPromptInput {
  title: string;
  description: string;
  industry: string;
  complexity: string;
  duration: string;
  techStack: string[];
}
export function buildWorkflowPrompt({
  title,
  description,
  industry,
  complexity,
  duration,
  techStack,
}: WorkflowPromptInput) {
  return `
You are an expert Project Manager and Software Architect.

Generate a complete workflow.

Return ONLY valid JSON.

Project Title:
${title}

Description:
${description}
Industry:
${industry}

Project Complexity:
${complexity}

Expected Duration:
${duration}

Preferred Technology Stack:
${techStack.join(", ")}
Generate a professional project title.

The project title should:
- Be short (2–6 words).
- Represent the complete project.
- Sound like a real software product.
- Do NOT simply repeat the user's prompt.

Examples:

User Idea:
Appointments, patient records, doctors, pharmacy and billing.

Project Title:
Hospital Management System

User Idea:
Online food ordering and delivery.

Project Title:
Food Delivery Platform

Format:

{
"projectTitle":"",
"summary":"",
"tasks":[
{
"title":"",
"priority":"HIGH | MEDIUM | LOW",
"status":"TODO"
}
],
"milestones":[
{
"title":""
}
],
"timeline":[
{
"week":"",
"description":""
}
],
"risks":[
{
"description":"",
"severity":"HIGH | MEDIUM | LOW"
}
],
"recommendedTech":[]
}

Generate around 15 tasks.
`;
}

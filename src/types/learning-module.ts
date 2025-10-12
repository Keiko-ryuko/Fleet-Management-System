export interface LearningModule {
  id: string;
  title: string;
  subject: string;
  form: number; // Corresponds to Form 1-4
  description: string;
  contentUrl: string; // Placeholder for where module content would be
  status: "downloaded" | "available" | "updating"; // Reflects offline-first status
  language: "English" | "Shona" | "Ndebele";
}
export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  contactNumber: string;
  email: string;
  status: "active" | "inactive" | "on-leave";
}
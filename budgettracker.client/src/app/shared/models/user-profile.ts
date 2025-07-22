export interface UserProfile {
  id: number;
  userId: string;
  email: string;
  userName: string;
  currency: string; // "UAH";
  currencyCode: number; // 980;
  apiKeyMonobank: string;
  created: Date;
  Changed: Date;
}

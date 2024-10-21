export interface CustodianAdvisorDto {
  custodian_name: string;
  advisors: AdvisorAum[];
}

export interface AdvisorAum {
  advisor_name: string;
  total_aum: number;
}

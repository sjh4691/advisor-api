import { ClientDto } from "./client.dto";

export interface AdvisorDto {
  id: number;
  name: string;
}

export interface AdvisorAumDto {
  advisor_aum: number;
}

export interface AdvisorAum {
  advisor_name: string;
  total_aum: number;
}

export interface AdvisorWithClientsDto {
  advisor_id: number;
  advisor_name: string;
  clients: ClientDto[];
}

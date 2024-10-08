export interface SignupFormValues {
  username: string;
  password: string;
  name: string;
  surname: string;
  position: string;
  foot: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface CreateMatchFormData {
  id: number | null;
  location: string;
  matchDate: string;
  teamSize: number;
  whiteTeam: String[];
  blackTeam: String[];
  isPlayed: boolean;
}

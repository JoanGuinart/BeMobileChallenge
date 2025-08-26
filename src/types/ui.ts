export interface HeartProps {
  id: number;
  heartClass?: string;
  isBig?: boolean;
}

export interface LoadingBarProps {
  loading: boolean;
}

export interface SearchBarProps {
  value: string;
  numberOfResults: number;
  onSearchChange: (value: string) => void;
}

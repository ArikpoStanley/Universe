import { nigeriaStates } from './nigeria';

export function getNigeriaStateNames(): string[] {
  return nigeriaStates.map((state) => state.name);
}

export function getNigeriaLgas(stateName: string): string[] {
  const match = nigeriaStates.find((state) => state.name === stateName);
  return match ? [...match.lgas] : [];
}

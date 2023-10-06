export function useSwitchCase(value: string, cases: Record<string, string>) {
  return cases[value] || cases.default
}

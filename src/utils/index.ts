export function removeEmptyValues(obj: Record<string, any>) {
  return Object.entries(obj)
    .filter(([_, value]) => {
      return value !== null && value !== undefined && value !== "";
    })
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, any>);
}

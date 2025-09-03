export function fmt(value: string | number | undefined): string {
  if (value) {
    const parsed = parseFloat(
      typeof value === "number" ? value.toString() : value
    );
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parsed);
  }
  return "N/A";
}

export default function formatDate(dateString: string): string {
  if (dateString == null) {
    return "Unknown";
  }
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
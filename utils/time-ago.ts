export function timeAgo(date: string): string {
  const now = new Date();
  const diffInMs = now.getTime() - new Date(date).getTime();

  const diffInSecs = Math.floor(diffInMs / 1000);
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSecs < 60) return diffInSecs + "s";
  if (diffInMins < 60) return diffInMins + "m";
  if (diffInHours < 24) return diffInHours + "h";
  if (diffInDays === 1) return "Yesterday";
  return diffInDays + " days";
}

export function TodoOrDie(message: string, deadline: Date): void;
export function TodoOrDie(message: string, deadline: string): void;
export function TodoOrDie(message: string, deadline: Date | string): void {
  const currentDate = new Date();
  const overdueDate = typeof deadline === "string" ? new Date(deadline) : deadline;
  if (currentDate > overdueDate) {
    // tslint:disable-next-line no-console
    console.error(`TODO: '${message}' is overdue. Do it!`);
  }
}

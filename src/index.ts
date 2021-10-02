export const TodoOrDie = (message: string, deadline: Date | string) => {
  const currentDate = new Date();
  const overdueDate = typeof deadline === "string" ? new Date(deadline) : deadline;
  if (currentDate > overdueDate) {
    console.error(`TODO: '${message}' is overdue. Do it!`);
  }
};

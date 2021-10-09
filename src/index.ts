export function TodoOrDie(message: string, trigger: () => boolean): void;
export function TodoOrDie(message: string, trigger: Date): void;
export function TodoOrDie(message: string, trigger: string): void;
export function TodoOrDie(message: string, trigger: Date | string | (() => boolean)): void {
  if (typeof trigger === "function" && trigger()) {
    die(message);
  }

  const currentDate = new Date();
  const overdueDate = typeof trigger === "string" ? new Date(trigger) : trigger;
  if (currentDate > overdueDate) {
    die(message);
  }
}

function die(message: string) {
  console.error(`TODO: '${message}' is overdue. Do it!`);
}
interface TodoOptions {
  overdueHandler?: (message: string) => void;
}

export function TodoOrDie(message: string, trigger: () => boolean, options?: TodoOptions): void;
export function TodoOrDie(message: string, trigger: Date, options?: TodoOptions): void;
export function TodoOrDie(message: string, trigger: string, options?: TodoOptions): void;
export function TodoOrDie(message: string, trigger: Date | string | (() => boolean), options?: TodoOptions): void {
  const overdueHandler = options?.overdueHandler ?? die;
  if (typeof trigger === "function" && trigger()) {
    overdueHandler(message);
  }

  const currentDate = new Date();
  const overdueDate = typeof trigger === "string" ? new Date(trigger) : trigger;
  if (currentDate > overdueDate) {
    overdueHandler(message);
  }
}

function die(message: string): void {
  console.error(`TODO: '${message}' is overdue. Do it!`);
}

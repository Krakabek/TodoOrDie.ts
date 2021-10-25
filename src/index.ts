interface TodoOptions {
  overdueHandler?: (message: string) => void;
}

/**
 * This is a default overdue handler
 * Exported primarily for tests, but you can use it if you need to reset the custom behavior
 */
export function defaultOverdueHandler(message: string): void {
  console.error(`TODO: '${message}' is overdue. Do it!`);
}

const globalTodoOptions: Required<TodoOptions> = {
  overdueHandler: defaultOverdueHandler,
};

export function setTodoOrDieConfig(config: TodoOptions): void {
  Object.entries(config).forEach(([optionKey, optionValue]) => {
    globalTodoOptions[optionKey as keyof TodoOptions] = optionValue;
  });
}

export function TodoOrDie(message: string, trigger: () => boolean, options?: TodoOptions): void;
export function TodoOrDie(message: string, trigger: Date, options?: TodoOptions): void;
export function TodoOrDie(message: string, trigger: string, options?: TodoOptions): void;
export function TodoOrDie(message: string, trigger: Date | string | (() => boolean), options?: TodoOptions): void {
  const overdueHandler = options?.overdueHandler ?? globalTodoOptions.overdueHandler;
  if (typeof trigger === "function" && trigger()) {
    overdueHandler(message);
  }

  const currentDate = new Date();
  const overdueDate = typeof trigger === "string" ? new Date(trigger) : trigger;
  if (currentDate > overdueDate) {
    overdueHandler(message);
  }
}

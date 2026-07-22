type LogLevel = "info" | "warn" | "error" | "debug";

interface LogPayload {
  message: string;
  level?: LogLevel;
  context?: Record<string, unknown>;
  error?: Error | unknown;
  timestamp?: string;
}

class Logger {
  private formatLog({ message, level = "info", context = {}, error, timestamp = new Date().toISOString() }: LogPayload) {
    const errorDetails = error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error;

    return {
      timestamp,
      level,
      message,
      ...(Object.keys(context).length > 0 ? { context } : {}),
      ...(errorDetails ? { error: errorDetails } : {}),
    };
  }

  info(message: string, context?: Record<string, unknown>) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[INFO] ${message}`, context || "");
    }
  }

  warn(message: string, context?: Record<string, unknown>) {
    console.warn(`[WARN] ${message}`, context || "");
  }

  error(message: string, error?: Error | unknown, context?: Record<string, unknown>) {
    const payload = this.formatLog({ message, level: "error", error, context });
    console.error(`[ERROR] ${message}`, payload);
  }

  debug(message: string, context?: Record<string, unknown>) {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[DEBUG] ${message}`, context || "");
    }
  }
}

export const logger = new Logger();

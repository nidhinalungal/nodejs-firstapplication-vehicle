declare module 'pm2' {
  export interface AppsOptions {
    name: string;
    script: string;
    instances?: string | number;
    exec_mode?: string;
    interpreter?: string;
    watch?: boolean;
    env?: Record<string, string>;
    env_production?: Record<string, string>;
  }

  export function start(options: AppsOptions[], callback: (err: Error, apps: any) => void): void;
  export function stop(name: string, callback: (err: Error) => void): void;
  export function restart(name: string, callback: (err: Error) => void): void;
  export function remove(name: string, callback: (err: Error) => void): void;
}

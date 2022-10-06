import { path } from "path";

export async function watcher(
  fn: () => Promise<void>,
  include: string[],
  options: {
    exclude?: string[];
    timeout?: number;
  }
) {
  let includePaths: string[] = [];
  let excludePaths: string[] = [];
  const { exclude, timeout } = options;
  const root = Deno.cwd();

  include.forEach((p) => {
    includePaths.push(path.resolve(root, p));
  });

  if (exclude) {
    exclude.forEach((p) => {
      excludePaths.push(path.resolve(root, p));
    });
  }

  await fn();

  const watcher = Deno.watchFs(includePaths);
  const notifiers = new Map<string, number>();

  for await (const event of watcher) {
    const dataString = JSON.stringify(event);
    if (notifiers.has(dataString)) {
      clearTimeout(notifiers.get(dataString));
      notifiers.delete(dataString);
    }

    notifiers.set(
      dataString,
      setTimeout(async () => {
        const checkPath = path.dirname(event?.paths?.[0]);
        if (excludePaths.includes(checkPath)) {
          return;
        }
        let flags = false;
        excludePaths.forEach((p) => {
          if (checkPath.startsWith(p)) {
            flags = true;
            return;
          }
        });
        if (flags) {
          return;
        }
        includePaths.forEach((p) => {
          if (checkPath.startsWith(p)) {
            flags = true;
          }
        });
        if (!flags) {
          return;
        }
        await fn();
        notifiers.delete(dataString);
      }, timeout ?? 1000)
    );
  }
}

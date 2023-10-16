interface Output {
  pre: string;
  stdout: string;
  stderr: string;
  post: string;
}

export type OutputView = Record<number, Output>;


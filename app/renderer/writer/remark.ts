export type RemarkNode = {
  type: string;
  position: {
    end: { column: number; line: number; offset: number };
    start: { column: number; line: number; offset: number };
  };
  children?: RemarkNode[];
  value?: string;
  depth?: number;
  url?: string;
};

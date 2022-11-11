import { HTMLAttributes } from 'react';

export interface ITagPreviewProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'hidden'> {
  projectId?: string;
}

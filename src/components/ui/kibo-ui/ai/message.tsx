import { cn } from '@/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import type { ComponentProps, HTMLAttributes } from 'react';

export type AIMessageProps = HTMLAttributes<HTMLDivElement> & {
  from: 'user' | 'assistant';
};

export const AIMessage = ({ className, from, ...props }: AIMessageProps) => (
  <div
    className={cn(
      'group flex w-full items-end gap-2 py-4',
      from === 'user' ? 'justify-end is-user' : 'justify-start is-assistant',
      '[&>div]:max-w-[80%]',
      className
    )}
    {...props}
  />
);

export type AIMessageContentProps = HTMLAttributes<HTMLDivElement>;

export const AIMessageContent = ({
  children,
  className,
  ...props
}: AIMessageContentProps) => (
  <div
    className={cn(
      'flex flex-col gap-2 rounded-3xl px-4 py-3 text-sm',
      'bg-muted text-foreground',
      'group-[.is-user]:bg-[var(--user-message-background)] group-[.is-user]:text-[var(--user-message-foreground)]',
      'group-[.is-assistant]:bg-gradient-to-r group-[.is-assistant]:from-[#EEF0FC] group-[.is-assistant]:to-[#FFFFFF]',
      'dark:group-[.is-assistant]:from-[#303236] dark:group-[.is-assistant]:to-[#242629]',
      className
    )}
    {...props}
  >
    <div className="is-user:dark">{children}</div>
  </div>
);

export type AIMessageAvatarProps = ComponentProps<typeof Avatar> & {
  src: string;
  name?: string;
};

export const AIMessageAvatar = ({
  src,
  name,
  className,
  ...props
}: AIMessageAvatarProps) => (
  <Avatar className={cn('size-8', className)} {...props}>
    <AvatarImage className="mt-0 mb-0" src={src} alt="" />
    <AvatarFallback>{name?.slice(0, 2) || 'ME'}</AvatarFallback>
  </Avatar>
);

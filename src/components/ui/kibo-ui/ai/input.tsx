'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Loader2Icon, SendIcon } from 'lucide-react';
import { Children, useCallback, useEffect, useRef, useState } from 'react';
import type {
  ComponentProps,
  HTMLAttributes,
  KeyboardEventHandler,
} from 'react';
import React from 'react';

type UseAutoResizeTextareaProps = {
  minHeight: number;
  maxHeight?: number;
};

const useAutoResizeTextarea = ({
  minHeight,
  maxHeight,
}: UseAutoResizeTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) {
        return;
      }

      if (reset || !textarea.value) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      // Temporarily shrink to get the right scrollHeight
      textarea.style.height = `${minHeight}px`;

      // Calculate new height
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );

      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    // Set initial height
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = `${minHeight}px`;
    }
  }, [minHeight]);

  // Adjust height on window resize
  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
};

export type AIInputProps = HTMLAttributes<HTMLFormElement>;

export const AIInput = ({ className, ...props }: AIInputProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className="relative p-[1px] min-h-[120px]">
      {/* Gradient border background */}
      <div 
        className={cn(
          "absolute inset-0 [background-size:100%_100%] [background-position:0px_0px,0px_0px] [background-image:linear-gradient(0deg,#FFFFFFFF_90%,#FFFFFF00_100%),linear-gradient(90deg,#B5BDEDFF_1%,#FFC3A8FF_100%)] dark:[background-image:linear-gradient(0deg,#242629_90%,#24262900_100%),linear-gradient(90deg,#9DA6D7FF_0%,#DD9E7DFF_99%)]",
          isMobile ? "rounded-t-3xl" : "rounded-3xl"
        )}
      />
      {/* Main content */}
      <form
        className={cn(
          'relative flex flex-col w-full bg-white dark:bg-[#2d2f33] pt-5 pl-5 pr-5 pb-3 text-sm ring-offset-background transition-colors shadow-[0px_4px_6px_0px_rgba(17,_12,_46,_0.15)] dark:shadow-none min-h-[120px]',
          isMobile ? "rounded-t-3xl" : "rounded-3xl",
          className
        )}
        {...props}
      />
    </div>
  );
};

export type AIInputTextareaProps = ComponentProps<typeof Textarea> & {
  minHeight?: number;
  maxHeight?: number;
};

export const AIInputTextarea = ({
  onChange,
  className,
  placeholder = 'What would you like to know?',
  value,
  ...props
}: AIInputTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to get the correct scrollHeight
    textarea.style.height = '80px';
    
    // Calculate new height, max 300px
    const newHeight = Math.min(textarea.scrollHeight, 300);
    textarea.style.height = `${newHeight}px`;
  }, []);

  // Reset height when value changes (e.g., when message is sent and input is cleared)
  useEffect(() => {
    if (!value || value === '') {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = '80px';
      }
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustHeight();
    onChange?.(e);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow Shift+Enter for new lines
        return;
      }
      if (e.metaKey || e.ctrlKey) {
        // Cmd/Ctrl+Enter also works
        e.preventDefault();
        const form = e.currentTarget.form;
        if (form) {
          form.requestSubmit();
        }
      } else {
        // Just Enter sends the message
        e.preventDefault();
        const form = e.currentTarget.form;
        if (form) {
          form.requestSubmit();
        }
      }
    }
  };

  return (
    <Textarea
      name="message"
      placeholder={placeholder}
      ref={textareaRef}
      value={value}
      className={cn(
        'w-full resize-none rounded-none border-none p-0 shadow-none outline-none ring-0',
        'bg-transparent dark:bg-transparent',
        'focus-visible:ring-0',
        'text-base',
        'min-h-[80px]',
        className
      )}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};

export type AIInputToolbarProps = HTMLAttributes<HTMLDivElement>;

export const AIInputToolbar = ({
  className,
  ...props
}: AIInputToolbarProps) => (
  <div
    className={cn('flex items-center justify-end gap-2 mt-2 w-fit ml-auto', className)}
    {...props}
  />
);

export type AIInputToolsProps = HTMLAttributes<HTMLDivElement>;

export const AIInputTools = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center gap-2', className)}
    {...props}
  />
))

export type AIInputButtonProps = ComponentProps<typeof Button>;

export const AIInputButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "ghost"
  }
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'shrink-0 gap-1.5 rounded-full w-10 h-10',
        'flex items-center justify-center',
        'transition-colors',
        'disabled:opacity-50 disabled:pointer-events-none',
        variant === 'default' && [
          'bg-primary text-primary-foreground hover:bg-primary/90',
          'dark:bg-[var(--card)] dark:text-white dark:hover:bg-[var(--card)]/90'
        ],
        variant === 'ghost' && [
          'hover:bg-accent hover:text-accent-foreground',
          'dark:hover:bg-[var(--card)] dark:hover:text-primary-foreground'
        ],
        className
      )}
      {...props}
    />
  )
})

export type AIInputSubmitProps = ComponentProps<typeof Button> & {
  status?: 'submitted' | 'streaming' | 'ready' | 'error';
};

export const AIInputSubmit = ({
  className,
  variant = 'default',
  size = 'icon',
  status,
  children,
  ...props
}: AIInputSubmitProps) => {
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      className={cn(
        'shrink-0 gap-1.5 rounded-full w-10 h-10',
        status === 'submitted' && 'pointer-events-none',
        variant === 'default' && [
          'bg-primary text-primary-foreground hover:bg-primary/90',
          'dark:bg-[var(--card)] dark:text-white dark:hover:bg-[var(--card)]/90'
        ],
        className
      )}
      {...props}
    >
      {status === 'submitted' ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        children ?? <SendIcon className="h-4 w-4" />
      )}
    </Button>
  );
};

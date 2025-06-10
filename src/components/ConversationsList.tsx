import { MessageCircle } from "lucide-react";

export type Commenter = {
  id: number;
  name: string;
  imageUrl: string;
};

export type Discussion = {
  id: number;
  title: string;
  href: string;
  author: { name: string; href: string };
  date: string;
  dateTime: string;
  status: string;
  totalComments: number;
  commenters: Commenter[];
};

export default function ConversationsList({ discussions }: { discussions: Discussion[] }) {
  return (
    <ul role="list" className="divide-y divide-border">
      {discussions.map((discussion) => (
        <li
          key={discussion.id}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
        >
          <div>
            <p className="text-sm/6 font-semibold text-foreground">
              <a href={discussion.href} className="hover:underline">
                {discussion.title}
              </a>
            </p>
            <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-muted-foreground">
              <p>
                <time dateTime={discussion.dateTime}>{discussion.date}</time>
              </p>
            </div>
          </div>
          <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
            <div className="flex -space-x-0.5">
              <dt className="sr-only">Commenters</dt>
              {discussion.commenters.map((commenter) => (
                <dd key={commenter.id}>
                  <img
                    alt={commenter.name}
                    src={commenter.imageUrl}
                    className="size-6 rounded-full bg-background ring-0 ring-card"
                  />
                </dd>
              ))}
            </div>
            <div className="flex w-16 gap-x-2.5">
              <dt>
                <span className="sr-only">Total comments</span>
                <MessageCircle aria-hidden="true" className="size-6 text-muted-foreground" />
              </dt>
              <dd className="text-sm/6 text-foreground">{discussion.totalComments}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
} 
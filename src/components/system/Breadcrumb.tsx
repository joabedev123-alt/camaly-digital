import { Link } from "react-router-dom";
import { Icon } from "./Icon";

export const Breadcrumb = ({ items }: { items: { name: string; path?: string }[] }) => (
  <nav aria-label="Você está em" className="text-[13px] text-soft">
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
      {items.map((it, i) => (
        <li key={it.name} className="flex items-center gap-2">
          {i > 0 && <Icon name="chevron-right" className="text-[10px] opacity-50" />}
          {it.path ? (
            <Link to={it.path} className="hover:text-foreground transition-colors">
              {it.name}
            </Link>
          ) : (
            <span aria-current="page" className="text-foreground/80">
              {it.name}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

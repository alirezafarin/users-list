import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@components";
import InfoRow from "./InfoCard";
import type { IUser } from "@features";
import { AppRoutes } from "@constants";

interface IUserItemProps {
  user: IUser;
}

const UserItem = React.memo(({ user }: IUserItemProps) => {
  const { id, username, name, email, company } = user;

  return (
    <Link
      to={AppRoutes.USER_DETAIL.replace(":id", `${id}`)}
      className="block h-full outline-none focus:ring-4 focus:ring-blue-500/20 rounded-2xl"
      aria-label={`View profile of ${name}`}
    >
      <Card className="h-full">
        <Card.Header title={name} subtitle={`@${username}`} />

        <Card.Body>
          <div className="space-y-2">
            <InfoRow icon="📧" text={email} />
            <InfoRow icon="🏢" text={company.name} />
          </div>
        </Card.Body>

        <Card.Footer>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Profile &rarr;
          </span>
        </Card.Footer>
      </Card>
    </Link>
  );
});

export default UserItem;

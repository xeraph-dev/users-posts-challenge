import { memo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetUser } from "@/hooks/useGetUser";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { UserX } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export type UserDetailsProps = {
  id: number;
};

export const UserDetails = memo(function UserDetails({ id }: UserDetailsProps) {
  const { data, isLoading } = useGetUser(id);

  if (isLoading) {
    return (
      <Skeleton>
        <Card className="invisible">
          <CardHeader className="flex gap-4 items-center">
            <span className="text-xl">name</span>
            <span>@</span>
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-col gap-4">
            <section className="flex flex-col gap-2">
              <h3 className="text-lg">Contact Information</h3>
              <Separator />
              <div className="grid grid-cols-[auto_1fr_auto_1fr] gap-2">
                <span>Email:</span>
                <span>@</span>
                <span>Phone:</span>
                <span>@</span>
                <span>Website:</span>
                <span>@</span>
              </div>
            </section>
          </CardContent>
        </Card>
      </Skeleton>
    );
  }

  if (!data) {
    return (
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <UserX className="text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>User not found</EmptyTitle>
          <EmptyDescription>
            The user you are looking for does not exist or has been deleted.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Link to="/users">
            <Button variant="outline" size="sm">
              Back to users list
            </Button>
          </Link>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="flex gap-4 items-center">
            <span className="text-xl">{data.name}</span>
            <span>@{data.username}</span>
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-col gap-4">
            <section className="flex flex-col gap-2">
              <h3 className="text-lg">Contact Information</h3>
              <Separator />
              <div className="grid grid-cols-[auto_1fr_auto_1fr] gap-2">
                <span>Email:</span>
                <a href={`mailto:${data.email}`} className="hover:underline">
                  {data.email}
                </a>
                <span>Phone:</span>
                <a href={`tel:${data.phone}`} className="hover:underline">
                  {data.phone}
                </a>
                <span>Website:</span>
                <a
                  href={`https://${data.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {data.website}
                </a>
              </div>
            </section>
            <section className="flex flex-col gap-2">
              <h3 className="text-lg">Address</h3>
              <Separator />
              <div className="grid grid-cols-[auto_1fr] gap-2">
                <span>Street:</span>
                <span>
                  {data.address.street}, {data.address.suite}
                </span>
                <span>City:</span>
                <span>
                  {data.address.city} ({data.address.zipcode})
                </span>
                <span>Location:</span>
                <span>
                  Lat {data.address.geo.lat}, Lng {data.address.geo.lng}
                </span>
              </div>
            </section>
            <section className="flex flex-col gap-2">
              <h3 className="text-lg">Company</h3>
              <Separator />
              <span>{data.company.name}</span>
              <span>{data.company.catchPhrase}</span>
              <div />
              <span>{data.company.bs}</span>
            </section>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
});

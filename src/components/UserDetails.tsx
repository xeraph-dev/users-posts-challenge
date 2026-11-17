import { memo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetUser } from "@/hooks/useGetUser";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "./ui/separator";

export type UserDetailsProps = {
  id: number;
};

export const UserDetails = memo(function UserDetails({ id }: UserDetailsProps) {
  const { data } = useGetUser(id);

  if (!data) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
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
  );
});

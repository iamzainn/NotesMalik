"use client";

import { Button } from "@/components/ui/button";
import { Loader2, SearchIcon, Trash} from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button className="w-fit" type="submit">
          Save Now
        </Button>
      )}
    </>
  );
}

export function StripeSubscriptionCreationButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Create Subscription
        </Button>
      )}
    </>
  );
}

export function StripePortal() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button className="w-fit" type="submit">
          View payment details
        </Button>
      )}
    </>
  );
}

export function SearchButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
       
       <Button type="submit" disabled variant="outline" className="px-4 py-2 text-primary-foreground bg-primary rounded-r-lg">
       <Loader2 className="w-5 h-5  animate-spin"></Loader2>
     </Button>
        
      ) : (
        
        <Button type="submit" variant="outline" className="px-4 py-2 text-primary-foreground bg-primary rounded-r-lg">
        <SearchIcon className="w-5 h-5" />
      </Button>
        
      )}
    </>
  );
}

export function TrashDelete() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Please Wait
        </Button>
      ) : (
        <Button className="w-fit" type="submit">
          <Trash className="w-5 h-5" />
        </Button>
      )}
    </>
  );
}


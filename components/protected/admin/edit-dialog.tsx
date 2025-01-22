"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { MdEdit } from "react-icons/md";

interface Props {
  Id: string;
  item: string;
  onEdit: (id: string) => void;
  prefetchAction: () => void;
  EditForm: React.ComponentType;
}

const EditDialog = ({ Id, onEdit, prefetchAction, EditForm }: Props) => {
  const [isPending, setIsPending] = useState(false);

  const handleEdit = () => {
    setIsPending(true);
    onEdit(Id);
    setIsPending(false);
    prefetchAction();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="none">
          <MdEdit className="text-2xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
        </DialogHeader>
        <div>
          <EditForm />
        </div>
        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button type="button">Cancel</Button>
          </DialogClose>
          <Button disabled={isPending} onClick={handleEdit} type="button">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;

"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { deleteDocument } from "@/lib/server-actions/room.actions";
import { useState } from "react";

const DeleteWarningModal = ({ roomId }: { roomId: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function deleteHandler() {
    setLoading(true);

    try {
      await deleteDocument(roomId);
      setOpen(false);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="min-w-9 rounded-xl bg-transparent p-2 transition-all">
          <Trash2 size={25} color="#b4c6ee" />
          {/* <Image
                src={"/assets/icons/delete.svg"}
                alt="Delete icon"
                width={30}
                height={30}
                className="mt-1"
            /> */}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <Image
            src={"/assets/icons/delete-modal.svg"}
            alt="Delete icon"
            width={48}
            height={48}
            className="mb-4"
          />
          <DialogTitle>Delete Document</DialogTitle>
          <DialogDescription>
            This will permanently delete your document without option for
            recovery.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-5 w-full">
          
            <Button className="w-full" onClick={() => setOpen(false)}>Cancel</Button>
            <Button className="w-full hover:gradient-red" onClick={deleteHandler} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWarningModal;

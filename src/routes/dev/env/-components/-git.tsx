import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogContent } from "@/components/ui/dialog";

export function Git() {
  return (
    <Dialog>
      <DialogHeader>Git</DialogHeader>
      <DialogContent>
        <Button>查看git信息</Button>
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import { AgentSale } from "@/components/shared/table/ColumnsForAgents";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoreHorizontal } from "lucide-react";

export function EditButtonDropdown({ payment, onEditClick }: { payment: AgentSale, onEditClick: (payment: AgentSale) => void }) {
    return (
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => console.log('pressed')}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem onClick={() => onEditClick(payment)}>
                Edit Member
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
  
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <div>
                <Label htmlFor="producerName" className="text-right">
                  Producer Name
                </Label>
                <Input id="producerName" defaultValue={payment.producerName} className="col-span-3" />
              </div>
  
              <div>
                <Label htmlFor="producerNpn" className="text-right">
                  Producer NPN
                </Label>
                <Input id="producerNpn" defaultValue={payment.producernpn} className="col-span-3" />
              </div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <div>
                <Label htmlFor="MemberId" className="text-right">
                  Member ID
                </Label>
                <Input id="MemberId" defaultValue={payment.memberid} className="col-span-3" />
              </div>
  
              <div>
                <Label htmlFor="suscriberName" className="text-right">
                  Suscriber Name
                </Label>
                <Input id="suscriberName" defaultValue={payment.suscribername} className="col-span-3" />
              </div>
            </div>
            <div className="flex flex-row items-center  gap-4">
              <div>
                <Label htmlFor="lives" className="text-right">
                  Lives
                </Label>
                <div className="flex flex-row items-center gap-4">
                  <div>
                    <Input id="lives" defaultValue={payment.lives} className="col-span-3" />
                  </div>
                  <div>
                    <Label>x</Label>
                  </div>
                </div>
              </div>
  
              <div>
                <Label htmlFor="rate" className="text-right">
                  Rate
                </Label>
                <div className="flex flex-row items-center gap-4">
                  <div>
                    <Input id="rate" defaultValue={payment.rate} className="col-span-3" />
                  </div>
                  <div>
                    <Label>=</Label>
                  </div>
                </div>
              </div>
  
              <div>
                <Label htmlFor="commission" className="text-right">
                  Commission
                </Label>
                <Input id="commission" defaultValue={payment.commission} className="col-span-3" />
              </div>
            </div>
  
            <div>
              <Label htmlFor="commissionMonth" className="text-right">
                Commission Month
              </Label>
              <Input id="commissionMonth" defaultValue={payment.commissionmonth} className="col-span-3" />
            </div>
  
            <div>
              <Label htmlFor="blockReason" className="text-right">
                Block Reason
              </Label>
              <Input id="blockReason" defaultValue={payment.blockreason} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  

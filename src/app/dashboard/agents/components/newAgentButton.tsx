import AgentSaleForm from "@/components/shared/forms/AgentSaleForm"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function NewAgentButton() {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant='default'>Add new sale</Button>
      </DialogTrigger>
      <DialogContent className="sm:w-full" >
        <DialogHeader>
          <DialogTitle>New sale</DialogTitle>
          <DialogDescription>
            Instert new sale. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
          <AgentSaleForm/>
        <DialogFooter>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pen } from "lucide-react"
import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"
import { toast } from "sonner"

const DialogEditProfile = () => {

  const session = useSession()  

  const [open, setOpen] = useState(false)
  const [name, setNewname] = useState("")
  const [loadingChangeName, setLoadingChangeName] = useState(false)

  const handleChangeName = async (e:FormEvent) => {
    const loadingToast = toast.loading("Loading")
    try {
        e.preventDefault()
        return toast.success("Updated")
        if(name.trim() === "" || name.trim().length < 8) return toast.warning("Please enter a valid name")
        setLoadingChangeName(true)
        const res = await fetch("/api/user/updateName", {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(name)
        })
        if(!res.ok) throw new Error("Failed to change name")
        await session.update()
        toast.success("Successfully update your name")
    } catch (error) {
        console.log("Error : " , error)
        toast.error("Failed to update your name")
    } finally {
        setLoadingChangeName(false)
        toast.dismiss(loadingToast)
        setLoadingChangeName(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild title="Edit Name">
        <Button variant={"outline"}><Pen className="cursor-pointer"/></Button>
      </DialogTrigger>
      <DialogContent className="w-4/5 rounded">
        <DialogHeader>
          <DialogTitle>Change Name</DialogTitle>
          <DialogDescription>
            Change Your Name
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleChangeName}>
            <div className="w-full mb-6 mt-4">
                <Label htmlFor="link" className="sr-only">
                Link
                </Label>
                <Input required onChange={(e) => setNewname(e.target.value)} />
            </div>
            <Button disabled={loadingChangeName} className="w-full">{loadingChangeName ? "Submitting..." : "Change"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogEditProfile
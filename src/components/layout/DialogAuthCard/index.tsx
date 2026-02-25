"use client"

// import { Button } from "@/components/ui/button"
import {
    Dialog,
    // DialogClose,
    DialogContent,
    DialogDescription,
    // DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import useAuthCard from "@/store/useAuthCard"
import Logo from "../../common/Logo"
import SignInForm from "./signInForm"
import SignUpForm from "./signUpForm"

const DialogAuthCard = () => {

    const { currentAuth, setCurrentAuth } = useAuthCard()

    const dialogInfo = {
        title: currentAuth === "signIn"
                ? <span className="flex items-center justify-center gap-2">Sign In to <Logo small /> </span>
                : <span className="flex items-center justify-center gap-2">Sign Up to <Logo small /> </span>,
        description: currentAuth === "signIn"
                ? "Welcome back! Please sign in to continue"
                : "Welcome! Please fill in the details to get started.",
    }

  return (
    <Dialog open={currentAuth !== null} onOpenChange={(open) => {
        if(!open) setCurrentAuth(null)
    }}>
      <form>
        <DialogContent className="md:py-10">
          <DialogHeader className="text-center!">
            <DialogTitle>{dialogInfo.title}</DialogTitle>
            <DialogDescription>
              {dialogInfo.description}
            </DialogDescription>
          </DialogHeader>
          <div className="md:w-4/5 md:mx-auto">
            {currentAuth === null
            ? null
            : (
                currentAuth === "signIn"
                ? <SignInForm />
                : <SignUpForm />
            )}
            </div>
          {/* <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default DialogAuthCard

import Heading from "../common/Heading"
import MutedText from "../common/MutedText"
import { devicesItems } from "@/lib/data/categories"
import { Card, CardContent, CardHeader } from "../ui/card"
import Image from "next/image"

const DevicesItems = () => {
  return (
    <div>
        <Heading>Your Entertainment, Every Screen</Heading>
        <MutedText>Stream seamlessly across all your devices smartphone, tablet, laptop, smart TV, and more. StreamVibe moves with you, delivering flawless playback whether you&apos;re commuting, relaxing at home, or on the go. Never miss a scene, no matter where life takes you</MutedText>
        <section className="grid gap-4 mt-10 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {devicesItems.map(item => (
                <Card key={item.id} className="bg-gradient-to-tr from-background via-background to-primary/20">
                    <CardHeader className="flex items-center gap-4">
                            <Image src={item.icon} alt={item.title} width={35} height={35} className="object-cover object-center border aspect-square p-1.5 box-content rounded-lg"/>
                            <Heading>{item.title}</Heading>
                    </CardHeader>
                    <CardContent>{item.text}</CardContent>
                </Card>
            ))}
        </section>
    </div>
  )
}

export default DevicesItems
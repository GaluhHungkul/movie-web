import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Heading from "../common/Heading"
import MutedText from "../common/MutedText"
import { categoryItems } from "@/lib/data/categories"
import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import Image from "next/image"
import Link from "next/link"

const CarouselMovieGenres = () => {

  return (
    <div className="container mb-20 flex flex-col">
        <Heading>Explore our wide variety of genres</Heading>
        <MutedText>Whether you&apos;re looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new</MutedText>
        <Carousel>
            <CarouselContent>
                {categoryItems.map((item, index) => (
                    <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                        <Card>
                            <CardContent className="aspect-square grid grid-cols-2 gap-2">
                                {item.imgs.map(image => (
                                    <div key={image} className="relative">
                                        <Image key={image} src={image} alt={`${item.title}-${index}`} fill className="object-cover object-center "/>
                                    </div>
                                ))}
                            </CardContent>
                            <CardFooter className="flex items-center justify-between">
                                <h1>{item.title}</h1>
                                    <Link href={`/movies/genre/${item.id}`}>
                                        <Button variant={"outline"}>
                                            <ArrowRight />
                                        </Button>
                                    </Link>
                            </CardFooter>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-12" />
            <CarouselNext className="-right-4 md:-right-12"/>
        </Carousel>
        <Link className="ml-auto mt-4" href={"/genres"}><Button variant={"secondary"}>See More <ArrowRight /></Button></Link>
    </div>
  )
}

export default CarouselMovieGenres
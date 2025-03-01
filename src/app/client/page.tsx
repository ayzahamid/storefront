import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import products from "@/data/products";
import faqs from "@/data/faqs";

export default function HomePage() {
  return (
    <div className="container mx-auto p-6">
      {/* Best-Selling Products Carousel */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Best-Selling Products</h2>
        <Carousel>
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id} className="basis-1/3">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center">
                    <Image src={product.image} alt={product.name} width={150} height={150} className="rounded-lg" unoptimized />
                    <CardTitle className="mt-4 text-center">{product.name}</CardTitle>
                    <p className="text-gray-600">${product.price}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <Accordion type="multiple">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="p-4 text-gray-700">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}

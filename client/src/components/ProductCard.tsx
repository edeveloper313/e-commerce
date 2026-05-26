import Image from "next/image";
import { IProduct } from "@/types/Products.types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/store/UseCard";

interface Props {
  product: IProduct;
}

export default function ProductCard({ product }: Props) {
  const addToCart = useCart((state) => state.addToCart);

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition">
      <div className="relative h-64 w-full">
        <Image 
          src={product.images[0]} 
          alt={product.name} 
          fill 
          className="object-cover group-hover:scale-105 transition duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="secondary">{product.category}</Badge>
          <span className="text-lg font-bold">${product.price}</span>
        </div>
        <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
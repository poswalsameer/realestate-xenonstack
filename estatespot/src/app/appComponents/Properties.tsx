'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Home, Bed, Bath } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { baseURL, fetchData } from "../utils/Api";

// PropertyCard component
const PropertyCard = ({ property} : {property: any}) => (
  <Card className="w-full bg-gray-800 text-gray-100">

    <CardHeader>
      <CardTitle>{property.title}</CardTitle>
      <CardDescription className="text-gray-400">{property.location}</CardDescription>
    </CardHeader>

    <CardContent>
      <img src={property.image} alt={property.title} className="w-full h-48 object-cover rounded-md mb-4" />
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center">
          <Home className="mr-2 h-4 w-4" />
          <span>{property.type}</span>
        </div>
        <div className="flex items-center">
          <Bed className="mr-2 h-4 w-4" />
          <span>{property.bedrooms} beds</span>
        </div>
        <div className="flex items-center">
          <Bath className="mr-2 h-4 w-4" />
          <span>{property.bathrooms} baths</span>
        </div>
      </div>
    </CardContent>

    <CardFooter>
      <p className="text-2xl font-bold text-green-400">${property.price.toLocaleString()}</p>
    </CardFooter>
    
  </Card>
)

// MAIN COMPONENT
export default function RealEstatePage() {

    // HANDLING THE API CALL FOR FETCHING THE DATA
    useEffect(() => {
        const fetchProperties = async () => {

            const url = 'https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-sale&hitsPerPage=25&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4';
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '6e37982d35mshb7663aa66c7cf32p13be1djsna53b19653e39',
                    'x-rapidapi-host': 'bayut.p.rapidapi.com'
                }
            };
                
          try {
            const response = await fetch(url, options);
            const data = await response.json();
            const actualData = await data.hits;
            setSaleProperty(actualData);
            console.log(actualData); 
          } catch (error) {
            console.error('Error fetching properties:', error);
          }
        };
    
        // Call the async function inside the useEffect
        fetchProperties();

      }, []);

    const router = useRouter();
    const { data: session, status } = useSession();

    const [saleProperty, setSaleProperty] = useState<any>([]);

    if (status === "loading") {
        return <div>Loading...</div>;
      }
    
    if (status === "unauthenticated") {
        router.push('/');
        return null;
    }

    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
      };

    const properties = [
        {
        id: 1,
        title: "Modern Downtown Apartment",
        location: "123 Main St, Cityville",
        type: "Apartment",
        bedrooms: 2,
        bathrooms: 2,
        price: 350000,
        image: "/placeholder.svg?height=200&width=300"
        },
        {
        id: 2,
        title: "Spacious Suburban House",
        location: "456 Oak Rd, Suburbia",
        type: "House",
        bedrooms: 4,
        bathrooms: 3,
        price: 550000,
        image: "/placeholder.svg?height=200&width=300"
        },
        {
        id: 3,
        title: "Cozy Studio in Arts District",
        location: "789 Creative Ave, Artstown",
        type: "Studio",
        bedrooms: 1,
        bathrooms: 1,
        price: 200000,
        image: "/placeholder.svg?height=200&width=300"
        },
        {
        id: 4,
        title: "Luxury Penthouse with City View",
        location: "101 Skyline Blvd, Metropolis",
        type: "Penthouse",
        bedrooms: 3,
        bathrooms: 3,
        price: 1200000,
        image: "/placeholder.svg?height=200&width=300"
        },
        // Add more properties as needed
    ]

    // console.log("the properties for sale are: ", saleProperty);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">

        <nav className="flex justify-between items-center p-4 bg-gray-800 text-gray-100">
            <h1 className="text-2xl font-bold">EstateSpot.</h1>
            <Button variant="outline" className="text-black border-gray-100 hover:bg-gray-700 hover:text-white"
            
            onClick={handleLogout}
            >
            <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
        </nav>  
      
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-2 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
    </div>
  )
}
